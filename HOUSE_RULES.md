# Правила дома — KAST

> Местные договорённости владельца и агента в этом проекте: постоянные правила владельца, стенды, устройства,
> маршруты и рецепты. Уровень 4 таксономии документов (`AGENT_GUIDE.md`); `/resume` читает файл при входе.
> Как работает агент — `AGENT_GUIDE.md`; С ЧЕМ он работает здесь — этот файл.

**Создан:** 2026-09-26 · **Владелец:** Mikalai Kryvusha · **Перенесено из руководства:** пока ничего

## 1. Постоянные правила владельца

### П1. Android тестировать только на реальных устройствах; виртуализацию на компьютере владельца не включать

1. AVD, эмулятор Android, WSL, Hyper-V (WHPX) и драйвер AEHD на компьютере владельца не ставить и не включать —
   эмулятор Android на Windows без гипервизора не работает, значит AVD = виртуализация.
2. Сборку проверять на устройствах владельца по `adb` (раздел 3); нужно другое устройство — попросить у владельца.
- **Исключение:** нет.

[OWNER] ≈ 2026-09-26 11:37 +03:00 · чат сессии 2026-09-26 («если для AVD нужно будет виртуализация и WSL - то НЕ ДЕЛАЕМ на этой машине, я буду лучше тебе давать реальные андроид устройства»)

## 3. Стенды, окружения и устройства

| Стенд / устройство | Для чего | Как агент до него добирается | Известные грабли |
|---|---|---|---|
| Планшет HEADWOLF Titan 1 (`Titan_1`): Android 16 (API 36), MediaTek MT8792, arm64-v8a, 1600×2560, плотность 480; стоят `com.limelight.noir` (Artemis) и `com.limelight.perf` | установка APK KAST, logcat клиента, скриншоты, сценарии обрыва | `D:\Android\Sdk\platform-tools\adb.exe connect 100.99.111.48:<порт>` — порт с главного экрана «Беспроводной отладки» (2026-09-26 был `36713`, меняется после перезагрузки); сопряжение уже сделано 2026-09-26 | Tailscale до планшета идёт через ретранслятор DERP (Франкфурт, 150–450 мс) — прямой канал не строится; NordVPN режет соединения в `100.x` (рецепт в разделе 5) |
| Сервер Vibepollo (служба `ApolloService`, `C:\Program Files\Apollo`) | хост стрима; журнал сервера — вторая половина каждого сценария обрыва | журналы `C:\Program Files\Apollo\config\logs\sunshine-*.log` (кодировка cp1251: `iconv -f cp1251 -t utf-8`) | не запускать `sunshine.exe` руками; перед перезапуском службы — проверить журнал на активную сессию; наша сборка и откат — `plans/01_vibepollo_local_control_timeout_patch.md` |

## 5. Маршруты, рецепты и соглашения — указатель своих работ

