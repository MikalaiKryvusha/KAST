# 05 — Свобода дистрибуции: FreeDroidWarn, Obtainium, релизы для четырёх Android-проектов

Разведка 2026-11-07 для эпика `plans/13_EPIC_distribution_freedom.md`. Слова владельца дословно — `ideas/18_distribution_freedom_android_apps.md`.
Источник веб-части — веб-разведка с URL у каждого утверждения; источник локальной — чтение клонов `D:\work\ai_sandbox\{KAST,KrinikCam,KARTUN,KrinikTribit}`.

## 1. Требования (владелец, сжатием; дословно — ideas/18)

- Проекты: **KAST, KrinikCam, KARTUN, KrinikTribitApp**. KrinikTribitNative и ndim-old исключены.
- В каждый — **FreeDroidWarn** (https://github.com/woheller69/FreeDroidWarn).
- Дистрибуция — **только Obtainium**: F-Droid отменён, IzzyOnDroid отпал (решения владельца после доклада разведки).
- В README — **большая красивая кнопка Obtainium**, кислотно-розовый стиль Криника, алмаз Obtainium розовым.
- В README — **стандартный блок «Как собрать»**.
- **Релизы всем, версия x.x.+1**, выпустить на GitHub.
- Ключ и скрипт подписи релиза — тем, у кого нет, «как в KARTUN, вне гита», папку открыть владельцу.
- Проверка — **Titan 1 по Wi-Fi** (`192.168.1.3:<порт>`, adb только `C:\Android\Sdk\platform-tools\adb.exe`).
- KrinikTribitApp — «не клон, не патч, не взлом, а наше нативное приложение».

## 2. Индустрия (веб)

**FreeDroidWarn** — https://github.com/woheller69/FreeDroidWarn
- V1.14 (2026-09-09), Apache-2.0, JitPack `com.github.woheller69:FreeDroidWarn:V1.14`; один метод
  `FreeDroidWarn.showWarningOnUpgrade(Context, int buildVersion)`.
- Показывает системный `android.app.AlertDialog` (Подробнее / OK / Решение) на каждом новом versionCode, пока не нажат OK;
  хранит `versionCodeWarn` в SharedPreferences по умолчанию. Текст фиксирован, ≈28–30 языков, есть ru; нет bn.
- minSdk 14, тянет `androidx.appcompat:appcompat:1.5.1`. Известные открытые: #45 — `startActivity` без try/catch (нет браузера → падение),
  #49 — показывается и на GrapheneOS.
- Принят F-Droid в приложениях автора (gpscockpit, whoBIRD) — библиотека чистая.

**Obtainium** — https://wiki.obtainium.imranr.dev/
- Модерации нет: клиент сам читает GitHub Releases. Обязательное — APK вложением в релиз.
- Версия тега должна совпадать с `versionName` в форме x.y.z (ведущая `v` срезается); при расхождении отслеживание версии
  отключается (https://wiki.obtainium.imranr.dev/app_tracking/). Несколько APK в релизе → нужен `apkFilterRegEx`, иначе выбор руками.
- Глубокая ссылка: `https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/<url-encoded JSON>`, JSON минимум `id,url,author,name`
  (+ `additionalSettings`) — https://wiki.obtainium.imranr.dev/deep_links/ , https://github.com/ImranR98/apps.obtainium.imranr.dev/blob/main/BADGING.md
- Значок `assets/graphics/badge_obtainium.png` — хранить у себя, не ссылаться на raw.githubusercontent. Отдельной лицензии на логотип нет,
  весь репозиторий GPL-3.0 → перекраска допустима по GPL (вывод, не прямое разрешение): кладём SVG с указанием источника и GPL-3.0.
- Анти-паттерны: тег ≠ versionName; несколько APK без фильтра; пре-релиз помечен latest; переименование репозитория.

**README GitHub** — CSS вырезается; работают `<p align="center">`, `<img height=…>`, `<picture>` для тёмной/светлой темы, SVG из репозитория
(https://github.com/github/markup).

**Отвергнуто владельцем, с причинами разведки:** официальный F-Droid (сборка из исходников, у KAST готовые `.a` OpenSSL/Opus,
у KrinikCam JitPack-AAR с готовыми `.so`, подпись F-Droid ≠ наша, очередь недели); IzzyOnDroid — политика против приложений,
созданных генеративным ИИ даже частично (https://izzyondroid.org/docs/general/AppInclusionPolicy/).

## 3. Локальная картина

| | KAST | KrinikCam | KARTUN | KrinikTribitApp |
|---|---|---|---|---|
| Лицензия | GPL-3.0 | MIT | MIT | **нет файла LICENSE** |
| Пакет релиза | `com.limelight.kast` (флейвор nonRoot_game) | `com.kriniks.kcam` | `com.kriniks.kartun` | `com.kriniks.tribit` |
| Версия сейчас | 20.2.6 / code 57 (руками) | 0.9 / 90001 (`version.json`) | «1.0 (N)», code = число коммитов | 0.1 / 1 |
| Ключ релиза | **создан 2026-11-07** `keys/` | `keystores/kcam-release.jks` | `kartun-release.jks` | `keys/krinik-tribit-app-release.jks` |
| Релизы GitHub | нет | v0.9 — **APK подписан debug-ключом CI** | v1.0 `KARTUN.apk`, свой ключ | нет |
| APK | ABI-сплиты ×4, один versionCode | универсальный | arm64 | — |
| Точка входа | `PcView.java` (AppCompat, Views) | `MainActivity.kt` (Compose) | `MainActivity.kt` (Compose) | `MainActivity.kt` (Compose) |
| Ссылка Obtainium | уже в приложении (`build.gradle`, regex `nonRoot`, `v(.+)`) | текст в README | нет | нет |

Бренд: кислотно-розовый **`#FF1A8C`** (тёмный `#CC0070`, светлый `#FF6BBD`, фон `#0D0D0D`) — `KrinikCam/core/ui/.../Color.kt:15-17`,
`KARTUN/.../Theme.kt`, `KUIPS/src/sheet/menu.css:15`. Образец большой кнопки — пилюля `KARTUN/docs/download-en.svg`
(440×96, rx 46, градиент `#FF3D9E`→`#E0007A`, белая обводка 25 %, жирный белый текст, подстрока).

## 4. Выводы для эпика

1. FreeDroidWarn встаёт во все четыре одной строкой в `onCreate` точки входа; версию закрепить `V1.14` (не `V1.+`).
   Вызов обернуть так, чтобы #45 (нет браузера) не уронил приложение — проверить на Titan кнопки «Подробнее» и «Решение».
2. Obtainium требует: релиз с APK, тег `vX.Y.Z` = `versionName` `X.Y.Z`. Под это править: KARTUN («1.0 (N)» → `1.0.1`),
   KAST (сплиты → фильтр по `nonRoot` и ABI или универсальный APK).
3. **KrinikCam:** v0.9 на GitHub подписан debug-ключом CI; 0.9.1 будет подписан настоящим ключом → у кого стоит 0.9,
   обновление поверх не встанет, один раз переустановить. CI-выпуск (`release.yml`) не должен больше подписывать debug-ключом.
4. **KrinikTribitApp:** первый релиз; нет LICENSE; в публичном репозитории ещё лежит инструментарий прежнего пути
   (smali-патчи официального APK `patches/`, `build.sh`, `tools/recon/`) — расходится со словами владельца «не патч».
5. Кнопка — своя SVG-пилюля по образцу KARTUN с розовым алмазом; глубокая ссылка Obtainium с JSON приложения.
6. Блок «Как собрать» — одна шапка и порядок для всех, начинка из раздела 3 (JDK, NDK у KAST/KARTUN, модели KARTUN, ключ вне git).

## 5. Развилки владельцу

- **KrinikTribitApp:** лицензия (как у KrinikCam/KARTUN — MIT?) и судьба инструментов прежнего пути в публичном репозитории.
- (информация, не развилка) KrinikCam 0.9 → 0.9.1: разовая переустановка у тех, кто ставил 0.9.
