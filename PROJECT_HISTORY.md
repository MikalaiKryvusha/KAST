# KAST — Project History (the chronicle)

> The APPEND-ONLY chronicle of how this project lived and grew: closed sessions, shipped phases,
> releases, big decisions in the order they happened. This is where `STATUS.md` sheds its past —
> STATUS stays a short live summary of NOW; everything finished moves HERE (the "bonsai trim" step
> of `/end-chat-soft`).
>
> **Not required reading.** This file is NOT part of `/resume`'s canon set and not in the
> before-every-task minimum — open it only when you actually need the archaeology: how a decision
> came to be, what an old phase contained, when something shipped.
>
> **Chronicle rules (ADR discipline):**
> - **Append-only, newest on top.** A recorded entry is never edited to say something else —
>   history that can be rewritten is not history. Corrections come as NEW entries that reference
>   and supersede the old one.
> - An entry moves here VERBATIM from `STATUS.md` when its work closes — move, don't rewrite;
>   the entry already carries its dates, counters and file pointers.
> - Entries mention versions and dates freely — a chronicle legitimately speaks of old versions,
>   and the update machinery's stale-claims scan knows to leave this file alone.
> - When the file grows unwieldy, split by era: keep the newest era here, move older ones to
>   `PROJECT_HISTORY_<era>.md` files, and leave a one-line index at the top of this file
>   (the pattern large changelogs use).
>
> Living document — never DONE-tagged.

---

## Entries (newest first)

## Чат 2026-11-06 ≈09:40–10:55 — Super Artemis 1.1.0 и PR #13

- Письма мейнтейнера разобраны: PR #8, #10, #11 влиты, нас вписали в `credits.json` и README; #7 часть 2 и переводы на 21 язык он
  сделал сам (`f752f056`, `91e52999`), выпуск 1.1.0. Задача «переводы по PR на язык» снята (слово владельца), #7 закрыт нами по слову «закрывай #7».
- Ползунки и разрешение (`ideas/16`, `ideas/17`): развилка «в окне или в списке» — интервью 003 (ответ A/A), код в окне настройки,
  15 сборок с правками вида по словам владельца, проверка на Титане — `testcases/reports/2026-11-06_super-artemis-sliders.md`;
  **PR #13** открыт по слову «открывай PR» (`829e3253`), страница «было/стало» — `reports/sa-sliders/before_after.html`.
- Правило владельца: русские пояснения без конструкций на тире, брать готовые строки приложения (память агента).


### 2026-11-06 10:55 — раздел «Чат 2026-10-30 22:10 – 2026-10-31 01:10 — вклад в Super Artemis по тикетам мейнтейнера» (перенесён из STATUS дословно)


- Ответы мейнтейнера на PR #8 и issue #3–#7 прочитаны: ждут PR по #4 и два PR по #7, #3 — родитель для следующих языков.
- **Открыты PR в Super Artemis** (каждый отдельным PR, слово владельца «на все отдельный ПР делаем»): #10 перетаскивание профилей
  (`plans/08`), #11 надпись «Connection lost, waiting for the network… N s» вверху слева с фейдом (`plans/09`, найден и исправлен
  дефект — застывшая надпись под диалогом). Оба проверены на Титане, отчёты в `testcases/reports/2026-10-3*_super-artemis-*`.
- #7, часть 2 — авто-возобновление: код в ветке `feature/auto-resume` (`a7b7d335`, WIP, без PR), прогоны и следующий шаг — `plans/10`.
- Четыре профиля владельца из Artemide перенесены в его Super Artemis и проверены на Vibepollo (`testcases/reports/2026-10-30_super-artemis-profiles-vibepollo.md`).
- Макеты приняты владельцем: ползунки — вариант A (`ideas/16`), ввод разрешения — вариант R2 (`ideas/17`).
- Vibepollo: `channels = 2` (Титан и MacBook владельца стримят одновременно); обрыв только у Титана — `bash tools/titan-wifi-drop.sh`.
- Урок: изменения интерфейса показывать владельцу до PR (память агента `show-ui-before-pr.md`, `EXPERIENCE.md`).

Прошлые сессии — `PROJECT_HISTORY.md` (сессия 2026-09-26 перенесена туда 2026-10-30).

