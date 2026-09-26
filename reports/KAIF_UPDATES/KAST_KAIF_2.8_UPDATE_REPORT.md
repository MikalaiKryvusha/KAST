# KAST — KAIF 2.7 → 2.8 update report (2026-09-26)

**Delivered upstream:** https://github.com/MikalaiKryvusha/KAIF/issues/108

Project: KAST (public Android fork of Artemis; language ru; tracking origin). Deployed the same morning from the KAIF
source tree at HEAD `83400e6` (2.8 content before the release, stamped `2.7`). Route: `core-update` with a sandbox
rehearsal, both runs fed the same release assets (`gh release download v2.8 … -D D:\Android\kaif-2.8-assets`).

## 1. Chronology with numbers

| Step | Command | Output |
|---|---|---|
| Sandbox copy | `git -c core.autocrlf=false archive HEAD \| tar -x -C D:\Android\kaif-sbx-kast`, `git init`, `core.longpaths true` | base commit `74b8117` |
| Sandbox update | `node .kaif/kaif-core.mjs update --source D:\Android\kaif-2.8-assets` | `EXIT=0`; task header: "the framework changed 8 of 103 shipped files in this interval; mechanical pass done: 6 files replaced, 2 modules merged in-place, 0 added, 95 kept" |
| Live update | same + `--rehearsal D:\Android\kaif-sbx-kast\.kaif\last-update.json` | `EXIT=0`; `rehearsal verdicts loaded … (0 file(s))`; 179 `kept existing` lines |
| Live vs sandbox | `cmp` over the 11 changed files | 10 byte-identical; `.kaif/kaif.json` differs only in `history[0].date` (13:36:32 vs 13:36:01) |
| withdrawn-phrases | `git grep -n -F -e "DELIVERY:" -e "SYSTEMS_REGISTRY" -e "delivery metric"` | 0 hits |
| stale-claims | `checkpoint stale-claims` | "scan ran clean (executed by the checkpoint itself)" |
| closing-gates, first measure | task item | experience-lint STOPS (2 × `no-mechanization-field`), attribution-lint STOPS (3 NEW), budgets open |
| closing-gates, after fixes | `kaif-experience-lint.mjs check` · `kaif-attribution-lint.mjs check` · `check --gate-budgets` | `0 findings` · `new 0` · open |
| recheck | `node .kaif/kaif-core.mjs check` | first run: `8 mirror copies lag the canon`; after `sync` (`re-synced 175 system skill copies`): `manifest satisfied: 103 files + 152 agent artifacts present` |

## 2. Rakes

**R1 — `policy-changes` lists as NEW six rules that the deployment already had (severity: low; cost: one false owner
question).** The interval is computed from the `2.7` stamp, but this deployment's content was 2.8 before the release.
Evidence — each rule's marker phrase counted in the PRE-update tree (`git show HEAD:<file>` for `AGENT_GUIDE.md`,
`BUG_FIXING_FRAMEWORK.md`, `TESTING_FRAMEWORK.md`, `.kaif/kaif-core.mjs`): `The owner's word mid-turn` 1 · `The owner's
debt comes first` 1 · `Hunt the reproduction` 1 · `gate-budgets` 9 · `archives` 12 · `--call` 1. Repro: deploy from a
pre-release source (stamp N, content N+1), then `update` to the N+1 release — the task still says "This interval
CHANGES RULES of your previous version". Wish W2.

**R2 — deploy-time fills of the loop skills keep a COPY of a machine fact that goes stale (severity: low; cost: 3 canon
+ 12 mirror files edited by hand).** `autoloop`, `dayloop`, `nightloop` carry the harness command filled at deploy:
`the phone over adb (C:/adb/adb.exe, logcat)`. Five hours later the project switched to `D:/Android/Sdk/platform-tools/adb.exe`
(the old adb was 1.0.32 and cannot `adb pair`); 2.8 moved such facts from the guide to `HOUSE_RULES.md`, but the loop
skills still inline them — a twin the house-rules move does not reach. Found by `git grep -n "C:.adb.adb\.exe"` (15
files). Wish W1.

