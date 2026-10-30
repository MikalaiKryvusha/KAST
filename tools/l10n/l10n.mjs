#!/usr/bin/env node
// KAST (ideas/15, plans/08) — localization pipeline for Android string resources.
// One tool for both KAST (ideas/03) and the Super Artemis contribution (ideas/15):
//   status   <res>                    per-locale count of missing translatable entries
//   extract  <res> <lang> [--out f]   missing entries of one locale as JSON work items (English source + section)
//   validate <res> <lang> [--json f]  mechanical checks of a locale (or of a translations JSON) against the base
//   merge    <res> <lang> <json>      write values-<lang>/ mirroring the base files: base order, base comments,
//                                     existing translations kept byte-identical, new ones from <json>
// Entries: <string>, <string-array>, <plurals>; translatable="false" entries are skipped.
// Plural categories come from Intl.PluralRules (CLDR) — never from memory.
// [NOT-TESTED]
import fs from 'node:fs';
import path from 'node:path';

// Named back-reference: this source is joined after COMMENT_RE, so a numbered \1 would point at the comment group.
const TAG_RE = /<(?<tag>string|string-array|plurals)(?=[\s>])([^>]*)>([\s\S]*?)<\/\k<tag>>/g;
const COMMENT_RE = /<!--([\s\S]*?)-->/g;
const ITEM_RE = /<item(?=[\s>])([^>]*)>([\s\S]*?)<\/item>/g;
// Android format specifier: %[argument$][flags][width][.precision]conversion, plus %% literal.
// The space flag is left out on purpose: in UI text "120% will" is prose, not a "% w" specifier.
const FMT_RE = /%(?:\d+\$)?[-#+0,(]*\d*(?:\.\d+)?[a-zA-Z%]/g;
const TAG_IN_TEXT_RE = /<\/?([a-zA-Z][\w:-]*)[^>]*>/g;
// Names that must survive translation untouched when the English text carries them.
const BRANDS = ['Super Artemis', 'Artemis', 'Moonlight', 'Sunshine', 'Apollo', 'Vibepollo', 'GameStream', 'NVIDIA'];
// Android locale folder → BCP-47 tag for Intl (legacy iw/in, region form b+ not used here).
const INTL_TAG = { iw: 'he', in: 'id', 'nb-rNO': 'nb', 'pt-rBR': 'pt-BR', 'zh-rCN': 'zh-CN', 'zh-rTW': 'zh-TW' };
// Short UI labels whose translation grows past this ratio are listed for the layout check on a device.
const LONG_RATIO = 1.6;
const SHORT_LABEL_MAX = 30;

// One key as printed on a keyboard; a keycap label is one or more of them joined by "+".
const KEY_RE = /^(ctrl|alt|shift|win|meta|esc|tab|enter|home|end|page ?up|page ?down|delete|del|insert|ins|print ?screen|space|backspace|caps ?lock|f(?:[1-9]|1\d|2[0-4])|[a-z0-9])$/i;
const isKeycapOnly = t => { const v = t.trim(); return !!v && v.split(/\s*\+\s*/).every(p => KEY_RE.test(p)); };

const attr = (attrs, name) => new RegExp(`\\b${name}="([^"]*)"`).exec(attrs)?.[1];

// Parse one resources XML into an ordered list of {kind:'comment'|'entry'|'blank'} nodes with raw text.
function parseFile(file) {
  const xml = fs.readFileSync(file, 'utf8');
  const nodes = [];
  const body = xml.replace(/^[\s\S]*?<resources[^>]*>/, '').replace(/<\/resources>[\s\S]*$/, '')
    // A self-closing entry (<string name="x" />) is an intentionally empty resource: open it up so the tag regex
    // cannot run on into the next entry's closing tag.
    .replace(/<(string|string-array|plurals)(?=[\s/])([^>]*?)\s*\/>/g, '<$1$2></$1>');
  const re = new RegExp(`${COMMENT_RE.source}|${TAG_RE.source}`, 'g');
  let m, last = 0;
  while ((m = re.exec(body))) {
    if (/\n\s*\n/.test(body.slice(last, m.index))) nodes.push({ kind: 'blank' });
    last = re.lastIndex;
    if (m[1] !== undefined) { nodes.push({ kind: 'comment', raw: m[0] }); continue; }
    const [, , tag, attrs, inner] = m;
    const e = { kind: 'entry', tag, name: attr(attrs, 'name'), attrs, raw: m[0], inner,
      translatable: !/translatable="false"/.test(attrs) };
    if (tag === 'string-array') e.items = [...inner.matchAll(ITEM_RE)].map(i => i[2]);
    if (tag === 'plurals') e.quantities = Object.fromEntries([...inner.matchAll(ITEM_RE)].map(i => [attr(i[1], 'quantity'), i[2]]));
    // Nothing to translate: an empty resource, or one made only of references (@string/x) whose targets are translated.
    const texts = e.items || (e.quantities && Object.values(e.quantities)) || [inner];
    if (texts.every(t => !t.trim() || /^\s*@[\w:]+\/[\w.]+\s*$/.test(t))) e.translatable = false;
    // Keycap labels ("Alt + F4", "ESC", "Page Up") are printed as on the keyboard and are not translated: the locale
    // gets no copy, Android shows the base text (the maintainer's rule, Arora-Sir/Super-Artemis#3; the owner 2026-10-30).
    // A lone word ("Delete", "s") is a keycap only inside the key lists; elsewhere it is an action or a unit.
    if (tag === 'string' && isKeycapOnly(inner) && (inner.includes('+') || /(^|_)(send_keys|more_key)_/.test(e.name))) {
      e.translatable = false; e.keycap = true;
    }
    nodes.push(e);
  }
  return nodes;
}

const xmlFiles = dir => fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.xml')).sort() : [];
const keyOf = e => `${e.tag}:${e.name}`;

// Base files that carry at least one translatable entry, in name order.
function loadBase(res) {
  const files = [];
  for (const f of xmlFiles(path.join(res, 'values'))) {
    const nodes = parseFile(path.join(res, 'values', f));
    if (nodes.some(n => n.kind === 'entry' && n.translatable)) files.push({ file: f, nodes });
  }
  return files;
}

function loadLocale(res, lang) {
  const map = new Map();
  for (const f of xmlFiles(path.join(res, `values-${lang}`)))
    for (const n of parseFile(path.join(res, `values-${lang}`, f))) if (n.kind === 'entry') map.set(keyOf(n), { ...n, file: f });
  return map;
}

function baseEntries(base) {
  const out = [];
  for (const { file, nodes } of base) {
    let section = '';
    for (const n of nodes) {
      if (n.kind === 'comment') section = n.raw.replace(/<!--|-->/g, '').trim();
      if (n.kind === 'entry' && n.translatable) out.push({ ...n, file, section });
    }
  }
  return out;
}

const localeDirs = res => fs.readdirSync(res).filter(d => /^values-[a-z]{2,3}(-r[A-Z]{2})?$/.test(d)
  && fs.existsSync(path.join(res, d, 'strings.xml'))).map(d => d.slice(7)).sort();

// ---- checks -------------------------------------------------------------------------------------------------
const fmts = s => (s.match(FMT_RE) || []).sort().join(' ');
const tags = s => [...s.matchAll(TAG_IN_TEXT_RE)].map(t => t[0].startsWith('</') ? `/${t[1]}` : t[1]).sort().join(' ');
const visible = s => s.replace(TAG_IN_TEXT_RE, '').replace(/\\n/g, ' ').replace(/\\(.)/g, '$1').trim();

// Problems of one translated text against its English source. Errors break the build or the meaning; warnings ask a look.
function checkText(en, tr, lang, where) {
  const errs = [], warns = [];
  if (!tr.trim()) errs.push(`${where}: empty`);
  if (fmts(en) !== fmts(tr)) errs.push(`${where}: format specifiers differ — en [${fmts(en)}] vs [${fmts(tr)}]`);
  if (tags(en) !== tags(tr)) errs.push(`${where}: markup tags differ — en [${tags(en)}] vs [${tags(tr)}]`);
  const quoted = /^\s*".*"\s*$/s.test(tr);
  if (!quoted && /(^|[^\\])'/.test(tr)) errs.push(`${where}: unescaped apostrophe (write \\')`);
  if (/^\s*[@?]/.test(tr)) errs.push(`${where}: starts with @ or ? (escape it)`);
  if (!quoted && /(^|[^\\])"/.test(tr.replace(/<[^>]*>/g, ''))) warns.push(`${where}: bare double quote is dropped by aapt (write \\" or «»)`);
  if ((en.match(/\\n/g) || []).length !== (tr.match(/\\n/g) || []).length) warns.push(`${where}: \\n count differs`);
  for (const b of BRANDS) if (en.includes(b) && !tr.includes(b) && !BRANDS.some(o => o !== b && o.includes(b) && tr.includes(o)))
    warns.push(`${where}: brand "${b}" missing`);
  const ve = visible(en), vt = visible(tr);
  if (ve === vt && /[a-z]{3}/i.test(ve) && !BRANDS.includes(ve)) warns.push(`${where}: identical to English`);
  if (ve.length <= SHORT_LABEL_MAX && vt.length > ve.length * LONG_RATIO && vt.length - ve.length > 4)
    warns.push(`${where}: long (${ve.length}→${vt.length} chars) — check layout`);
  return { errs, warns };
}

function checkEntry(b, t, lang) {
  const where = keyOf(b);
  const all = { errs: [], warns: [] };
  const add = r => { all.errs.push(...r.errs); all.warns.push(...r.warns); };
  if (b.tag === 'string') add(checkText(b.inner, t.inner, lang, where));
  if (b.tag === 'string-array') {
    if (t.items.length !== b.items.length) all.errs.push(`${where}: ${t.items.length} items, base has ${b.items.length}`);
    b.items.forEach((en, i) => t.items[i] !== undefined && add(checkText(en, t.items[i], lang, `${where}[${i}]`)));
  }
  if (b.tag === 'plurals') {
    const need = new Intl.PluralRules(INTL_TAG[lang] || lang).resolvedOptions().pluralCategories.sort().join(' ');
    const have = Object.keys(t.quantities).sort().join(' ');
    if (need !== have) all.errs.push(`${where}: quantities [${have}], CLDR for ${lang} needs [${need}]`);
    const en = b.quantities.other;
    for (const [q, tr] of Object.entries(t.quantities)) add(checkText(en, tr, lang, `${where}{${q}}`));
  }
  return all;
}

// Translations JSON: { "<tag>:<name>": "raw" | ["item", …] | {"one": "…", …} } → entry-shaped objects.
function fromJson(b, v) {
  if (b.tag === 'string') return { inner: v };
  if (b.tag === 'string-array') return { items: v };
  return { quantities: v };
}

// ---- commands -----------------------------------------------------------------------------------------------
function status(res) {
  const all = baseEntries(loadBase(res));
  console.log(`base translatable entries: ${all.length}`);
  for (const lang of localeDirs(res)) {
    const loc = loadLocale(res, lang);
    const missing = all.filter(b => !loc.has(keyOf(b))).length;
    console.log(`${lang.padEnd(7)} ${String(all.length - missing).padStart(5)} done ${String(missing).padStart(5)} missing  ${Math.round(100 * (all.length - missing) / all.length)}%`);
  }
}

function extract(res, lang, out) {
  const loc = loadLocale(res, lang);
  const items = baseEntries(loadBase(res)).filter(b => !loc.has(keyOf(b))).map(b => ({
    key: keyOf(b), section: b.section,
    en: b.tag === 'string' ? b.inner : b.tag === 'string-array' ? b.items : b.quantities,
    ...(b.tag === 'plurals' ? { need: new Intl.PluralRules(INTL_TAG[lang] || lang).resolvedOptions().pluralCategories } : {}),
  }));
  const text = JSON.stringify(items, null, 1);
  if (out) fs.writeFileSync(out, text); else console.log(text);
  console.error(`${lang}: ${items.length} missing entries${out ? ' → ' + out : ''}`);
}

function validate(res, lang, jsonFile) {
  const base = baseEntries(loadBase(res));
  const loc = loadLocale(res, lang);
  const json = jsonFile ? JSON.parse(fs.readFileSync(jsonFile, 'utf8')) : null;
  let errs = [], warns = [], checked = 0;
  for (const b of base) {
    const t = json ? (json[keyOf(b)] !== undefined ? fromJson(b, json[keyOf(b)]) : null) : loc.get(keyOf(b));
    if (!t) continue;
    checked++;
    const r = checkEntry(b, t, lang);
    errs.push(...r.errs); warns.push(...r.warns);
  }
  if (json) for (const k of Object.keys(json)) if (!base.some(b => keyOf(b) === k)) errs.push(`${k}: not a translatable base entry`);
  errs.forEach(e => console.log(`ERROR ${e}`));
  warns.forEach(w => console.log(`warn  ${w}`));
  console.log(`${lang}: checked ${checked}, errors ${errs.length}, warnings ${warns.length}`);
  return errs.length ? 1 : 0;
}

function serialize(b, t, indent = '    ') {
  const a = b.attrs.replace(/\s*translatable="[^"]*"/, '');
  if (b.tag === 'string') return `${indent}<string${a}>${t.inner}</string>`;
  if (b.tag === 'string-array')
    return [`${indent}<string-array${a}>`, ...t.items.map(i => `${indent}    <item>${i}</item>`), `${indent}</string-array>`].join('\n');
  return [`${indent}<plurals${a}>`, ...Object.entries(t.quantities).map(([q, v]) => `${indent}    <item quantity="${q}">${v}</item>`),
    `${indent}</plurals>`].join('\n');
}

function merge(res, lang, jsonFile) {
  const json = jsonFile ? JSON.parse(fs.readFileSync(jsonFile, 'utf8')) : {};
  const loc = loadLocale(res, lang);
  const dir = path.join(res, `values-${lang}`);
  const written = new Set();
  let kept = 0, added = 0, fixed = 0, still = 0;
  for (const { file, nodes } of loadBase(res)) {
    const lines = [];
    let pendingComment = null, pendingBlank = false;
    for (const n of nodes) {
      if (n.kind === 'blank') { pendingBlank = true; continue; }
      if (n.kind === 'comment') { pendingComment = n.raw; continue; }
      if (!n.translatable) continue;
      const k = keyOf(n);
      const old = loc.get(k);
      let text;
      // A key present in the JSON wins: a new translation, or a correction of an existing one.
      if (json[k] !== undefined) { text = serialize(n, fromJson(n, json[k])); old ? fixed++ : added++; }
      else if (old) { text = `    ${old.raw}`; kept++; }
      else { still++; continue; }
      if (pendingBlank && lines.length) lines.push('');
      if (pendingComment) lines.push(`    ${pendingComment}`);
      pendingComment = null; pendingBlank = false;
      lines.push(text);
      written.add(k);
    }
    if (!lines.length) continue;
    fs.mkdirSync(dir, { recursive: true });
    // Keep the base file's line-ending style (upstream projects guard it; a CRLF→LF flip shows the whole file as changed).
    const eol = fs.readFileSync(path.join(res, 'values', file), 'utf8').includes('\r\n') ? '\r\n' : '\n';
    const body = `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n${lines.join('\n')}\n</resources>\n`;
    fs.writeFileSync(path.join(dir, file), body.replace(/\r?\n/g, eol));
  }
  // Locale-only files (e.g. dimens.xml overrides) are left alone; translated entries living in a file whose base twin
  // was rewritten are now in the mirrored file — drop them from their old file only if that file was not rewritten.
  const leftovers = [...loc.values()].filter(e => !written.has(keyOf(e)) && e.translatable);
  console.log(`${lang}: kept ${kept}, added ${added}, corrected ${fixed}, still missing ${still}, orphans not written ${leftovers.length}`);
  leftovers.forEach(e => console.log(`orphan ${keyOf(e)} (${e.file})`));
}

const [cmd, res, lang, ...rest] = process.argv.slice(2);
const opt = n => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : undefined; };
if (cmd === 'status') status(res);
else if (cmd === 'extract') extract(res, lang, opt('--out'));
else if (cmd === 'validate') process.exitCode = validate(res, lang, opt('--json'));
else if (cmd === 'merge') merge(res, lang, rest[0]);
else console.log('usage: l10n.mjs status|extract|validate|merge <res> [lang] …');
