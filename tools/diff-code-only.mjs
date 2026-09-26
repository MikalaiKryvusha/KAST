#!/usr/bin/env node
// diff-code-only.mjs — proves a commenting pass changed no code (plans/07_comment_inherited_code.md, step 1).
//   node tools/diff-code-only.mjs <file.java|file.c> [revision]    # revision: default HEAD; exit 0 — the code is the same
// Both versions — the file in <revision> and the working copy — lose their comments (// … and /* … */) and every whitespace
// character, string and char literals kept intact; then they are compared. Any difference is exit 1 with the first place
// that differs. Fit for Java and C. [TESTED: 2026-09-26 ≈20:40 (first written by feel as 20:47) · a comment added to Game.java → exit 0; the same file with
// one operator changed (== → !=) → exit 1, the place printed]
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const [file, rev = 'HEAD'] = process.argv.slice(2);
if (!file) {
  console.error('usage: node tools/diff-code-only.mjs <file> [revision]');
  process.exit(2);
}

// Keeps only the code: comments and whitespace go, literals stay byte for byte.
export function codeOnly(src) {
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const c = src[i], n = src[i + 1];
    if (c === '/' && n === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '/' && n === '*') { i += 2; while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) i++; i++; continue; }
    if (c === '"' && src.startsWith('"""', i)) { // a Java text block
      const end = src.indexOf('"""', i + 3);
      const stop = end < 0 ? src.length : end + 3;
      out += src.slice(i, stop); i = stop - 1; continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < src.length && src[j] !== c) { if (src[j] === '\\') j++; j++; }
      out += src.slice(i, j + 1); i = j; continue;
    }
    if (/\s/.test(c)) continue;
    out += c;
  }
  return out;
}

const before = codeOnly(execFileSync('git', ['show', `${rev}:${file.replace(/\\/g, '/')}`], { encoding: 'utf8', maxBuffer: 64 << 20 }));
const after = codeOnly(readFileSync(file, 'utf8'));
if (before === after) {
  console.log(`same code: ${file} (${after.length} code characters) vs ${rev}`);
  process.exit(0);
}
let k = 0;
while (k < before.length && before[k] === after[k]) k++;
console.log(`CODE DIFFERS: ${file} vs ${rev} at code character ${k}`);
console.log(`  ${rev}: …${before.slice(Math.max(0, k - 40), k + 40)}…`);
console.log(`  work: …${after.slice(Math.max(0, k - 40), k + 40)}…`);
process.exit(1);
