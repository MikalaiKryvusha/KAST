# Баг 06 — в текстах интерфейса KAST называет себя Artemis

**Status:** 🔧 механическая часть сделана 2026-09-26 (239 замен в 26 файлах, `tools/rename-app-in-strings.mjs`, судья — PASS,
его находки исправлены); 2026-09-26 18:33 по решению владельца удалена мёртвая строка политики конфиденциальности; дальше —
своя страница KAST для панели производительности
**Version/build:** KAST Debug 20.2.6 (`moonlight-noir` @ `d100a101`) · **When/context:** 2026-09-26 17:40, агент увидел на
Титане в настройках «Язык — Язык, который будет использоваться в Artemis» во время прогонов Ф2 (отчёт
`testcases/reports/2026-09-26_F2_hold.md` → Found)
**Severity:** S2 (чужое имя в продукте: пользователь KAST читает, что работает Artemis)
**Fixing:** отдельным шагом после Ф3 или раньше, если ответ на интервью 002 затронет строки; переименование — механическая
правка под принятым решением владельца «Имя — KAST» (`MASTER_PLAN.md`, журнал решений 2026-09-26 ≈09:45)
**Fix accepted when (observable):**
- Ситуация. KAST на Титане, язык системы русский, затем английский.
- Действие. Пользователь проходит настройки, тест сети, экран клавиатуры.
- Результат. Там, где приложение говорит о себе, стоит «KAST»; упоминание Artemis остаётся только там, где речь об
  Artemis как об источнике (строка обновления «форк Artemis»).
- Проверка. `git grep -n -i -E "artemis|moonlight" -- app/src/main/res/values*/strings.xml` показывает только ключи из колонки
  «оставить» ниже; снимки настроек на двух языках.


## Слова владельца о двух ключах (дословно, чат ≈ 2026-09-26 18:30 +03:00)

«Политика конфиденциальности». Строка есть в переводах, но ни один экран KAST её не показывает: ни настройки, ни код на неё не ссылаются. Это мёртвая строка, я предлагаю её удалить. 
ДА УДАЛИТЬ

завести свою страницу KAST для производительности
## Symptom
Подсчёт `git grep -c` 2026-09-26 17:42: «Artemis» — 83 вхождения в 6 файлах (`values` 14, `values-ru` 15, `values-zh-rCN` 14,
`values-zh-rTW` 14, `values-fr` 13, `values-vi` 13); «Moonlight» — 189 вхождений в 20 языковых файлах (старые переводы,
которые Artemis не переименовал: от 1 в `values-iw` до 11 в `values-de`, `values-es`, `values-it` и других). Пользователь
видит их в настройках, в тесте сети, в сообщении об ошибке декодера, в имени службы клавиатуры. Поиск двойников — по
ключам из таблицы ниже, а не по слову: в переводах имя приложения записано то «Artemis», то «Moonlight».

## Inventory (базовые строки, ключи — для поиска двойников по ключу, EXP-0004)

| Ключ | Что говорит | Что делать |
|---|---|---|
| `nettest_text_waiting`, `nettest_text_success`, `nettest_text_inconclusive`, `nettest_text_failure`, `nettest_text_blocked` | тест сети говорит «Artemis» о приложении | Artemis → KAST |
| `message_decoding_error` | «Artemis has crashed…» | Artemis → KAST |
| `summary_checkbox_usb_bind_all` | «Use Artemis's USB driver…» | Artemis → KAST |
| `summary_language_list` | «Language to use for Artemis» | Artemis → KAST |
| `keyboard_service_label`, `accessibility_description_text` | имя службы клавиатуры в системе | Artemis → KAST |
| `summary_device_rumble` | упоминание в тексте про вибрацию | прочитать целиком, скорее Artemis → KAST |
| `summary_software_update` | «KAST, a fork of Artemis by ClassicOldSong» | оставить — это источник |
| `summary_privacy_policy` | «View Artemis's privacy policy»; ни один экран строку не показывает: `grep -rn privacy_policy app/src` вне `res/values*` — пусто (2026-09-26 18:32; прежняя запись «ссылка ведёт на политику Artemis» была неверной) | удалена вместе с `title_privacy_policy` — решение владельца «ДА УДАЛИТЬ» (выше, дословно) |
| `summary_performance_link` | панель производительности сообщества Artemis: пункт настроек ведёт на вики Artemis `Performance-Statistics-Collection` | своя страница KAST — решение владельца «завести свою страницу KAST для производительности» (выше, дословно); шаг 3 ниже |

