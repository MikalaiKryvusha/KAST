#!/usr/bin/env node
// KAST (plan 12, step 2) — the device-profile stand on Titan 1. [NOT-TESTED]
//
// One profile = one real device screen: a pixel size AND a density, applied together with `wm size` + `wm density`, read
// back from the device and compared before any screenshot (owner 2026-11-06: «разрешение и плотность - две неразрывные
// переменные!»). Profiles live in device-profiles.json next to this file; every number there carries its source in
// researches/04_device_display_specs.md.
//
// Usage (serial from STAND_SERIAL or --serial <ip:port>):
//   node tools/stand/stand.mjs list
//   node tools/stand/stand.mjs apply <profile> [port|land]
//   node tools/stand/stand.mjs shot <out.webp>                 screenshot of the current screen, straight to WebP (rule P2)
//   node tools/stand/stand.mjs check <profile>                 exit 0 when the device holds exactly this pair
//   node tools/stand/stand.mjs reset                           Titan back to its own state (baseline in the JSON)
//   node tools/stand/stand.mjs state                           what the device holds now
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ADB = 'C:/Android/Sdk/platform-tools/adb.exe';   // the working adb; the old 1.0.32 first in PATH breaks the server
const MAGICK = 'magick';
// Time for the window manager to relayout after a size/density/rotation change, in ms
const SETTLE_MS = 1500;
// How long to wait for the screen to take the asked orientation, in ms
const ROTATE_WAIT_MS = 9000;

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, 'device-profiles.json'), 'utf8'));

const args = process.argv.slice(2);
let serial = process.env.STAND_SERIAL || '';
const si = args.indexOf('--serial');
if (si >= 0) { serial = args[si + 1]; args.splice(si, 2); }
if (!serial) { console.error('stand: no serial — set STAND_SERIAL or pass --serial <ip:port>'); process.exit(2); }

function sh(cmd) {
  return execFileSync(ADB, ['-s', serial, 'shell', cmd], { encoding: 'utf8' }).trim();
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// What the device holds: the effective size/density (override if set, else physical) and the rotation
function state() {
  const size = sh('wm size');
  const dens = sh('wm density');
  const pick = (text, label) => (text.match(new RegExp(label + ' (?:size|density): (\\S+)')) || [])[1] || null;
  return {
    physicalSize: pick(size, 'Physical'), overrideSize: pick(size, 'Override'),
    physicalDensity: pick(dens, 'Physical'), overrideDensity: pick(dens, 'Override'),
    size: pick(size, 'Override') || pick(size, 'Physical'),
    density: Number(pick(dens, 'Override') || pick(dens, 'Physical')),
    accelerometer: sh('settings get system accelerometer_rotation'),
    userRotation: sh('settings get system user_rotation'),
  };
}

// The size of the default display as it stands now, rotation included ("cur=" of the window manager)
function currentScreen() {
  // Titan also holds a virtual display (1400x872 on 2026-11-06), so the size is read inside the section of display 0 only
  const out = sh('dumpsys window displays');
  const start = out.indexOf('mDisplayId=0');
  const next = out.indexOf('mDisplayId=', start + 1);
  const m = out.slice(start, next > 0 ? next : undefined).match(/cur=(\d+x\d+)/);
  return start >= 0 && m ? m[1] : '';
}

function profile(name) {
  const p = config.profiles.find((x) => x.id === name);
  if (!p) { console.error(`stand: no profile "${name}" — see: list`); process.exit(2); }
  if (!p.size || !p.density) { console.error(`stand: profile "${name}" lacks the size+density pair`); process.exit(2); }
  return p;
}

// The pair is checked as one: a size without its density (or the other way round) is not the device
function holds(p) {
  const s = state();
  return s.size === p.size && s.density === p.density;
}

async function apply(name, orient) {
  const p = profile(name);
  const o = orient || p.orientations[0];
  if (!p.orientations.includes(o)) { console.error(`stand: ${name} is not shot in ${o} (allowed: ${p.orientations.join(', ')})`); process.exit(2); }
  // Size and density in ONE shell call, so the device never sits on half a profile
  sh(`wm size ${p.size}; wm density ${p.density}; settings put system accelerometer_rotation 0; settings put system user_rotation ${o === 'land' ? 1 : 0}`);
  // The rotation is checked by what the screen really is: the first run of 2026-11-06 asked for landscape and got a portrait
  // shot, so the screen's current size must be landscape (wide) or portrait (tall) before anything is shot
  const [w, h] = p.size.split('x').map(Number);
  const want = o === 'land' ? `${Math.max(w, h)}x${Math.min(w, h)}` : `${Math.min(w, h)}x${Math.max(w, h)}`;
  let cur = '';
  for (let waited = 0; waited <= ROTATE_WAIT_MS; waited += SETTLE_MS) {
    await sleep(SETTLE_MS);
    cur = currentScreen();
    if (cur === want && holds(p)) break;
  }
  if (!holds(p) || cur !== want) {
    const s = state();
    console.error(`stand: REFUSED — device holds ${s.size} @ ${s.density}, screen ${cur}; profile wants ${p.size} @ ${p.density}, screen ${want}`);
    process.exit(1);
  }
  console.log(`applied ${p.id}: ${p.name} — ${p.size} @ ${p.density} dpi, ${o} (screen ${cur})`);
}

function shot(out) {
  return new Promise((resolve, reject) => {
    const cap = spawn(ADB, ['-s', serial, 'exec-out', 'screencap', '-p']);
    const mg = spawn(MAGICK, ['png:-', '-quality', '80', `webp:${out}`]);
    cap.stdout.pipe(mg.stdin);
    mg.on('close', (code) => (code === 0 ? resolve(out) : reject(new Error('magick exit ' + code))));
  });
}

async function reset() {
  const b = config.titanBaseline;
  const sizeCmd = b.size ? `wm size ${b.size}` : 'wm size reset';
  const densCmd = b.density ? `wm density ${b.density}` : 'wm density reset';
  sh(`${sizeCmd}; ${densCmd}; settings put system user_rotation ${b.userRotation}; settings put system accelerometer_rotation ${b.accelerometerRotation}`);
  await sleep(SETTLE_MS);
  const s = state();
  const ok = s.overrideSize === (b.size || null) && s.density === b.density && s.accelerometer === String(b.accelerometerRotation);
  console.log(`reset: ${s.size} @ ${s.density} dpi, auto-rotate ${s.accelerometer} — ${ok ? 'baseline' : 'NOT baseline'}`);
  process.exit(ok ? 0 : 1);
}

const [cmd, a1, a2] = args;
if (cmd === 'list') {
  for (const p of config.profiles) console.log(`${p.id.padEnd(16)} ${p.name.padEnd(32)} ${p.size.padEnd(10)} @ ${String(p.density).padEnd(4)} ${p.orientations.join('/')}`);
} else if (cmd === 'state') {
  console.log(JSON.stringify(state(), null, 1));
} else if (cmd === 'apply') {
  await apply(a1, a2);
} else if (cmd === 'check') {
  const p = profile(a1);
  const ok = holds(p);
  console.log(ok ? `holds ${p.id}` : `does NOT hold ${p.id}`);
  process.exit(ok ? 0 : 1);
} else if (cmd === 'shot') {
  console.log(await shot(a1));
} else if (cmd === 'reset') {
  await reset();
} else {
  console.error('usage: list | state | apply <profile> [port|land] | check <profile> | shot <out.webp> | reset');
  process.exit(2);
}
