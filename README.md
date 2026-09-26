<p align="center">
  <img src="assets/logo/kast-logo.png" alt="KAST: Vibepollo on a Windows PC streams game frames through the sky to an Android tablet" width="820">
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
[![Status](https://img.shields.io/badge/status-early%20development-orange.svg)](STATUS.md)
[![Framework](https://img.shields.io/badge/framework-KAIF-7F52FF.svg)](https://github.com/MikalaiKryvusha/KAIF)

---

<a name="english"></a>

## English

[Читать по-русски →](#russian)

**KAST** is an Android client for streaming games and the desktop from a Windows PC. KAST is a fork of
[Artemis](https://github.com/ClassicOldSong/moonlight-android) (Moonlight for Android) built specifically for the
[Vibepollo](https://github.com/Nonary/Vibepollo) host.

Sections: 1 Purpose · 2 Artemis features in KAST · 3 What KAST adds · 4 Build · 5 Credits and license.

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
   is planned or in progress. There are no builds to download yet.

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
| 1 | Reconnect: the session survives up to 60 s without network, the last frame stays on screen, the session resumes inside the stream screen | in progress: a loss shorter than the wait keeps the session with the last frame and a "connection lost" label; automatic resume is next |
| 2 | Reconnect settings: wait time and frequency of reconnect attempts as separate options | in progress: the wait time is in the settings (10–300 s, 60 s by default); the attempt frequency comes with automatic resume |
| 3 | A detailed log of every disconnect and reconnect with its cause | in progress: every loss and its outcome are logged; resume lines come with automatic resume |
| 4 | A configurable control-stream timeout on the Vibepollo side (request #522, local patch) | in progress |
| 5 | All 22 Artemis languages with quality translations, EN and RU first; the language follows the device language, the KAST setting or the per-app language setting of Android 13+ | planned |
| 6 | An [i] button on every setting: a dialog explains the setting and its possible values | planned |
| 7 | A flexible list of settings presets: any preset can be moved up, moved down or deleted | planned |
| 8 | An experimental performance menu with tunings for MediaTek Dimensity and Snapdragon | planned |
| 9 | A refreshed UI in a modern flat style: what works stays, improvements follow the Pareto rule (80 % of the benefit for 20 % of the effort), fresh Android SDK, palettes and corner radii; no Liquid Glass translucent surfaces | planned |

### 4. Build

Clone the repository with its submodules and build the debug APK on Windows (Android SDK with `compileSdk 36`
and NDK `27.0.12077973` are required):

```bat
git clone --recurse-submodules https://github.com/MikalaiKryvusha/KAST.git
cd KAST
gradlew.bat :app:assembleNonRoot_gameDebug
```

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

[Read in English →](#english)

**KAST** — Android-клиент для стриминга игр и рабочего стола с компьютера на Windows. KAST — форк
[Artemis](https://github.com/ClassicOldSong/moonlight-android) (Moonlight для Android), созданный специально для
сервера [Vibepollo](https://github.com/Nonary/Vibepollo).

Разделы: 1 Назначение · 2 Возможности Artemis в KAST · 3 Что добавляет KAST · 4 Сборка · 5 Благодарности и лицензия.

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
   запланирована или в работе. Готовых билдов пока нет.

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
| 1 | Переподключение: сессия переживает до 60 с без сети, последний кадр стоит на экране, сессия возобновляется внутри экрана игры | в работе: провал короче времени ожидания не рвёт сессию — стоит последний кадр и надпись «Связь потеряна»; следующее — автоматическое возобновление |
| 2 | Настройки переподключения: время ожидания и частота попыток переподключения — отдельными опциями | в работе: время ожидания есть в настройках (10–300 с, по умолчанию 60 с); частота попыток — вместе с автоматическим возобновлением |
| 3 | Подробный журнал каждого разрыва и каждого переподключения с причиной | в работе: каждый провал и его исход пишутся в журнал; строки возобновления — вместе с автоматическим возобновлением |
| 4 | Настраиваемый таймаут управляющего канала на стороне Vibepollo (запрос #522, локальный патч) | в работе |
| 5 | Все 22 языка Artemis с качественными переводами, первые — EN и RU; язык берётся из языка устройства, из настроек KAST или из языка приложения в настройках Android 13+ | запланировано |
| 6 | Кнопка [i] у каждой настройки: диалог с пояснением настройки и её возможных значений | запланировано |
| 7 | Гибкий список пресетов настроек: любой пресет можно поднять, опустить или удалить | запланировано |
| 8 | Экспериментальное меню производительности с оптимизациями под MediaTek Dimensity и Snapdragon | запланировано |
| 9 | Освежённый интерфейс в современном плоском стиле: работающее остаётся, улучшения идут по правилу Парето (80 % пользы за 20 % усилий), свежий Android SDK, палитры и радиусы скруглений; стеклянных полупрозрачных поверхностей Liquid Glass нет | запланировано |

### 4. Сборка

Клонируйте репозиторий с сабмодулями и соберите отладочный APK под Windows (нужны Android SDK с `compileSdk 36`
и NDK `27.0.12077973`):

```bat
git clone --recurse-submodules https://github.com/MikalaiKryvusha/KAST.git
cd KAST
gradlew.bat :app:assembleNonRoot_gameDebug
```

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
