# Баг 01 — фиолетовая кнопка профилей внизу справа обрезана снизу

> Слово владельца (2026-09-26, чат, дословно — коммит `16c56fdb`): «ты спрашивал ,как UI освежить - вот прямо сейчас
> внизу справа кнопка фиолетовая профилей обрезана снизу - там нужно много косяков хотя бы починить в том, что есть»

**Status:** ✅ DONE 2026-09-26
**Version/build:** KAST Debug на базе Artemis `c5cf27f4` (`com.limelight.kastdebug`, versionName 20.2.6) · **When/context:** 2026-09-26, первый запуск KAST на Титане (Ф1 плана 03)
**Severity:** S2 (видимый дефект интерфейса на каждом экране со списком; флаг владельца — долг владельца, первая очередь)
**Fixing:** после шага 8 плана 03 (эталонные прогоны), отдельным маленьким планом «косяки существующего UI» вместе с багами 02–03
**Fix accepted when (observable):**
- Ситуация. KAST на планшете Titan 1 (1600×2560, плотность 480, жестовая навигация), экран списка хостов и экран приложений хоста.
- Действие. Агент снимает экран и дамп интерфейса.
- Результат. Кнопка профилей целиком видна над системной панелью навигации, её низ выше верха панели.
- Проверка. Дамп: нижняя граница `profilesButton` меньше верхней границы `navigationBarBackground` (сейчас 2512 > 2488); снимок WebP показан владельцу.

## Symptom
У кнопки профилей (`ExtendedFloatingActionButton`, фиолетовая, внизу справа) срезан низ: закруглённые углы снизу не видны,
кнопка уходит под системную панель навигации. Видно на экране списка хостов и на экране приложений хоста.

## Repro (deterministic)
1. `adb -s 100.99.111.48:<порт> shell monkey -p com.limelight.kastdebug -c android.intent.category.LAUNCHER 1`
2. `adb -s … shell uiautomator dump` → сравнить bounds `com.limelight.kastdebug:id/profilesButton` и `android:id/navigationBarBackground`.

## Forensics
- Дамп 2026-09-26 12:41: `profilesButton` bounds `[1384,2344][1552,2512]`; `navigationBarBackground` `[0,2488][1600,2560]`;
  `pcFragmentContainer` `[0,267][1600,2560]` — содержимое окна тянется до низа экрана, под панель навигации.
- `app/src/main/res/layout/activity_pc_view.xml`: у кнопки одновременно `android:layout_margin="16dp"`,
  `android:layout_marginBottom="24dp"`, `android:layout_marginEnd="24dp"` — общий `layout_margin` перекрывает частные,
  действует 16dp = 48 px; 2560 − 48 = 2512 — ровно низ кнопки.

## Root cause / Hypotheses
1. (основная, подтверждена цифрами) Окно рисуется под системной панелью навигации, а кнопка не получает отступ на её высоту
   (нет обработки `WindowInsets` у корня или у кнопки).
2. (вторичная) Мёртвые атрибуты `marginBottom`/`marginEnd` рядом с `layout_margin` — намерение автора Artemis дать 24dp не действует.

## Fix plan
Отступ снизу = отступ навигационной панели из `WindowInsetsCompat` (для корня или кнопки) + убрать конфликт атрибутов; то же
для `activity_app_view.xml:34` (двойник); проверить по дампу на Титане; снимки до/после — владельцу.

## Decisions made without the owner
- `[AI]` Поднимается только прибитая к низу кнопка, а не весь экран: список по-прежнему прокручивается под панелью, как
  задумал Moonlight (`UiHelper.notifyNewRootView`) — самый маленький дифф к Artemis.
- `[AI]` Мёртвые атрибуты `layout_marginBottom="24dp"`/`layout_marginEnd="24dp"` рядом с `layout_margin="16dp"` оставлены как
  есть: видимый отступ кнопки (16dp) не меняется, меняется только подъём над панелью.
- `[AI]` Исправлен и третий двойник — кнопка добавления профиля на экране профилей (`addProfileFab`).

## ✅ STATUS: DONE (2026-09-26 14:54 +03:00)

Сделано: `UiHelper.keepAboveNavigationBar(View)` — к нижнему отступу кнопки из разметки прибавляется высота панели навигации
(`WindowInsetsCompat.Type.navigationBars()`); вызвано для `profilesButton` в `PcView` и `AppView` и для `addProfileFab` в
`ProfilesActivity` (поиск двойников: `grep -l 'layout_alignParentBottom="true"' app/src/main/res/layout/*.xml` → 3 файла, все три исправлены).

Hygiene: сборка `assembleNonRoot_gameDebug` — BUILD SUCCESSFUL; юнит-тестов на это нет.
Functional run: KAST Debug на Титане 1 (Android 16, жестовая навигация), экраны «список хостов», «приложения хоста», «профили»;
прочитаны границы из `uiautomator dump`: низ кнопки 2440 < верх панели 2488 на всех трёх экранах (до исправления на списке
хостов — 2512); снимки WebP «до/после» бок о бок — `D:\Android\private\evidence\2026-09-26_bug01\bug01_before_after.webp`
(вне репозитория: на снимках рабочий экран владельца). Вердикт владельца по виду — при следующем взгляде.

## Links
Идея 04 (освежить UI — владелец: «много косяков хотя бы починить в том, что есть»); баги 02, 03.
