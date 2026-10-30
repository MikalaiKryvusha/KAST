# Test run report — Super Artemis: the «connection lost» label over the last frame (issue #7, plan 09)

**Created:** 2026-10-31 00:20 +03:00 · **Run by:** the agent (Claude Opus 5.5) · **Version/build:** Super Artemis
`feature/network-drop-label` on `unified-main` `6c23e114`, `nonRoot_gameDebug` (`com.mohitarora.superartemis.debug`);
build 1 at 23:58, build 2 (with the fix of the label left under the dialog) at 00:08; commit `aa0ffb90`

## 1. Work

The first of the two PRs the maintainer asked for in #7: the label over the last frame during a network drop, top left with
a 0.5 s fade (the owner's word 2026-10-30 ≈22:30). Basis: acceptance criteria 1–4 of `plans/09_super_artemis_network_drop_label.md`.

## 2. Contour

Client: HEADWOLF Titan 1, Android 16, away from home, reached through Tailscale `100.99.111.48:5555`; the debug build knew the
host by its home address only, the Tailscale address `100.80.125.66` was added through «Add a PC». Host: the owner's PC,
Vibepollo; the drop is `tools/netdrop.ps1` (Tailscale down on the host). The owner disconnected his MacBook stream before
each run on his word («хорошо, можешь отключать», «отключаюсь»). Network drop grace period of the debug build: 30 s (the
Super Artemis default). Titan rotation locked to portrait for the runs, restored after (`accelerometer_rotation 1`).

REAL WORLD: accumulated — the debug install with its pairing and the owner's live Vibepollo, verified with real state; data
and machine — his Titan and his PC, verified on the real world; path — host, Desktop tile, a stream, a real network loss,
verified on the real world.

## 3. Runs

| # | Moment | Command | Exit / outcome |
|---|---|---|---|
| 1 | 2026-10-30 23:57–23:58 +03:00 | `gradlew.bat assembleNonRoot_gameDebug testNonRoot_gameDebugUnitTest --continue` | 355 tests, 2 failed (`BackupRestoreTest`, the known Windows ones) |
| 2 | 2026-10-31 00:03:28 +03:00 | `tools/droprun.ps1 -Seconds 20 -MidShotAt 10 -Serial 100.99.111.48:5555 -Package com.mohitarora.superartemis.debug` | held, see section 4 |
| 3 | 2026-10-31 00:05:22 +03:00 | the same with `-Seconds 40 -MidShotAt 25` | terminated after the grace period; defect found |
| 4 | 2026-10-31 00:07–00:08 +03:00 | build and tests again after the fix in `stopConnection` | 355 tests, the same 2 failed |
| 5 | 2026-10-31 00:13:46 +03:00 | `tools/droprun.ps1 -Seconds 40 -MidShotAt 25 …` on build 2 | terminated, no label under the dialog |

## 4. Checks

Hygiene: unit suite 353/355, the 2 failures are the known Windows `BackupRestoreTest` ones (runs 1 and 4).
Functional run: a Desktop stream on Titan with a real loss of the host's network; read: the client log lines
`NetworkDrop: …` and `Connection terminated`, the device screenshot in the middle of the loss and after it.

| Case (plan 09) | Status | Observation |
|---|---|---|
| 1. 20 s drop: label top left over the last frame, gone after the network returns | pass | `silence start silenceMs=1878` at 00:03:28.785, `held elapsed=21626` at 00:03:48.532; mid screenshot «Connection lost, waiting for the network… 9 s» top left; after the drop no label, the stream runs (the clock in the picture moves) |
| 2. No drop, no label (control) | pass | from the connect at ≈00:02:56 to the drop at 00:03:28 no `silence start`; one real 2.3 s silence at 00:04:24 showed the label and ended it (`held elapsed=2281`) |
| 3. Drop longer than the grace period | pass on build 2 | build 1: the label counted to 29 s and stayed under the termination dialog — defect; build 2: `silence start` 00:13:46.878, `Connection terminated: -1` 00:14:15.146, the dialog alone on the screen |
| 4. Fade 0.5 s, PiP hides the label | not walked | read in the code: `fadeStatusLabel` with `STATUS_LABEL_FADE_MS = 500`; PiP restore resets alpha and the shown flag; picture-in-picture was not driven on the device |

Dimensions: drop shorter than the grace period, drop longer than it, no drop; not covered — the poor connection label
during a drop on the device, picture-in-picture, the fade seen frame by frame.

## 5. Found

- The drop label stayed on screen under the «connection terminated» dialog, frozen at «29 s» (build 1). Fixed in the same
  PR: `stopConnection` removes the watchdog and hides the drop label (build 2, run 5).

## 6. Traces

`C:\Android\private\evidence\20261031-000326-drop20\`, `…\20261031-000520-drop40\`, `…\20261031-001344-drop40\` (client log,
mid and after screenshots; outside git, they show the PC desktop). PR picture: `reports/sa-network-drop/titan_network_drop_label.webp`.

## 7. Verdict

pass — criteria 1–3 observed on Titan, criterion 4 read in the code only.
