# Run report — FreeDroidWarn in KAST, KrinikCam, KARTUN, KrinikTribitApp (epic 13, phase F1)

**Work:** plan 15 (`plans/15_DONE_epic13_F1_freedroidwarn.md`), cases FDW-0…FDW-8 of `testcases/TC_distribution_freedom.md`; owner's word
2026-11-07 «во все их нужно встроить https://github.com/woheller69/FreeDroidWarn», «ГОУ, план начинаем делать!».

**Contour:** HEADWOLF Titan 1 (Android 16, system language ru-BY) over wireless adb `192.168.1.3:37447`, adb =
`C:\Android\Sdk\platform-tools\adb.exe`; debug builds with FreeDroidWarn V1.14 (uncommitted trees at the time of the run):
`com.kriniks.tribit.debug` (KrinikTribitApp `30f999f`+diff), `com.kriniks.kartun.debug` (KARTUN `e0cf554`+diff, versionCode 296),
`com.kriniks.kcam.debug` (KrinikCam `ade7336`+diff, versionCode 90001), `com.limelight.kastdebug` (KAST `moonlight-noir` ≈`b6b6826d`+diff, nonRoot_game arm64, versionCode 57).

**Runs:**
- 2026-11-07 ≈12:17–12:19 — builds: `gradlew.bat :app:assembleDebug` (KARTUN 2m55s, KrinikTribit 1m11s, JDK 21, `GRADLE_USER_HOME=C:\Android\gradle-home`);
  `node tools/build.mjs --no-ui` (KrinikCam); ≈12:47 `gradlew.bat :app:assembleNonRoot_gameDebug` (KAST 2m21s, after deleting the stale
  `app/build/.cxx` that still pointed ndk-build at the pre-move `D:\Android\Sdk`).
- 2026-11-07 ≈12:19–12:24 — KrinikTribitApp: FDW-0 on the old build, reinstall, FDW-1, then `bash tools/fdw-check.sh com.kriniks.tribit.debug <dir>`.
- 2026-11-07 ≈12:30–12:40 — KARTUN: FDW-0 on the installed release 1.0 (data kept, no `pm clear`), install, `pm clear`, FDW-1, `tools/fdw-check.sh`.
- 2026-11-07 ≈12:40–12:55 — KrinikCam: first two runs INVALID (system camera-permission prompt on top, taps did not reach it);
  third run after `pm grant` CAMERA, RECORD_AUDIO, POST_NOTIFICATIONS — FDW-1 + `tools/fdw-check.sh`.
- 2026-11-07 ≈12:55–13:05 — KAST: FDW-0 on the old debug 20.2.6, install arm64 debug, `pm clear`, FDW-1, `tools/fdw-check.sh`.

**Checks:**
- Hygiene: four debug builds green (above). No unit tests touched.
- Functional run: each app launched on Titan by its launcher; the screen READ from the UI tree (`node tools/ui.mjs texts`), the foreground
  activity from `dumpsys activity activities`, crashes from `adb logcat -d -b crash`, the library's saved state from
  `run-as <pkg> shared_prefs/<pkg>_preferences.xml` (`versionCodeWarn`).

| Case | KrinikTribitApp | KARTUN | KrinikCam | KAST |
|---|---|---|---|---|
| FDW-0 control: no dialog before the change | pass (old build 5.0.0) | pass (release 1.0) | pass (debug 0.8) | pass (debug 20.2.6) |
| FDW-1 first launch: dialog, Russian text, РЕШЕНИЕ / ПОДРОБНЕЕ / ОК | pass | pass (shown after the app's own GPU/CPU bench dialog) | pass (after permissions) | pass |
| FDW-4 ПОДРОБНЕЕ → Chrome, back → app, 0 crash lines | pass | pass | pass | pass |
| FDW-5 РЕШЕНИЕ → GitHub app opens the README, 0 crash lines | pass | pass | pass | pass |
| FDW-6 rotation while shown: at most one dialog, 0 crash lines | pass (dialog stays) | pass (dialog closes with the re-created activity, returns at next launch) | pass (stays) | pass (stays) |
| FDW-2 ОК → force-stop → launch: no dialog | pass | pass | pass | pass |
| FDW-3 `versionCodeWarn` set to 0 → dialog again | pass (was 1) | pass (was 296) | pass (was 90001) | pass (was 57) |
| FDW-7 the app's own first screen after ОК | pass («Доступ к колонке / Разрешить») | pass (home: «Выберите фото…») | pass (camera screen: «Меню / Слои / Сцены») | pass (host list: «Krinik's PC Vibepollo») |
| FDW-8 forced app locale en/ru | not run (library-owned strings; Russian shown on all four) | | | |

Screenshots (WebP): `reports/distribution/fdw/{tribit,kartun,kcam,kast}/fdw0…fdw7_*.webp`.

**Verdict:** pass for FDW-0…FDW-7 on all four apps; FDW-8 not run.

**Found on the way:**
- Titan had an old `com.kriniks.tribit.debug` 5.0.0 (the patched-APK path, versionCode 5000) — the new debug (versionCode 1) is a downgrade;
  the old debug was uninstalled from the test tablet.
- KAST's native build kept the pre-move SDK path in `app/build/.cxx` (configure output); deleting that build folder fixed it.
- KrinikCam on a fresh install: the system permission prompt comes first, FreeDroidWarn's dialog waits under it.
