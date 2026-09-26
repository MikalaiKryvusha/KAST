# Правила дома — KAST

> Местные договорённости владельца и агента в этом проекте: постоянные правила владельца, стенды, устройства,
> маршруты и рецепты. Уровень 4 таксономии документов (`AGENT_GUIDE.md`); `/resume` читает файл при входе.
> Как работает агент — `AGENT_GUIDE.md`; С ЧЕМ он работает в проекте KAST — этот файл.

**Создан:** 2026-09-26 · **Владелец:** Mikalai Kryvusha · **Перенесено из руководства (2026-09-26):** Build env → раздел 6, Test harness → раздел 3, заметки владельца («KAST-specific») → раздел 1 и строка голоса в разделе 6

## 1. Постоянные правила владельца

### П1. Android тестировать только на реальных устройствах; виртуализацию на компьютере владельца не включать

1. AVD, эмулятор Android, WSL, Hyper-V (WHPX) и драйвер AEHD на компьютере владельца не ставить и не включать —
   эмулятор Android на Windows без гипервизора не работает, значит AVD = виртуализация.
2. Сборку проверять на устройствах владельца по `adb` (раздел 3); нужно другое устройство — попросить у владельца.
- **Исключение:** нет.

[OWNER] ≈ 2026-09-26 11:37 +03:00 · чат сессии 2026-09-26 («если для AVD нужно будет виртуализация и WSL - то НЕ ДЕЛАЕМ на этой машине, я буду лучше тебе давать реальные андроид устройства»)

### П2. Снимки экрана сохранять сразу в WebP; PNG на диск не писать

1. Снимок любого экрана (Android по `adb`, браузер по CDP, окно Windows) сохранять сразу в WebP. PNG не писать даже
   промежуточным файлом.
2. Android — команда `screencap` из раздела 6; CDP — `Page.captureScreenshot` с `format: 'webp'`.
- **Исключение:** JPEG — там, где WebP не принимают.

[OWNER] 2026-09-26 · память агента KAST, screenshots-webp-only.md, чат 2026-09-26 («желательно в легком webp снимать!», «никакох png - они тяжелые», «только webp, или если его не получается использовать где-то, то на крайняк - JPEG»)

### П3. Всё, что владелец должен увидеть, открывать на Windows-машине агента

1. Снимок, страницу или файл для владельца открывать на этом компьютере: `Start-Process <файл>` или
   `explorer.exe <файл>` (WebP открывает штатный просмотрщик или браузер). Владелец видит этот экран по удалённому
   рабочему столу.
2. Следом написать в чат одну строку: что открыто и где лежит файл.
3. На Mac владельца ничего не выкладывать и не открывать.
- **Исключение:** нет.

[OWNER] 2026-09-26 · память агента KAST, show-on-the-windows-pc.md, чат 2026-09-26 («Открвай в следующий раз на твоей машине - на винде, я по удаленному рабочему столу сижу, я вижу твою машину»)

### П4. На прямой вопрос владельца посреди хода ответить сразу и закончить ход

1. Владелец задал прямой вопрос посреди долгого хода («как называется…?», «ты нашёл…?») — довести текущий вызов
   инструмента, дать полный ответ (факт, числа, ссылки) и закончить ход. Строка между вызовами инструментов ответом
   не считается: ответ — это конец хода.
2. Работу продолжать после слова владельца «продолжай».
- **Исключение:** короткое указание без вопроса («называем KAST», «записывай в идеи») исполнять в ходе без остановки.

[OWNER] 2026-09-26 · память агента KAST, answer-direct-questions-at-once.md, чат 2026-09-26 («тты мне ответишь … или нет?»)

### П5. На вопрос о статусе и очереди ответить и обсудить; исполнять — после выбора владельца

1. Вопрос «каков статус», «что ждёт работы» — ответить сводкой и очередью, спросить, что берём, и закончить ход.
2. Правило действует и при `/resume`: шаг навыка «начинать сразу после объявления» уступает вопросу владельца.
- **Исключение:** нет.

[OWNER] 2026-09-13 · память агента KAST, status-question-means-discuss-not-execute.md, чат 2026-09-13 («Я тебя час назад просто спросил, что ждёт работы, а ты на час исчез в каких-то делах, вместо того, чтобы просто обсудить текущий статус»)

### П6. Долгую работу запускать отдельным процессом и сразу возвращать ход владельцу

1. Долгий прогон, сборку, ожидание события запускать фоновой задачей harness или отдельным процессом и сразу
   возвращать ход.
2. Состояние проверять одной быстрой пробой (`tail` журнала, `Get-Process` по PID) в момент, когда оно нужно.
   Циклов ожидания со `sleep` в ходе не ставить: событие ждёт фоновая задача harness.
- **Исключение:** короткий живой прогон (минуты), когда владелец сидит у машины. Прогон запустить фоном и, не заканчивая
  хода, следить за журналом или телеметрией с промежуточными строками в чат; вердикт доложить в ту минуту, когда
  прогон кончился. Прогон длиннее 10 мин — отдельным процессом.

