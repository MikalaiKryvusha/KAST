<p align="center">
  <img src="assets/logo/kast-banner-pink.webp" alt="KAST: Vibepollo on a Windows PC streams game frames to an Android tablet running KAST" width="820">
</p>

<p align="center"><b>Game streaming that survives network drops</b><br>
Open source · For Vibepollo and Apollo · Android</p>

<p align="center">
  <a href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22com.limelight.kast%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FMikalaiKryvusha%2FKAST%22%2C%22author%22%3A%22MikalaiKryvusha%22%2C%22name%22%3A%22KAST%22%2C%22additionalSettings%22%3A%22%7B%5C%22apkFilterRegEx%5C%22%3A%5C%22nonRoot.*arm64-v8a%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%241%5C%22%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22v(.%2B)%5C%22%7D%22%7D"><img src="docs/get-it-on-obtainium-en.svg" height="72" alt="Get it on Obtainium"></a>
</p>

# KAST — KRINIK Artemis Streaming Tool

<p align="center">
  <a href="#english"><img src="https://img.shields.io/badge/English-2C7BE5?style=for-the-badge" alt="English"></a>
  &nbsp;
  <a href="#russian"><img src="https://img.shields.io/badge/Русский-C0392B?style=for-the-badge" alt="Русский"></a>
</p>

