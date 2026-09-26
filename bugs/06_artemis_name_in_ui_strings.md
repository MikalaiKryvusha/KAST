# Баг 06 — в текстах интерфейса KAST называет себя Artemis

**Status:** 🔴 OPEN — инвентаризация готова, правка не начата
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
| `summary_privacy_policy` | «View Artemis's privacy policy», ссылка ведёт на политику Artemis | вопрос владельцу: у KAST своей политики нет — убрать пункт, оставить ссылку на Artemis с честной подписью или написать свою |
| `summary_performance_link` | панель производительности сообщества Artemis | вопрос владельцу вместе с идеей 03/07 (см. баг 04 → «За рамками») |

## Fix plan
1. Механическая часть: заменить «Artemis» на «KAST» в строках колонки «Artemis → KAST» во всех языковых файлах, где ключ
   есть; сверка по ключу (EXP-0004); сборка; снимки настроек и теста сети на русском и английском — владельцу.
2. Два вопроса владельцу (политика конфиденциальности, панель производительности) — одним интервью, когда будет готово
   больше вопросов об именах (идея 07).

## Decisions made without the owner
Заполняется при закрытии.

## Links
Баг 04 («За рамками»: панель производительности), баг 03, идея 03 (локализация), идея 07 (имена серверов в текстах).
