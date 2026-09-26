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
// GAP: `<<<` (here-string) не судит; тело, собранное переменной, не видит; слэш в АРГУМЕНТЕ команды (`sed -i "…"`,
// `printf`) не судит; `<<` внутри строки или арифметики при слэше ниже в команде даёт ложный отказ — выход тот же, Write.
// Проверка: `node tools/test-hook-guards.mjs` из корня репозитория.
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

try {
  const raw = readFileSync(0, 'utf8').replace(/^\uFEFF/, '');
  const event = JSON.parse(raw || '{}');
  if (event.tool_name !== 'Bash') process.exit(0);
  const hits = heredocBodiesWithBackslash((event.tool_input && event.tool_input.command) || '');
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
