# droprun.ps1 - one network-loss run WITH its evidence (plans/04_epic02_F2_hold.md, step 1; lesson of the F1 judge, F1).
#
# What it does, in order:
#   1. connects adb, clears the device log, remembers where the host log ends;
#   2. runs tools/netdrop.ps1 for N seconds (the loss) and keeps its DROP START / DROP END lines;
#   3. reconnects adb, waits a few seconds for the client to react, then saves into <EvidenceRoot>\<stamp>-drop<N>\ :
#        netdrop.txt  - the tool's output (the cut moments)
#        client.log   - the device log of the KAST process (or the tagged lines if the process is gone)
#        host.log     - the host log lines written during the run (converted to UTF-8)
#        offset.txt   - device clock minus host clock, one sample
#        screen.webp  - the device screen after the run (WebP; it may show the owner's desktop - private folder)
#   4. prints a summary: KastReconnect lines, Connection terminated, host session events.
# The evidence folder is OUTSIDE the repository on purpose: screenshots and host logs are private.
#
# Usage:  powershell -NoProfile -ExecutionPolicy Bypass -File tools/droprun.ps1 -Seconds 20
# [TESTED: 2026-09-26 - runs 3 and 5 of testcases/reports/2026-09-26_F2_hold.md: evidence saved, adb back on the first reconnect]

param(
    [int]$Seconds = 20,
    [string]$Serial = '100.99.111.48:36713',
    [string]$Package = 'com.limelight.kastdebug',
    [string]$EvidenceRoot = 'D:\Android\private\evidence',
    [int]$SettleSeconds = 8,
    # Seconds after the start of the loss at which the DEVICE itself takes a screenshot (adb is down during the
    # loss); 0 = none. The file is pulled after the run straight into WebP and removed from the device.
    [int]$MidShotAt = 0
)

$ErrorActionPreference = 'Continue'
$adb = 'D:\Android\Sdk\platform-tools\adb.exe'
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$dir = Join-Path $EvidenceRoot ((Get-Date -Format 'yyyyMMdd-HHmmss') + "-drop$Seconds")
New-Item -ItemType Directory -Force $dir | Out-Null

& $adb connect $Serial | Out-Null
& $adb -s $Serial logcat -c
$hostLog = Get-ChildItem 'C:\Program Files\Apollo\config\logs\sunshine-*.log' | Sort-Object LastWriteTime | Select-Object -Last 1
$hostStart = @(Get-Content -LiteralPath $hostLog.FullName -Encoding Default).Count

$midShot = '/sdcard/kast_droprun_mid.png'
if ($MidShotAt -gt 0) {
    & $adb -s $Serial shell "rm -f $midShot; nohup sh -c 'sleep $MidShotAt; screencap -p $midShot' >/dev/null 2>&1 &"
}
$drop = & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $here 'netdrop.ps1') -Seconds $Seconds 2>&1
$drop | Set-Content -LiteralPath (Join-Path $dir 'netdrop.txt') -Encoding UTF8

# After the loss the adb link over Tailscale may stay "offline" for a while (2026-09-26: a reconnect after 2 s left
# it offline and the run hung on the first device command). Reconnect every 3 s until the device answers, 60 s max.
$online = $false
for ($i = 0; $i -lt 20 -and -not $online; $i++) {
    Start-Sleep -Seconds 3
    & $adb disconnect $Serial | Out-Null
    & $adb connect $Serial | Out-Null
    $online = ((& $adb -s $Serial get-state 2>$null) -join '').Trim() -eq 'device'
}
if (-not $online) {
    ('adb: device ' + $Serial + ' did not come back within 60 s after the loss; device steps skipped') |
        Set-Content -LiteralPath (Join-Path $dir 'adb-offline.txt')
    @(Get-Content -LiteralPath $hostLog.FullName -Encoding Default) | Select-Object -Skip $hostStart |
        Set-Content -LiteralPath (Join-Path $dir 'host.log') -Encoding UTF8
    Write-Output "EVIDENCE $dir"
    Write-Output 'ADB OFFLINE: device steps skipped (host log saved)'
    $drop | Where-Object { $_ -match 'DROP|RECOVERED' }
    exit 2
}
Start-Sleep -Seconds $SettleSeconds

$inv = [Globalization.CultureInfo]::InvariantCulture
$t1 = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() / 1000.0
$dev = [double]::Parse((& $adb -s $Serial shell 'date +%s.%N').Trim(), $inv)
$t2 = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds() / 1000.0
('device-minus-host-s=' + ($dev - ($t1 + $t2) / 2).ToString('0.000', $inv) + ' rtt-s=' + ($t2 - $t1).ToString('0.000', $inv)) |
    Set-Content -LiteralPath (Join-Path $dir 'offset.txt')

if ($MidShotAt -gt 0) {
    cmd /c "`"$adb`" -s $Serial exec-out cat $midShot | magick png:- -quality 70 webp:`"$dir\mid.webp`""
    & $adb -s $Serial shell "rm -f $midShot"
}

$procId = (& $adb -s $Serial shell pidof $Package).Trim()
if ($procId) { & $adb -s $Serial logcat -d -v time --pid=$procId | Set-Content -LiteralPath (Join-Path $dir 'client.log') -Encoding UTF8 }
else { & $adb -s $Serial logcat -d -v time -s KastReconnect LimeLog moonlight-common-c | Set-Content -LiteralPath (Join-Path $dir 'client.log') -Encoding UTF8 }

@(Get-Content -LiteralPath $hostLog.FullName -Encoding Default) | Select-Object -Skip $hostStart |
    Set-Content -LiteralPath (Join-Path $dir 'host.log') -Encoding UTF8

cmd /c "`"$adb`" -s $Serial exec-out screencap -p | magick png:- -quality 70 webp:`"$dir\screen.webp`""

Write-Output "EVIDENCE $dir"
$drop | Where-Object { $_ -match 'DROP|RECOVERED' }
Get-Content -LiteralPath (Join-Path $dir 'offset.txt')
Select-String -LiteralPath (Join-Path $dir 'client.log') -Pattern 'KastReconnect|Connection terminated' | ForEach-Object { 'client: ' + $_.Line }
Select-String -LiteralPath (Join-Path $dir 'host.log') -Pattern 'CLIENT CONNECTED|CLIENT DISCONNECTED|Ping Timeout|Session (ended|pausing|resuming)' | ForEach-Object { 'host:   ' + $_.Line }
