// KAST (ideas/15) — minimal locator-based UI driver over adb + uiautomator (HOUSE_RULES П13): tap by text or
// content-desc, list texts, scroll, seek (scroll until found, then tap), walk a list, WebP screenshot (П2).
// usage: UI_SERIAL=<adb serial> node tools/ui.mjs tap "<text>" | seek "<text>" | texts | scroll | back | shot <file.webp>
//        | walk <pages> <outfile>
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
    return { text: a('text'), desc: a('content-desc'), id: a('resource-id'), x: (b[0] + b[2]) >> 1, y: (b[1] + b[3]) >> 1 };
  });
}
const texts = nodes => nodes.flatMap(n => [n.text, n.desc]).filter(Boolean);

const [cmd, arg, out] = process.argv.slice(2);
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
  const moves = [...Array(8).fill(['900', '850', '900', '350']), ...Array(16).fill(['900', '350', '900', '850'])];
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
}
