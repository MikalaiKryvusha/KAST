#!/usr/bin/env node
// check-pairs.mjs — the truth → mirror pairs registry of KAST, run as one command (AGENT_GUIDE → "The truth↔mirror pairs
// registry"; /end-chat-soft runs it before handing over).
//   node tools/check-pairs.mjs        # from the repository root; exit 0 = every pair in sync, 1 = drift (named per pair)
// Each pair: the source of truth, its mirror(s), and the check. A new "X must match Y" enters here the day it is born.
// [TESTED: 2026-09-26 · clean tree 4/4; red on a changed background colour (icon), a removed kast_* key in values-ru
// (strings) and a Ф2 status reset in MASTER_PLAN (phases); the hooks pair is checked by reading only — breaking it would mean
// editing the agent's own settings]
import { readFileSync, readdirSync, existsSync, mkdtempSync, cpSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const RES = 'app/src/main/res';
const results = [];
const pair = (name, fn) => { try { const drift = fn(); results.push([name, drift]); } catch (e) { results.push([name, 'check failed: ' + e.message]); } };

// 1. The launcher icon: assets/logo/kast-icon.svg → the generated Android resources (tools/make-launcher-icon.mjs).
//    The generator runs in a throwaway copy of the repository's res + svg, so the working tree is never touched.
pair('icon: kast-icon.svg → drawable-v24/ic_launcher_*.xml, values/ic_launcher_background.xml, mipmap-*/ic_launcher.webp', () => {
  const tmp = mkdtempSync(join(tmpdir(), 'kast-pairs-'));
  try {
    cpSync('assets/logo/kast-icon.svg', join(tmp, 'assets/logo/kast-icon.svg'));
    cpSync(RES, join(tmp, RES), { recursive: true });
    execFileSync(process.execPath, [join(process.cwd(), 'tools/make-launcher-icon.mjs')], { cwd: tmp, stdio: 'ignore' });
    const files = ['drawable-v24/ic_launcher_foreground.xml', 'drawable-v24/ic_launcher_monochrome.xml', 'values/ic_launcher_background.xml',
      ...['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'].map((d) => `mipmap-${d}/ic_launcher.webp`)];
    // XML is compared without line endings (a fresh clone with core.autocrlf=true checks it out with CRLF); WebP byte for byte
    const same = (a, b, f) => (f.endsWith('.xml') ? readFileSync(a, 'utf8').replace(/\r\n/g, '\n') === readFileSync(b, 'utf8').replace(/\r\n/g, '\n')
      : readFileSync(a).equals(readFileSync(b)));
    const differ = files.filter((f) => !same(join(RES, f), join(tmp, RES, f), f));
    return differ.length ? 'regenerated from the SVG, these differ: ' + differ.join(', ') + ' → run node tools/make-launcher-icon.mjs' : null;
  } finally { rmSync(tmp, { recursive: true, force: true }); }
});

// 2. The hooks: every hook of .kaif/hooks/settings-fragment.json is wired in .claude/settings.json.
pair('hooks: .kaif/hooks/settings-fragment.json → .claude/settings.json', () => {
  const frag = JSON.parse(readFileSync('.kaif/hooks/settings-fragment.json', 'utf8')).hooks;
  const live = JSON.parse(readFileSync('.claude/settings.json', 'utf8')).hooks || {};
  const scripts = (h) => JSON.stringify(h).match(/[\w-]+\.mjs/g) || [];
  const missing = Object.keys(frag).flatMap((ev) => scripts(frag[ev]).filter((s) => !scripts(live[ev] || []).includes(s)).map((s) => `${ev}:${s}`));
  return missing.length ? 'not wired: ' + missing.join(', ') : null;
});

// 3. The KAST strings: every kast_* key of values/strings.xml exists in every translated values-*/strings.xml that has
//    strings at all (EXPERIENCE.md EXP-0004 — twins are found by key, never by text). Empty locales stay empty (Artemis).
pair('strings: values/strings.xml kast_* keys → every non-empty values-*/strings.xml', () => {
  const keysOf = (f) => new Set([...readFileSync(f, 'utf8').matchAll(/<string name="(kast_[^"]+)"/g)].map((m) => m[1]));
  const base = keysOf(`${RES}/values/strings.xml`);
  const gaps = [];
  for (const d of readdirSync(RES).filter((x) => x.startsWith('values-'))) {
    const f = `${RES}/${d}/strings.xml`;
    if (!existsSync(f) || !/<string /.test(readFileSync(f, 'utf8'))) continue;
    const have = keysOf(f);
    const miss = [...base].filter((k) => !have.has(k));
    if (miss.length) gaps.push(`${d}: ${miss.join(' ')}`);
  }
  return gaps.length ? gaps.join(' | ') : null;
});

// 4. The phase statuses: a phase closed in STATUS.md is closed in MASTER_PLAN.md too (the owner reads both).
pair('phases: STATUS.md phase table → MASTER_PLAN.md phase statuses', () => {
  const status = readFileSync('STATUS.md', 'utf8');
  const plan = readFileSync('MASTER_PLAN.md', 'utf8');
  const drift = [];
  for (const m of status.matchAll(/^\| (Ф\d) [^|]+\| ✅/gm)) {
    const sec = plan.split(new RegExp(`### ${m[1]} — `))[1];
    if (!sec || !/\*\*Статус:\*\* ✅/.test(sec.split('\n### ')[0])) drift.push(m[1]);
  }
  return drift.length ? 'closed in STATUS, not in MASTER_PLAN: ' + drift.join(', ') : null;
});

let bad = 0;
for (const [name, drift] of results) { console.log(`${drift ? 'DRIFT' : 'ok   '} ${name}${drift ? '\n      ' + drift : ''}`); if (drift) bad++; }
console.log(`${results.length - bad}/${results.length} pairs in sync`);
process.exit(bad ? 1 : 0);
