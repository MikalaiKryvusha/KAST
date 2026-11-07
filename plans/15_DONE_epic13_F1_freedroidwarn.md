# Plan 15 (epic 13, Ф1) — FreeDroidWarn во всех четырёх приложениях

> **Created:** 2026-11-07 · **Parent:** `plans/13_DONE_EPIC_distribution_freedom.md` → «Ф1 FreeDroidWarn — JitPack…, V1.14, вызов в onCreate…»
> · **Owner's word:** «во все их нужно встроить https://github.com/woheller69/FreeDroidWarn»; «ГОУ, план начинаем делать!»; цикл владельца:
> «пишем код, ревьювим судьёй, чиним, собираем, тестируем, чиним, ревьювим, собираем стабильные релизы»
> · **Tests:** `testcases/TC_distribution_freedom.md` → FDW-0…FDW-7 · **Device:** Titan 1 по Wi-Fi, adb только `C:\Android\Sdk\platform-tools\adb.exe`

## Goal vector

Achieve: при первом запуске каждой новой версии пользователь видит окно FreeDroidWarn (позиция разработчика против верификации Google и выход).
Maintain: собственные первые экраны приложений (разрешения камеры/Bluetooth, настройка KARTUN) доступны после OK; сборки зелёные.
Avoid: падение по кнопкам окна; второе окно поверх первого при повороте; плавающая версия `V1.+`.

## Acceptance criteria

К1 эпика по каждому приложению: окно на языке системы; OK — не показывается до следующего versionCode; «Details»/«Solution» без падения;
поворот без FATAL и без двойного окна (FDW-1…FDW-6); первые экраны приложения доступны (FDW-7); контроль FDW-0 — до изменения окна нет.

## Integration (одна схема на все четыре)

| | Репозиторий JitPack | Зависимость | Вызов |
|---|---|---|---|
| KAST | есть (`build.gradle:16`) | `app/build.gradle`: `implementation 'com.github.woheller69:FreeDroidWarn:V1.14'` | `PcView.java` `onCreate` после `setContentView`/инициализации UI |
| KrinikCam | есть (`settings.gradle.kts:20`) | `app/build.gradle.kts` | `MainActivity.kt:84` после `setContent` |
| KARTUN | **добавить** в `settings.gradle.kts` `dependencyResolutionManagement` | `app/build.gradle.kts` | `MainActivity.kt:40` после `setContent` |
| KrinikTribitApp | **добавить** в `settings.gradle.kts` | `app/build.gradle.kts` | `MainActivity.kt:133` после `setContent` |

Вызов: `if (savedInstanceState == null) FreeDroidWarn.showWarningOnUpgrade(this, BuildConfig.VERSION_CODE)` — `buildConfig = true` уже во всех четырёх;
условие не даёт показать окно повторно при пересоздании активности. Строка-комментарий над вызовом: слово владельца и ссылка на план.

## Steps (на каждое приложение; порядок KARTUN → KrinikTribitApp → KrinikCam → KAST — от простого к сложной сборке)

- [ ] 1. FDW-0 контроль до: текущая debug-сборка на Titan, первый запуск после `pm clear` → окна нет; снимок WebP.
- [ ] 2. Код: репозиторий, зависимость `V1.14` (закреплена), вызов. *(anchor: «V1.14, вызов в onCreate»)*
- [ ] 3. Сборка debug по рецепту HOUSE_RULES проекта (JDK 21 явно; KrinikCam — через `tools/env.mjs`).
- [ ] 4. Судья по диффу (`/fable-judge`): одна зависимость, один вызов, ничего лишнего; правки.
- [ ] 5. Тест на Titan: `adb install -r`, `pm clear`, запуск → FDW-1…FDW-7; снимки WebP в `reports/distribution/fdw/<app>/`.
- [ ] 6. Падение/дефект → bug-doc в репозитории проекта, правка, повтор шагов 3–5.
- [ ] 7. Commit + push в репозиторий проекта (поимённо свои пути); отметка в плане 13.
- [ ] 8. Судья по фазе целиком (все четыре) → Ф1 закрыта.

## Risks

- Issue #45 библиотеки: `startActivity` без try/catch — на устройстве без браузера кнопки «Details»/«Solution» уронят приложение. На Titan браузер есть;
  риск принят (телефон без браузера — редкость). Падение на Titan — снаружи библиотеку не обернуть: bug-doc и решение (форк-патч или PR #45 автору).
- `appcompat 1.5.1` приезжает транзитивно в Compose-приложения (+≈1 МБ до R8); у KAST appcompat 1.7.1 уже есть — версия поднимется до неё.
- KrinikCam/KrinikTribitApp просят разрешения на старте — окно и системный запрос разрешения могут встать друг на друга (FDW-7 проверяет).
- AGP 9 (KARTUN, KrinikTribitApp) + старая библиотека с compileSdk 32 — сборка покажет; при конфликте — bug-doc.
