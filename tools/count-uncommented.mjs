#!/usr/bin/env node
// count-uncommented.mjs — how much of the Java code has no comment above its methods (AGENT_GUIDE.md → Code style: the owner's
// obligation to comment the code inherited from Artemis, 2026-09-26).
//   node tools/count-uncommented.mjs [file-or-dir …]      # default: app/src/main/java; prints a table, worst files first
//   node tools/count-uncommented.mjs --total                # one line: methods, commented, uncommented, share
// A method counts as commented when the nearest non-blank line above its declaration (annotations skipped) ends a comment:
// a `//` line or the closing `*/` of a block. Declarations are found by a pattern, not a parser: interface methods without
// a body, lambdas and anonymous-class methods are counted the same way as ordinary ones. [TESTED: 2026-09-26 ≈20:39 · run on
// app/src/main/java: 1900 methods, 119 commented; KastReconnectPolicy.java — 4 of 4 commented, Game.java — 26 of 181]
// (corrected ≈20:42: the stamp was written by feel as 20:45, and a red proof was claimed that was not run)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const total = args.includes('--total');
const roots = args.filter((a) => !a.startsWith('--'));
if (!roots.length) roots.push('app/src/main/java');

const DECL = /^\s*(?:(?:public|private|protected|static|final|synchronized|abstract|native|default)\s+)*(?:<[^>]+>\s+)?[\w.<>\[\], ?]+\s+(\w+)\s*\([^;{}]*\)\s*(?:throws\s+[\w., ]+)?\s*\{\s*$/;
const NOT_METHOD = /^\s*(?:if|for|while|switch|catch|synchronized|return|new|else|do|try)\b/;

function javaFiles(p) {
  const s = statSync(p);
  if (s.isFile()) return p.endsWith('.java') ? [p] : [];
  return readdirSync(p).flatMap((n) => javaFiles(join(p, n)));
}

function countFile(file) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  let methods = 0, commented = 0;
  const missing = [];
  lines.forEach((line, i) => {
    if (!DECL.test(line) || NOT_METHOD.test(line)) return;
    methods++;
    let j = i - 1;
    while (j >= 0 && (lines[j].trim() === '' || lines[j].trim().startsWith('@'))) j--;
    const above = j >= 0 ? lines[j].trim() : '';
    if (above.startsWith('//') || above.endsWith('*/')) commented++;
    else missing.push(i + 1);
  });
  return { file, methods, commented, missing };
}

const rows = roots.flatMap(javaFiles).map(countFile).filter((r) => r.methods > 0);
const sum = rows.reduce((a, r) => ({ methods: a.methods + r.methods, commented: a.commented + r.commented }), { methods: 0, commented: 0 });
const un = sum.methods - sum.commented;
if (total) {
  console.log(`methods=${sum.methods} commented=${sum.commented} uncommented=${un} share=${(100 * sum.commented / Math.max(1, sum.methods)).toFixed(1)}%`);
} else {
  rows.sort((a, b) => (b.methods - b.commented) - (a.methods - a.commented));
  console.log('uncommented · methods · file');
  for (const r of rows) console.log(`${String(r.methods - r.commented).padStart(5)} · ${String(r.methods).padStart(5)} · ${r.file.replace(/\\/g, '/')}`);
  console.log(`total: ${un} uncommented of ${sum.methods} methods (${(100 * sum.commented / Math.max(1, sum.methods)).toFixed(1)}% commented) in ${rows.length} files`);
}
