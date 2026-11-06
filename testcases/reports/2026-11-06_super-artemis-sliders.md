# Test run report — Super Artemis: minus, field and plus in slider dialogs, log bitrate, two-field resolution

**Created:** 2026-11-06 10:47 +03:00 · **Run by:** the agent (Claude Opus 5.5) · **Version/build:** Super Artemis 1.1.0 (tag `v1.1.0`,
`75f31275`) + branch `feature/sliders-plus-minus`, commit `829e3253`, debug APK `SuperArtemis-1.1.0-arm64-v8a-debug.apk`

## 1. Work

The slider dialogs, the logarithmic bitrate slider and the resolution dialog of `plans/11_super_artemis_sliders.md`, against its
acceptance criteria 1–7 and the owner's choices in `interviews/interview_003_sliders_dialog_or_list.md` (Q1 A — in the dialog,
Q2 A — the app's own resolution list) and his look remarks in chat 2026-11-06 10:03–10:42 (mockup styling, spacing above the bar
and the size name, bar colour, larger thumb, pill buttons, description indented like the title, values in the list).

## 2. Contour

HEADWOLF Titan 1, Android 16, 1600×2560, Gboard; `adb -s 192.168.1.3:33873` (Wi-Fi debugging on the home network); the debug
package `com.mohitarora.superartemis.debug` (the owner's release `com.mohitarora.superartemis` with his profiles was not touched).
UI driven by `C:/Android/private/ui-agent/ui.py` and `adb shell input`; stored values read with
`adb shell run-as com.mohitarora.superartemis.debug cat shared_prefs/com.mohitarora.superartemis.debug_preferences.xml`.
REAL WORLD: accumulated — the debug app's own settings (bitrate 10 Mbps, 720p at the start); data and machine — the owner's Titan;
path — Settings → Video, as the user opens it. The streaming path itself is not part of this change and was not run.

## 3. Runs

| # | Moment | Command | Exit / outcome |
|---|---|---|---|
| 1 | 2026-11-06 09:51 +03:00 | `adb install -r SuperArtemis-1.1.0-arm64-v8a-debug.apk` (tag v1.1.0) + screenshots | before-shots `110_*.webp` |
| 2 | 2026-11-06 09:57 +03:00 | `gradlew.bat :app:testNonRoot_gameDebugUnitTest --tests com.limelight.preferences.SliderScaleTest` | 9/9 |
| 3 | 2026-11-06 10:01–10:12 +03:00 | `ui.py "tapText Битрейт видео"`, `adb shell input tap 420 1338` ×10, `tapText OK`, prefs read | criteria 1–6 |
| 4 | 2026-11-06 10:03–10:43 +03:00 | rebuild + `adb install -r` after each look remark, screenshot read after each | look fixes |
| 5 | 2026-11-06 10:45 +03:00 | `gradlew.bat :app:testNonRoot_gameDebugUnitTest --continue` | 521 tests, 2 failed (known, see 4) |

## 4. Checks

Hygiene: unit suite 521 tests, 2 failed — `BackupRestoreTest.restoreWithKeysMirrorsPerPcData` and
`backupWithKeysReplacesSettingsHostsProfilesAndIdentity`, the Windows atomic-rename failures that also fail on untouched
`unified-main` (PR #8); new `SliderScaleTest` 9/9 and `ResolutionStopsTest` 4/4; `python scripts/clean_dashes.py --check CHANGELOG.md` clean.
Functional run: Settings → Video on Titan 1 walked by taps; the screen read by `ui.py labels` and by screenshots, stored values read
from shared_prefs.

| Criterion | Status | Observation |
|---|---|---|
| 1. Bitrate 10 Mbps, «−» ×10, OK | pass | field 2,5; `seekbar_bitrate_kbps=2500`; list line «2,5 Мбит/с» |
| 2. Bar to the middle | pass | field 12,0 (geometric middle of 0,5–300) |
| 3. Type «3» | pass | field 3,0, bar at ≈28 % (screenshot) |
| 4. Resolution «+» from 720p, OK | pass | fields 1920 × 1080, «1080p»; `list_resolution=1920x1080`; bitrate reset by the existing listener |
| 5. Type 1680 × 1050, OK | pass | «Пользовательский» before OK; `list_resolution=1680x1050`, `edit_diy_w_h=1680x1050`; existing native-resolution warning shown; reopened dialog names «Пользовательский (1680x1050)»; «−» → 1280×720 → 854×480 |
| 6. Linear slider (network grace) | pass | 60 → 55 → 50, «+» → 55; list «60 с» |
| 7. Unit suite | pass | as in Hygiene |
| Number keyboard in the fields | pass after fix | the first build showed a letter keyboard in the bitrate field (key listener reset the input type) — fixed with `setRawInputType`; `dumpsys input_method` inputType 0x2002, number pad on the screenshot |
| Owner's look remarks | pass | each re-checked on a screenshot: description starts on the title's line, pills end on the description's right edge, no shift on a second opening |

## 5. Found

- Letter keyboard in the bitrate field on the first build — fixed in the same branch (row above).
- Pill backgrounds did not show on the first try: the dialog buttons are `MaterialButton`, which ignores a plain background — fixed
  through its own tint and corner radius.
- The theme's `dialogPreferredPadding` did not match the title indent on Titan 1 — fixed by measuring the title on screen.

## 6. Traces

Screenshots `reports/sa-sliders/shots/*.webp` (before: `110_*`; after: `after_*`, `new_*`); the before/after page
`reports/sa-sliders/before_after.html`; build and test logs in the session scratchpad (`build_sliders*.log`, `test_final.log`).

## 7. Verdict

pass — criteria 1–7 observed on Titan 1; the streaming path is unchanged by this work and was not run.
