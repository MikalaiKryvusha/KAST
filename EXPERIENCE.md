# EXPERIENCE — the agent's accumulated experience

> The agent's growing log of lessons. **Externalized memory of *what works and what doesn't*** — so a
> fresh, context-less session (or an autonomous loop) never repeats a dead end. Consult it BEFORE a task;
> append to it AFTER a meaningful attempt (success **or** failure). Grep, don't scroll.
>
> **Tags live inline on every entry** (not in a central list) — so one grep finds the experiences directly:
> `grep '#loop' EXPERIENCE.md` · `grep -i '#context\|#build' EXPERIENCE.md` · `grep '❌' -A4 EXPERIENCE.md`
> · `grep 'EXP-0007' EXPERIENCE.md`. Reuse an existing tag where one fits (grep to see what's in use).
>
> **Entry format (keep it short and grep-friendly).** Newest on top. Every entry starts with a stable id,
> an ISO date, an outcome marker (`✅` / `❌` / `❌→✅`), and inline `#tags`:
>
> ```
> ### EXP-0001 · 2026-01-01 · ✅ · #tag #area
> class: <slug from the class list below — the UNIT OF RECURRENCE>
> **Context:** one line — what was being done.
> **Tried / did:** the approach, briefly.
> **Result:** ✅/❌ — what happened.
> **Lesson:** the reusable takeaway (the reason this entry exists).   → link: bugs/NN · ideas/NN · plans/NN
> **Repro:** the ready-to-run command/check that verifies or applies the lesson — a weak session
>   executes a pasted command reliably, an essay it won't act on. REQUIRED since 2.1: a lesson
>   with no Repro line is not accepted (field-proven: lessons with a Repro command get executed,
>   essay-lessons get read and ignored). If the lesson genuinely has no command, say what to
>   OBSERVE instead — but say it as an action.
> **Trigger:** for class-level lessons — the decision point that must invoke this lesson, as
>   "writing X → run Y" (the lesson names WHERE it applies, instead of hoping to be remembered).
> **Not for:** the lesson's validity range — where it does NOT apply. A documented lesson is still a
>   hypothesis; applied outside its range it kills good ideas.
> ```
>
> **A lesson that repeats is a lesson that failed as text.** When the same class recurs in NEW code
> after its entry was recorded, the journal has proven insufficient — the lesson MUST become
> executable (a linter rule, a guard, a gate), and the entry gains the line
> `mechanized: <the tool>`. Two strikes → a mechanism, never a third reminder.
>
> **The deadline is RUN, not remembered** (2.7, epic EL; origin issue #69 — a field audit of one
> project's journal: 14 of 15 failure classes recurred AFTER their lesson was written, five lessons
> written 6–17 times in different words, 5.8 % mechanized): `node .kaif/tools/kaif-experience-lint.mjs
> check` reads the `class:` field as the UNIT of recurrence and reddens on the SECOND failure entry of
> one class with no `mechanized:`, naming the class and both entries by id. Two fates clear it, both
> WRITTEN: name the guard in the entry (`mechanized: <the tool>`), or re-check the price once for the
> WHOLE class and declare it — `<!-- class-ok: <slug> — <why it is not cheaply possible> -->` (an empty
> declaration is itself a finding; the declared classes are printed on the summary line and that list
> only shrinks). A third record is never a fate. It also warns when
> `mechanized:` names a command this project does not contain, and when a slug is outside the list
> below; `--shrink EXP-NNNN` collapses a MECHANIZED entry to one line pointing at its guard (shows by
> default, `--yes` writes — the text itself stays in the git history). The command belongs in the
> closing ritual (`/end-chat-soft`).
>
> **The class list of this journal** — a CONTROLLED list, not a closed one: pick a slug from it, and
> when a lesson genuinely brings a new class, add the slug here in the same write (the linter warns
> about an unlisted slug, it never refuses). The starter list below is what a field audit had already
> measured (origin issue #69) — replace and grow it with your project's own classes.
>
> <!-- classes: question-already-answered, guard-not-proven-against-threat, shown-as-link,
>      claim-before-evidence, owner-decision-not-applied, text-in-agents-world,
>      etalon-from-dirty-tree, shell-lied, escaping-layer, twins-missed,
>      field-dropped-in-rebuild, line-endings -->
>
> | Class slug | The failure it names |
> |---|---|
> | `question-already-answered` | the owner is asked what his own past word, the goal doc or a run already decided |
> | `guard-not-proven-against-threat` | a guard shipped without being seen red on the threat it claims to stop |
> | `shown-as-link` | showing replaced by a link or a path instead of the thing itself |
> | `claim-before-evidence` | a claim written wider than the observation behind it |
> | `owner-decision-not-applied` | a decision the owner gave is recorded and not carried into the artifact |
> | `text-in-agents-world` | text written for the agent's own world instead of the owner's |
> | `etalon-from-dirty-tree` | a reference/etalon captured from a tree that was not clean |
> | `shell-lied` | the shell or the tool swallowed/rewrote what was passed to it |
> | `escaping-layer` | one escaping level lost between the tool and the file |
> | `twins-missed` | one of two layers/copies moved and the twin stayed behind |
> | `field-dropped-in-rebuild` | a field or section silently lost when an artifact was regenerated |
> | `line-endings` | a shell rewrite changed the line endings of a tracked file, so the whole file shows as changed |
>
> The `#tags` are **trigger-tags**: before a task, grep by the task's tags and QUOTE the relevant
> lessons in your report (id + one line) — or state "no relevant lessons". An unquoted recall is
> unverifiable; `/fable-judge` checks for this line.
>
> Skill: `/experience` (capture a lesson · recall relevant lessons).

## Entries

### EXP-0004 · 2026-09-26 · ❌→✅ · #i18n #strings #twins
class: twins-missed
**Context:** renaming the fork's identity in UI strings (Artemis → KAST), plan 03 step 4.
**Tried / did:** found the twins with `grep -rn 'Artemis Nior\|ClassicOldSong' app/src` — a search by TEXT.
**Result:** ❌ the F1 judge found two misses: `values-vi` phrased the same string differently ("Artemis Việt Hóa bởi ZeronX"),
and the neighbour key `summary_follow_update` said just "Artemis" in 5 locales. ✅ searched by KEY:
`grep -rn 'name="summary_software_update"\|name="summary_follow_update"' app/src/main/res/values*/strings.xml` → fixed 6 + 5.
**Lesson:** a translated string's twins are found by its resource KEY across all `values*/` folders, never by its text —
every locale words it differently.
**Repro:** `grep -rn 'name="<key>"' app/src/main/res/values*/strings.xml | grep -v '<expected word>'` → must print nothing.
**Trigger:** changing any user-visible string → run the key grep over all locales before committing.
**Not for:** strings marked `translatable="false"` (one copy only).
none-cheap: a per-key locale checker is a small script, but the identity rename is a one-off; if a second string sweep
misses a locale, write `tools/string-twins` then


### EXP-0003 · 2026-09-26 · ❌→✅ · #build #android-sdk #windows
class: shell-lied
**Context:** installing the Android SDK packages from PowerShell for Ф1 (plan 03, step 1).
**Tried / did:** `sdkmanager.bat --sdk_root=... 'platforms;android-36' 'ndk;27.0.12077973'` from cmdline-tools `16111833`.
**Result:** ❌ "Package platforms not found. Package android-36 not found" — cmd.exe splits `.bat` arguments on `;`, and in
this cmdline-tools release `sdkmanager` is only a deprecated shim over the new Android CLI. ✅ `android.exe sdk install
platforms/android-36 ndk/27.0.12077973 build-tools/35.0.0` — package names use `/`, and `android.exe` is a real exe (no cmd layer).
**Lesson:** with cmdline-tools ≥ 2026 use `android.exe sdk install|list`, names with `/`; never pass `;`-names through a `.bat`.
**Repro:** `D:\Android\Sdk\cmdline-tools\latest\bin\android.exe --sdk=D:\Android\Sdk sdk list` — lists installed packages in the `/` form.
**Trigger:** installing or updating any Android SDK package → `android.exe sdk install <name/version>`.
**Not for:** an old cmdline-tools (before the Android CLI), where `sdkmanager` with `;`-names still works if called from cmd itself.
subject-lesson

### EXP-0002 · 2026-09-26 · ❌→✅ · #build #properties #shell
class: escaping-layer
**Context:** writing `local.properties` (`sdk.dir`) from Git Bash.
**Tried / did:** `printf 'sdk.dir=D\\:\\\\Android\\\\Sdk\n' > local.properties`.
**Result:** ❌ the file got `sdk.dir=D\:\Android\Sdk` — one escaping level lost; Java properties would read `D:AndroidSdk`. ✅ the
Write tool with the literal text `sdk.dir=D\:\\Android\\Sdk`.
**Lesson:** a file whose content has backslashes is written by the file tool, not by the shell (AGENT_GUIDE → text travels through files).
**Repro:** `cat local.properties` must show `sdk.dir=D\:\\Android\\Sdk` (two backslashes between path parts).
**Trigger:** writing any file containing `\` → Write tool, then read the file back.
**Not for:** content without backslashes or other escape characters.
**Recurred:** 2026-09-26, minutes after this entry — `sed -i "s#...C:\\\\Program Files...#"` on a build script produced
`C:Program FilesMicrosoft...`; caught by reading the file back. Third time the same day — `sed -i 's#…F:\\kast-maintenance\\…#…#'` on STATUS.md
matched nothing (caught by grepping the line back). Two strikes → candidate guard: a PreToolUse hook that
refuses a Bash `sed -i`/`printf >`/`echo >` whose text carries `\\` (proposal pending, not wired).
none-cheap: the guard is a PreToolUse hook in the Claude Code settings, and the agent may not change its own settings (auto-mode classifier: Self-Modification, 2026-09-26) — wiring it is the owner's call; until then the Trigger line + read-back is the defence
**Recurred (4th):** 2026-09-26 ≈16:10 — a `node - <<'EOF'` script with `'$env:…; python D:\\Android\\…'` arrived as
`D:\Android\…` and died on `\A` (Invalid Unicode escape); caught by the error, rewritten through the Write tool.
**Guard written:** `tools/hooks/no-backslash-heredoc.mjs` (the logic of the owner's KUMM guard), self-test
`node tools/test-hook-guards.mjs` 14/14, proven red on a pass-all mutant (7/14, exit 1). Wiring: the owner runs
`F:\kast-maintenance\kast_wire_hooks.cmd` (plan 05, step 2); after the session restart the entry is marked as guarded by that hook.

### EXP-0005 · 2026-09-26 · ❌→✅ · #shell #line-endings #windows
class: line-endings
**Context:** flipping one comment marker in `StreamSettings.java` (an upstream file stored with CRLF in git) by `sed -i`.
**Tried / did:** `sed -i '778s/\[NOT-TESTED\]/[TESTED …]/' StreamSettings.java` from Git Bash.
**Result:** ❌ `git diff --stat` showed the whole file rewritten (2213 lines): `sed -i` saved it with LF, while the blob
has CRLF. ✅ restored with node — every `\r?\n` → CRLF — and the diff fell back to the real 107 lines.
**Lesson:** after any shell rewrite of a file, the diff size is the check: a whole-file diff means the line endings moved,
not the text; edit upstream files with the Edit tool, which keeps the file's endings.
**Repro:** `git diff --stat <file>` right after the edit — the count must match the lines you touched.
**Trigger:** `sed -i` / `awk > file` / a node rewrite on a tracked file → `git diff --stat <file>` before anything else.
**Not for:** files the agent created itself with LF (`core.autocrlf=true` normalises them on add).
none-cheap: a hook sees the command, not the endings of the file it will touch; the one-command check in Trigger catches it before a commit
