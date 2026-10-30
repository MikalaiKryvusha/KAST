#!/usr/bin/env node
// KAST (ideas/15) — review table of one locale for the owner: every translatable base entry with its English text,
// the translation (existing in values-<lang>/, or proposed in the batch JSON files) and the validator's remarks.
// usage: node tools/l10n/l10n-table.mjs <res> <lang> <out.md> [proposed.json …]
// [NOT-TESTED]
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [res, lang, out, ...jsons] = process.argv.slice(2);
const tool = path.join(path.dirname(fileURLToPath(import.meta.url)), 'l10n.mjs');
const proposed = Object.assign({}, ...jsons.filter(f => fs.existsSync(f)).map(f => JSON.parse(fs.readFileSync(f, 'utf8'))));

// Base entries (in base order) and existing locale entries — read through the extractor of the main tool.
const run = (...a) => execFileSync('node', [tool, ...a], { encoding: 'utf8', maxBuffer: 64 << 20 });
const missing = JSON.parse(run('extract', res, lang));
const missingKeys = new Set(missing.map(m => m.key));
const STR = /<(string|string-array|plurals)\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g;
const grab = dir => {
  const m = new Map();
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.xml')))
    for (const x of fs.readFileSync(path.join(dir, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '').matchAll(STR)) m.set(`${x[1]}:${x[2]}`, x[3]);
  return m;
};
const base = grab(path.join(res, 'values'));
const have = grab(path.join(res, `values-${lang}`));

// Validator remarks per key, for the proposed set and for the existing locale.
const remarks = new Map();
const collect = text => { for (const line of text.split('\n')) {
  const m = /^(ERROR|warn)\s+([\w-]+:[\w.]+)[^:]*: (.*)$/.exec(line);
  if (m) remarks.set(m[2], [...(remarks.get(m[2]) || []), `${m[1] === 'ERROR' ? '❌' : '⚠'} ${m[3]}`]);
} };
const tryRun = (...a) => { try { return run(...a); } catch (e) { return e.stdout || ''; } };
collect(tryRun('validate', res, lang));
const tmp = path.join(path.dirname(out), `.proposed-${lang}.json`);
if (Object.keys(proposed).length) { fs.writeFileSync(tmp, JSON.stringify(proposed)); collect(tryRun('validate', res, lang, '--json', tmp)); fs.unlinkSync(tmp); }

// Plural forms shown by the numbers that pick them, instead of the CLDR names (one/few/many/other) the owner never sees.
const PLURAL_LABEL = {
  en: { one: '1 →', other: 'остальные →' },
  ru: { one: '1, 21, 31… →', few: '2–4, 22–24… →', many: '0, 5–20, 25… →', other: 'дробные →' },
};
const cell = (v, l = 'en') => {
  if (v === undefined || v === null) return '';
  const s = typeof v === 'string' ? v : Array.isArray(v) ? v.map((x, i) => `${i + 1}) ${x}`).join('<br>')
    : Object.entries(v).map(([q, x]) => `${PLURAL_LABEL[l]?.[q] || q + ':'} ${x}`).join('<br>');
  return s.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
};
const enOf = (k, raw) => k.startsWith('string-array:') ? [...raw.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(x => x[1])
  : k.startsWith('plurals:') ? Object.fromEntries([...raw.matchAll(/<item quantity="(\w+)">([\s\S]*?)<\/item>/g)].map(x => [x[1], x[2]])) : raw;

const rowsNew = [], rowsOld = [];
let n = 0;
for (const m of missing) {
  const tr = proposed[m.key];
  rowsNew.push(`| ${++n} | \`${m.key.replace(/^string:/, '')}\` | ${cell(m.section)} | ${cell(m.en)} | ${tr === undefined ? "⏳" : cell(tr, lang)} | ${(remarks.get(m.key) || []).join('<br>')} |`);
}
// Corrections of existing translations: a proposed value for a key the locale already has; reasons from <json>.why.json.
const why = Object.assign({}, ...jsons.map(f => f.replace(/\.json$/, '.why.json')).filter(f => fs.existsSync(f))
  .map(f => JSON.parse(fs.readFileSync(f, 'utf8'))));
let corrected = 0;
for (const [k, raw] of base) {
  if (missingKeys.has(k) || !have.has(k)) continue;
  const fix = proposed[k];
  const ru = fix === undefined ? cell(enOf(k, have.get(k)))
    : (corrected++, `~~${cell(enOf(k, have.get(k)))}~~ → **${cell(fix)}**${why[k] ? `<br>_${cell(why[k])}_` : ''}`);
  rowsOld.push(`| ${++n} | \`${k.replace(/^string:/, '')}\` | ${cell(enOf(k, raw))} | ${ru} | ${(remarks.get(k) || []).join('<br>')} |`);
}
const done = missing.filter(m => proposed[m.key] !== undefined).length;
const errs = [...remarks.values()].flat().filter(r => r.startsWith('❌')).length;
const md = `# Super Artemis — перевод на ${lang}: таблица для согласования

Новых переводов: **${done} из ${missing.length}** · уже было в приложении: **${rowsOld.length}** · ошибок проверки: **${errs}** ·
обновлено ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC

⏳ — перевод ещё в работе · ❌ — ошибка проверки (формат, экранирование) · ⚠ — замечание: длиннее английского, совпадает с английским

## 1. Новые переводы — их и согласуем

| № | Ключ | Раздел | English | Русский | Проверка |
|---|---|---|---|---|---|
${rowsNew.join('\n')}

## 2. Уже были в приложении — вычитка (исправлено: ${corrected}, «было → стало» с причиной)

| № | Ключ | English | Русский | Проверка |
|---|---|---|---|---|
${rowsOld.join('\n')}
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md);
console.log(`${out}: new ${done}/${missing.length}, existing ${rowsOld.length}, errors ${errs}`);
