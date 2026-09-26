# Test cases — reconnect epic (K1–K6)

**Created:** 2026-09-26 · **Under test:** KAST keeps a game session through a network loss of up to 60 s and restores the
stream by itself · **Version/build:** baseline = KAST Debug 20.2.6 (Artemis `c5cf27f4` + `1ba2dfaa`)
**Test basis:** `GOAL.md` → «Как выглядит успех» items 1–6; `ideas/01_reconnect_grace_period.md` (the owner's words,
commit `6444caf9`, requirement 4 — commit `842621d1`); acceptance scenarios K1–K6 of `plans/02_EPIC_reconnect.md`.

## 1. Goal vector

Achieve: a loss of up to 60 s does not end the session; the last frame stays on screen; the stream comes back by itself.
Maintain: a real end by the host or by the user is immediate. Avoid: «Код ошибки: −1» and the host list after a short loss.

## 2. Requirements under test

| # | Requirement (EARS sentence) | Fit criterion (Scale · Meter · Target) |
|---|---|---|
| R1 | WHILE the network is lost for less than the grace period, KAST shall keep the game screen with the last frame | seconds on the game screen without a dialog · `adb shell dumpsys activity activities` (top = `Game`) + WebP screenshot every 5 s · the whole loss |
| R2 | WHEN the network returns within the grace period, KAST shall restore the stream without the host list | seconds from the network's return to a moving picture · `KastReconnect outcome=` line in logcat · ≤ 5 s (hold) / ≤ 10 s (resume) |
| R3 | IF the loss outlasts the grace period, THEN KAST shall show the end dialog | seconds from the cut to the dialog · `KastReconnect outcome=gave-up elapsed=` · 60–62 s at the default |
| R4 | WHEN the host ends the session, KAST shall close the game screen at once | seconds from the host's end to `connectionTerminated` · host log vs logcat (clock offset corrected) · ≤ 2 s |
| R5 | KAST shall offer two options: reconnect grace period (default 60 s) and retry interval | options present and applied · screenshot + `KastReconnect policy grace= retry=` · both present |
| R6 | KAST shall log the reason and the outcome of every drop and recovery | lines per run · `adb logcat -d -s KastReconnect` · one `start` and one `outcome=` line per run |

## 3. Coverage matrix

| Dimension | Values covered | Explicitly NOT covered (risk named) |
|---|---|---|
| Loss length (boundary values around 10 s client / 60 s grace) | 5 · 20 · 45 · 70 s | 0.5–2 s blips — covered by ENet itself, low risk |
| Loss kind | host-side Tailscale down (`tools/netdrop.ps1`) | phone-side Wi-Fi off — breaks the agent's wireless adb; run it with the owner (F4) |
| Address change | none (Tailscale keeps `100.x`) | Wi-Fi ↔ LTE switch — F4 on the owner's phone |
| End kind | host `POST /api/apps/close`; user exit | host crash / service restart — F4 |
| Network path | Tailscale DERP relay (current reality) | direct Tailscale path — blocked while NordVPN routes the host |

## 4. Cases

Machinery: `tools/netdrop.ps1` for the loss; `adb` + the on-device UI agent (`HOUSE_RULES.md` → Tools) for the screen and
the log; the host log for the server half. Each case READS the tablet screen and both logs.

| # | Case (steps → expected) | Technique | Status + evidence |
|---|---|---|---|
| K1 | stream running → `netdrop -Seconds 20` → game screen stays with the last frame and an outage label; picture moves ≤ 5 s after the return; no host-list | boundary (above the 10 s client timeout) | baseline **fail** 2026-09-26: `Connection terminated: -1` 9.74 s after the cut, dialog «Код ошибки: -1» — `testcases/reports/2026-09-26_F1_baseline.md` |
| K2 | stream running → `netdrop -Seconds 45` (host lets the client go) → KAST stays on the game screen and resumes ≤ 10 s after the return; host log `Session resuming` | state transition (hold → resume) | [NOT-TESTED] — baseline would fail as K1 |
| K3 | stream running → `netdrop -Seconds 70` → the end dialog at 60–62 s, then the host list | boundary (above the grace period) | baseline **fail** 2026-09-26: gave up at 9.77 s, not 60 s — same report |
| K4 | stream running → host `POST /api/apps/close` → KAST leaves the game screen ≤ 2 s, no outage label | decision (real end vs loss) | baseline **pass** 2026-09-26: ≈0.14 s, `Connection terminated: 0` — same report |
| K5 | settings screen → both options present with defaults 60 s / <retry default> → changed values show in `KastReconnect policy` at the next connect | use case | baseline **fail**: options absent |
| K6 | after K1–K4 → `adb logcat -d -s KastReconnect` shows one start and one outcome line per run | error guessing (silent paths) | baseline **fail**: only `LimeLog: Connection terminated: -1` |
| K7 | stream running → `netdrop -Seconds 5` → no label or a short one, no dialog | boundary (below the client timeout) | [NOT-TESTED] |

## 5. Control cases

- The instrument's own control: `netdrop -Method firewall` produced NO loss on a running stream (2026-09-26 14:36) — so a
  pass of K1 is only valid with `-Method tailscale`; before every F2/F3 run, K1 on the OLD build must still fail (the
  instrument still cuts).
- The feature's control: with the grace period set to its minimum, K1 must fail again (the setting really drives the hold).
