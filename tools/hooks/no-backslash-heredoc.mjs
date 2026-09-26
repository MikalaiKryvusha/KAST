#!/usr/bin/env node
// no-backslash-heredoc.mjs — хук PreToolUse для инструмента Bash: не пускает heredoc, в теле которого есть обратный слэш.
//
// Зачем: на этой машине инструмент Bash съедает обратный слэш в теле heredoc — `\\` схлопывается в `\`, путь Windows
// пишется битым, и закавыченный `<<'EOF'` не спасает. В KAST это EXP-0002: 2026-09-26 четыре раза за день
// (local.properties, скрипт сборки, STATUS.md, скрипт node с путём `D:\Android\...`). Два промаха одного класса —
// механизм, а не третье напоминание. Выход дешёвый: файл пишется инструментом Write, а слэш внутри генерируемого кода
// строится как `String.fromCharCode(92)`.
// Логика — по образцу стража соседнего проекта владельца KUMM (`tools/hooks/no-backslash-heredoc.mjs`, 2026-09-18).
//
// Контракт хука Claude Code: событие приходит JSON-ом на stdin (`tool_name`, `tool_input.command`); код 2 — вызов
// отклонён, stderr уходит модели; код 0 — пропустить. Любая своя ошибка → код 0: сломанный страж не запирает весь Bash.
//
// Проверка: `node tools/test-hook-guards.mjs` из корня репозитория.
//
// @guard no-backslash-heredoc
// THREAT:         the agent writes a file through a Bash heredoc whose body carries a backslash; the Bash tool collapses
//                 it silently, exit 0 (EXPERIENCE.md EXP-0002, four times on 2026-09-26)
// PROVED-AGAINST: `node tools/test-hook-guards.mjs` — 7 heredoc forms with a slash refused (exit 2), 7 controls passed;
//                 a pass-all mutant (HOOK_UNDER_TEST) goes 7/14, exit 1
// GAP:            here-strings (`<<<`), a body built from a variable, a backslash in a command ARGUMENT (`sed -i "…"`,
//                 `printf`) are not judged; `<<` inside a string or arithmetic with a slash later in the command is a
//                 false refusal (the way out is the same: the Write tool)
// ON-REAL-PATH:   KAST `.claude/settings.json` (PreToolUse, matcher Bash), wired 2026-09-26 by the owner; live: a heredoc
//                 with `C:\probe\guard-test` refused, a clean heredoc passed
import { readFileSync } from 'node:fs';

const BS = String.fromCharCode(92);
// Разделитель heredoc — слово оболочки в одинарных кавычках, в двойных или без кавычек (`<<\EOF` — разделитель EOF).
const OPENER = /(?<!<)<<(-?)[ \t]*(?:'([^']*)'|"([^"]*)"|((?:\\.|[^\s;&|<>()'"])+))/g;
const delimOf = (m) => (m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4].replace(/\\(.)/g, '$1'));

export function heredocBodiesWithBackslash(command) {
  const pending = [];   // открытые heredoc: тела идут подряд, в порядке открытия
  const hits = [];
  for (const line of command.split(/\r?\n/)) {
    if (pending.length) {
      const cur = pending[0];
      const probe = cur.dash ? line.replace(/^\t+/, '') : line;
      if (probe === cur.delim) { pending.shift(); continue; }
      if (line.includes(BS)) hits.push({ delim: cur.delim, line });
      continue;
    }
    for (const m of line.matchAll(OPENER)) pending.push({ dash: m[1] === '-', delim: delimOf(m) });
  }
  return hits;
}

// Second check of the same Bash hook (EXPERIENCE.md EXP-0006, class shell-lied, 2026-09-26): a GATE piped into
// tail/cut/head before `&& git commit|push` \u2014 the pipe's exit code is the last command's, so a red gate never stops the
// commit (bug 06: a voice-lint finding was pushed). One line of the command is judged at a time.
// @guard gate-piped-into-commit
// THREAT:         a red gate (a KAIF lint, review.mjs --check, gradlew, a self-test) is piped and chained into a commit or push
// PROVED-AGAINST: `node tools/test-hook-guards.mjs` part B \u2014 piped gate + commit refused, gate alone + `rc` check passed;
//                 the version without this check lets the piped form through (mutant)
// GAP:            a gate whose name is not in GATE; a pipe followed by `;` instead of `&&`; a commit in a later tool call
// ON-REAL-PATH:   KAST .claude/settings.json (the same PreToolUse entry as the heredoc check), 2026-09-26 17:4x: a live
//                 voice-lint | tail && git push --dry-run was refused by the harness before it ran
const GATE = /(kaif-[\w-]+\.mjs|review\.mjs\b[^|\n]*--check|gradlew(\.bat)?\b|test-hook-guards\.mjs|kaif-core\.mjs\s+check)/;
export function gatePipedIntoCommit(command) {
  for (const line of command.split(/\r?\n/)) {
    const g = line.search(GATE);
    if (g < 0) continue;
    const rest = line.slice(g);
    // the gate's own command ends at the first `;`, `&&` or `||`: a pipe of a LATER command (`git diff … | tail`) is not
    // the gate's (a false refusal 2026-09-26 20:35)
    const own = rest.search(/;|&&|\|\|/);
    const segment = own < 0 ? rest : rest.slice(0, own);
    const pipe = segment.search(/[^|]\|[^|]/);
    if (pipe < 0) continue;
    if (/&&\s*git\s+(commit|push)\b/.test(rest.slice(pipe))) return line.trim();
  }
  return null;
}