[![License: GPL v3](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE.txt)
[![Base](https://img.shields.io/badge/base-Artemis-6A5ACD.svg)](https://github.com/ClassicOldSong/moonlight-android)
[![Host](https://img.shields.io/badge/host-Vibepollo-00A884.svg)](https://github.com/Nonary/Vibepollo)
[![Platform](https://img.shields.io/badge/platform-Android-3DDC84.svg)](#english)
[![Status](https://img.shields.io/badge/status-on%20hold-lightgrey.svg)](STATUS.md)
[![Framework](https://img.shields.io/badge/framework-KAIF-7F52FF.svg)](https://github.com/MikalaiKryvusha/KAIF)

---

<a name="english"></a>

## English

[Читать по-русски →](#russian)

> **On hold since 2026-11-06.** Development continues as contributions to
> [Super Artemis](https://github.com/Arora-Sir/Super-Artemis): the Russian translation, the app language fix, profile
> reordering and the network drop label from KAST are part of Super Artemis 1.1.0, and new work goes there as pull requests.

**KAST** is an Android client for streaming games and the desktop from a Windows PC. KAST is a fork of
[Artemis](https://github.com/ClassicOldSong/moonlight-android) (Moonlight for Android) built specifically for the
[Vibepollo](https://github.com/Nonary/Vibepollo) host.

Sections: 1 Purpose · 2 Artemis features in KAST · 3 What KAST adds · 4 Build it yourself · 5 Credits and license.

### 1. Purpose

1. KAST keeps the game session alive on slow or dropping mobile internet. While the network is gone, the last
   frame stays on screen; when the network returns, the session continues by itself. Artemis ends such a session
   with its "Connection terminated, error code -1" dialog and a return to the host list. Parsec already waits for
   the network; KAST brings this behavior to a Moonlight-based client.
2. KAST is built for Vibepollo, the most actively developed host among Sunshine, Apollo and Vibepollo. From
   2026-06-26 to 2026-09-26 (GitHub) Vibepollo shipped 434 commits and 37 releases, Sunshine 276 commits and
   4 releases, Apollo no commits and no releases. Server-side support for reconnect is requested from the
   Vibepollo author in [Vibepollo#522](https://github.com/Nonary/Vibepollo/issues/522).
3. KAST is in early development: the code matches Artemis commit `c5cf27f4`, and every KAST feature in Table 2
   is planned or in progress. Release builds are on [GitHub Releases](https://github.com/MikalaiKryvusha/KAST/releases),
   and the Obtainium button above installs KAST and keeps it updated. Most devices need the `nonRoot-arm64-v8a` APK.

### 2. Artemis features in KAST

Table 1 — Artemis features in KAST

| Area | Features |
|---|---|
| Video | custom resolutions and bitrates; Fit / Fill / Stretch; pan and zoom; portrait mode and in-game rotation; frame-rate lock fix |
| Input | mouse modes (mouse, multi-touch, touchpad, local cursor); user-defined virtual buttons with import and export; gamepad skins and free joystick; Joy-Con D-pad; non-QWERTY layouts; Samsung DeX and trackpad scrolling |
| Host integration | virtual display, server commands, clipboard sync (Apollo and Vibepollo) |
| Screens | external-monitor mode; display-on-top for foldables; SBS 3D for external displays |
| Convenience | in-game menu on the Back button; user-defined shortcut commands; quick soft-keyboard switch; compact performance overlay; settings profiles; gamepad debug page |

### 3. What KAST adds

Table 2 — KAST plans (the full roadmap is in [MASTER_PLAN.md](MASTER_PLAN.md))

| # | Feature | State |
|---|---|---|
| 1 | Reconnect: the session survives up to 60 s without network, the last frame stays on screen, the session resumes inside the stream screen | in progress: a loss shorter than the wait keeps the session with the last frame and a "connection lost" label; a connection that died anyway comes back by itself on the same screen; when the network does not return in time, KAST says why |
| 2 | Reconnect settings: wait time and frequency of reconnect attempts as separate options | in progress: both are in the settings — the wait (10–300 s, 60 s by default) and the longest pause between attempts (1–30 s, 3 s by default); automatic reconnection can be turned off |
| 3 | A detailed log of every disconnect and reconnect with its cause | in progress: every loss, every attempt and its outcome are logged; the end dialog names the cause in plain words |
| 4 | A configurable control-stream timeout on the Vibepollo side (request #522, PR #523) | accepted upstream on 2026-10-20 (`control_peer_timeout`), awaiting a Vibepollo nightly |
| 5 | All 22 Artemis languages with quality translations, EN and RU first; the language follows the device language, the KAST setting or the per-app language setting of Android 13+ | planned |
| 6 | An [i] button on every setting: a dialog explains the setting and its possible values | planned |
| 7 | A flexible list of settings presets: any preset can be moved up, moved down or deleted | planned |
| 8 | An experimental performance menu with tunings for MediaTek Dimensity and Snapdragon | planned |
| 9 | A refreshed UI in a modern flat style: what works stays, improvements follow the Pareto rule (80 % of the benefit for 20 % of the effort), fresh Android SDK, palettes and corner radii; no Liquid Glass translucent surfaces | planned |

### 4. Build it yourself

The commands below are for the Windows command prompt.

#### Requirements

- JDK 21; the code compiles for Java 11.
- The Android SDK with platform 36 (`compileSdk 36`) and NDK `27.0.12077973`.
- Git, and Python 3 for the signing-key script.

#### Get the code

```bat
git clone --recurse-submodules https://github.com/MikalaiKryvusha/KAST.git
cd KAST
```

The streaming core `moonlight-common-c` is a submodule
([MikalaiKryvusha/moonlight-common-c](https://github.com/MikalaiKryvusha/moonlight-common-c)). In a clone made without
`--recurse-submodules`, fetch it with `git submodule update --init --recursive`.

#### Build

```bat
gradlew.bat :app:assembleNonRoot_gameDebug
gradlew.bat :app:assembleNonRoot_gameRelease
```

Each build gives one APK per ABI (`arm64-v8a`, `armeabi-v7a`, `x86`, `x86_64`), for example
`app/build/outputs/apk/nonRoot_game/debug/app-nonRoot_game-arm64-v8a-debug.apk`; the release APKs go to
`app/build/outputs/apk/nonRoot_game/release/`. A modern phone or tablet needs `arm64-v8a`.

#### Signing a release

Create your own release key once:

```bat
python -I tools/make-release-key.py
```

The script writes `keys/kast-release.jks` and `keys/release.env` (`KAST_KEYSTORE`, `KAST_KEYSTORE_PASSWORD`,
`KAST_KEY_ALIAS`, `KAST_KEY_PASSWORD`). The `keys/` folder is ignored by git, and the passwords are never printed. The
script refuses to run when the key already exists, because a second key would make installed releases impossible to
update. It calls `keytool` of JDK 21 at `C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot`; for another JDK, change
`KEYTOOL` in the script. When `keys/release.env` exists, the release build signs itself with this key; without it, the
release APKs stay unsigned. Keep a copy of the `keys/` folder outside the project.

#### Project notes

- The native part (`moonlight-core` with the submodule, and `evdev_reader`) builds with ndk-build from
  `app/src/main/jni/Android.mk`.
- Build the `nonRoot_game` flavor: release is KAST (`com.limelight.kast`), debug is KAST Debug
  (`com.limelight.kastdebug`), so both install next to Artemis. The `root` flavor is Moonlight's build for rooted
  devices on Android 7.1 and older.
- Some libraries come from [JitPack](https://jitpack.io), so the first build needs network access to it.

### 5. Credits and license

1. [Moonlight](https://github.com/moonlight-stream/moonlight-android) — Cameron Gutman, Diego Waxemberg, Aaron
   Neyer, Andrew Hennessy and other contributors.
2. [Artemis](https://github.com/ClassicOldSong/moonlight-android) by ClassicOldSong — the base of KAST.
3. [Vibepollo](https://github.com/Nonary/Vibepollo) by Nonary — the host KAST is built for. Thank you, Nonary,
   for Vibepollo: in return we promise a really good Android client for it.
4. [Artemide](https://github.com/derflacco/moonlight-android) by derflacco — the source of performance ideas for
   Table 2, item 8.
5. KAST is licensed under GPL-3.0 ([LICENSE.txt](LICENSE.txt)), the license of Moonlight. The project is run with
   [KAIF](https://github.com/MikalaiKryvusha/KAIF), a framework for work with an AI agent.

---

<a name="russian"></a>

## Русский

<p align="center"><b>Стриминг игр, который переживает обрывы сети</b><br>
Открытый код · Для Vibepollo и Apollo · Android</p>

<p align="center">
  <a href="https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/%7B%22id%22%3A%22com.limelight.kast%22%2C%22url%22%3A%22https%3A%2F%2Fgithub.com%2FMikalaiKryvusha%2FKAST%22%2C%22author%22%3A%22MikalaiKryvusha%22%2C%22name%22%3A%22KAST%22%2C%22additionalSettings%22%3A%22%7B%5C%22apkFilterRegEx%5C%22%3A%5C%22nonRoot.*arm64-v8a%5C%22%2C%5C%22matchGroupToUse%5C%22%3A%5C%22%241%5C%22%2C%5C%22versionExtractionRegEx%5C%22%3A%5C%22v(.%2B)%5C%22%7D%22%7D"><img src="docs/get-it-on-obtainium-ru.svg" height="72" alt="Скачать через Obtainium"></a>
</p>

[Read in English →](#english)

> **Проект на паузе с 6 ноября 2026 года.** Работа продолжается вкладом в
> [Super Artemis](https://github.com/Arora-Sir/Super-Artemis): русский перевод, исправление языка приложения, перестановка
> профилей и надпись о пропаже сети из KAST вошли в Super Artemis 1.1.0, а новые изменения уходят туда запросами на слияние.

**KAST** — Android-клиент для стриминга игр и рабочего стола с компьютера на Windows. KAST — форк
[Artemis](https://github.com/ClassicOldSong/moonlight-android) (Moonlight для Android), созданный специально для
сервера [Vibepollo](https://github.com/Nonary/Vibepollo).

Разделы: 1 Назначение · 2 Возможности Artemis в KAST · 3 Что добавляет KAST · 4 Собрать самому · 5 Благодарности и лицензия.

### 1. Назначение

1. KAST сохраняет игровую сессию на медленном и пропадающем мобильном интернете. Пока сети нет, на экране стоит
   последний кадр; когда сеть возвращается, сессия продолжается сама. Artemis в таком случае закрывает сессию
   окном «Connection terminated, error code -1» и возвращает пользователя к списку серверов. Parsec уже умеет
   ждать сеть; KAST даёт такое поведение клиенту на основе Moonlight.
2. KAST создан для Vibepollo — самого активно развиваемого сервера среди Sunshine, Apollo и Vibepollo. С 26.06 по
   26.09.2026 (GitHub) у Vibepollo 434 коммита и 37 релизов, у Sunshine — 276 коммитов и 4 релиза, у Apollo — ни
   одного коммита и ни одного релиза. Поддержку переподключения на стороне сервера мы запросили у автора
   Vibepollo в [Vibepollo#522](https://github.com/Nonary/Vibepollo/issues/522).
3. KAST в ранней разработке: код совпадает с коммитом Artemis `c5cf27f4`, каждая возможность KAST из Таблицы 2
   запланирована или в работе. Релизные сборки лежат в [GitHub Releases](https://github.com/MikalaiKryvusha/KAST/releases),
   а кнопка Obtainium выше ставит KAST и сама его обновляет. Большинству устройств нужен APK `nonRoot-arm64-v8a`.

### 2. Возможности Artemis в KAST

Таблица 1 — Возможности Artemis в KAST

| Область | Возможности |
|---|---|
| Видео | пользовательские разрешения и битрейты; режимы Fit / Fill / Stretch; сдвиг и масштаб; портретный режим и поворот в игре; исправление фиксации частоты кадров |
| Ввод | режимы мыши (мышь, мультитач, тачпад, локальный курсор); пользовательские виртуальные кнопки с импортом и экспортом; скины геймпада и свободный стик; крестовина Joy-Con; раскладки не-QWERTY; прокрутка Samsung DeX и трекпада |
| Связь с сервером | виртуальный дисплей, серверные команды, общий буфер обмена (Apollo и Vibepollo) |
| Экраны | режим внешнего монитора; режим «поверх всего» для складных телефонов; SBS 3D для внешних дисплеев |
| Удобство | игровое меню по кнопке «Назад»; пользовательские команды-ярлыки; быстрое переключение экранной клавиатуры; компактный оверлей производительности; профили настроек; страница отладки геймпада |

### 3. Что добавляет KAST

Таблица 2 — Планы KAST (вся дорожная карта — в [MASTER_PLAN.md](MASTER_PLAN.md))

| № | Возможность | Состояние |
|---|---|---|
| 1 | Переподключение: сессия переживает до 60 с без сети, последний кадр стоит на экране, сессия возобновляется внутри экрана игры | в работе: провал короче времени ожидания не рвёт сессию — стоит последний кадр и надпись «Связь потеряна»; соединение, которое всё-таки умерло, KAST поднимает сам на том же экране; если сеть не вернулась вовремя — KAST говорит почему |
| 2 | Настройки переподключения: время ожидания и частота попыток переподключения — отдельными опциями | в работе: обе опции есть в настройках — время ожидания (10–300 с, по умолчанию 60 с) и самая долгая пауза между попытками (1–30 с, по умолчанию 3 с); автоматическое переподключение можно выключить |
| 3 | Подробный журнал каждого разрыва и каждого переподключения с причиной | в работе: каждый провал, каждая попытка и исход пишутся в журнал; диалог конца называет причину словами |
| 4 | Настраиваемый таймаут управляющего канала на стороне Vibepollo (запрос #522, PR #523) | принят автором 2026-10-20 (`control_peer_timeout`), ждём nightly Vibepollo |
| 5 | Все 22 языка Artemis с качественными переводами, первые — EN и RU; язык берётся из языка устройства, из настроек KAST или из языка приложения в настройках Android 13+ | запланировано |
| 6 | Кнопка [i] у каждой настройки: диалог с пояснением настройки и её возможных значений | запланировано |
| 7 | Гибкий список пресетов настроек: любой пресет можно поднять, опустить или удалить | запланировано |
| 8 | Экспериментальное меню производительности с оптимизациями под MediaTek Dimensity и Snapdragon | запланировано |
| 9 | Освежённый интерфейс в современном плоском стиле: работающее остаётся, улучшения идут по правилу Парето (80 % пользы за 20 % усилий), свежий Android SDK, палитры и радиусы скруглений; стеклянных полупрозрачных поверхностей Liquid Glass нет | запланировано |

### 4. Собрать самому

Команды ниже написаны для командной строки Windows.

#### Что нужно

- JDK 21; код собирается под Java 11.
- Android SDK с платформой 36 (`compileSdk 36`) и NDK `27.0.12077973`.
- Git и Python 3 для скрипта ключа подписи.

#### Получить код

```bat
git clone --recurse-submodules https://github.com/MikalaiKryvusha/KAST.git
cd KAST
```

Ядро стриминга `moonlight-common-c` подключено сабмодулем
([MikalaiKryvusha/moonlight-common-c](https://github.com/MikalaiKryvusha/moonlight-common-c)). Если клон сделан без
`--recurse-submodules`, подтяните его командой `git submodule update --init --recursive`.

#### Собрать

```bat
gradlew.bat :app:assembleNonRoot_gameDebug
gradlew.bat :app:assembleNonRoot_gameRelease
```

Каждая сборка даёт по APK на каждый ABI (`arm64-v8a`, `armeabi-v7a`, `x86`, `x86_64`), например
`app/build/outputs/apk/nonRoot_game/debug/app-nonRoot_game-arm64-v8a-debug.apk`; релизные APK ложатся в
`app/build/outputs/apk/nonRoot_game/release/`. Современному телефону или планшету нужен `arm64-v8a`.

#### Подписать релиз

Один раз создайте свой ключ релиза:

```bat
python -I tools/make-release-key.py
```

Скрипт кладёт `keys/kast-release.jks` и `keys/release.env` (`KAST_KEYSTORE`, `KAST_KEYSTORE_PASSWORD`,
`KAST_KEY_ALIAS`, `KAST_KEY_PASSWORD`). Папку `keys/` git не видит, пароли скрипт не печатает. Если ключ уже есть,
скрипт откажется работать: со вторым ключом установленные релизы будет не обновить. Скрипт вызывает `keytool` из JDK 21
по пути `C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot`, для другого JDK поправьте `KEYTOOL` в скрипте. Когда
`keys/release.env` есть, релизная сборка сама подписывается этим ключом, а без него релизные APK остаются
неподписанными. Храните копию папки `keys/` вне проекта.

#### Особенности проекта

- Нативная часть (`moonlight-core` вместе с сабмодулем и `evdev_reader`) собирается через ndk-build из
  `app/src/main/jni/Android.mk`.
- Собирайте флейвор `nonRoot_game`: релиз называется KAST (`com.limelight.kast`), отладочная сборка KAST Debug
  (`com.limelight.kastdebug`), и обе ставятся рядом с Artemis. Флейвор `root` остался от Moonlight и нужен рутованным
  устройствам на Android 7.1 и старше.
- Часть библиотек приходит с [JitPack](https://jitpack.io), поэтому первой сборке нужен доступ к нему.

### 5. Благодарности и лицензия

1. [Moonlight](https://github.com/moonlight-stream/moonlight-android) — Cameron Gutman, Diego Waxemberg, Aaron
   Neyer, Andrew Hennessy и другие участники проекта.
2. [Artemis](https://github.com/ClassicOldSong/moonlight-android) — основа KAST; автор Artemis — ClassicOldSong.
3. [Vibepollo](https://github.com/Nonary/Vibepollo) — сервер, для которого создан KAST; автор Vibepollo — Nonary.
   Спасибо, Nonary, за Vibepollo: взамен мы обещаем для него отличный Android-клиент.
4. [Artemide](https://github.com/derflacco/moonlight-android) — источник идей по производительности для пункта 8
   Таблицы 2; автор Artemide — derflacco.
5. KAST распространяется по лицензии GPL-3.0 ([LICENSE.txt](LICENSE.txt)) — лицензии Moonlight. Проект ведётся по
   [KAIF](https://github.com/MikalaiKryvusha/KAIF) — фреймворку работы с ИИ-агентом.
