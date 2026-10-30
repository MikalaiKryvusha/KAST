# Test run report — Super Artemis: move profiles up and down in the Profiles list (issue #4)

**Created:** 2026-10-30 22:45 +03:00 · **Run by:** the agent (Claude Opus 5.5) · **Version/build:** Super Artemis
`feature/profiles-reorder` on `unified-main` `6c23e114` (working tree before the commit), `nonRoot_gameDebug`
(`com.mohitarora.superartemis.debug`, `SuperArtemis-1.0.0-arm64-v8a-debug.apk` built 22:31)

## 1. Work

Drag to reorder in the Profiles list for a PR answering Arora-Sir/Super-Artemis#4. Basis: `plans/08_super_artemis_profiles_reorder.md`
(acceptance criteria 1–4), the maintainer's design in #4 (`ItemTouchHelper` on `ProfilesAdapter`, `move(from, to)` in
`ProfilesManager` keeping the JSON order), the PR checklist of Super Artemis.

## 2. Contour

Client: HEADWOLF Titan 1 (Android 16, the owner had it with him on the road, reached through Tailscale `100.99.111.48:5555`,
on battery 76–78 %), Super Artemis debug installed over the existing debug install, system language Russian (the
`unified-main` build has partial Russian, so the screen mixes English and Russian). The owner gave the tablet for the run
(chat ≈22:35: «да, титан твой»). Test data: three profiles A, B, C (B active) written into the debug app's
`files/profiles/profiles.json` through `run-as` before the app was opened; the debug app had no profiles before.
Galaxy S21 FE was not connected and was not used.

REAL WORLD: accumulated — the debug install of Super Artemis that already held pairing with the owner's Vibepollo, verified
with real state; data and machine — the owner's Titan, verified on the real world; path — the launcher, the profile chooser
on the home screen, a drag by the handle and by a long press, verified on the real world. The owner's own Super Artemis
(release) and KAST Debug were not touched.

## 3. Runs

| # | Moment | Command | Exit / outcome |
|---|---|---|---|
| 1 | 2026-10-30 22:29–22:31 +03:00 | `gradlew.bat testNonRoot_gameDebugUnitTest --tests "com.limelight.profiles.*" assembleNonRoot_gameDebug` | 0 · 24 profile tests, 0 failures |
| 2 | 2026-10-30 22:32 +03:00 | the same `--tests "com.limelight.profiles.ProfilesManagerTest"` with `move` turned into `return true` (mutant) | 1 · `moveKeepsNewOrderAfterReload` and `moveToEndAndOutOfRange` failed, 5 others passed |
| 3 | 2026-10-30 22:32–22:36 +03:00 | `adb -s 100.99.111.48:5555 install -r SuperArtemis-1.0.0-arm64-v8a-debug.apk` | Success (≈4 min over Tailscale) |
| 4 | 2026-10-30 22:37:57 +03:00 | `adb shell input draganddrop 120 1055 120 540 1500` (handle of C onto A) | list C, A, B |
| 5 | 2026-10-30 ≈22:38 +03:00 | `am force-stop` + launcher start + `node tools/ui.mjs tap "Выбрать профиль"` | list C, A, B; home screen shows B |
| 6 | 2026-10-30 ≈22:39 +03:00 | `adb shell input draganddrop 500 1027 500 540 1500` (long press on the row of B) | list B, C, A |
| 7 | 2026-10-30 ≈22:39 +03:00 | `node tools/ui.mjs tap "A"` | `EditProfileActivity` on top |
| 8 | 2026-10-30 22:41 +03:00 | `gradlew.bat testNonRoot_gameDebugUnitTest --continue` | 1 · 357 tests, 2 failed (`BackupRestoreTest`), the same 2 as on clean `6c23e114` (report 2026-10-30_super-artemis-ru, run 3) |

## 4. Checks

Hygiene: unit tests of the profiles package 24/24 (run 1); the two new tests proven red on a no-op `move` (run 2); the
full suite 355/357, the 2 failures are the known Windows `BackupRestoreTest` ones (run 8); `python scripts/clean_dashes.py --check CHANGELOG.md` clean.
Functional run: the Profiles screen of the debug build on Titan, walked by the user's path (runs 4–7); read: the uiautomator
texts of the list after each step, `profiles.json` through `run-as`, the top activity from `dumpsys`, screenshots.

| Case (plan 08) | Status | Observation |
|---|---|---|
| 1. Drag C by the handle above A | pass | texts C, A, B; `profiles.json` names C, A, B; screenshot `titan_after_drag.webp` |
| 2. Order survives a restart, active profile kept | pass | after `force-stop` the list reads C, A, B; the home screen and `activeProfileId` still name B |
| 3. Unit level, red on a mutant | pass | runs 1 and 2 |
| 4a. Long press on the row starts a drag | pass | B moved from the bottom to the top, saved as B, C, A |
| 4b. Tap on a row still opens the editor | pass | `EditProfileActivity` resumed after the tap on A |
| 4c. Radio, copy, delete on the device | skipped | unchanged code; covered by `ProfilesActivityUiTest` (radio, delete) in run 1 |

Dimensions: drag up by the handle, drag up by a long press, restart; not covered — a drag down across several rows on the
device (covered at unit level by `moveToEndAndOutOfRange`), a list longer than the screen (edge scroll is the shared
`DragReorder` code), TalkBack.

## 5. Found

none

## 6. Traces

`reports/sa-profiles-reorder/`: `titan_before.webp`, `titan_after_drag.webp`, `titan_tap_opens_editor.webp`,
`titan_profiles_reorder_before_after.webp` (cropped pair for the PR); test results
`D:\work\ai_sandbox\_forks\Super-Artemis\app\build\test-results\testNonRoot_gameDebugUnitTest\`.

## 7. Verdict

pass — criteria 1–4 of plan 08 observed on Titan; radio, copy and delete were not walked on the device (case 4c).