**R3 — a machine fact in the guide became a standing falsehood the same day (severity: low).** The deployed
`AGENT_GUIDE.md` → Build said "Android SDK and NDK are NOT installed yet"; by the update they were installed. The 2.8
news "PROJECT FACTS MOVED FROM THE GUIDE TO THE HOUSE-RULES FILE" is exactly the cure; applied by hand (pointer line
in the guide, facts in `HOUSE_RULES.md` → "Tools of this project"). No framework change needed.

## 3. Exercised vs NOT

- Exercised: sandbox rehearsal with receipt hand-over; live pass; byte comparison; task items withdrawn-phrases,
  stale-claims, closing-gates, recheck, review-news, judge, field-report; `sync`; the attribution and experience linters
  on real findings; the independent judge (section 5). `policy-changes` is put in front of the owner — the six rules
  were already present in this tree (R1); his choice is recorded when he answers.
- Hand edits beyond the mechanical pass (all verified by the judge): `AGENT_GUIDE.md` Build block ids (line 520 —
  judge finding 1, unlisted in my first list), Build environment paragraph → pointer, Test harness text, checklist
  steps 11–12; loop-skill harness line (R2); `.kaif/deploy-manifest.json` → `fills` `<BUILD_COMMAND>` and
  `<TEST_HARNESS>` rewritten to the current facts AFTER the judge (finding 5) — `diff` against the sandbox manifest
  shows exactly those two lines; a stray `grep.exe.stackdump` (msys crash dump, finding 4) deleted, not committed.
- The voice core: the judge measured it — the local `AUTHOR_STYLOMETRY.md` already equals the 2.8 snapshot pin.
- NOT exercised: the owner's contour page (no interviews in this project yet); `--call`; hooks module (not wired).

## 4. Wishes for the next version (by cost, descending)

- **W1** — loop skills point at `HOUSE_RULES.md` → "Tools"/"Stands" instead of inlining the deploy-time harness command
  (removes the R2 twin class).
