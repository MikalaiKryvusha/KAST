# KAIF bug (duplicate of origin #94): refresh timer and STATUS guard read project files from the session's cwd

kaif-fp: .kaif/hooks/prompt-refresh-timer.mjs + stop-status-guard.mjs :: hook-resolves-project-file-from-session-cwd :: v2.8
**Delivered upstream:** https://github.com/MikalaiKryvusha/KAIF/issues/94 (already open, filed 2026-09-23 by another
deployment; KAST adds a 2.8 confirmation and its local fix as a comment)
**Status:** 🔧 fixed locally 2026-09-26; stays open until a `/kaif-update` ships the upstream fix
**Severity:** S2 — a false refresh order on every prompt; the STATUS guard switched off silently
**Dedup attestation:** `ls bugs/KAIF/` → only `01_temp_sandboxes_fill_the_system_drive.md` (other class);
`gh issue list --repo MikalaiKryvusha/KAIF --state all --search` for "hook cwd", "refresh marker subfolder",
"CLAUDE_PROJECT_DIR", "project root hook", "status guard silent" → #94 matches exactly; no new issue filed.

## Expected per canon
The timer reads the age of `.kaif/refresh-marker.json` of the PROJECT (`AGENT_GUIDE.md` → "Context refresh"); the
STATUS guard watches the project's `STATUS.md`.

## Got in the field (2026-09-26)
After a `cd` into `assets/logo` the owner's next prompt came back with «KAIF context refresh (timer: no refresh
witness found this session …)», while the marker in the root was 12 min old: the hook joins `input.cwd` with the
marker path, and the harness's cwd follows the agent's `cd`.

## Local remediation
`projectRoot(cwd)` in both hooks: `$CLAUDE_PROJECT_DIR` when it holds `.kaif/`, else the nearest ancestor of `cwd` with
`.kaif/kaif.json`, else `cwd`. Marked `LOCAL FIX (KAST bugs/KAIF/02)` in both files.
Proof: the timer from the subfolder is silent with a fresh marker, and silent with `CLAUDE_PROJECT_DIR` set and `cwd`
outside the repo; the 2.8 file prints the order (mutant). STATUS guard on a throwaway repo (STATUS 5 h old, dirty
tree, event `cwd` = `sub/dir`): the 2.8 file is silent, the fixed one blocks.
Practice until the upstream fix: run Bash with absolute paths or `git -C`, never leave the shell in a subfolder.
