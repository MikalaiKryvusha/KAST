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
[Artemis](https://github.com/ClassicOldSong/moonlight-android) (Moonlight for Android) and is built for the
[Vibepollo](https://github.com/Nonary/Vibepollo) host.

Sections: 1 Purpose · 2 Features inherited from Artemis · 3 What KAST brings · 4 Build · 5 Credits and license.

### 1. Purpose

1. KAST keeps the session alive on slow or dropping mobile internet. While the network is gone, the last frame
   stays on screen; when it returns, the stream resumes by itself — with no "error -1" and no trip back to the host
   list. Parsec behaves this way today, and KAST brings the same to Moonlight-based streaming.
2. KAST targets Vibepollo on purpose: Vibepollo is the most actively developed host of its family. From 2026-06-26
   to 2026-09-26 (GitHub) Vibepollo shipped 434 commits and 37 releases, Sunshine — 276 commits and 4 releases,
   Apollo — no commits and no releases. Thank you, [Nonary](https://github.com/Nonary), for Vibepollo. We asked for
   the server side of reconnect in [Vibepollo#522](https://github.com/Nonary/Vibepollo/issues/522) and promise a
   great Android client in return.
3. KAST is in early development: the code equals Artemis `c5cf27f4`, and the KAST features in Table 2 are planned.
   There are no downloads yet.

### 2. Features inherited from Artemis

Table 1 — What KAST already does as the heir of Artemis

| Area | Features |
|---|---|
| Video | custom resolutions and bitrates; Fit / Fill / Stretch; pan and zoom; portrait mode and in-game rotation; frame-rate lock fix |
| Input | mouse modes (mouse, multi-touch, touchpad, local cursor); custom virtual buttons with import and export; gamepad skins and free joystick; Joy-Con D-pad; non-QWERTY layouts; Samsung DeX and trackpad scrolling |
| Host integration | virtual display, server commands, clipboard sync (Apollo and Vibepollo) |
| Screens | external-monitor mode; display-on-top for foldables; SBS 3D for external displays |
| Convenience | in-game back menu; custom shortcut commands; quick soft-keyboard switch; compact performance overlay; settings profiles; gamepad debug page |

### 3. What KAST brings

Table 2 — KAST plans (the full roadmap is in [MASTER_PLAN.md](MASTER_PLAN.md))

| # | Feature | State |
|---|---|---|
| 1 | Reconnect: wait for the network up to 60 s, keep the last frame, resume inside the stream screen; wait time and retry frequency are separate settings; a detailed disconnect and reconnect log | planned |
| 2 | Server side: a configurable control-stream timeout in Vibepollo — requested upstream, a local patch is being built | in progress |
| 3 | All 22 Artemis languages with quality translations, EN and RU first; the language follows the system, the app setting or the OS setting | planned |
| 4 | An [i] button on every setting: a dialog explains the setting and its values | planned |
| 5 | A flexible presets list: move any preset up and down, delete any preset | planned |
| 6 | An experimental performance menu with tunings for MediaTek Dimensity and Snapdragon | planned |
| 7 | A refreshed modern UI: what works stays, improvements follow the 80/20 rule, fresh SDK, palettes and corner radii; no Liquid Glass | planned |

### 4. Build

Clone the repository with its submodules and build the debug APK (Android SDK with `compileSdk 36` and NDK
`27.0.12077973` are required):

```bash
git clone --recurse-submodules https://github.com/MikalaiKryvusha/KAST.git
gradlew.bat :app:assembleNonRoot_gameDebug
```

### 5. Credits and license

1. **Moonlight** — Cameron Gutman, Diego Waxemberg, Aaron Neyer, Andrew Hennessy and contributors.
2. **Artemis** — [ClassicOldSong](https://github.com/ClassicOldSong), the base of KAST.
3. **Vibepollo** — [Nonary](https://github.com/Nonary), the host KAST is built for.
4. **Artemide** — [derflacco](https://github.com/derflacco/moonlight-android), the source of performance ideas for
   Table 2, item 6.
5. KAST is licensed under GPL-3.0 ([LICENSE.txt](LICENSE.txt)), inherited from Moonlight. The project is run with
   the [KAIF](https://github.com/MikalaiKryvusha/KAIF) framework.

---

<a name="russian"></a>

## Русский

[Read in English →](#english)

**KAST** — Android-клиент для стриминга игр и рабочего стола с компьютера на Windows. KAST — форк
[Artemis](https://github.com/ClassicOldSong/moonlight-android) (Moonlight для Android), созданный для сервера
[Vibepollo](https://github.com/Nonary/Vibepollo).

Разделы: 1 Назначение · 2 Возможности, унаследованные от Artemis · 3 Что приносит KAST · 4 Сборка ·
5 Благодарности и лицензия.

### 1. Назначение

1. KAST сохраняет сессию на медленном и пропадающем мобильном интернете. Пока сети нет, на экране стоит последний
   кадр; когда сеть вернулась, поток восстанавливается сам — без «error -1» и без возврата к списку хостов. Так
   сегодня ведёт себя Parsec, и KAST приносит это в стриминг на основе Moonlight.
2. KAST нацелен на Vibepollo намеренно: Vibepollo — самый активно развиваемый сервер своего семейства. С 26.06 по
   26.09.2026 (GitHub) у Vibepollo 434 коммита и 37 выпусков, у Sunshine — 276 коммитов и 4 выпуска, у Apollo —
   ни одного коммита и ни одного выпуска. Спасибо, [Nonary](https://github.com/Nonary), за Vibepollo. Серверную
   сторону переподключения мы попросили в [Vibepollo#522](https://github.com/Nonary/Vibepollo/issues/522) и
   обещаем взамен отличный Android-клиент.
3. KAST в ранней разработке: код равен Artemis `c5cf27f4`, возможности KAST из Таблицы 2 запланированы. Готовых
   сборок пока нет.

### 2. Возможности, унаследованные от Artemis

Таблица 1 — Что KAST уже умеет как наследник Artemis

| Область | Возможности |
|---|---|
| Видео | свои разрешения и битрейты; режимы Fit / Fill / Stretch; сдвиг и масштаб; портретный режим и поворот в игре; исправление фиксации частоты кадров |
| Ввод | режимы мыши (мышь, мультитач, тачпад, локальный курсор); свои виртуальные кнопки с импортом и экспортом; скины геймпада и свободный стик; крестовина Joy-Con; раскладки не-QWERTY; прокрутка Samsung DeX и трекпада |
| Связь с сервером | виртуальный дисплей, серверные команды, общий буфер обмена (Apollo и Vibepollo) |
| Экраны | режим внешнего монитора; режим «поверх всего» для складных телефонов; SBS 3D для внешних дисплеев |
| Удобство | меню «назад» в игре; свои команды-ярлыки; быстрое переключение экранной клавиатуры; компактный оверлей производительности; профили настроек; страница отладки геймпада |

### 3. Что приносит KAST

Таблица 2 — Планы KAST (вся дорожная карта — в [MASTER_PLAN.md](MASTER_PLAN.md))

| № | Возможность | Состояние |
|---|---|---|
| 1 | Переподключение: ожидание сети до 60 с, последний кадр на экране, возобновление внутри экрана игры; время ожидания и частота повторов — отдельные настройки; подробный журнал разрывов и восстановлений | в плане |
| 2 | Серверная сторона: настраиваемый таймаут управляющего канала в Vibepollo — запрос автору отправлен, локальная правка собирается | в работе |
| 3 | Все 22 языка Artemis с качественными переводами, первые — EN и RU; язык берётся из системы, из настроек приложения или из настроек ОС | в плане |
| 4 | Кнопка [i] у каждой настройки: диалог с пояснением настройки и её значений | в плане |
| 5 | Гибкий список пресетов: любой пресет перемещается выше и ниже и удаляется отдельно | в плане |
| 6 | Экспериментальное меню производительности с оптимизациями под MediaTek Dimensity и Snapdragon | в плане |
| 7 | Освежённый современный интерфейс: работающее остаётся, улучшения идут по правилу 80/20, свежие SDK, палитры и радиусы скруглений; без Liquid Glass | в плане |

### 4. Сборка

Клонируйте репозиторий с сабмодулями и соберите отладочный APK (нужны Android SDK с `compileSdk 36` и NDK
`27.0.12077973`):

```bash
git clone --recurse-submodules https://github.com/MikalaiKryvusha/KAST.git
gradlew.bat :app:assembleNonRoot_gameDebug
```

### 5. Благодарности и лицензия

1. **Moonlight** — Cameron Gutman, Diego Waxemberg, Aaron Neyer, Andrew Hennessy и участники.
2. **Artemis** — [ClassicOldSong](https://github.com/ClassicOldSong), основа KAST.
3. **Vibepollo** — [Nonary](https://github.com/Nonary), сервер, для которого создан KAST.
4. **Artemide** — [derflacco](https://github.com/derflacco/moonlight-android), источник идей производительности для
   пункта 6 Таблицы 2.
5. KAST распространяется по лицензии GPL-3.0 ([LICENSE.txt](LICENSE.txt)), унаследованной от Moonlight. Проект
   ведётся по фреймворку [KAIF](https://github.com/MikalaiKryvusha/KAIF).
