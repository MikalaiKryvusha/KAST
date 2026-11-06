// KAST (ideas/15) — minimal locator-based UI driver over adb + uiautomator (HOUSE_RULES П13): tap by text or
// content-desc, list texts, scroll, seek (scroll until found, then tap), walk a list, WebP screenshot (П2).
// usage: UI_SERIAL=<adb serial> node tools/ui.mjs tap "<text>" | seek "<text>" | texts | scroll | back | shot <file.webp>
//        | walk <pages> <outfile> | prefs <pages> <outfile> | value "<title>"
// [TESTED: 2026-10-30 · Super Artemis and KAST walked on Titan 1 and Galaxy S21 FE, testcases/reports/2026-10-30_super-artemis-ru.md]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const ADB = 'C:/Android/Sdk/platform-tools/adb.exe';
const SERIAL = process.env.UI_SERIAL || '192.168.1.3:5555';
const adb = (...a) => execFileSync(ADB, ['-s', SERIAL, ...a], { encoding: 'utf8', maxBuffer: 32 << 20, env: { ...process.env, MSYS_NO_PATHCONV: '1' } });
const sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

function dump() {
  adb('shell', 'uiautomator', 'dump', '/sdcard/ui.xml');
  const xml = adb('shell', 'cat', '/sdcard/ui.xml');
  return [...xml.matchAll(/<node [^>]*>/g)].map(m => {
    const a = n => (new RegExp(`${n}="([^"]*)"`).exec(m[0]) || [])[1] || '';
    const b = a('bounds').match(/\d+/g)?.map(Number) || [0, 0, 0, 0];
    return { text: a('text'), desc: a('content-desc'), id: a('resource-id'), cls: a('class'), checkable: a('checkable') === 'true',
      checked: a('checked') === 'true', x: (b[0] + b[2]) >> 1, y: (b[1] + b[3]) >> 1 };
  });
}
const texts = nodes => nodes.flatMap(n => [n.text, n.desc]).filter(Boolean);

