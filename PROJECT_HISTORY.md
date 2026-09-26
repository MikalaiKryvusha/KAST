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