| Поверхность | Где лежит работа | Что покрывает |
|---|---|---|
| `adb` к устройству через Tailscale при включённом NordVPN | этот раздел | 1) в NordVPN → Split tunneling («Don't use VPN for selected apps») добавлен ТОЛЬКО `D:\Android\Sdk\platform-tools\adb.exe`; `tailscaled.exe` туда НЕ добавлять — с ним служба Tailscale не открывает ни одного соединения (`The requested address is not valid in its context`) и компьютер выпадает из сети Tailscale (2026-09-26); 2) после правки исключений — `adb kill-server`, исключение действует на новые процессы; 3) сопряжение нового устройства: на устройстве «Беспроводная отладка» → «Подключить устройство с помощью кода», затем `adb pair <ip>:<порт окна> <код>` при открытом окне, затем `adb connect <ip>:<порт главного экрана>`; 4) проверка PowerShell `TcpClient` к `100.x` всегда даёт `AccessDenied` — это NordVPN, а не устройство; судить по `adb` и его журналу `%TEMP%\adb.log` |
| Локальная сборка Vibepollo с `control_peer_timeout` | `plans/01_vibepollo_local_control_timeout_patch.md` | MSYS2, сборка, подмена `sunshine.exe`, откат, грабли установщика |
| Причины обрыва сессии | `researches/01_why_session_drops_on_network_loss.md` | таймауты ENet клиента и сервера, файл:строка |
| Отправка в GitHub | `git push` (origin `MikalaiKryvusha/KAST`) | при отказе non-fast-forward — `git pull --rebase`, повторить |

## 6. Инструменты проекта

| Команда | Что делает | От чего бережёт |
|---|---|---|
| PowerShell: `$env:JAVA_HOME='C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot'; $env:ANDROID_HOME='D:\Android\Sdk'; $env:GRADLE_USER_HOME='D:\Android\gradle-home'; .\gradlew.bat :app:assembleNonRoot_gameDebug --console=plain` | сборка отладочного APK KAST (4 APK по ABI; Титану нужен `arm64-v8a`) | `JAVA_HOME` машины указывает на удалённый JDK 17 — без явного JDK 21 сборка падает сразу; без `GRADLE_USER_HOME` кэш Gradle ляжет на переполненный диск C |
| `D:\Android\Sdk\cmdline-tools\latest\bin\android.exe --sdk=D:\Android\Sdk sdk install <пакет/версия>` | установка пакетов SDK (`platforms/android-36`, `ndk/27.0.12077973`, `build-tools/35.0.0` стоят) | в этом выпуске `sdkmanager` — устаревшая обёртка, имена с `;` режутся в `.bat` (EXP-0003) |
| `D:\Android\Sdk\build-tools\35.0.0\aapt2.exe dump badging <apk>` | пакет и подпись приложения в собранном APK | проверка имени KAST до установки |
| `adb -s 100.99.111.48:<порт> install -r <apk>` | установка APK на Титан (по каналу ~5 Мбит/с: 46 МБ ≈ 84 с) | — |
| `cmd /c "adb -s <устройство> exec-out screencap -p \| magick png:- -quality 75 webp:<файл>.webp"` | снимок экрана устройства сразу в WebP (PNG на диск не пишется — правило владельца) | тяжёлые PNG |
| `$env:KAIF_VOICE_TOOL='F:\KLAS\tools\voice-say.mjs'; $env:KAIF_VOICE='eugene'; node .kaif/tools/contour/review.mjs --call "<фраза>"` (`--dry-run` — фраза без звука) | зовёт владельца голосом «Евгений» (Silero из проекта KLAS на F:); обращение, имя проекта и тихие часы — `.kaif/kaif.json` → `contour`; через удалённый стол слышно («слышу четко», 2026-09-26) | обе переменные стоят в окружении пользователя Windows, но процесс агента запущен раньше и их не видит — без явной передачи вызов падает на системный голос SAPI |
| UI-агент на устройстве (instrumentation-APK + Python-клиент; лежит ВНЕ репозитория, `D:\Android\private\ui-agent\`): PowerShell `$env:PATH="D:\Android\Sdk\platform-tools;$env:PATH"; $env:PYTHONIOENCODING="utf-8"; $env:PYTHONUTF8="1"; python D:\Android\private\ui-agent\ui.py --serial 100.99.111.48:<порт> --start ping`, дальше команды `wait <текст>` · `tapText <текст>` · `find` · `tap x y` · `labels` · `tree` · `back` | быстрое управление интерфейсом: ответ — одна строка за десятки мс, ожидание экрана по событию, без 3-секундных дампов; через 10 мин без клиента агент гаснет — снова `--start` | старый `adb` 1.0.32 первым в PATH сбивает сервер новой версии — PATH с `D:\Android\Sdk\platform-tools` впереди только на вызов · без `PYTHONUTF8=1` клиент читает ответ агента в cp1251, и кириллица в `find`/`labels` ломается (2026-09-26) |
| `powershell -NoProfile -ExecutionPolicy Bypass -File F:/kast-maintenance/kaif_temp_cleanup.ps1` (разрешено правилом владельца; `-Register` — задача Windows «KAST KAIF temp cleanup», раз в час) | убирает из `%LOCALAPPDATA%\Temp` песочницы самопроверок KAIF (`kaif-*` старше 3 ч) и `tmp.*`/`kago-boot*` старше суток; журнал — `F:\kast-maintenance\kaif_temp_cleanup.log` | переполнение диска C утечкой KAIF (KAIF#110): первый проход 2026-09-26 14:33 — 2518 объектов, 58,56 ГБ, свободно на C 76,5 ГБ |
| `powershell -NoProfile -ExecutionPolicy Bypass -File tools/netdrop.ps1 -Seconds <N>` | провал сети на N секунд: `tailscale down` на хосте → тишина для клиента по Tailscale; печатает `DROP START`/`DROP END` с миллисекундами — якоря для журналов | способ «брандмауэр» НЕ рвёт идущий поток UDP (проверено 2026-09-26); `adb` к Титану на время провала отваливается — после прогона `adb connect`; начало провала раньше `DROP START` на сотни мс |
| страж приватных имён — `.git/hooks/pre-commit` → `node D:/Android/private/kast-denylist-guard.mjs` (список запретов — `D:\Android\private\kast-denylist.txt`, вне репозитория) | каждый коммит сверяется со списком запретов; совпадение — отказ | утечка рабочих имён в публичный KAST; доказан красным 2026-09-26 (пробный коммит с запретным словом отклонён) |
