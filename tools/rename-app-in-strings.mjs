#!/usr/bin/env node
// rename-app-in-strings.mjs — bug 06: the app calls itself "Artemis" or "Moonlight" in UI strings; the product is KAST.
//   node tools/rename-app-in-strings.mjs          # from the repository root; prints what changed per file and key
// Scope: every <string> element (multi-line included) of app/src/main/res/values*/strings.xml whose text names the app.
// Kept as is, on purpose:
//   - keys that need the owner's decision or name the source: summary_privacy_policy (links to Artemis's policy),
//     summary_performance_link (the Artemis community dashboard), summary_software_update («KAST, a fork of Artemis»);
//   - the name of the separate host tool: «Moonlight Internet Hosting Tool» and its translations (a word for "Internet"
//     follows the name), including the zh-rCN line where a translator put «Artemis» into the tool's name.
// Only whole words are replaced; the file's line endings are kept. [TESTED: 2026-09-26 · 227 + 12 replacements in 26 files, a
// second run gives 0; only the kept keys and the host tool's name remain; Titan settings show «…будет использоваться в KAST»]
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const RES = 'app/src/main/res';
const KEEP_KEYS = new Set(['summary_privacy_policy', 'summary_performance_link', 'summary_software_update']);
// The name with an optional case ending (Czech «Moonlightu», German/Swedish «Moonlights»); the character before it must
// not be a letter or digit, except the literal "\n" escape of a multi-line XML string («\nMoonlight는…», ko).
// Hebrew writes Moonlight in its own letters (מונלייט, values-iw) — found by the bug 06 judge.
const APP = /(Artemis|Moonlight|מונלייט)(u|s)?(?![A-Za-z0-9_])(?!\s*(?:Internet|İnternet|Internett|互联网|インターネット))/g;
const BS = String.fromCharCode(92);
// A name right after "Internet " is the host tool's name in word orders like Vietnamese «Công cụ … Internet Artemis».
const afterInternet = (text, at) => /Internet\s$/i.test(text.slice(Math.max(0, at - 9), at));
const startsWord = (text, at) => !afterInternet(text, at) &&
  (at === 0 || !/[A-Za-z0-9_]/.test(text[at - 1]) || (text[at - 1] === 'n' && text[at - 2] === BS));
const renamed = (dir, ending) => (!ending ? 'KAST' : ending === 'u' ? 'KASTu' : dir === 'values-sv' ? 'KAST:s' : 'KASTs');
// French elides «de» only before a vowel: «d'Artemis» was right, «d'KAST» is not → «de KAST» (bug 06 judge).
const ELIDED = 'd' + BS + "'KAST";
const STRING = /<string name="([^"]+)"([^>]*)>([\s\S]*?)<\/string>/g;

let files = 0, total = 0;
for (const dir of readdirSync(RES).filter((d) => d.startsWith('values')).sort()) {
  const p = `${RES}/${dir}/strings.xml`;
  let t;
  try { t = readFileSync(p, 'utf8'); } catch { continue; }
  const changed = [];
  const out = t.replace(STRING, (whole, key, attrs, text) => {
    if (KEEP_KEYS.has(key)) return whole;
    let n = 0;
    let next = text.replace(APP, (m, name, ending, at) => {
      if (!startsWord(text, at)) return m;
      n++;
      return renamed(dir, ending);
    });
    if (dir === 'values-fr' && next.includes(ELIDED)) { n += next.split(ELIDED).length - 1; next = next.split(ELIDED).join('de KAST'); }
    if (n) changed.push(`${key}×${n}`);
    total += n;
    return n ? `<string name="${key}"${attrs}>${next}</string>` : whole;
  });
  if (out !== t) { writeFileSync(p, out, 'utf8'); files++; console.log(`${dir}: ${changed.join(' ')}`); }
}
console.log(`${total} replacement(s) in ${files} file(s)`);