[OWNER] 2026-08-22 и 2026-09-25 · память агента KAST: never-block-the-chat-on-a-running-job.md, чат 2026-08-22 («Плохо, что тебя, Claude, держит консольная команда прогона», «плохо, что ты её не как субпроцесс запускаешь, высвобождая свой поток нашего чата»); stay-in-turn-during-live-runs.md, чат 2026-09-25 («почему ты себя не дёрнул!»)

### П7. Владельцу нести только вопросы его уровня — о том, что он увидит, услышит или получит

1. Перед вопросом владельцу проверить: изменит ли ответ то, что владелец увидит, услышит или получит в руки.
2. Ответ ничего такого не меняет (внутренний прибор, страж, машинерия) — решать самому по ценности для продукта и
   записать решение с обоснованием.
3. Ответ меняет — формулировать вопрос сценарием: ситуация → что владелец получает → чем платит. Имён файлов, флагов
   и внутренних терминов в вопросе нет.
4. Владелец решает поведение продукта, приоритеты, бренд, риск, деньги и время; устройство внутри решает агент.
- **Исключение:** нет.

[OWNER] 2026-09-07 · память агента KAST, owner-level-questions-only-what-he-sees.md, чат 2026-09-07 («это технические вопросы, а не вопросы уровня заказчика. Смотри, как ценнее для продукта»)

### П8. Действие на машине, которое агент может сделать сам, делать самому

1. Ярлык запускать самому командой `explorer.exe "<путь к .lnk>"` и прочитать результат.
2. Владельца звать только на то, что проверяют его глаза и уши: экран, звук.
- **Исключение:** нет.

[OWNER] 2026-09-25 · память агента KAST, launch-shortcuts-yourself.md, чат 2026-09-25 («ты и сам можешь по ярлыкам кликать... зачем меня просишь, не понимаю»)

### П9. Задачу начинать с плана в `plans/`; код писать по плану

1. Любую задачу, кроме тривиальной правки, начинать с плана: `/plan-task` для обычной, `/plan-epic` для тяжёлой; в
   идущем эпике — операционный план очередной фазы. В плане — вектор цели, критерии приёмки, шаги, проверка
   наблюдением.
2. Устное «делаем?» владельца одобряет направление работы. План пишется и после такого одобрения, до первой строки
   кода.
3. Код, написанный раньше плана, убрать из дерева в черновик, написать план и вернуть только то, что план
   подтвердил.
- **Исключение:** тривиальная правка.

[OWNER] 2026-08-26 · память агента KAST, plans-before-implementation.md, чат 2026-08-26 («сначала - планы», «сначала мы пишем планы, а затем по планам пишем имплементацию»)

### П10. В каждый план с механизмом или фазами ставить блок-схему mermaid

1. Мета-план несёт схему фаз с воротами и схему строящегося механизма; операционный план — схему своего куска.
2. Перед сдачей плана проверить: схема есть, стрелки подписаны, имена на схеме совпадают с текстом.
- **Исключение:** план без механизма и без фаз.

[OWNER] 2026-08-28 · память агента KAST, plans-need-flowcharts.md, чат 2026-08-28 («не одной блок схемы у тебя в мета плане не вижу», «ты как так планы пишешь, без блок схем? тебе без них понятно?»)

### П11. Коммитить и пушить самому; владельца о коммитах не спрашивать

1. Работу, дошедшую до зелёных ворот, коммитить с осмысленным сообщением и пушить (порядок веток —
   `AGENT_GUIDE.md` → «Git workflow»).
2. В чат сообщать факт: «закоммичено и запушено, хеш …».
- **Исключение:** разрушающее действие (force-push, удаление веток и релизов) требует слова владельца (строка `AUTH:`).

[OWNER] 2026-09-04 · память агента KAST, commits-are-the-agents-job-never-ask.md, чат 2026-09-04 («… ты меня о комитах спрашиваешь? я заказчик»)

### П12. Срок, названный владельцем, читать как время суток; до него работать в обычном темпе

1. «До N часов M минут» — время суток N:M по местным часам (`date`), даже когда фраза похожа на длительность. При
   сомнении назвать своё прочтение одной строкой в чате сразу.
2. Длительность без часов («полтора часа») сразу перевести в момент по `date` и назвать его первой строкой ответа.
3. До названного момента работать в обычном темпе; в сам момент начать `/end-chat-soft` (`AGENT_GUIDE.md` →
   «WORKING UNTIL A NAMED TIME»).
- **Исключение:** нет.

[OWNER] 2026-09-04 · память агента KAST, named-time-is-absolute-clock-not-duration.md, чат 2026-09-04 («до двух часов ночи, 20 минут. Абсолютное время», «не ДЕДЛАЙН, а работай до того времени, а затем начинай доделывать, не раньше»)

### П13. Интерфейс на устройстве проходить локаторами из дерева элементов; снимок экрана — только улика

1. Элемент искать в дереве интерфейса по тексту, описанию (`contentDescription`) или `resource-id`: UI-агент `find <текст>`,
   `wait <текст>`, `tapText <текст>`. Координаты нажатия брать из найденного элемента, не со снимка.
