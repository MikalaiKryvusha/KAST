# Баг 07 — KAST падает, когда возобновление сдалось, а последняя попытка ещё идёт

**Status:** ✅ DONE 2026-09-26 21:14 — исправлено 19:03; K3 пройден 19:07 (`testcases/reports/2026-09-26_F3_resume.md`, прогон 6) и
вновь в прогонах 16–18; судья (второй) подтвердил исправление
**Version/build:** KAST Debug 20.2.6 (`com.limelight.kastdebug`), `moonlight-noir` @ `7c5583dc` · **When/context:** 2026-09-26
19:00, прогон K3 Ф3 на Титане (`testcases/reports/2026-09-26_F3_resume.md`, run 5); владелец увидел окно сбоя на Титане:
«креш, ты видишь?» · «прямо сейчас на моем титане окно о креше»
**Severity:** S2 (потерян прогон; пользователь вместо понятного конца видит системное окно сбоя)
**Fixing:** эта сессия
**Fix accepted when (observable):**
- Ситуация. Идёт поток «Desktop» на Титане, ожидание 60 с, отладочный таймаут ENet 10 с.
- Действие. Сеть хоста пропадает на 70 с.
- Результат. На 60-й секунде KAST показывает прежний диалог конца соединения и уходит в список приложений; окна «В работе
  приложения произошёл сбой» нет.
- Проверка. `powershell -NoProfile -ExecutionPolicy Bypass -File tools/droprun.ps1 -Seconds 70 -MidShotAt 65` → в журнале
  клиента `outcome=gave-up`, затем `attempt=N failed … (after the resume ended — dropped)` или `left to finish on its own`; строки
  `FATAL EXCEPTION` нет; снимок на 65-й секунде — диалог KAST.

## Symptom
После `outcome=gave-up attempts=7 elapsed=60486` через 2,3 с — `FATAL EXCEPTION: Thread-57`, системное окно «В работе
приложения "KAST Debug" произошёл сбой» поверх списка приложений; ещё раньше — всплывающее «failed to connect to
/100.80.125.66 (port 47984) … after 5000ms».

## Repro (deterministic)
Поток, отладочный таймаут ENet 10 с (`run-as`, `kast_debug_enet_timeout_seconds`), `tools/droprun.ps1 -Seconds 70`: попытки идут
каждые ≈ 8 с (5 с ожидания ответа хоста + отступ до 3 с), срок в 60 с почти всегда застаёт попытку в полёте.

## Forensics
`D:\Android\private\evidence\20260926-185910-drop70\client.log`:
```
19:00:08.197 attempt=7 reason=backoff elapsed=57580
19:00:11.104 outcome=gave-up attempts=7 elapsed=60486
19:00:11.110 outcome=terminated code=-1 elapsed=60493
19:00:13.453 FATAL EXCEPTION: Thread-57
java.lang.NullPointerException: Attempt to invoke virtual method 'void com.limelight.utils.SpinnerDialog.setMessage(java.lang.String)' on a null object reference
	at com.limelight.Game.stageFailed(Game.java:3839)
	at com.limelight.nvstream.NvConnection$1.run(NvConnection.java:421)
```

## Root cause
Попытка 7 шла (`/resume` ждал хоста 5 с), когда срок истёк. `kastGiveUp` сбросил `kastResuming`, и поздний отказ попытки
прошёл мимо ветки возобновления в штатный `stageFailed` Artemis. Для ошибки подключения с кодом 0 и флагами портов тот
пишет в окно «Подключение…» (`spinner.setMessage`), а при возобновлении такого окна нет — `spinner == null`. Вторая сторона того
же: штатный `stopConnection` при сдаче звал `conn.stop()` для попытки, которая семафор ядра ещё не взяла: лишнее освобождение
статического `Semaphore(1)` в `NvConnection`.

## Fix
`Game.kastOrphanAttempt`: при сдаче и при уходе пользователя идущая попытка остаётся доживать сама (`connecting = false`, чтобы
`stopConnection` её не останавливал). Её поздний отчёт разбирается там, куда он приходит: `stageFailed` — только журнал
`(after the resume ended — dropped)`; `connectionStarted` — соединение останавливается (`conn.stop()`, оно держит ядро), поток не
показывается; `displayMessage` — в журнал, без всплывающих окон. Флаги `kastResuming` и `kastAttemptInFlight` стали `volatile`: их
читает поток `NvConnection`.

TWINS: searched `grep -n "spinner\.\(setMessage\|dismiss\)" Game.java` (2026-09-26 19:04) — 5 мест: 4 под `if (spinner != null)`
(строки 1197, 3788 `stageStarting`, 3865 UI-ветка `stageFailed`, 4107 `connectionStarted`), незащищённое одно — 3857, место
падения. Класс закрыт формой: и там теперь `if (spinner != null)`, а поздняя попытка до него больше не доходит.

Guard: прогон K3 в наборе `testcases/TC_reconnect.md` (провал дольше срока) — функциональная проверка класса «поздний отчёт
попытки после конца возобновления»; модульным тестом жизненный цикл `Game` не покрыть.

## Decisions made without the owner
- `[AI]` поздняя попытка не прерывается, а доживает сама: прерывание из `stopConnection` освобождает семафор, которого попытка ещё
  не брала.

## ✅ STATUS: DONE (2026-09-26 21:14 +03:00)

Hygiene: сборка; самопроверок для жизненного цикла `Game` нет (модульным тестом не покрыть).
Functional run: K3 на Титане — прогон 6 (после исправления: сдача, поздняя попытка отброшена журналом, прежний диалог, сбоя нет),
прогоны 16–18 (сдача с диалогом причины, `attempt=9 left to finish on its own` / без попытки в полёте, сбоя нет).