### 2026-10-31 01:05 — раздел «Чат 2026-10-30 (≈16:15–18:15) — помогаем Super Artemis с переводом» (перенесён из STATUS дословно)


- Поручение владельца дословно — `ideas/15_help_super_artemis_localization.md` (`a884d7fe`): довести до полных и аккуратных
  все языки, которые в Super Artemis уже есть, — файлами строк `values-XX/strings.xml` и правил разметки `values-XX/dimens.xml`;
  другие языки — отдельными PR позже (слово владельца в чате ≈18:00).
- **PR отправлен 18:07:** https://github.com/Arora-Sir/Super-Artemis/pull/8 — из ветки `feature/ru-localization` нашего
  репозитория KAST (отдельный форк GitHub не создаёт — одна сеть форков Artemis), три коммита поверх `6c23e114`: `1e344c63`
  перевод ru (590 новых, 173 исправленных) · `f36880b0` язык приложения из настроек Android (закрывает #6) · `fb84338a`
  «Default» в списке языков; 13 снимков (`reports/l10n/shots/`, без строки состояния, панели задач и имени ПК); комментарий 18:13 —
  резервная копия и раздел «О приложении» проверены после отправки.
- Issue в Super Artemis по слову владельца: ответ в #3; #4 порядок профилей; #5 мастер-профиль (идея на обсуждение); #6 дефект
  выбора языка; #7 надпись поверх последнего кадра и авто-возобновление из KAST (таймаут ядра из KAST у них уже есть, с
  благодарностью нам в `credits.json`).
- Отчёт о прогоне — `testcases/reports/2026-10-30_super-artemis-ru.md` (вердикт partial: не открыт сам экран «О приложении»;
  2 падения `BackupRestoreTest` те же на чистом `6c23e114` под Windows).
- KAST на 3G (Titan через Tailscale): 20 с без мобильных данных — `outcome=held elapsed=23459`, картинка ≈10 с после возврата сети;
  переход сотовая → Wi-Fi удержан (2,5 с). Владелец сегодня едет с KAST и проверяет LTE сам.
- Инструменты: `tools/l10n/l10n.mjs` (status · extract · validate · merge — клавиши не переводятся, смешение алфавитов в слове —
  ошибка), `tools/l10n/l10n-table.mjs` (таблица согласования), строка в `HOUSE_RULES.md` → раздел 6.
- Стенд: Super Artemis сопряжён с Vibepollo как «Super Artemis S21 FE» и «Super Artemis Titan1» (маска прав 118693632, как у
  клиентов владельца); PIN Samsung — в `.env` (вне git).

### 2026-10-30 18:15 — раздел «Что сделано в чате 2026-09-26 (сессия 2)» (перенесён из STATUS дословно)

## Что сделано в чате 2026-09-26 (сессия 2, ≈13:30–21:15)

- KAIF 2.8: голосовой вызов, хуки, стражи Bash (обратная косая в heredoc, проверка в трубе перед коммитом, обратная кавычка в
  `node -e "…"`); правила владельца П1–П13 в `HOUSE_RULES.md`; обязательство комментировать код Artemis — `AGENT_GUIDE.md` →
  Code style, план 07 и счётчик `tools/count-uncommented.mjs` (119 из 1900 методов, 6,3 %).
- Ф2 закрыта и слита; Ф3 — шаги 1, 3–7, 10–12 (отчёт `testcases/reports/2026-09-26_F3_resume.md`, прогоны 1–18).
- Баги: 05 ✅ (иконка), 07 ✅ (падение после сдачи), 08 ✅ (снят со снимком), 06 — мёртвая строка удалена, своя страница
  производительности впереди.
- Идеи владельца, записаны дословно: 11 (понятные причины вместо кодов), 12 (API или CLI у KAST), 13 (меню настройки сервера
  Vibepollo), 14 (плашки: вверху слева ✅, фейд 0,5 с ✅, размер и вид — в общих настройках).
- Автоматизация по локаторам (П13): описания у плиток приложений и у кнопок экрана хостов — поток и настройки открываются
  `tapText`, без снимков.