const [cmd, rawArg, out] = process.argv.slice(2);
// "@<file>" reads the text from a UTF-8 file: a Cyrillic argument passed through the Windows command line arrives broken
// (AGENT_GUIDE → text travels through files; Russian sweep of plan 12, 2026-11-07)
const arg = rawArg && rawArg.startsWith('@') ? fs.readFileSync(rawArg.slice(1), 'utf8').trim() : rawArg;
if (cmd === 'tap') {
  const n = dump().find(n => n.text === arg || n.desc === arg) || dump().find(n => n.text.includes(arg) || n.desc.includes(arg));
  if (!n) { console.log(`NOT FOUND: ${arg}`); process.exit(1); }
  adb('shell', 'input', 'tap', String(n.x), String(n.y)); sleep(1500); console.log(`tapped ${arg} @${n.x},${n.y}`);
} else if (cmd === 'texts') {
  console.log([...new Set(texts(dump()))].join('\n'));
} else if (cmd === 'scroll') {
  adb('shell', 'input', 'swipe', '800', '2000', '800', '700', '400'); sleep(800);
} else if (cmd === 'seek') {
  // Scroll the current list (down, then back up) until an element with this exact text shows, then tap it.
  // The swipe is placed by the screen size: a fixed x of 900 fell outside a 720 px wide screen (stand profile Galaxy A03,
  // 2026-11-07); x at 70 % of the width also lands in the right pane of a two-pane settings screen
  const size = (adb('shell', 'wm', 'size').match(/Override size: (\d+)x(\d+)/) || adb('shell', 'wm', 'size').match(/(\d+)x(\d+)/)).slice(1).map(Number);
  // Display 0 only: Titan also holds a virtual display, whose "cur=" comes first in the dump
  const disp = adb('shell', 'dumpsys', 'window', 'displays');
  const d0 = disp.slice(disp.indexOf('mDisplayId=0'));
  const rot = d0.slice(0, (d0.indexOf('mDisplayId=', 5) + 1 || d0.length + 1) - 1).match(/cur=(\d+)x(\d+)/);
  const [sw, sh] = rot ? [Number(rot[1]), Number(rot[2])] : size;
  const X = String(Math.round(sw * 0.7)), Y1 = String(Math.round(sh * 0.7)), Y2 = String(Math.round(sh * 0.3));
  const moves = [...Array(8).fill([X, Y1, X, Y2]), ...Array(16).fill([X, Y2, X, Y1])];
  for (const m of [null, ...moves]) {
    if (m) { adb('shell', 'input', 'swipe', ...m, '300'); sleep(700); }
    const n = dump().find(n => n.text === arg || n.desc === arg);
    if (n) { adb('shell', 'input', 'tap', String(n.x), String(n.y)); sleep(1500); console.log(`seek-tapped ${arg}`); process.exit(0); }
  }
  console.log(`NOT FOUND after scrolling: ${arg}`); process.exit(1);
} else if (cmd === 'back') {
  adb('shell', 'input', 'keyevent', '4'); sleep(1000);
} else if (cmd === 'shot') {
  // WebP only (П2): PNG bytes go straight from adb into magick through a pipe, never to disk.
  const png = execFileSync(ADB, ['-s', SERIAL, 'exec-out', 'screencap', '-p'], { maxBuffer: 64 << 20 });
  execFileSync('magick', ['png:-', '-quality', '75', `webp:${arg}`], { input: png });
  console.log(`shot → ${arg}`);
} else if (cmd === 'walk') {
  // Scroll a list page by page, collecting every distinct text, until it stops changing or <pages> is reached.
  const seen = new Set(); let last = '';
  for (let i = 0; i < Number(arg); i++) {
    const t = texts(dump()); t.forEach(x => seen.add(x));
    const sig = t.join('|'); if (sig === last) break; last = sig;
    adb('shell', 'input', 'swipe', '800', '2000', '800', '700', '400'); sleep(900);
  }
  fs.writeFileSync(out, [...seen].join('\n'));
  console.log(`${seen.size} texts → ${out}`);
} else if (cmd === 'value') {
  // KAST (2026-10-30): open a preference by its exact title (scrolling to it) and print what its dialog shows as chosen —
  // the checked item of a list, the text of an input field — then close the dialog with Back. [TESTED: 2026-10-30 · Artemide profile editor on Titan, read resolution and fps of four profiles, testcases/reports/2026-10-30_super-artemis-profiles-vibepollo.md]
  const moves = [...Array(10).fill(['900', '1800', '900', '900']), ...Array(20).fill(['900', '900', '900', '1800'])];
  let found = null;
  for (const m of [null, ...moves]) {
    if (m) { adb('shell', 'input', 'swipe', ...m, '300'); sleep(700); }
    found = dump().find(n => n.text === arg);
    if (found) break;
  }
  if (!found) { console.log(`${arg} | NOT FOUND`); process.exit(1); }
  adb('shell', 'input', 'tap', String(found.x), String(found.y)); sleep(1500);
  const d = dump();
  const chosen = d.filter(n => n.checkable && n.checked && n.text).map(n => n.text);
  const fields = d.filter(n => /EditText/.test(n.cls)).map(n => `[${n.text}]`);
  const seek = d.filter(n => /\d+(\.\d+)?\s*(Mbps|Мбит|kbps|кбит)/i.test(n.text)).map(n => n.text);
  console.log(`${arg} | ${[...chosen, ...fields, ...seek].join(' ; ') || 'no dialog value'}`);
  adb('shell', 'input', 'keyevent', '4'); sleep(900);
} else if (cmd === 'prefs') {
  // KAST (2026-10-30, profiles of the owner): read an androidx preference screen as rows "title | summary | on/off".
  // A row starts at a node whose id ends in /title; /summary and the first checkable node after it belong to the same row.
  // The on/off state lives only in the checked attribute, which walk does not see. [TESTED: 2026-10-30 · Artemide profile editor on Titan, 37 rows, same report]
  const rows = new Map(); let last = '';
  for (let i = 0; i < Number(arg); i++) {
    const nodes = dump(); let cur = null; const page = [];
    for (const n of nodes) {
      if (n.id.endsWith('/title') && n.text) { cur = { title: n.text, summary: '', state: '' }; page.push(cur); }
      else if (cur && n.id.endsWith('/summary')) cur.summary = n.text;
      else if (cur && n.checkable && !cur.state) cur.state = n.checked ? 'on' : 'off';
    }
    page.forEach(r => rows.set(r.title, r));
    const sig = page.map(r => r.title).join('|'); if (sig === last) break; last = sig;
    adb('shell', 'input', 'swipe', '800', '2000', '800', '700', '400'); sleep(900);
  }
  fs.writeFileSync(out, [...rows.values()].map(r => [r.title, r.summary, r.state].join(' | ')).join('\n'));
  console.log(`${rows.size} rows → ${out}`);
}
