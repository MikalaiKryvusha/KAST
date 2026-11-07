# Plan 14 (epic 13, Ф0b) — KrinikTribitApp: убрать инструменты прежнего пути из публичного репозитория

> **Created:** 2026-11-07 · **Parent:** `plans/13_EPIC_distribution_freedom.md` → строка «Ф0b — что убирается из публичного KrinikTribitApp»
> · **Owner's word:** «Инструменты прежнего пути: убрать…» → «e,hfnm» (= «убрать»), 2026-11-07; «ГОУ, план начинаем делать!»
> · **Repo:** `D:\work\ai_sandbox\KrinikTribit` (MikalaiKryvusha/KrinikTribitApp, `main`) · **Tests:** `testcases/TC_distribution_freedom.md` → TRB-1…TRB-4

## Goal vector

Achieve: публичный репозиторий KrinikTribitApp содержит только наше нативное приложение и его инструменты — «не клон, не патч, не взлом».
Maintain: debug-сборка `app/` зелёная; инструменты нового приложения (`tools/fetch_speaker_images.py`, `tools/devices/`, `tools/screen_profile.py`,
проверки) на месте; чужие незакоммиченные файлы другой сессии (`STATUS.md`, `TASK_KUIPS_*.md`) не тронуты.
Avoid: переписывание истории git (только по отдельному слову владельца); правка исторических документов (`PROJECT_HISTORY.md`, `bugs/`, `interviews/`).

## Acceptance criteria

1. `git ls-files` не содержит: `build.sh`, `patches/**`, `tools/recon/**`, `tools/gen_r.py`, `tools/kotlin_defaults.py`, `tools/native_src_count.py`,
   `tools/native_src_guard.py`, `tools/decompile_clean.py`, `tools/test_decompile_clean.py` (TRB-1).
2. `gradlew :app:assembleDebug` зелёная после удаления (TRB-2).
3. README (EN/RU/ZH), AGENT_GUIDE, HOUSE_RULES, карты проекта не называют удалённые файлы как действующие (TRB-3: `git grep` пусто
   по живым документам).
4. Раздел сборки README описывает сборку нашего приложения (Gradle), а не разбор официального APK (TRB-4) — стандартный блок из плана 16.

## Steps

- [ ] 1. Снимок до: `git ls-files | grep` по списку → 37 файлов; `git status` — только чужие файлы другой сессии. *(anchor: «отслеживаемые файлы на 2026-11-07»)*
- [ ] 2. Проверить, что `app/` не зовёт удаляемое: `git grep` по `app/`, `settings.gradle.kts`, `build.gradle.kts` (известна одна ссылка — комментарий в
      `app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml:2`, переписать без `patches/apply.py`).
- [ ] 3. `git rm -r` по списку; `.gitignore` строки старого пути (`original-apk/`, `decompiled/`, `work/`, `out/`, `tools/apktool.jar`) оставить —
      файлы на диске владельца остаются, git их видеть не должен.
- [ ] 4. Живые документы: AGENT_GUIDE (шаг 11 чек-листа и раздел Build), HOUSE_RULES (строки 114, 182, 200–205), `PROJECT_STRUCTURE_EXTERNAL_MAP.md`,
      `PROJECT_ARCHITECTURE_INTERNAL_MAP.md` — описать сборку `gradlew :app:assemble*`, прежний путь — одной строкой «убран 2026-11-07, история в git».
- [ ] 5. README EN/RU/ZH: раздел сборки → стандартный блок «Build it yourself» (план 16, шаг 2); таблица файлов без `patches/`, `build.sh`.
- [ ] 6. Сборка: `gradlew :app:assembleDebug` по рецепту HOUSE_RULES KrinikTribit (JDK 21 явно). Зелёная → TRB-2.
- [ ] 7. `git grep` по живым документам (TRB-3) пусто → commit только наших путей (`git add` поимённо, не `-A`) → push.
- [ ] 8. Судья: `/fable-judge` по критериям 1–4; правки; отметка в плане 13.

## Risks

- Другая сессия работает в этом клоне (незакоммиченный `STATUS.md`, `TASK_KUIPS_*`) — коммитить только свои пути, `STATUS.md` не трогать.
- Документы KAIF (`.claude/skills/*` и копии под другие агенты) упоминают `build.sh` как пример — это шаблоны фреймворка, не трогаем.