2. Элемента нет в дереве — дать ему локатор в самом KAST (описание или id) тем же шагом, а не жать по координатам со снимка.
3. Снимок экрана делать как улику прогона или чтобы показать владельцу; искать по нему, куда нажать, нельзя.
- **Исключение:** системное окно вне KAST (окно сбоя Android) — нажатие по координатам со снимка, с записью в отчёт прогона.

[OWNER] 2026-09-26 · чат 2026-09-26 ≈ 19:26 («там все на локаторах построено, на поиске элементов в дом модели, или как-то так», «делай автоматизацию быструю»). «Там» — автоматизация рабочего проекта владельца на его Mac (под NDA; название в KAST не пишется, `D:\Android\private\kast-denylist.txt`); отсылку владелец оставил: «пускай отсылка будет, лишь бы тебе было понятно в будущих сессиях» (чат ≈ 20:15).

## 2. Внешние системы и доступ

| Система | Что агент там делает | Точка входа | Где лежат учётные данные |
|---|---|---|---|
| GitHub — свои репозитории | push и тикеты: `MikalaiKryvusha/KAST` (origin, ветка `moonlight-noir`); форк ядра `MikalaiKryvusha/moonlight-common-c`, ветка `kast/enet-timeout` (в подмодуле — удалённый репозиторий `kast`); форк хоста `MikalaiKryvusha/Vibepollo` | `gh` 2.95.0 (`gh repo`, `gh issue`, `gh pr`, `gh api`); `git` по HTTPS | токен `gh` — в хранилище учётных данных Windows (keyring), аккаунт `MikalaiKryvusha`; `git` берёт его через `gh auth git-credential` (`~/.gitconfig`); проверка — `gh auth status` |
| GitHub — upstream Vibepollo | тикет и PR о таймауте управляющего канала ENet: issue `Nonary/Vibepollo#522`, PR `Nonary/Vibepollo#523` из форка `MikalaiKryvusha/Vibepollo` (оба открыты на 2026-09-26) | `gh issue view 522 -R Nonary/Vibepollo`, `gh pr view 523 -R Nonary/Vibepollo` | токен `gh` из строки выше |
| Tailscale → планшет Титан | `adb` к Титану (раздел 3) | служба `Tailscale` 1.102.3 (`C:\Program Files\Tailscale\tailscale.exe`); `D:\Android\Sdk\platform-tools\adb.exe connect 100.99.111.48:<порт>` | ключ `adb` этой машины — `%USERPROFILE%\.android\adbkey`, сопряжение с Титаном сделано 2026-09-26; вход в сеть Tailscale держит служба |
| Tailscale → Mac владельца по SSH | команды по SSH; показ владельцу на Mac не делается (П3) | `C:\Windows\System32\OpenSSH\ssh.exe -i C:\Users\krinik\.ssh\kast_agent_ed25519 <адрес Mac в Tailscale>`. Клиент — OpenSSH Windows: `ssh` из Git Bash к `100.x` при включённом NordVPN получает отказ | ключ — файл `C:\Users\krinik\.ssh\kast_agent_ed25519` |
| NordVPN, раздельное туннелирование | держит в исключениях только `adb.exe`, чтобы `adb` доходил до `100.x` | приложение NordVPN → Split tunneling («Don't use VPN for selected apps») → `D:\Android\Sdk\platform-tools\adb.exe`; `tailscaled.exe` туда НЕ добавлять — рецепт и грабли в разделе 5 | учётная запись NordVPN — в приложении; агенту она не нужна |
| Хост Vibepollo | журналы сервера, правка `sunshine.conf`, настройки и действия в веб-админке | служба `ApolloService` (автозапуск), `C:\Program Files\Apollo`; конфиг `C:\Program Files\Apollo\config\sunshine.conf` (CRLF, без BOM; `ping_timeout` в миллисекундах): `Stop-Service ApolloService` → правка одной строки → `Start-Service`, проверка — строка `config: '<ключ>' = <значение>` в новом журнале; веб-админка `https://localhost:47990` — в отладочном Chrome на порту 9222 через `node D:\Android\tools\cdp.mjs shot\|eval\|nav\|certok` | вход в веб-админку — у владельца: он вошёл сам в отладочном Chrome 2026-09-26 (`plans/03_epic02_F1_build_stand.md`); агент пароля не хранит. Сессия входа истекает: 2026-09-26 17:48 `POST /api/apps/close` вернул 401 — закрытие приложения с хоста (прогон K4) ждёт нового входа владельца |

## 3. Стенды, окружения и устройства

| Стенд / устройство | Для чего | Как агент до него добирается | Известные грабли |
|---|---|---|---|
| Планшет HEADWOLF Titan 1 (`Titan_1`): Android 16 (API 36), MediaTek MT8792, arm64-v8a, 1600×2560, плотность 480; стоят `com.limelight.noir` (Artemis) и `com.limelight.perf` | установка APK KAST, logcat клиента, скриншоты, сценарии обрыва | `D:\Android\Sdk\platform-tools\adb.exe connect 100.99.111.48:<порт>` — порт с главного экрана «Беспроводной отладки» (2026-09-26 был `36713`, меняется после перезагрузки); сопряжение уже сделано 2026-09-26 | Tailscale до планшета идёт через ретранслятор DERP (Франкфурт, 150–450 мс) — прямой канал не строится; NordVPN режет соединения в `100.x` (рецепт в разделе 5) |
| Сервер Vibepollo (служба `ApolloService`, `C:\Program Files\Apollo`) | хост стрима; журнал сервера — вторая половина каждого сценария обрыва | журналы `C:\Program Files\Apollo\config\logs\sunshine-*.log` (кодировка cp1251: `iconv -f cp1251 -t utf-8`) | не запускать `sunshine.exe` руками; перед перезапуском службы — проверить журнал на активную сессию; наша сборка и откат — `plans/01_vibepollo_local_control_timeout_patch.md` |

## 4. Досье окружения — факты машины

Правило — `AGENT_GUIDE.md` → «Environment dossier»; `/refresh-context` пересобирает эту таблицу (шаг досье). Шесть осей
снимаются **в каждой доступной оболочке отдельно** — разные оболочки дают разные ответы:

1. **ОС и железо** — версия ОС, ядра процессора, память.
2. **Оболочки и кодировки** — какие оболочки есть, кодовая страница консоли, кодировка ANSI, в которой пишет
   перенаправление, локаль каждой оболочки.
3. **Инструменты** — среды выполнения, сборка, система контроля версий и их версии; ЧТО значат `tar` / `curl` / `find`
   в каждой оболочке (системная программа, инструмент GNU или псевдоним на другую вещь — проверять ТИП команды вместе
   с путём).
4. **Политики Git** — концы строк, помощник учётных данных.
5. **Пакетные менеджеры** — чем можно ставить.
6. **Причуды поведения** — ССЫЛКИ на оплаченные уроки (номера `EXPERIENCE.md`), без копий.

Одна строка — один факт: **факт → значение → команда пробы**. Факт без пробы пишется `— ещё не снято —`: пропущенный
факт честен, выдуманный — дефект (`PHILOSOPHY.md` → три двери).

> **Досье окружения.** Снято: 2026-09-26 16:31 +03:00 (Git Bash, PowerShell 5.1, cmd) · Пересборка: `/refresh-context` →
> шаг досье (повторить пробы из третьей колонки, переписать значения и эту дату) · **Устаревание: факты старше четырёх
> недель — ГИПОТЕЗЫ, перед опорой на них снять заново.**

| Факт | Значение | Проба |
|---|---|---|
| ОС | Windows 11 Pro 25H2, сборка 10.0.26200.9457 | cmd: `ver`, `systeminfo \| findstr /B /C:"OS"`; PowerShell: `(Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion').DisplayVersion`; Git Bash: `uname -a` → `MINGW64_NT-10.0-26200` |
| Процессор | AMD Ryzen 7 5700G: 8 ядер, 16 потоков | PowerShell: `Get-CimInstance Win32_Processor`; Git Bash: `nproc` |
| Память | 31,9 ГБ (32 660 МБ) | PowerShell: `(Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory`; cmd: `systeminfo` |
| Оболочки | Git Bash — bash 5.2.21, MSYS 3.4.9 (инструмент Bash агента); Windows PowerShell 5.1.26100.9444 (инструмент PowerShell агента); cmd. PowerShell 7 (`pwsh`) нет | `echo $BASH_VERSION`, `uname -a`; `$PSVersionTable.PSVersion`; `pwsh -v` → нет команды |
| Кодовая страница — cmd из Git Bash | 866 | Git Bash: `cmd //c chcp` |
| Кодовая страница — PowerShell агента и cmd из него | 65001; `[Console]::OutputEncoding` — utf-8 | PowerShell: `chcp`, `[Console]::OutputEncoding.CodePage`; `cmd /c chcp` |
| Кодовые страницы системы | ACP 1251, OEMCP 866 | PowerShell: `Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Nls\CodePage'` |
| Кодировка ANSI по умолчанию | windows-1251: в ней пишут `Set-Content` и `Add-Content` PowerShell 5.1 без `-Encoding`, в ней PowerShell 5.1 читает `.ps1` без BOM | PowerShell: `[System.Text.Encoding]::Default.WebName` |
| Локаль — Git Bash | `LC_CTYPE=C.UTF-8`, `LANG` не задан | `locale`, `echo $LANG` |
| Локаль — PowerShell 5.1 | `Get-Culture` ru-RU (дробная часть через запятую: `31,9`), `Get-UICulture` en-US, `Get-WinSystemLocale` ru-RU | `Get-Culture`, `Get-UICulture`, `Get-WinSystemLocale` |
| Локаль — cmd | `LANG` не задан; язык системы ru (Русский) | `set LANG`; `systeminfo` |
| Node.js | v24.15.0, `C:\Program Files\nodejs\node.exe` во всех трёх оболочках | `node -v`; cmd: `where node` |
| Java в PATH | JDK 21.0.11 (Microsoft), `C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot\bin\java.exe` — первый `java` во всех трёх оболочках | `& 'C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot\bin\java.exe' -version`; `java -version`; cmd: `where java` |
| `JAVA_HOME` | во всех трёх оболочках `C:\Users\krinik\.bubblewrap\jdk\jdk-17.0.11+9` — каталога нет; значение User перекрывает значение Machine (`C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot\`) | PowerShell: `[Environment]::GetEnvironmentVariable('JAVA_HOME','User')` и `'Machine'`, `Test-Path $env:JAVA_HOME` → False; cmd: `echo %JAVA_HOME%`; Git Bash: `echo $JAVA_HOME` |
| Gradle | обёртка `gradlew.bat`, Gradle 8.13; `gradle` в PATH нет | `gradle/wrapper/gradle-wrapper.properties` → `distributionUrl`; Git Bash: `type -a gradle` |
| Git | 2.43.0.windows.1 | `git --version` |
| GitHub CLI | `gh` 2.95.0 | `gh --version` |
| Python | 3.14.4 (`C:\Python314\python`); вторым в PATH Git Bash стоит Python 3.10 | `python --version`; Git Bash: `type -a python` |
| ImageMagick | 7.1.2-27 Q16-HDRI (`magick`) | `magick -version` |
| `adb` в PATH | первым во всех трёх оболочках — `C:\adb\adb.exe` 1.0.32; дальше `adb.exe` из scrcpy и `C:\Program Files\adb\adb.exe`. Рабочий — `D:\Android\Sdk\platform-tools\adb.exe` 1.0.41 | Git Bash: `type -a adb`; PowerShell: `Get-Command adb -All`; cmd: `where adb`; `adb version` |
| `ssh` | Git Bash — `/usr/bin/ssh`, OpenSSH_9.5p1 (MSYS); PowerShell — `C:\Windows\System32\OpenSSH\ssh.exe`, OpenSSH_for_Windows_9.5p2 | Git Bash: `type -a ssh`, `ssh -V`; PowerShell: `Get-Command ssh` |
| `tar` / `curl` / `find` — Git Bash | `/usr/bin/tar` (GNU tar 1.35) · `/mingw64/bin/curl` (curl 8.4.0) · `/usr/bin/find` (GNU findutils 4.9.0); программы `C:\Windows\system32` стоят в PATH дальше | `type -a tar curl find`; `tar --version`, `curl --version`, `find --version` |
| `tar` / `curl` / `find` — PowerShell 5.1 | `tar` → `C:\Windows\system32\tar.exe` (bsdtar 3.8.8) · `curl` → псевдоним `Invoke-WebRequest`, программа curl 8.21.0 — только под именем `curl.exe` · `find` → `C:\Windows\system32\find.exe` (поиск строки в файле, к GNU find отношения не имеет) | `Get-Command tar,curl,find -All`; `tar --version`, `curl.exe --version` |
| `tar` / `curl` / `find` — cmd | cmd из PowerShell: `C:\Windows\System32\tar.exe`, `curl.exe`, `find.exe`. cmd из Git Bash наследует его PATH и первыми находит `C:\Program Files\Git\usr\bin\tar.exe`, `C:\Program Files\Git\mingw64\bin\curl.exe`, `C:\Program Files\Git\usr\bin\find.exe` | `where tar`, `where curl`, `where find` |
| Концы строк в Git | `core.autocrlf=true` (системный `C:\Program Files\Git\etc\gitconfig`); файлы upstream хранятся в git с CRLF — EXP-0005 | `git config --show-origin --get core.autocrlf` |
| Помощник учётных данных Git | `credential.helper=manager` (системный gitconfig); для `https://github.com` — `gh auth git-credential` (`~/.gitconfig`, после `gh auth setup-git`) | `git config --show-origin --get-regexp ^credential` |
| Пакетные менеджеры | winget v1.29.380; Chocolatey 1.3.0 (`C:\ProgramData\chocolatey\bin\choco.exe`); scoop нет | `winget --version`; `choco -v`; `scoop --version` → нет команды |
| Причуда: инструмент Bash режет длинную команду | команда длиннее ~9 КБ обрезается молча (кириллица — 2 байта на букву), heredoc остаётся незакрытым; фоновая задача живёт не дольше 10 мин (`timeout` ≤ 600000) | урока в `EXPERIENCE.md` KAST нет; источник — память агента `bash-tool-limits-on-this-machine.md` (2026-09-04) |
| Причуда: инструмент Bash съедает обратную косую в теле heredoc | `\\` схлопывается в `\` даже под `<<'EOF'` — EXP-0002. С 2026-09-26 такой heredoc отклоняет страж `tools/hooks/no-backslash-heredoc.mjs` (хук подключён, раздел 6); файл с `\` писать инструментами Write и Edit | `node tools/test-hook-guards.mjs` → `14/14 as expected` |
| Причуда: PowerShell 5.1 читает `.ps1` без BOM в ANSI | UTF-8 без BOM с кириллицей падает с `ParserError: TerminatorExpectedAtEndOfString` (проба 2026-09-26: `Write-Output 'Привет'`); скрипты `.ps1` писать только в ASCII | `powershell -NoProfile -File <файл UTF-8 без BOM>.ps1`; урока в `EXPERIENCE.md` нет |
| Причуда: `sed -i` в Git Bash | переписывает файл upstream с CRLF в LF, `git diff` показывает весь файл — EXP-0005 | `git diff --stat <файл>` сразу после правки |
| Причуда: MSYS переписывает путь в аргументе | `/data/local/tmp` превращается в `C:/Program Files/Git/data/local/tmp`; для путей на устройстве (`adb shell`, `adb push`) ставить `MSYS_NO_PATHCONV=1` | Git Bash: `node -e "console.log(process.argv[1])" /data/local/tmp`; с `MSYS_NO_PATHCONV=1` → `/data/local/tmp` |
| Причуда: старый `adb` 1.0.32 первым в PATH | он сбивает сервер новой версии; `adb` вызывать полным путём `D:\Android\Sdk\platform-tools\adb.exe` или ставить `D:\Android\Sdk\platform-tools` в PATH первым на вызов (раздел 6, строка UI-агента) | строка `adb` в PATH выше |
| Причуда: `JAVA_HOME` указывает на удалённый JDK 17 | без явного JDK 21 сборка падает сразу; рецепт — раздел 6, строка сборки | строка `JAVA_HOME` выше |
| Причуда: процесс агента не видит переменных User, заданных после его запуска | `KAIF_VOICE_TOOL` в User — `F:\KLAS\tools\voice-say.mjs`, в процессе агента пусто; переменные передавать явно в вызове (раздел 6, строка `KAIF_VOICE_TOOL`) | PowerShell: `$env:KAIF_VOICE_TOOL`; `[Environment]::GetEnvironmentVariable('KAIF_VOICE_TOOL','User')` |
| Причуда: имена пакетов SDK с `;` | обёртка `sdkmanager` режет их в `.bat` — EXP-0003 (раздел 6) | строка `android.exe … sdk install` в разделе 6 |

## 5. Маршруты, рецепты и соглашения — указатель своих работ

| Поверхность | Где лежит работа | Что покрывает |
|---|---|---|
| `adb` к устройству через Tailscale при включённом NordVPN | этот раздел | 1) в NordVPN → Split tunneling («Don't use VPN for selected apps») добавлен ТОЛЬКО `D:\Android\Sdk\platform-tools\adb.exe`; `tailscaled.exe` туда НЕ добавлять — с ним служба Tailscale не открывает ни одного соединения (`The requested address is not valid in its context`) и компьютер выпадает из сети Tailscale (2026-09-26); 2) после правки исключений — `adb kill-server`, исключение действует на новые процессы; 3) сопряжение нового устройства: на устройстве «Беспроводная отладка» → «Подключить устройство с помощью кода», затем `adb pair <ip>:<порт окна> <код>` при открытом окне, затем `adb connect <ip>:<порт главного экрана>`; 4) проверка PowerShell `TcpClient` к `100.x` всегда даёт `AccessDenied` — это NordVPN, а не устройство; судить по `adb` и его журналу `%TEMP%\adb.log` |
| Локальная сборка Vibepollo с `control_peer_timeout` | `plans/01_vibepollo_local_control_timeout_patch.md` | MSYS2, сборка, подмена `sunshine.exe`, откат, грабли установщика |
| Причины обрыва сессии | `researches/01_why_session_drops_on_network_loss.md` | таймауты ENet клиента и сервера, файл:строка |
| Отправка в GitHub и вход | `git push` (origin `MikalaiKryvusha/KAST`); вход настроен `gh auth setup-git`: `git` по HTTPS берёт токен у `gh auth git-credential` (`~/.gitconfig`), токен `gh` лежит в хранилище учётных данных Windows (аккаунт `MikalaiKryvusha`); проверка — `gh auth status` | при отказе non-fast-forward — `git pull --rebase`, повторить; порядок веток — `AGENT_GUIDE.md` → «Git workflow» |

## 6. Инструменты проекта

| Команда | Что делает | От чего бережёт |
|---|---|---|
| PowerShell: `$env:JAVA_HOME='C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot'; $env:ANDROID_HOME='D:\Android\Sdk'; $env:GRADLE_USER_HOME='D:\Android\gradle-home'; .\gradlew.bat :app:assembleNonRoot_gameDebug --console=plain` | сборка отладочного APK KAST (4 APK по ABI; Титану нужен `arm64-v8a`) | `JAVA_HOME` машины указывает на удалённый JDK 17 — без явного JDK 21 сборка падает сразу; без `GRADLE_USER_HOME` кэш Gradle ляжет на переполненный диск C |
| `D:\Android\Sdk\cmdline-tools\latest\bin\android.exe --sdk=D:\Android\Sdk sdk install <пакет/версия>` | установка пакетов SDK (`platforms/android-36`, `ndk/27.0.12077973`, `build-tools/35.0.0` стоят) | в этом выпуске `sdkmanager` — устаревшая обёртка, имена с `;` режутся в `.bat` (EXP-0003) |
| `D:\Android\Sdk\build-tools\35.0.0\aapt2.exe dump badging <apk>` | пакет и подпись приложения в собранном APK | проверка имени KAST до установки |
| `adb -s 100.99.111.48:<порт> install -r <apk>` | установка APK на Титан (по каналу ~5 Мбит/с: 46 МБ ≈ 84 с) | — |
| `cmd /c "adb -s <устройство> exec-out screencap -p \| magick png:- -quality 75 webp:<файл>.webp"` | снимок экрана устройства сразу в WebP (PNG на диск не пишется — правило владельца) | тяжёлые PNG |
| `$env:KAIF_VOICE_TOOL='F:\KLAS\tools\voice-say.mjs'; $env:KAIF_VOICE='eugene'; node .kaif/tools/contour/review.mjs --call "<фраза>"` (`--dry-run` — фраза без звука) | зовёт владельца голосом «Евгений» (Silero из проекта KLAS на F:); обращение, имя проекта и тихие часы — `.kaif/kaif.json` → `contour`; через удалённый стол слышно («слышу четко», 2026-09-26) | обе переменные стоят в окружении пользователя Windows, но процесс агента запущен раньше и их не видит — без явной передачи вызов падает на системный голос SAPI |
| UI-агент на устройстве (instrumentation-APK + Python-клиент; лежит ВНЕ репозитория, `D:\Android\private\ui-agent\`): PowerShell `$env:PATH="D:\Android\Sdk\platform-tools;$env:PATH"; $env:PYTHONIOENCODING="utf-8"; $env:PYTHONUTF8="1"; python D:\Android\private\ui-agent\ui.py --serial 100.99.111.48:<порт> --start ping`, дальше команды `wait <текст>` · `tapText <текст>` · `find` · `tap x y` · `labels` · `tree` · `back` | быстрое управление интерфейсом: ответ — одна строка за десятки мс, ожидание экрана по событию, без 3-секундных дампов; через 10 мин без клиента агент гаснет — вновь `--start` | старый `adb` 1.0.32 первым в PATH сбивает сервер новой версии — PATH с `D:\Android\Sdk\platform-tools` впереди только на вызов · без `PYTHONUTF8=1` клиент читает ответ агента в cp1251, и кириллица в `find`/`labels` ломается (2026-09-26) |
| `powershell -NoProfile -ExecutionPolicy Bypass -File F:/kast-maintenance/kaif_temp_cleanup.ps1` (разрешено правилом владельца; `-Register` — задача Windows «KAST KAIF temp cleanup», раз в час) | убирает из `%LOCALAPPDATA%\Temp` песочницы самопроверок KAIF (`kaif-*` старше 3 ч) и `tmp.*`/`kago-boot*` старше суток; журнал — `F:\kast-maintenance\kaif_temp_cleanup.log` | переполнение диска C утечкой KAIF (KAIF#110): первый проход 2026-09-26 14:33 — 2518 объектов, 58,56 ГБ, свободно на C 76,5 ГБ |
| `powershell -NoProfile -ExecutionPolicy Bypass -File tools/netdrop.ps1 -Seconds <N>` | провал сети на N секунд: `tailscale down` на хосте → тишина для клиента по Tailscale; печатает `DROP START`/`DROP END` с миллисекундами — якоря для журналов | способ «брандмауэр» НЕ рвёт идущий поток UDP (проверено 2026-09-26); `adb` к Титану на время провала отваливается — после прогона `adb connect`; начало провала раньше `DROP START` на сотни мс |
| `powershell -NoProfile -ExecutionPolicy Bypass -File tools/droprun.ps1 -Seconds <N> [-MidShotAt <с>]` | прогон провала сети с уликами: чистит logcat, запускает `netdrop.ps1`, после провала ждёт `adb` до 60 с, сохраняет журнал клиента, срез журнала сервера, смещение часов, снимок экрана (и снимок посреди провала при `-MidShotAt`) в `D:\Android\private\evidence\<время>-drop<N>\`, печатает строки `KastReconnect` и события хоста; код 2 — `adb` не вернулся | зависший прогон без улик (2026-09-26: переподключение через 2 с оставило `adb` в offline); после прогона UI-агент теряет проброс порта — вновь `--start` |
| страж приватных имён — `.git/hooks/pre-commit` → `node D:/Android/private/kast-denylist-guard.mjs` (список запретов — `D:\Android\private\kast-denylist.txt`, вне репозитория) | каждый коммит сверяется со списком запретов; совпадение — отказ | утечка рабочих имён в публичный KAST; доказан красным 2026-09-26 (пробный коммит с запретным словом отклонён) |
| `node .kaif/tools/kaif-voice-lint.mjs load --genre document` до первого слова текста для владельца; после — `node .kaif/tools/kaif-voice-lint.mjs check <файл> --genre document` (жанры: `document` · `ticket` · `comment` · `message` · `reply` · `essay`) | `load` кладёт в контекст портрет голоса владельца (`AUTHOR_STYLOMETRY.md` — публичный слепок из проекта KAIF, в `.gitignore`: репозиторий публичный) и пишет свидетель `.kaif/voice-marker.json`; `check` сверяет текст с правилами портрета своего жанра | текст чужим голосом; текст, написанный позже часа после последнего `load` («written past the portrait»). Генератора текстов для владельца в KAST нет, минута машинной проверки идёт руками |
| `node .kaif/tools/contour/review.mjs --queue --list` | очередь владельца: первыми — его решения, которые агент ещё не внёс (🔴), дальше документы, которые ждут ответа; команда шага 1b `/resume` | решение владельца, записанное и забытое; план раньше долга владельцу |
| `node .kaif/tools/contour/review.mjs interviews/<doc>.md --check` | проверка формы и дверь археологии: разбор вопросов, предполётная проверка, самопроверка рендера; ничего не показывает и никого не зовёт (код 3 — чинить форму) | страница без переключателей ответа (варианты абзацами); вопрос без аттестата археологии |
| `node .kaif/tools/contour/review.mjs --search "<вопрос>"` | археология перед любым вопросом владельцу, в интервью и в чате: находит, где вопрос уже решался, и печатает строку-аттестат `<!-- archaeology: … -->` | повторный вопрос о том, на что владелец уже ответил |
| страница для владельца: `node .kaif/tools/contour/review.mjs interviews/<doc>.md` — фоновой задачей harness (`run_in_background`); рядом второй фоновой задачей — ждущий `node .kaif/tools/contour/review.mjs --wait interviews/<doc>.md` | страница открывается на этой машине (П3) и зовёт владельца (голос — строка `KAIF_VOICE_TOOL` выше, переменные передать в вызове); владелец сохраняет ответы по одному. Код ждущего 0 — ответ записан: прочитать `interviews/decisions/<doc>.decision.json` ЦЕЛИКОМ (`choice: null` тоже несёт слова владельца в `comment`), внести, запустить ждущего заново, пока вопросы остаются. Код 2 — контур кончился, или за 60 с живой страницы так и не появилось (`WAIT_NO_CONTOUR_MS`): проверить, поднялась ли страница | ответ записан, а агент о нём не узнал: отсоединённый `Start-Process` будить некому (память агента `raise-the-review-contour-as-a-harness-background-task.md`, 2026-09-04) |
| `node .kaif/tools/contour/review.mjs interviews/<doc>.md --close` | единственный законный способ закрыть живую страницу извне: печатает порт, PID и заголовок; пока владелец печатает или черновик не сохранён — отказ (код 4) | потерянный недописанный ответ владельца |
| `node .kaif/tools/contour/review.mjs --mark-implemented interviews/<doc>.md <Q> --where <commit>` | четвёртый факт: решение владельца по вопросу `<Q>` внесено, адрес — коммит; страница этот вопрос больше не поднимает | внесённое решение без отметки — `--queue --list` держит его долгом владельцу (🔴) |
| `node .kaif/tools/kaif-testrun-lint.mjs bug <report.md>` (русские заголовки, которые проверка принимает: `bug --keywords`) | проверка тикета о дефекте продукта для его разработчика по шаблону C навыка `/report-bug` (четыре раздела, три строки, шаги — путь пользователя, охота за воспроизведением) — перед `gh issue create` в KAST, Artemis, Vibepollo | тикет без шагов пользователя; «не воспроизводится» без трёх вариантов охоты. Документы `bugs/NN_*.md` — бэклог агента, эта проверка краснит их по замыслу |
| страж обратной косой в heredoc — `tools/hooks/no-backslash-heredoc.mjs`, хук PreToolUse инструмента Bash в `.claude/settings.json` (подключён владельцем 2026-09-26, коммит `849319dd`, вместе с хуками KAIF из `.kaif/hooks/`); самопроверка — `node tools/test-hook-guards.mjs` из корня репозитория | отклоняет вызов Bash, в теле heredoc которого есть `\` (код 2, причина уходит модели); файл с `\` писать инструментами Write и Edit. Вторая проверка того же хука (2026-09-26): отклоняет проверку KAIF, `review.mjs --check`, `gradlew` или самопроверку, пропущенную через трубу (`| tail`, `| cut`) перед `&& git commit` или `&& git push`; проверку запускать отдельно и читать `$?`. Третья проверка (2026-09-26 ≈19:58): отклоняет `node -e "…"` или `python -c "…"` в двойных кавычках с обратной кавычкой внутри — оболочка выполнила бы её текст как команду; скрипт с текстом писать файлом. Самопроверка: 26 случаев, код 0 — все как ожидалось | битые пути Windows и регулярные выражения после съеденной косой — EXP-0002; коммит при красной проверке: её код выхода съела труба (EXP-0006) |
| реестр пар «истина → зеркало» — `node tools/check-pairs.mjs` из корня репозитория (код 0 — все пары сходятся, 1 — расхождение с именем пары) | сверяет четыре пары: SVG иконки → сгенерированные ресурсы Android (генератор гоняется во временной копии); хуки фрагмента KAIF → `.claude/settings.json`; ключи `kast_*` базовых строк → каждый непустой перевод; закрытые фазы STATUS → MASTER_PLAN. Новая пара «X должно совпадать с Y» входит сюда в день рождения; `/end-chat-soft` запускает команду перед передачей | зеркало, поправленное без источника (иконка руками, строка без перевода, фаза закрыта в одном документе из двух) — EXP-0004 |
