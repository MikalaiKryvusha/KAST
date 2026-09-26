# Test run report — F3 instrument: a debug client ENet timeout shorter than the grace period ends the transport inside the grace window

**Created:** 2026-09-26 17:58 +03:00 · **Run by:** the project agent (Claude Opus 5.5) · **Version/build:** KAST Debug
`com.limelight.kastdebug` 20.2.6, built 17:44 from the working tree that became commit `f39c08fd` (17:49; F2 merged + F3
steps 6 and 1a) — the later clamp of `15c3092e` did not run on the device (same behaviour for 10 < 60); host Vibepollo 2.0.0-beta.3
with our `sunshine.exe` (`control_peer_timeout = 60000`, `ping_timeout = 60000`)

## 1. Work

`plans/06_epic02_F3_resume.md`, step 6 (the instrument for K2) and step 1, first half (the log-only end classifier). Test
basis: plan 06 → «Инструмент для K2: … транспорт умирает на 10-й секунде при сроке 60 с, и путь возобновления проверяется
на живом хосте владельца без правки его сервера».

## 2. Contour

Client: HEADWOLF Titan 1 (Android 16), KAST Debug streaming the host desktop over Tailscale. Host: the owner's PC,
Vibepollo service. Loss: `tools/droprun.ps1` (from the `kast/f2-hold` worktree, identical to `moonlight-noir`'s copy after
the merge) = `tailscale down` on the host for 20 s. Device clock −0.991 s vs host (RTT 0.205 s). REAL WORLD: accumulated —
the owner's live Vibepollo with a paused Desktop session; data and machine — his PC and tablet; path — the tablet's KAST
over his Tailscale.

## 3. Runs

| # | Moment | Command | Exit / outcome |
|---|---|---|---|
| 1 | 2026-09-26 17:46 +03:00 | `run-as` prefs: `<int name="kast_debug_enet_timeout_seconds" value="10" />` (wait stays at the default 60 s); stream restarted | connect line `KastReconnect: policy grace=60000 enet=10000` |
| 2 | 2026-09-26 17:47:14 +03:00 | `powershell -NoProfile -ExecutionPolicy Bypass -File tools/droprun.ps1 -Seconds 20` | exit 0 · transport ended at 10.11 s, classified `transport`, within the grace window |
| 3 | 2026-09-26 17:48 +03:00 | key removed; stream; host «close app» through the admin API (`node D:/Android/tools/cdp.mjs eval "fetch('/api/apps/close',…)"`) | HTTP **401** — the host admin session had expired; the `final` branch was NOT exercised. The 401 is in this report only (the `cdp.mjs` output), not in the evidence folder |

## 4. Checks

Hygiene: `gradlew.bat :app:assembleNonRoot_gameDebug` — BUILD SUCCESSFUL (17:44, 33 s).
Functional run: the owner's path — KAST on his Titan streaming his PC over his Tailscale, the network cut on the host;
READ: the client log `KastReconnect` (connect line copied from the live `adb logcat` output of run 1; runs 2 lines from the
evidence folder), the droprun output.

| Case | Status | Observation |
|---|---|---|
| Step 6 — the instrument sets the client ENet timeout | **pass** | `policy grace=60000 enet=10000` at connect (run 1): grace from the option, ENet from the debug key |
| Step 6 — the transport dies inside the grace window | **pass** | run 2: cut 17:47:14.833 → `silence start silenceMs=1907` → `end class=transport code=-1 withinGrace=true` → `outcome=terminated code=-1 elapsed=10110`, `LimeLog: Connection terminated: -1` |
| Step 1a — class `transport` for −1 | **pass** | run 2, line above |
| Step 1a — class `final` for a host end | **not run** | run 3: 401 from the admin API; the branch stays `[NOT-TESTED]` |
| Behaviour unchanged for users | **pass (by reading)** | without the key the ENet value equals the grace (`kastEnetTimeoutMs`), the classifier only logs; the judge of `f39c08fd` confirmed no new dialogs or timers |

## 5. Found

- The host admin session in the debug Chrome had expired, so a host-side end cannot be triggered by the agent until the
  owner signs in again (`HOUSE_RULES.md` §2 → Vibepollo host). Not a defect of KAST.
- none else.

## 6. Traces

- `D:\Android\private\evidence\20260926-174713-drop20\` — `client.log` (lines `silence start`, `end class=transport`,
  `outcome=terminated`), `netdrop.txt` (`DROP START 2026-09-26T17:47:14.833+03:00 method=tailscale seconds=20` ·
  `DROP END   2026-09-26T17:47:35.176+03:00 tailscale=Running`), `offset.txt`, `host.log`.
- The connect line of run 1 (`17:47:07.026 … policy grace=60000 enet=10000`) is in this report only: the droprun log starts
  after it (it clears logcat at start).

## 7. Verdict

**partial** — the instrument works and drives the transport to die inside the grace window (the precondition of K2); the
`final` branch of the classifier is not exercised (host admin session expired).
