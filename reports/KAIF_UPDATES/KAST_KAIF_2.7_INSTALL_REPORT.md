# KAST — KAIF install field report (build HEAD 83400e6, marker 2.7)

**Delivered upstream:** https://github.com/MikalaiKryvusha/KAIF/issues/107

Target: fresh fork of Artemis (`ClassicOldSong/moonlight-android` @ `c5cf27f4`, Android/Java + C via NDK),
public repo `MikalaiKryvusha/KAST`. Agent: Claude Opus 5.5 (1M context), Claude Code in VS Code, Windows 11.
The install was run from a session opened in ANOTHER KAIF project (KAGO), on the owner's order
"kaif разворачиваем 2.8, бери его из проекта KAIF - там версия почти готова".

## 1. Chronology with numbers (2026-09-26, +03:00)

- 09:46 — snapshot of `dist/{kaif-manifest.json, KAIF-CORE.mjs, KAIF-CORE-BUNDLE.md, KAIF.md}` taken with
  `git show HEAD:dist/…` from the KAIF repo (HEAD `83400e6`; `git diff --quiet HEAD -- dist` → clean). The KAIF
  working tree had a live session with uncommitted files, so the snapshot, not the tree, was the source.
- 09:48:39 — `KAIF-LOADER.mjs` written verbatim (awk over the `FILE:` block, 149 lines).
- 09:48:46 — `node KAIF-LOADER.mjs --lang ru --source <snapshot>` → exit 0, "machinery 2.7 verified"
  (sha256 ok ×2), 37 skills, 8 owner docs templated, 10 adaptation items. Tracked files of the host repo
  changed by the installer: 1 (`.gitignore`); the Artemis `README.md` untouched.
- 09:49–10:02 — adaptation: 8 of 10 checkpoints recorded before this report (`grep -c ^KAIF-ADAPT`); 10 commits of
  owner documents (verbatim-first rule 18 kept for 5 ideas; the owner kept adding ideas mid-install).
- voice-lint over owner docs (`GOAL.md`, `MASTER_PLAN.md`, `STATUS.md`, `ideas/01–05`): 1 finding total
  («здесь», idea 04) → fixed → 0.

## 2. Friction and rakes

1. **An unreleased version cannot be deployed under its own name.** The owner asked for 2.8; the HEAD build's
   manifest says `"version": "2.7"` (version.json is bumped only by the release ritual), so the marker records
   `2.7` although the content is 2.8-pre. Nothing in the marker says WHICH build it is — a later
   `/kaif-update` to the real 2.8 will treat this tree as plain 2.7. Improvement: let `--source` installs stamp
   the source identity (e.g. `"build": "83400e6"` or `"2.7+83400e6"`) into `.kaif/kaif.json`.
2. **Placeholder item names only `.claude/…` skill paths**, while the same placeholders sit in the four mirrors
   (`.agents/.cline/.grok/.roo`, 20 files with hits). I filled all mirrors by hand; the checkpoint then printed
   "re-synced 175 system skill copies from the canon" — the manual mirror work was unnecessary. Say in the item
   that mirrors re-sync at the checkpoint.
3. **voice-lint "written past the portrait" fired on the untouched TEMPLATE** (`GOAL.md` mtime 09:48:46 = install
   time < portrait load 09:55:52) after my own write had failed for a harness reason. The message reads as if the
   agent wrote without the portrait. Suggestion: name the case "file unchanged since install — template, not your
   text".
4. **owner-voice item: which portrait edition?** The owner has a private full portrait (KAGO, 780 KB) and the
   public edition (KAIF repo, 87 KB). The item says "install it" without guidance for a PUBLIC target; I took the
   public edition and still gitignored it per the item. A line on "prefer the public edition for public repos"
   would remove the doubt.

## 3. What confused a cold agent (top 3)

1. Deploying "the almost-ready next version" — no canonical flag or doc path; decided: snapshot HEAD `dist/` via
   `git show` + `--source`, report the 2.7 marker honestly.
2. Whether skill mirrors need manual placeholder fills (they don't — see 2.2).
3. The "written past the portrait" witness on a template file (see 2.3).

## 4. Final state and judge verdict

Self-judge pass by the fable-judge checklist (same agent, not an independent instance — said plainly):

- Placeholder scan over `AGENT_GUIDE.md` + all skill dirs + `.kaif/spheres`: 0 hits (`grep -rn … | wc -l` → 0).
- Checkpoints: 8/10 before this report; `field-report` and `verify` follow in the same move.
- `.kaif/kaif.json`: version 2.7, sphere programming, projectName KAST, 5 agents, tracking origin.
- Owner docs voice-lint: 0 findings on 249 lines (GOAL/MASTER_PLAN/STATUS) and 0 on ideas 01–05.
- Verdict: install **CONFIRMED** working; the version label is **WEAKENED** (content 2.8-pre under a 2.7 marker —
  friction 2.1).