// Third check of the same Bash hook (EXPERIENCE.md EXP-0007, class shell-lied, 2026-09-26): an inline script in
// DOUBLE quotes (`node -e "\u2026"`, `python -c "\u2026"`) that carries a backtick \u2014 bash runs the backticked text as a command
// before the script starts (19:53: markdown `code` in a node -e string ran tools/make-launcher-icon.mjs and the script
// died). One line of the command is judged at a time; single-quoted scripts pass.
// @guard backtick-in-inline-script
// THREAT:         a node -e / python -c script in double quotes with a backtick: bash substitutes it \u2014 a command runs,
//                 the text gets a hole, exit may be 0 (EXP-0007; AGENT_GUIDE \u2192 text hygiene, face 2)
// PROVED-AGAINST: `node tools/test-hook-guards.mjs` part C \u2014 the 19:53 form refused, single quotes and a backtick-free
//                 script passed; the version without this check lets the 19:53 form through (mutant)
// GAP:            a script split over lines with the backtick on a later line; perl/ruby one-liners; `$(\u2026)` inside
//                 the double quotes (the same class, not judged)
// ON-REAL-PATH:   KAST .claude/settings.json (the same PreToolUse entry), 2026-09-26 ≈19:58: a live
//                 node -e "const t = 'a `echo hi` b'; …" was refused by the harness before it ran
const INLINE = /\b(node|python3?|py)\s+(-e|--eval|-c)\s+"/g;
export function backtickInInlineScript(command) {
  for (const line of command.split(/\r?\n/)) {
    INLINE.lastIndex = 0;
    let m;
    while ((m = INLINE.exec(line))) {
      let i = m.index + m[0].length;
      for (; i < line.length; i++) {
        if (line[i] === '\\') { i++; continue; }
        if (line[i] === '"') break;
        if (line[i] === '`') return line.trim();
      }
    }
  }
  return null;
}

try {
  const raw = readFileSync(0, 'utf8').replace(/^\uFEFF/, '');
  const event = JSON.parse(raw || '{}');
  if (event.tool_name !== 'Bash') process.exit(0);
  const command = (event.tool_input && event.tool_input.command) || '';
  const ticked = backtickInInlineScript(command);
  if (ticked) {
    process.stderr.write(
      'KAST guard (tools/hooks/no-backslash-heredoc.mjs, backtick-in-inline-script): an inline script in double quotes ' +
      'carries a backtick — bash runs the backticked text as a command before the script starts (EXPERIENCE.md ' +
      'EXP-0007). Line: ' + ticked.slice(0, 140) + '\n' +
      'Do this instead: write the script to a file with the Write tool and run `node <file>`.\n');
    process.exit(2);
  }
  const piped = gatePipedIntoCommit(command);
  if (piped) {
    process.stderr.write(
      'KAST guard (tools/hooks/no-backslash-heredoc.mjs, gate-piped-into-commit): a gate is piped and then chained into a ' +
      'commit or push \u2014 the pipe returns the exit code of its last command, so a red gate would not stop the commit ' +
      '(EXPERIENCE.md EXP-0006). Line: ' + piped.slice(0, 140) + '\n' +
      'Do this instead: run the gate alone \u2014 `<gate> > /dev/null 2>&1; rc=$?` \u2014 then `[ $rc -eq 0 ] && git commit \u2026`.\n');
    process.exit(2);
  }
  const hits = heredocBodiesWithBackslash(command);
  if (!hits.length) process.exit(0);
  process.stderr.write(
    'KAST guard (tools/hooks/no-backslash-heredoc.mjs): the heredoc body (<<' + hits[0].delim + ') contains a backslash, ' +
    'and the Bash tool on this machine collapses it silently (EXPERIENCE.md EXP-0002). First such line: ' +
    hits[0].line.trim().slice(0, 120) + '\n' +
    'Do this instead: write the file with the Write tool; inside generated code build the backslash as ' +
    'String.fromCharCode(92). Lines with a backslash in the body: ' + hits.length + '.\n');
  process.exit(2);
} catch {
  process.exit(0);
}
