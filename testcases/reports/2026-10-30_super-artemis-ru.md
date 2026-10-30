# Test run report — Super Artemis Russian localization, the locale fix and KAST on 3G

**Created:** 2026-10-30 18:09 +03:00 · **Run by:** the agent (Claude Opus 5.5) · **Version/build:** Super Artemis
`feature/ru-localization` at `fb84338a` (on `unified-main` `6c23e114`), `nonRoot_gameDebug`
(`com.mohitarora.superartemis.debug`); KAST Debug on Titan (`com.limelight.kastdebug`, as installed 2026-09-26)

## 1. Work

The Russian translation of Super Artemis for PR Arora-Sir/Super-Artemis#8 (ideas/15): 590 new strings and the step
plural, 173 corrected existing strings, keycap labels left untranslated (the maintainer's rule in #3 and the owner's
word 2026-10-30), the locale fix (#6) and the translatable Default of the language list. Basis: the owner's review
rules (`terms.md` of the pipeline: keys never translated, App = «приложение», stream = «стрим»), the review table
`reports/l10n/super-artemis_ru.md`, the PR checklist of Super Artemis. Side run on the owner's ask: KAST over 3G on Titan.

## 2. Contour

Host: Vibepollo on the owner's Windows 11 PC, streams to a Vibepollo virtual display (1280×720) with desktop icons
hidden for the screenshots and restored after. Clients: HEADWOLF Titan 1 (Android 16, Wi-Fi, later 3G through
Tailscale) and Samsung Galaxy S21 FE SM-G990B (Android 16, USB), app language set by
`adb shell cmd locale set-app-locales … --locales ru`. Test clients paired as «Super Artemis S21 FE» and
«Super Artemis Titan1» with the permission mask of the owner's other clients (118693632).

REAL WORLD: accumulated — the owner's live Vibepollo with his paired clients and saved apps, verified on the real
world; data and machine — his PC, his Titan and his Galaxy S21 FE, verified on the real world; path — pairing by PIN,
the app list, a stream of Desktop, the menus a user opens, verified on the real world.

## 3. Runs

| # | Moment | Command | Exit / outcome |
|---|---|---|---|
| 1 | ≈ 2026-10-30 16:43 +03:00 | `node tools/l10n/l10n.mjs validate ../_forks/Super-Artemis/app/src/main/res ru` | 0 · checked 1236, errors 0 (final run 18:00) |
| 2 | ≈ 2026-10-30 16:50 +03:00 | `gradlew.bat testNonRoot_gameDebugUnitTest --continue` | 1 · 355 tests, 2 failed (BackupRestoreTest), the same 2 on clean `6c23e114` (run 3) |
| 3 | ≈ 2026-10-30 17:03 +03:00 | `gradlew.bat testNonRoot_gameDebugUnitTest --tests "com.limelight.backup.BackupRestoreTest"` on stashed clean HEAD | 1 · 17 tests, the same 2 failed |
| 4 | ≈ 2026-10-30 16:44 +03:00 | `node ui.mjs walk 40 settings-texts2.txt` (Titan, Settings) | 143 texts, Latin-only: Material You |
| 5 | ≈ 2026-10-30 17:02 +03:00 | `adb shell cmd locale set-app-locales com.mohitarora.superartemis.debug --locales ru|en|""` on both devices | three locale cases, before and after the fix |
| 6 | ≈ 2026-10-30 17:13 +03:00 | stream Desktop from the S21 FE (`tap grid_image`), menus by `node ui.mjs seek "<title>"` | Quick Menu 17, Advanced Menu 15, Send special keys, More keys texts read |
| 7 | ≈ 2026-10-30 17:27 +03:00 | KAST on Titan over 3G: `svc wifi disable`, stream Desktop | stream up, no loss lines on the host in 1:45 |
| 8 | ≈ 2026-10-30 17:32 +03:00 | `setsid sh -c 'svc data disable; sleep 20; svc data enable'` on Titan | `KastReconnect: outcome=held elapsed=23459`, host IDR 17:32:59 |
| 9 | ≈ 2026-10-30 17:45 +03:00 | stream to the virtual display from the S21 FE and Titan, `ui.mjs shot` | 20 screenshots, menus and editors in Russian |
| 10 | ≈ 2026-10-30 17:59 +03:00 | `node ui.mjs walk` on the S21 FE: profile editor, gestures | 107 and 21 texts, no Latin-only text |

## 4. Checks

Hygiene: the l10n validator 1236/1236 entries with 0 errors; the mixed-alphabet check proved red on a planted «Пairing»;
the debug build compiles the resources; unit 353/355, the 2 failures also fail on clean upstream.
Functional run: the real Super Artemis on the owner's two Android 16 devices against his live Vibepollo, by the user's
path (pairing, app list, a stream, the menus), the screen text read from the UI tree and the screenshots looked at.

| Case | Status | Observation |
|---|---|---|
| Settings in Russian (Titan) | pass | 143 texts, only «Material You» in Latin (a brand) |
| Long Russian text fits (Titan, S21 FE) | pass | screenshots: titles and summaries wrap, nothing clipped |
| Keycap labels untranslated | pass | «Alt + F4», «Page Down», «Print Screen» as on the keyboard; «Ctrl + A (Выделить всё)» |
| Language: system en, app ru, Default (S21 FE) | pass after the fix | before: English; after: Russian |
| Language: system ru, app en, Default (Titan) | pass after the fix | before: Russian; after: English |
| Language: no app language (S21 FE) | pass | the system language (English) |
| Language list Default entry | pass | «По умолчанию» |
| Pairing and access-denied dialogs | pass | «Сопряжение … PIN», «Доступ запрещён (Запустить приложения)» |
| In-stream menus (S21 FE, Titan) | pass | Quick Menu, Advanced Menu, Send special keys, More keys, Server commands, menu editor, bar editor in Russian |
| Profiles, profile editor, special keys, key editor, gestures (S21 FE) | pass | all texts in Russian |
| Backup dialog (S21 FE, ≈ 18:11, after the PR) | pass | «Создать резервную копию настроек», the pairing-keys warning and the password option in Russian; cancelled without saving |
| About section of Settings (S21 FE, ≈ 18:12) | pass | «Политика конфиденциальности», «Проверить обновления», «Версия 1.0.0 (debug)…» in Russian; the About screen itself was not opened |
| KAST over 3G, 20 s data drop (Titan) | pass | session held 23.5 s, picture back ≈ 10 s after the data returned |

## 5. Found

- Arora-Sir/Super-Artemis#6 — with Language set to Default the Android app language is ignored (fixed in the PR).
- The Default entry of the language list was hard-coded English (fixed in the PR).
- `BarSets.DEFAULT_NAME` — the first bar set is named «Default» in every language (reported in the PR text).
- A stray `s` after a closing tag in `values/strings.xml` (reported in the PR text).
- The app polls server commands every 1.6 s from the home screen and the host logs a denial each time (observed, not filed).

## 6. Traces

- Screenshots for the PR: `reports/l10n/shots/` (`818ce2d8`); private ones with the owner's screen:
  `C:\Android\private\evidence\2026-10-30_super-artemis-ru\`.
- Review table: `reports/l10n/super-artemis_ru.md`; translation batches and review files: the session scratchpad.
- Host log: `C:\Program Files\Apollo\config\logs\sunshine-20261030-084804-414.log` (17:10–17:56).

## 7. Verdict

partial — the translation, the locale fix and the in-stream menus pass on both devices; the About screen itself was not opened (its Settings section and the backup dialog passed after the PR was sent), and 2 unit tests fail on Windows on clean upstream as well.
