# netdrop.ps1 - a network-loss instrument for KAST reconnect tests (plans/03_epic02_F1_build_stand.md, step 7).
#
# Two methods, chosen by observation on 2026-09-26:
#   -Method tailscale (default) - `tailscale down` on the host for N seconds, then `tailscale up`. The client over
#       Tailscale gets true silence from the host, like a lost network. Side effect: the agent's adb link to a
#       device over Tailscale drops for the same seconds - reconnect with `adb connect` afterwards.
#   -Method firewall - two Windows Firewall block rules for the host process and one client address.
#       OBSERVED USELESS for a running stream: a new rule does not cut an already established UDP flow
#       (2026-09-26 14:36:31-14:36:52: 20 s of "block", zero errors and zero frame-loss IDRs in the host log).
#       Kept only as the recorded negative result; it blocks NEW flows.
# Safety: the restore step runs in `finally` (Ctrl+C included); firewall leftovers of an interrupted run
# (prefix "KAST-netdrop-") are removed at start. Needs an elevated shell for the firewall method.
#
# Usage:  powershell -NoProfile -ExecutionPolicy Bypass -File tools/netdrop.ps1 -Seconds 20
# Prints the start and end moments (ISO 8601 with offset) - the anchors for reading client and server logs.
#
# [TESTED: 2026-09-26 - -Method tailscale, runs of 20 s and 70 s on the owner's Titan 1 over Tailscale: the client gave
#  up with "Connection terminated: -1" 9.74 s / 9.77 s after the cut, the host ended by ping timeout 59.65 s after it;
#  Tailscale back "Running" and adb reconnected after each - testcases/reports/2026-09-26_F1_baseline.md]

param(
    [int]$Seconds = 20,
    [ValidateSet('tailscale', 'firewall')][string]$Method = 'tailscale',
    [string]$Remote = '100.99.111.48',
    [string]$Program = 'C:\Program Files\Apollo\sunshine.exe',
    [string]$Tailscale = 'C:\Program Files\Tailscale\tailscale.exe'
)

$ErrorActionPreference = 'Stop'
function Stamp { Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffzzz' }

if ($Method -eq 'firewall') {
    $prefix = 'KAST-netdrop-'
    Get-NetFirewallRule -DisplayName "$prefix*" -ErrorAction SilentlyContinue | Remove-NetFirewallRule
    $name = $prefix + (Get-Date -Format 'yyyyMMdd-HHmmss')
    try {
        New-NetFirewallRule -DisplayName "$name-in" -Direction Inbound -Action Block -RemoteAddress $Remote -Program $Program | Out-Null
        New-NetFirewallRule -DisplayName "$name-out" -Direction Outbound -Action Block -RemoteAddress $Remote -Program $Program | Out-Null
        Write-Output ('DROP START {0} method=firewall remote={1} seconds={2}' -f (Stamp), $Remote, $Seconds)
        Start-Sleep -Seconds $Seconds
    }
    finally {
        Get-NetFirewallRule -DisplayName "$prefix*" -ErrorAction SilentlyContinue | Remove-NetFirewallRule
        Write-Output ('DROP END   {0} rules left: {1}' -f (Stamp), @(Get-NetFirewallRule -DisplayName "$prefix*" -ErrorAction SilentlyContinue).Count)
    }
    exit 0
}

function TsState { try { (& $Tailscale status --json 2>$null | ConvertFrom-Json).BackendState } catch { 'Unknown' } }

# A previous run killed mid-drop leaves Tailscale down: bring it back before measuring anything.
if ((TsState) -ne 'Running') {
    & $Tailscale up --timeout 60s
    Write-Output ('RECOVERED  {0} tailscale was not Running before the drop; now {1}' -f (Stamp), (TsState))
}

$restored = $false
try {
    & $Tailscale down
    if ($LASTEXITCODE -ne 0) { throw "tailscale down failed (exit $LASTEXITCODE) - no drop happened" }
    # DROP START is stamped right after `tailscale down` returns: the true cut is a few hundred ms earlier.
    Write-Output ('DROP START {0} method=tailscale seconds={1}' -f (Stamp), $Seconds)
    Start-Sleep -Seconds $Seconds
}
finally {
    & $Tailscale up --timeout 60s
    $state = TsState
    $restored = ($state -eq 'Running')
    Write-Output ('DROP END   {0} tailscale={1}' -f (Stamp), $state)
}
if (-not $restored) { Write-Error 'tailscale did not come back to Running - restore it by hand: tailscale up'; exit 1 }
