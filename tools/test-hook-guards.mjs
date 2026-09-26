#!/usr/bin/env node
// test-hook-guards.mjs — самопроверка стража tools/hooks/no-backslash-heredoc.mjs (EXP-0002).
//   node tools/test-hook-guards.mjs     # из корня репозитория; код 0 — все случаи как ожидалось, 1 — нет
// События PreToolUse собираются в JS, чтобы ни одна оболочка не тронула слэш. Случаи — по набору стража KUMM
// (2026-09-18), включая три формы, которые первая версия того стража пропускала.
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const HOOK = process.env.HOOK_UNDER_TEST || resolve(process.cwd(), 'tools/hooks/no-backslash-heredoc.mjs'); // HOOK_UNDER_TEST — a mutant, to prove the suite red
const BS = String.fromCharCode(92), NL = String.fromCharCode(10), TAB = String.fromCharCode(9);
let bad = 0, total = 0;
const ev = (command, tool = 'Bash') => JSON.stringify({ hook_event_name: 'PreToolUse', tool_name: tool, tool_input: { command } });
const hookCase = (name, input, want) => {
  total++;
  const got = spawnSync(process.execPath, [HOOK], { input, encoding: 'utf8' }).status;
  if (got !== want) bad++;
  console.log(`${got === want ? 'ok  ' : 'FAIL'} ${got} (want ${want}) — ${name}`);
};

// refused: a backslash in a heredoc body
hookCase("<<'EOF', path in body", ev("node - <<'EOF'" + NL + "const p = 'D:" + BS + BS + "Android';" + NL + 'EOF'), 2);
hookCase('<<EOF, double slash in body', ev('cat > x <<EOF' + NL + 'a' + BS + BS + 'b' + NL + 'EOF'), 2);
hookCase('<<-END, tab-indented end', ev('cat <<-END' + NL + TAB + 'C:' + BS + 'x' + NL + TAB + 'END'), 2);
hookCase('<<' + BS + 'EOF', ev('cat > x <<' + BS + 'EOF' + NL + 'C:' + BS + 'probe' + NL + 'EOF'), 2);
hookCase("<<'END.'", ev("cat > x <<'END.'" + NL + 'C:' + BS + 'probe' + NL + 'END.'), 2);
hookCase("<<'my-eof'", ev("cat > x <<'my-eof'" + NL + 'C:' + BS + 'probe' + NL + 'my-eof'), 2);
hookCase('second heredoc carries the slash', ev("cat > a <<'A'" + NL + 'clean' + NL + 'A' + NL + "cat > b <<'B'" + NL + 'x' + BS + 'y' + NL + 'B'), 2);
// passed
hookCase('heredoc without a slash (a commit message)', ev("git commit -F - <<'EOF'" + NL + 'docs: text' + NL + 'EOF'), 0);
hookCase('slash outside any heredoc', ev('ls C:' + BS + 'x'), 0);
hookCase('slash after the heredoc closed', ev("cat <<'EOF'" + NL + 'ok' + NL + 'EOF' + NL + 'echo a' + BS + 'b'), 0);
hookCase('not the Bash tool', ev("cat <<'EOF'" + NL + 'a' + BS + 'b' + NL + 'EOF', 'PowerShell'), 0);
hookCase('arithmetic shift, no slash', ev('echo $((1<<3))'), 0);
hookCase('broken JSON — fail-open', 'not json', 0);
hookCase('empty stdin — fail-open', '', 0);

console.log(`${total - bad}/${total} as expected`);
process.exit(bad ? 1 : 0);
