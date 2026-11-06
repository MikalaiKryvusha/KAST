# Run report — Super Artemis: Custom Resolution dialog (issue #14) and slider ends

**Work:** plan 12 (`plans/12_super_artemis_custom_resolution.md`), acceptance criteria 1–8; owner's look approval 2026-11-07 ≈00:35
(«Да, вот теперь хорошо. Так должно получиться на всех других девайсах и локалях»).

**Contour:** HEADWOLF Titan 1 (Android 16) over wireless adb `192.168.1.3:37447`; Super Artemis debug build of fork branch
`feature/custom-resolution-dialog` (`70097fd8`, base `origin/unified-main` `75d2f65e`) and of `feature/slider-ends-inset` (`a1f9da92`);
device screen profiles of `tools/stand/device-profiles.json` (`researches/04`), applied as size + density pairs by `tools/stand/stand.mjs`.

**Runs:**
- 2026-11-07 00:58–01:30 — functional cases: `STAND_SERIAL=192.168.1.3:37447 bash tools/stand/check-crd.sh s24u <dir>`
- 2026-11-07 00:40–01:35 — screenshot sweep: `bash tools/stand/sweep-crd.sh reports/sa-custom-resolution/devices <profile>:<orient>:<lang> …`
- 2026-11-07 ≈01:05 — unit suite: `gradlew.bat :app:testNonRoot_gameDebugUnitTest` (branch `feature/custom-resolution-dialog`)
- 2026-11-07 ≈01:35 — `BackupRestoreTest` alone on `feature/slider-ends-inset` (no dialog code) to place its two failures
- 2026-11-06 23:43 — slider ends before/after on Titan's own screen, bitrate dialog at 300 and 0.5 Mbps
- `node tools/l10n/l10n.mjs validate <res> <lang>` for 21 locales

**Checks:**
- Hygiene: unit suite 530/532 (new `CustomResolutionModelTest` 8/8); the 2 failures are `BackupRestoreTest` — see the last run line;
  l10n validate 21 locales — 0 errors each; private-names guard on every KAST commit — 0 hits.
- Functional run: the dialog walked on Titan by the user's path (settings search → row → dialog), S24 Ultra profile, English; read from
  the UI tree and from the app's saved preferences:

| Case | Observation | Status |
|---|---|---|
| Control: type 1920×1080, OK | `edit_diy_w_h=1920x1080` | pass |
| Tap 16:9 | fields 1920 × 1080 | pass |
| Then + | fields 2560 × 1440 | pass |
| Width 1921 | line «Width and height must be even» shown | pass |
| Width 1921 | OK `enabled="false"` | pass |
| Type 2000×1000, OK | `edit_diy_w_h=2000x1000` | pass |
| 14 device profiles, portrait/landscape, en/es/fr/de | every shot read: ratio row, fields on a stop, bold stop label, bar, buttons inside the dialog | pass |
| Phone landscape (compact height) | whole dialog visible without scrolling (S24 Ultra, Xperia 10 V, Flip6) | pass |
| Slider ends (PR-A) | thumb at max/min stops on the text line, was ~6 dp from the edge | pass |

**Found:**
- Russian screenshots not taken: the scripted path cannot reach the row in a Russian locale (Cyrillic cannot be typed by `adb input`;
  the scroll path fails to find the row after 5 attempts) — a tooling gap, not a defect of the dialog; Russian strings validated by l10n.
- Maintainer's settings open in two panes on Pixel 9 Pro and Galaxy Z Flip6 portrait profiles and squeeze the right pane (not in this
  change) — to the owner as a question.

**Traces:** `reports/sa-custom-resolution/devices/*.webp` (shots), `reports/sa-slider-ends/*.webp` (before/after),
`reports/sa-custom-resolution/pr_body.md`, `reports/sa-slider-ends/pr_body.md`.

**Verdict:** pass — with the Russian screenshots missing (tooling), Russian text checked by validation only.
