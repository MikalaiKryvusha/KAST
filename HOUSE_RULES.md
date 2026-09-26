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
| `adb -s 100.99.111.48:<порт> install -r <apk>` · `adb -s … exec-out screencap -p > <png>` (через `cmd /c`, чтобы PowerShell не испортил байты) | установка и снимок экрана Титана | — |