- **W2** — compute `policy-changes` against the deployed CONTENT (the deploy manifest's source commit) rather than the
  version stamp, or say "(already present in your tree)" next to each rule found there (R1).

## 5. Final state and the judge verdict

`.kaif/kaif.json`: `"version": "2.8"`, `"released": "2026-09-26"`, `history` 2.7 → 2.8 `core-update`.

Judge verdict (independent pass, clean context) — quoted verbatim below.

> VERDICT: VERIFIED WITH CAVEATS
>
> Independent /fable-judge pass over the uncommitted KAIF 2.7 -> 2.8 update of KAST (working tree vs HEAD 0d2b7b4b), 2026-09-26 13:38-13:45 +03:00. Nothing in the repository was edited by the judge.
>
> ## Claims
>
> 1. VERIFIED. `git diff HEAD -- .kaif/kaif.json` plus `cat` of both versions: version 2.7 -> 2.8, released 2026-09-18 -> 2026-09-26, new `history: [{from 2.7, to 2.8, route core-update, date 2026-09-26T13:36:32+03:00}]`. tracking "origin", origin URL, sphere "programming", agents (5), language "ru", canonArtifacts [], projectName "KAST" are unchanged vs HEAD. The live `.kaif/kaif.json` differs from the sandbox copy only in the history date (13:36:32 vs 13:36:01).
> 2. VERIFIED, with one unlisted edit (finding 1). `git diff --stat HEAD`: 41 files, +266/-103. `git diff HEAD -- EXPERIENCE.md MASTER_PLAN.md ideas/ researches/ STATUS.md PROJECT_STRUCTURE_EXTERNAL_MAP.md` shows exactly the edits the agent listed: (a) EXPERIENCE +`subject-lesson` (EXP-0003) and +`none-cheap: ...` (EXP-0002); (b) MASTER_PLAN:96 `attribution-ok` marker, ideas/01 +quote line, whose quote «берем тот мобильный клиент, который активно развивают» really is in MASTER_PLAN.md:105 (decision log, unchanged), researches/01:112 `attribution-ok` marker; (c) STATUS: the one app-id pool item ticked. It is backed by app/build.gradle:102-105/144-147 and commit 1ba2dfaa; (d) researches/02 B10 prefix; (e) PEM line 14 ids. `git diff --stat HEAD -- app/ GOAL.md HOUSE_RULES.md bugs/ plans/ interviews/` is empty. The sandbox's own diff (`git -C /d/Android/kaif-sbx-kast diff --stat`) touches only framework files plus AGENT_GUIDE.md (2 lines), so the mechanical pass changed no owner content. Compared with the sandbox, the AGENT_GUIDE.md hand edits are items 11-12, the Build environment paragraph -> pointer, and the Test harness placeholder -> KAST text. There is also an UNLISTED edit on line 520 (finding 1). The sandbox base tree equals KAST HEAD (`git ls-tree -r` compared) except for AGENTS.md (same bytes as CLAUDE.md, unchanged) and the moonlight-common-c submodule gitlink. Both are immaterial.
> 3. VERIFIED. `cmp` against D:/Android/kaif-sbx-kast/<path>: all 7 files are IDENTICAL (.kaif/kaif-core.mjs, .kaif/KAIF_REFERENCE.md, .claude/skills/report-bug/SKILL.md, .kaif/tools/contour/review.mjs, .kaif/tools/kaif-testrun-lint.mjs, .kaif/tools/kaif-voice-lint.mjs, .kaif/hooks/pretool-owner-word.mjs), and so are .claude/skills/end-chat-soft/SKILL.md and .kaif/deploy-manifest.json. Extra check: `sha256sum .kaif/kaif-core.mjs` = d424900c...10cd = the pin in the release's kaif-manifest.json, and `.kaif/install/KAIF-CORE-BUNDLE.md` is byte-identical to the release asset.
> 4. VERIFIED. `git diff HEAD -- AGENT_GUIDE.md .claude/skills/end-chat-soft/SKILL.md` contains the sandbox's upstream delta: the `PARKED:` line in "## Backlog & the DONE tag" (the only AGENT_GUIDE module whose sha changed in the manifest) and the two ENTRY COST lines in end-chat-soft Step 5. Both new lines exist in the release bundle, and the old "→ switch." wording does not (grep -c = 1, 1, 0).
> 5. VERIFIED (with a warning, finding 3). `node .kaif/kaif-core.mjs check` rc=0: "✅ manifest satisfied: 103 files + 152 agent artifacts present", with no mirror-drift line. It also prints "⚠ undelivered KAIF field report: reports/KAIF_UPDATES/KAST_KAIF_2.8_UPDATE_REPORT.md". `node .kaif/tools/kaif-experience-lint.mjs check` rc=0: "✅ experience-lint OK — EXPERIENCE.md, 0 findings". `node .kaif/tools/kaif-attribution-lint.mjs check` rc=0: "✅ attribution-lint OK — 43 file(s) scanned, new 0". No attribution baseline was written, so the findings were fixed rather than baselined. `node .kaif/kaif-core.mjs check --gate-budgets` rc=0, same output. `.kaif/budget-baseline.json` has `docs: {}` and its mtime stayed at 13:37:36, so the judge's run did not rewrite it.
> 6. VERIFIED. `grep -n "KAIF-UPDATE:" KAIF_UPDATE_TASK.md` shows lines 61-65: withdrawn-phrases, stale-claims, closing-gates, recheck and review-news are all "done". `git grep -n -F -e "DELIVERY:" -e "SYSTEMS_REGISTRY" -e "delivery metric"` rc=1 (0 hits). A case-insensitive git grep for "delivery metric"/"systems registry" also finds nothing. The only filesystem hits are in the ignored .kaif/install bundle and the task file itself. policy-changes, judge and field-report are NOT yet recorded (finding 2).
> 7. VERIFIED. A loop over all 37 canon skills compared each one with `cmp -s` against its .agents/.grok/.cline SKILL.md: 111/111 identical. For .roo/commands/*.md, `diff` against the canon shows the single line `< name: <skill>` (the Roo frontmatter transform) for all 37 files, and nothing else. `git diff HEAD` of the autoloop mirrors shows the same adb-line change as the canon (`the real device over adb (D:/Android/Sdk/platform-tools/adb.exe, logcat; HOUSE_RULES.md → Stands)`). That path exists on disk and matches HOUSE_RULES.md §3/§5.
>
> ## Findings (5)
>
> 1. (low; outside the enumerated list) AGENT_GUIDE.md:520 (Build code block) was hand-edited: `(id com.limelight.noirdebug, label "Diana")` -> `(id com.limelight.kastdebug, label "KAST Debug")`. This edit is not among the listed (f) edits. It is factually correct (app/build.gradle:102-103, commit 1ba2dfaa) and harmless, but it went unreported.
> 2. (medium; the update is not finished) KAIF_UPDATE_TASK.md has no checkpoint for `policy-changes`. The task says those six rule changes are "the OWNER'S decisions, never merge them silently; put each in front of the owner and record the choice". `judge` and `field-report` are also pending, as expected at this point. The field report's §3 says "all eight task items" were exercised, but only five checkpoints are recorded. `update-verify` cannot be green until these are closed.
> 3. (low) `check` is rc=0 with the manifest satisfied, but it is not warning-free: "⚠ undelivered KAIF field report". The report is untracked, reads `**Delivered upstream:** NOT YET` and `JUDGE-VERDICT-PENDING`, and has to be delivered with `node .kaif/kaif-core.mjs report ...` after the judge verdict is quoted.
> 4. (low, hygiene) A stray untracked `grep.exe.stackdump` (a Git Bash/msys crash dump, mtime 13:40:00) appeared at the repo root while this judging ran. Its origin is unclear: it may be one of the judge's own grep calls or one of the agent's. It is not part of the update and must not be committed. Delete it before the commit.
> 5. (low, latent) `.kaif/deploy-manifest.json` -> `fills` still records `<TEST_HARNESS>` = "... the phone over adb (C:/adb/adb.exe, logcat)" and `<BUILD_COMMAND>` = "... (needs Android SDK + NDK 27.0.12077973 — see STATUS)". These are the stale deploy-time facts the hand edits just removed from the guide and loop skills. A future render of any template carrying these placeholders would bring the old adb path back. The manifest is identical to the sandbox, so this is mechanical and was not caused by a hand error. The field report's R2/W1 already names the class.
>
> ## Informational (not findings)
> - The update ran with the pre-update core (last-update.json `core` fe62d1b9... = sha of HEAD:.kaif/kaif-core.mjs), which is the normal self-replacing route. The sandbox receipt carries the same core sha.
> - The field report says the voice-core replacement was "not checked by hand". The judge checked it: the LF sha256 of the ignored AUTHOR_STYLOMETRY.md = f922c804...c364 = the release bundle's `ownerVoice.sha256` pin. The portrait already is the 2.8 snapshot, so no owner-voice-core item was due.
> - Line endings are consistent: every inspected working file and HEAD blob is LF-only (0 CR bytes). The autocrlf warnings are cosmetic.
> - The AGENT_GUIDE pointers "Tools of this project" / "Stands" name the template headings (.kaif/_house-rules-template.md §6/§3). HOUSE_RULES.md carries them as the Russian §6 «Инструменты проекта» and §3 «Стенды, окружения и устройства», with the JDK 21/SDK/GRADLE_USER_HOME build line and the adb route. Nothing from the removed paragraph was lost.
