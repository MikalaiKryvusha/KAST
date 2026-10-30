# Test run report — the owner's four profiles moved from Artemide to Super Artemis, checked against Vibepollo

**Created:** 2026-10-30 23:50 +03:00 · **Run by:** the agent (Claude Opus 5.5) · **Version/build:** Super Artemis 1.0.0
release (`com.mohitarora.superartemis`, installed by the owner 2026-10-30 07:57) on Titan; Artemide 20.2.6
(`com.limelight.perf`) as the source of the profiles; Vibepollo 2.0.0-beta.3 with our `sunshine.exe` (STATUS → server)

## 1. Work

The owner's ask (chat ≈23:00 +03:00): find his four hand-tuned profiles, move them into Super Artemis, and check that
Super Artemis sends each profile's request to Vibepollo and that Vibepollo applies it. The owner named the values that
matter: custom bitrate, resolution, fps («кастомные битрейты посмотри», «разрешения», «фпс»). Basis: the profile values
read from Artemide's editor (section 4) and the Vibepollo log lines of each launch.

## 2. Contour

Client: HEADWOLF Titan 1, Android 16, away from home with the owner, on Wi-Fi through Tailscale (`100.99.111.48`);
the tablet given to the agent («да, титан твой»). Host: the owner's PC, Vibepollo service, log
`C:\Program Files\Apollo\config\logs\sunshine-20261030-192432-724.log`; the owner's own stream from his MacBook ended
23:29:10 on his word («отключаюсь через 1 минуту») before the first run. Super Artemis knew the host only by its home
address `192.168.1.60`; the agent added the Tailscale address `100.80.125.66` through «Add a PC» (the same host, UUID
`9ABE0683-…`). Rotation of Titan locked to portrait for the runs and restored after (`accelerometer_rotation 1`).

REAL WORLD: accumulated — the owner's release Super Artemis with its pairing, his Artemide profiles, his live Vibepollo
with his config, verified on the real world; data and machine — his Titan and his PC, verified on the real world; path —
profile chooser, host, Desktop tile, Quick Menu → «Завершить сессию», verified on the real world.

## 3. Runs

| # | Moment | Command | Exit / outcome |
|---|---|---|---|
| 1 | 2026-10-30 ≈23:00–23:10 +03:00 | `node tools/ui.mjs prefs` / `value` and a scratch reader over the Artemide profile editor (read only, Save never tapped) | four profiles read (section 4) |
| 2 | 2026-10-30 23:12–23:25 +03:00 | UI agent `type` + scratch `make_profile.py` in Super Artemis → Profiles → New profile | four profiles saved |
| 3 | 2026-10-30 23:32:40 +03:00 | MAXQ active → Desktop | launch #19, see section 4 |
| 4 | 2026-10-30 23:38:25 +03:00 | `run_profile.sh "MIDQ, Стабильно" 2` | launch #20 |
| 5 | 2026-10-30 23:40:06 +03:00 | `run_profile.sh "LOWQ, Стабильно" 3` | launch #21 |
| 6 | 2026-10-30 23:41:49 +03:00 | `run_profile.sh "MINQ, Стабильно" 4` | launch #22 |
| 7 | 2026-10-30 23:43:36 +03:00 | MINQ → Desktop → «Запустить в виртуальном дисплее» | launch #23 |

## 4. Checks

Hygiene: none.
Functional run: Artemide profile editor read on Titan; four profiles created in the release Super Artemis by the user's
path; five launches of Desktop from Titan, each read in the Vibepollo log (launch, bitrate, frame limiter, encode loop,
capture output) and ended with «Завершить сессию».

Profiles in Artemide (source) and in Super Artemis (copy):

| Profile | Resolution | FPS | Custom bitrate |
|---|---|---|---|
| MAXQ, Стабильно | 1680x1050 | native 144 | 30 Mbps |
| MIDQ, Стабильно | 1680x1050 | native 144 | 15 Mbps |
| LOWQ, Стабильно | 1680x1050 (custom field; the list shows no checked item) | 60 (not set in the profile, the global value) | 7 Mbps |
| MINQ, Стабильно | 1440x900 | 30 | 1 Mbps |

Other starred options of the Artemide profiles (MAXQ: frame pacing, Fast V-Sync, video upscaling, touch mode, smart
clipboard sync) were not moved.

What Vibepollo received and did:

| Run | Profile | Client requested bitrate | Frame limiter | Encoded | Capture output | Display APPLY |
|---|---|---|---|---|---|---|
| 3 | MAXQ | 30000 kbps | 144 | 1680x1050, ≈140 fps | `DISPLAY1` (physical, 3840x2160) | false |
| 4 | MIDQ | 15000 kbps | 144 | 1680x1050, ≈144 fps | `DISPLAY1` | false |
| 5 | LOWQ | 7000 kbps | 60 | 1680x1050, 60 fps | `DISPLAY1` | false |
| 6 | MINQ | 1000 kbps | 30 | 1440x900, 30 fps | `DISPLAY1` | false |
| 7 | MINQ, virtual display | 1000 kbps | 30 | 1440x900, 30 fps | `DISPLAY49` (virtual, created) | true |

| Case | Status | Observation |
|---|---|---|
| Super Artemis sends the profile's bitrate | pass | `Client Requested bitrate is [...]` equals the profile in all five runs |
| Super Artemis sends the profile's fps | pass | `maxFPS (...)` and `effective_limit=` equal the profile |
| Super Artemis sends the profile's resolution | pass | `Encode loop [...] WxH` equals the profile |
| Vibepollo sets the PC display to the profile's mode, plain launch | fail by design of the host config | `Display helper: APPLY dispatch result=false`, `display setup did not complete; continuing stream startup with the existing display`; the physical screen stays 3840x2160 and the picture is scaled |
| Vibepollo sets the display to the profile's mode, virtual display | pass | virtual display created, `APPLY dispatch result=true`, captured `DISPLAY49` |
| Clean up | pass | after run 7: `app_termination`, `virtual_displays_removed=true`, `REVERT dispatch result=true` |

## 5. Found

- The release Super Artemis on Titan had only the home address of the host: away from home the host showed «Не в сети»
  until the Tailscale address was added by hand.
- A plain launch does not switch the PC's physical display to the profile's mode (`APPLY … false`); the owner's
  `sunshine.conf` has no display device option for it. A launch on the virtual display gets the exact mode.
- 30 Mbps over Titan's link on the road brought «Медленное подключение к ПК, снизьте битрейт» in run 3.

## 6. Traces

Vibepollo log above, launches #19–#23; screenshots and the read texts in
`C:\Android\private\evidence\2026-10-30_sa-profiles-vibepollo\` (outside git: they show the PC desktop).

## 7. Verdict

pass — the four profiles are in Super Artemis and each one reaches Vibepollo with its bitrate, fps and resolution; the
physical display mode switch on a plain launch did not happen (host configuration, section 5).
