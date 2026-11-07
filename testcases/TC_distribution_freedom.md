# Test cases — distribution freedom epic (FreeDroidWarn · Obtainium · releases x.x.+1)

**Created:** 2026-11-07 · **Under test:** KAST, KrinikCam, KARTUN, KrinikTribitApp — the FreeDroidWarn dialog, the README Obtainium button and
build block, signed GitHub releases x.x.+1 installable and updatable through Obtainium · **Version/build:** baseline = current debug builds
(KAST 20.2.6, KrinikCam 0.9, KARTUN 1.0, KrinikTribitApp 0.1); target = KAST 20.2.7, KrinikCam 0.9.1, KARTUN 1.0.1, KrinikTribitApp 0.1.1
**Test basis:** `ideas/18_distribution_freedom_android_apps.md` (owner's words); acceptance К1–К5 of `plans/13_EPIC_distribution_freedom.md`;
operational plans 14, 15, 16. **Device:** HEADWOLF Titan 1, Android 16, wireless adb `192.168.1.3:<port>`, adb = `C:\Android\Sdk\platform-tools\adb.exe`.

## 1. Goal vector

Achieve: each app warns about Google's developer verification once per version, installs and self-updates through Obtainium from a
pink README button, is signed by its own permanent key, and its README tells how to build it.
Maintain: the apps' own first screens and permissions; green builds. Avoid: crashes from the dialog; debug-signed releases; tag ≠ versionName.

## 2. Requirements under test

| # | Requirement (EARS) | Fit criterion (Scale · Meter · Target) |
|---|---|---|
| R1 | WHEN a version is launched for the first time, the app shall show the FreeDroidWarn dialog | dialog present · `ui.mjs texts` + WebP · 4/4 apps |
| R2 | WHEN the user taps OK, the app shall not show the dialog again for that versionCode | dialog absent after force-stop + relaunch · `ui.mjs texts` · 4/4 |
| R3 | IF the dialog's Details or Solution is tapped, THEN the app shall stay alive | FATAL lines · `adb logcat -d -b crash` · 0 |
| R4 | The README shall carry a pink Obtainium button that opens Obtainium on this app | Obtainium add screen shows id/name/author · WebP · 4/4 |
| R5 | Each release shall be tagged `vX.Y.Z` equal to versionName `X.Y.Z`, with an APK signed by the project's own key | `gh release view` + `apksigner verify --print-certs` · tag = versionName, cert ≠ `CN=Android Debug` · 4/4 |
| R6 | WHEN Obtainium checks the app, it shall find the latest release without disabling version detection | Obtainium app card: version = X.Y.Z, no "version detection disabled" · WebP · 4/4 |
| R7 | The README build block, followed literally on a clean clone, shall produce a debug APK | exit code + APK path · temp-dir clone · 4/4 |
| R8 | Release keys shall be outside git | `git check-ignore -v` · ignored · 4/4 |

## 3. Coverage matrix

| Dimension | Values covered | Explicitly NOT covered (risk named) |
|---|---|---|
| Apps | KAST, KrinikCam, KARTUN, KrinikTribitApp | KrinikTribitNative, ndim-old (excluded by the owner) |
| Dialog language | system language of Titan + one app forced to `en` and `ru` (`cmd locale set-app-locales`) | the other ~26 library locales — library's own translations |
| Dialog lifecycle | first launch · after OK · new versionCode (prefs edited via `run-as`) · rotation while shown | process death while shown — low risk |
| Install path | adb debug (Ф1) · Obtainium from README button (Ф4) · update over the previous GitHub release where one exists | Play Store — not a channel |
| Signature continuity | KARTUN 1.0 → 1.0.1 same key; KrinikCam 0.9 (CI debug key) → 0.9.1 (own key) must FAIL as an update, by design | — |
| Device | Titan 1 (Android 16, tablet, has a browser) | a device without a browser (library issue #45) — accepted risk |

## 4. Cases

Machinery: adb (SDK), `UI_SERIAL=<serial> node tools/ui.mjs texts|tap|seek|shot` (WebP), `adb logcat -d -b crash`, `apksigner` from SDK build-tools,
`gh release view`. Screenshots → `reports/distribution/<case>/<app>/*.webp`. Every case READS the screen, not the exit code alone.

| # | Case (steps → expected) | Technique | Status + evidence |
|---|---|---|---|
| FDW-0 | control: current debug build, `pm clear`, launch → NO FreeDroidWarn dialog (×4) | control (feature absent) | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-1 | new debug build, `pm clear`, launch → dialog with the library text in the system language, buttons Details / OK / Solution (×4) | use case | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-2 | after FDW-1 → OK → `am force-stop` → launch → no dialog (×4) | state transition | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-3 | after FDW-2 → `run-as <pkg>` set `versionCodeWarn` to versionCode−1 in default prefs → launch → dialog again (×4) | state transition (new version) | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-4 | dialog shown → Details → browser opens keepandroidopen.org → back → app alive, 0 crash lines (×4) | error guessing (#45) | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-5 | dialog shown → Solution → browser opens the library README → back → app alive, 0 crash lines (×4) | error guessing (#45) | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-6 | dialog shown → rotate (`settings put system user_rotation 1`) → at most one dialog, 0 crash lines (×4) | error guessing (lifecycle) | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-7 | after OK → the app's own first screen works: KrinikCam camera permission prompt, KrinikTribitApp Bluetooth prompt, KARTUN setup, KAST host list | regression | **pass** 2026-11-07 ×4 — `testcases/reports/2026-11-07_distribution-fdw.md` |
| FDW-8 | locale: `cmd locale set-app-locales <pkg> --locales en` then `ru` → dialog text in that language (one app suffices — library-owned strings) | equivalence class | not run (library-owned strings; Russian seen on all four) |
| TRB-1 | KrinikTribitApp: `git ls-files` has none of the plan-14 list | inspection | **pass** 2026-11-07 — 0 removed paths in `git ls-files` (`7881dbc`) |
| TRB-2 | KrinikTribitApp: `gradlew :app:assembleDebug` green after removal | regression | **pass** 2026-11-07 — debug and release builds green |
| TRB-3 | KrinikTribitApp: `git grep` of removed names in README, AGENT_GUIDE, HOUSE_RULES, maps → empty | inspection | **pass** 2026-11-07 — `git grep` 0 hits in live docs |
| TRB-4 | KrinikTribitApp README build section = Gradle build of `app/` (EN/RU/ZH) | inspection | **pass** 2026-11-07 — Gradle build block EN/RU/ZH |
| OBT-1 | README on GitHub (EN and RU sections) shows the pink Obtainium button, image loads, link = redirect with the right JSON (×4) | inspection + rendering | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| OBT-2 | Titan with Obtainium: open README link → Obtainium add screen with id, name, author prefilled → Add (×4) | use case | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| OBT-3 | Obtainium installs the latest release; card shows X.Y.Z; no version-detection warning (×4) | use case | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| OBT-4 | installed version on Titan = release versionName (`dumpsys package <pkg> \| grep versionName`) (×4) | inspection | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| REL-1 | `gh release view vX.Y.Z` exists, not pre-release, marked latest; tag = versionName (×4) | inspection | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| REL-2 | `apksigner verify --print-certs <asset>` → own cert (KAST `O=KAST`, KARTUN `O=KARTUN`, KrinikCam / KrinikTribitApp their release keys), never `CN=Android Debug` (×4) | inspection | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| REL-3 | versionCode of the asset > previous release's (KrinikCam > 90001, KARTUN > 285, KAST > 57, KrinikTribitApp > 1) (×4) | boundary | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| REL-4 | KARTUN: GitHub 1.0 installed → Obtainium updates to 1.0.1 in place, data kept | state transition (update path) | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |
| REL-5 | KrinikCam: GitHub 0.9 installed → update to 0.9.1 is REFUSED (signature) — the release notes say «reinstall once» | negative (expected failure) | shown by signatures (GitHub v0.9 asset `CN=Android Debug` vs 0.9.1 own key), not reproduced on Titan — same report |
| BLD-1 | README build block followed literally on a temp clone → debug APK built (×4) | use case | [NOT-TESTED] |
| BLD-2 | README build block identical in headings and order across the four (diff of headings) | inspection | [NOT-TESTED] |
| KEY-1 | `git check-ignore -v` on each release keystore and its env file (×4) | inspection | **pass** 2026-11-07 — `testcases/reports/2026-11-07_distribution-releases-obtainium.md` |

## 5. Control cases

- FDW-0 before any change proves the dialog check can fail (no dialog without the library).
- REL-2 run once on the KrinikCam v0.9 asset first: it must print `CN=Android Debug` — proves the check catches a debug signature.
- OBT-3 control: a release whose tag differs from versionName would show the version-detection warning — KARTUN's old «1.0 (285)» vs `v1.0`
  is checked first to see what Obtainium does with it.