- Решения владельца (`MASTER_PLAN.md` → журнал; дословно в коммите `d796cf00`): «тогда пока 1.0 не собираем» · «схема версий по
  Семантическому Версионированию 2.0 - три цифры x.y.z и в скобках скфорзной номер сборки».

### 2026-09-26 21:15 — закрытые пункты пула задач (перенесены из STATUS дословно) ✅

- [x] Локальная правка Vibepollo — `plans/01_vibepollo_local_control_timeout_patch.md`: шаги 1–6 ✅; шаг 7 — критерии 2–3 ✅, откат не проверялся.
- [x] План эпика «переподключение» — `plans/02_EPIC_reconnect.md` + операционный план Ф1 `plans/03_epic02_F1_build_stand.md` (2026-09-26).
- [x] Ф1 по плану 03 — закрыта 2026-09-26.
- [x] **Ф2 по плану 04** — закрыта 2026-09-26 17:34: отчёт `testcases/reports/2026-09-26_F2_hold.md`, судья PASS, слияние `b2283048`.
- [x] Свой форк `moonlight-common-c` — создан 2026-09-26 (интервью #001, Q1: A), правка в ветке `kast/enet-timeout`;
      `.gitmodules` KAST на него — вместе со слиянием Ф2.
- [x] Иконка KAST в лаунчер Android — векторная (`assets/logo/kast-icon.svg` → `tools/make-launcher-icon.mjs`), владелец
      принял 2026-09-26 18:25 (`bugs/05_DONE`).
- [x] Имя приложения и `applicationId` KAST — `com.limelight.kastdebug` / «KAST Debug» (релиз — `.kast` / «KAST»),
      стоит на Титане рядом с Artemis/Artemide (2026-09-26, план 03, шаг 4).

### 2026-09-26 — сессия 1: развёртывание KAST (перенесено из STATUS дословно) ✅

- **Форк:** публичный https://github.com/MikalaiKryvusha/KAST — форк Artemis
  (`ClassicOldSong/moonlight-android`, ветка `moonlight-noir`, база `c5cf27f4` от 2026-09-09). Локально —
  `D:\work\ai_sandbox\KAST`; remote `upstream` = Artemis. Выбор базы и цифры — `researches/01` → «Выбор базы форка».
- **KAIF:** 2.8 (выпуск 2026-09-26), поднята `/kaif-update` 2026-09-26 13:36. Язык `ru`, сфера `programming`, пять
  агентских систем. Долг по 2.8 — `plans/05_kaif28_adoption_debt.md`: хуки и голос закрыты, дом-правила в работе,
  живая проверка страницы вопросов — при первом настоящем вопросе.
- **Причины обрыва найдены** — `researches/01_why_session_drops_on_network_loss.md`: таймаут ENet клиента 10 с
  (`ControlStream.c:1802`) → «Error code -1» → `Game.java:3563` закрывает экран; сервер Vibepollo сам отпускает
  клиента по умолчаниям ENet (5–30 с) — `ping_timeout=60000` этого не покрывает. Решение — два слоя: удержание +
  авто-возобновление.
- **Документы владельца:** `GOAL.md` (из его слов), `MASTER_PLAN.md` (фазы Ф0–Ф7 со схемой). Идеи — каждая
  сначала дословно, потом причёсана (правило KAIF 18):
  - `ideas/01` — переподключение: ждать сеть до 60 с; политика ожидания — отдельными опциями (время, частота повторов);
  - `ideas/02` — экспериментальное меню оптимизаций под Dimensity и Snapdragon (Artemide + треды сообщества), ✅ одобрена 2026-09-26;
  - `ideas/03` — локализация: все 22 языка Artemis с качественными переводами (полных сейчас нет), язык — системный, из настроек KAST или ОС;
  - `ideas/04` — освежить UI/UX, сделать современнее;
  - `ideas/05` — пресеты = профили: три уровня (общие настройки, мастер-пресет, пресет), перемещение выше/ниже, удаление;
  - `ideas/06` — кнопка [i] у каждого пункта настроек → модальный диалог с пояснением и значениями (~124 пункта).

### <date> — <session/phase/release title> <✅/🎉>
`<The entry as it lived in STATUS.md — verbatim: what was done, key numbers, file pointers.>`
