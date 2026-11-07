# Run report — releases x.x.+1 and Obtainium for KAST, KrinikCam, KARTUN, KrinikTribitApp (epic 13, phases F3–F4)

**Work:** plans 16 and 17 (`plans/16_epic13_F2_obtainium_button_build_block.md`, `plans/17_epic13_F3_releases.md`), cases REL-1…REL-5,
OBT-1…OBT-4, KEY-1 of `testcases/TC_distribution_freedom.md`; owner's words 2026-11-07 «всех приложений собрать релизы, поднять минорную
версию на 1 x.x.+1», «повыпускать релизы», «только Обтейниум делаем», «работай автономно».

**Contour:** HEADWOLF Titan 1 (Android 16, ru-BY) over wireless adb `192.168.1.3:37447`; Obtainium `dev.imranr.obtainium.fdroid` already
installed on the tablet; Chrome on the tablet; release APKs built on the Windows PC with each project's own key; GitHub releases
KAST `v20.2.7` (`c89ae2f6`), KrinikCam `v0.9.1` (`6fa5908`), KARTUN `v1.0.1` (`50dbf5a`), KrinikTribitApp `v0.1.1` (`7881dbc`).

**Runs:**
- 2026-11-07 ≈13:00–13:12 — release builds: KAST `gradlew.bat :app:assembleNonRoot_gameRelease` (JDK 21), KrinikCam `gradlew.bat :app:assembleRelease`
  (JDK 17), KARTUN `gradlew.bat :app:assembleRelease` (first run: `:engine:lintVitalAnalyzeRelease` «Unexpected failure during lint analysis»,
  retry green; rebuilt after the release commit so versionCode = commit count of the tag, 298), KrinikTribitApp `gradlew.bat :app:assembleRelease`.
- ≈13:05 — `apksigner verify --print-certs` + `aapt2 dump badging` on every asset (build-tools 36.0.0, JAVA_HOME = JDK 21 — the user JAVA_HOME
  points to a removed JDK, apksigner refuses it); control: the GitHub KrinikCam v0.9 asset.
- ≈13:08–13:15 — Titan: `adb install` of the release APKs; launch; `ui.mjs texts`; `adb logcat -d -b crash`.
- ≈13:14 — `gh release create vX.Y.Z <apk…> --title … --notes-file reports/distribution/release-notes/<app>.md --latest` ×4;
  `gh api repos/MikalaiKryvusha/<repo>/releases/latest`.
- ≈13:17–13:25 — Obtainium: the README link of each project opened in Chrome on Titan (`am start -a VIEW -d <redirect link> com.android.chrome`),
  import → Continue/Продолжить → pull-to-refresh → app card read; `tools/obt-check.sh` (KAST step by step — the button had switched to «Продолжить»).
- ≈13:28 — GitHub README rendering: headless Chrome screenshots of `github.com/MikalaiKryvusha/<repo>/blob/<branch>/README.md` (WebP).

**Checks:**
- Hygiene: four release builds green; private-names guard on the KAST commits (two refusals on binary screenshots/owner's upscaled PNG, those
  files were left out); KARTUN commit hooks (stamp-guard, app names R3, ctrl-char-guard) green.
- Functional run: the user's path — the README button on the device → Obtainium → app card — and the release APKs installed and launched on Titan.

| Case | KAST | KrinikCam | KARTUN | KrinikTribitApp |
|---|---|---|---|---|
| REL-1 latest release, not pre-release, tag = versionName | pass `v20.2.7` / 20.2.7, 4 APKs `KAST-20.2.7-nonRoot-<abi>.apk` | pass `v0.9.1` / 0.9.1 | pass `v1.0.1` / 1.0.1, `KARTUN.apk` | pass `v0.1.1` / 0.1.1 |
| REL-2 own signer, never `CN=Android Debug` | pass `CN=Mikalai Kryvusha, O=KAST, C=BY` | pass `CN=KCAM, OU=KrinikCam, O=KOT KRINIK, C=BY` (control v0.9 asset: `CN=Android Debug`) | pass `CN=Mikalai Kryvusha, O=KARTUN, C=BY` | pass `CN=Krinik Tribit, O=Krinik` |
| REL-3 versionCode grew | pass 57 → 58 | pass 90001 → 90002 | pass 285 → 298 | pass 1 → 2 |
| REL-4 update in place | not applicable (no earlier release) | pass over the Titan's 0.9 (it was a local build with the own key) | pass 1.0 (285) → 1.0.1 (298), `adb install -r` Success | not applicable (first release) |
| REL-5 GitHub v0.9 → 0.9.1 refused | — | not reproduced on Titan (no GitHub 0.9 there); proven by the signatures above; release notes say «reinstall once» | — | — |
| First launch of the release: FreeDroidWarn | pass | (dialog checked on debug, same code) | pass (after update) | pass |
| OBT-1 README on GitHub shows the pink button | pass | pass (next to Download APK) | pass (next to DOWNLOAD APK) | pass |
| OBT-2 README link → Obtainium import with id/name/author | pass | pass | pass | pass |
| OBT-3 after refresh: «Установлена/Последняя», asset picked | pass `v20.2.7`, `KAST-20.2.7-nonRoot-arm64-v8a.apk` | pass `v0.9.1`, `KrinikCam-v0.9.1.apk` | pass `v1.0.1`, `KARTUN.apk` (before refresh: «1.0.1 → Неизвестно», «Последняя проверка: Никогда») | pass `v0.1.1`, `Krinik-Tribit-v0.1.1.apk` |
| OBT-4 installed versionName = release | pass 20.2.7 | pass 0.9.1 | pass 1.0.1 | pass 0.1.1 |
| KEY-1 key outside git | pass `keys/` ignored | pass `keystores/`, `.env` ignored | pass `*.jks`, `.env` ignored | pass `keys/`, `.env` ignored |

Screenshots (WebP): `reports/distribution/rel/*.webp`, `reports/distribution/obt/{kartun-*,kast,kcam,tribit}/*.webp`, `reports/distribution/obt/github/*.webp`.

**Verdict:** pass for REL-1…REL-4, OBT-1…OBT-4, KEY-1 on all applicable apps; REL-5 shown by signatures, not reproduced on the device.

**Found on the way:**
- The KrinikCam v0.9 asset on GitHub was attached by its `release.yml` workflow, signed by the runner's throwaway debug key; the workflow
  no longer runs on a tag push.
- Obtainium shows «Неизвестно» for the latest version until its first check; a pull-down refresh fills it.
- The KrinikTribitApp GitHub description still said «the Tribit speaker app, fixed» — changed to «our own native app … written from scratch».