Ключи с упоминанием в переводах (`git grep -h -i -E "moonlight|artemis"`, число файлов): `message_decoding_error` 25,
`summary_language_list` 24, пять `nettest_text_*` по 24, `summary_checkbox_usb_bind_all` 23, `summary_privacy_policy` 18,
`summary_seekbar_deadzone` 13, `summary_software_update` 6, `summary_device_rumble` 6, `keyboard_service_label` 6,
`accessibility_description_text` 6, `summary_performance_link` 3, `error_manager_not_running` 1. **Не менять:** «Moonlight
Internet Hosting Tool» во второй строке `nettest_text_*` у 18 языков — имя отдельного инструмента для хоста. Замена идёт
построчно по ключам, так как слово «Moonlight» встречается и в имени этого инструмента.

## Fix plan
1. Механическая часть: заменить «Artemis» на «KAST» в строках колонки «Artemis → KAST» во всех языковых файлах, где ключ
   есть; сверка по ключу (EXP-0004); сборка; снимки настроек и теста сети на русском и английском — владельцу.
2. ~~Два вопроса владельцу~~ — отвечены в чате 2026-09-26 ≈ 18:30 (выше, дословно): строку политики удалить (✅ 18:33, 36 строк в
   18 файлах, ссылок в коде нет, сборка); для производительности — своя страница KAST.
3. Своя страница KAST о производительности: как включить журнал производительности, как сохранить и прислать его (диалог
   бага 04, адрес issues KAST); пункт настроек ведёт на неё, подпись пункта — на всех языках. [NOT-TESTED] — следующий шаг.

## Сделано 2026-09-26 (механическая часть)
`node tools/rename-app-in-strings.mjs` заменил имя приложения на KAST во всех `<string>` с упоминанием, кроме трёх ключей
для решения владельца или источника и кроме имени инструмента хоста. Первый проход не взял склонённые формы («Moonlightu»,
«Moonlights») и имя сразу после литерала `\n` в многострочной строке; инструмент доработан, второй проход — 6 замен.
Судья нашёл и исправлено вторым шагом: иврит пишет Moonlight своими буквами (מונלייט, 7 строк, 9 замен); французское
«d'KAST» → «de KAST» (элизия только перед гласной, 3 места); во вьетнамском имя инструмента хоста «Công cụ … Internet
Artemis» задето — возвращено, правило «имя сразу после Internet не трогать» добавлено в инструмент; русская ошибка
декодера без предлога → «В KAST произошёл сбой»; греческий артикль «της KAST» → «του KAST».
Осталось намеренно (`git grep -i -E "moonlight|artemis"`): ключи `summary_performance_link`,
`summary_software_update` и имя инструмента хоста — «Moonlight Internet Hosting Tool» у 18 языков, «Artemis Internet
Hosting Tool» в `values`, `values-fr`, `values-ru`, `values-zh-rTW` (Artemis переименовал и имя инструмента — это
ошибка источника), «Artemis 互联网主机工具» в `values-zh-rCN`, «Internet Artemis» в `values-vi`.
Проверка: сборка зелёная; все 29 файлов `strings.xml` разбираются как XML; на Титане «Язык — Язык, который будет
использоваться в KAST», поиск «Artemis» на этом экране пуст (снимок `D:\Android\private\evidence\bug06\`).

## Decisions made without the owner
- `[AI]` Падежные окончания: чешское -u → «KASTu», немецкое -s → «KASTs», шведское -s → «KAST:s» (шведская норма для
  аббревиатур).
- `[AI]` Имя инструмента хоста, где Artemis заменил «Moonlight» на «Artemis» (`values`, fr, ru, zh-rCN, zh-rTW, vi), оставлено как
  есть: это имя инструмента, правильное — «Moonlight Internet Hosting Tool»; вернуть его — вместе с идеей 07.
- `[AI]` Разовые правки языка, которые инструмент знать не может: русский предлог «В KAST», греческий артикль «του KAST».

## Links
Баг 04 («За рамками»: панель производительности), баг 03, идея 03 (локализация), идея 07 (имена серверов в текстах).
