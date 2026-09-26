# KAST — External structure map

> **The EXTERNAL map: where things live.** Companion: `PROJECT_ARCHITECTURE_INTERNAL_MAP.md` (how the system
> thinks). KAST = Artemis (`ClassicOldSong/moonlight-android`, branch `moonlight-noir`) + KAIF docs at the root.
> **Living reference — never DONE-tagged.**

---

## The tree

```
KAST/
├── app/
│   ├── build.gradle                  # flavors root / nonRoot_game; build types debug (".kastdebug", "KAST Debug") / release (".kast", "KAST"); NDK 27.0.12077973
│   └── src/
│       ├── main/java/com/limelight/  # the Android app (Java)
│       │   ├── Game.java             # the stream screen: starts/stops the connection, owns the surface, shows termination dialogs
│       │   ├── PcView.java, AppView.java  # host list → app list (where a terminated session lands the user)
│       │   ├── nvstream/             # protocol client in Java: NvConnection, http/NvHTTP (launch/resume/quit), jni/MoonBridge (JNI facade)
│       │   ├── binding/video/        # MediaCodecDecoderRenderer — the hardware decoder on the SurfaceView
│       │   ├── binding/audio|input/  # audio renderer, controllers/keyboard/mouse
│       │   ├── preferences/          # PreferenceConfiguration (all stream settings), StreamSettings screen
│       │   └── computers/            # host database + ComputerManagerService (polling, discovery)
│       ├── main/jni/
│       │   ├── moonlight-core/       # JNI glue: simplejni.c (Java→C), callbacks.c (C→Java), Android.mk
│       │   │   └── moonlight-common-c/   # GIT SUBMODULE (ClassicOldSong/moonlight-common-c): RTSP, ENet control, video/audio/input streams
│       │   │       └── enet/             # nested submodule (cgutman/enet): the reliable-UDP transport of the control stream
│       │   └── evdev_reader/         # root flavor raw input
│       ├── main/res/                 # layouts, strings (values*/strings.xml, many locales), xml/preferences.xml
│       └── test/java/                # Robolectric JVM tests (android_test_setup.md)
├── researches/  ideas/  plans/  bugs/  interviews/  homeworks/  reports/   # KAIF knowledge dirs
├── *.md (root)                       # KAIF canon: AGENT_GUIDE, STATUS, GOAL, MASTER_PLAN, frameworks, maps
├── .kaif/                            # KAIF machinery (core, tools, hooks, spheres) — not product code
└── .claude/ .agents/ .cline/ .grok/ .roo/   # KAIF skills for five agent systems (mirrors of one canon)
```

## What each part is

| Path | What it is | Depends on / references |
|------|-----------|-------------------------|
| `app/src/main/java/com/limelight/Game.java` | stream Activity; `connectionTerminated` `:3563`, `stopConnection` `:3454`, connection start `:805/:876` | `NvConnection`, `MoonBridge` callbacks, `PreferenceConfiguration` |
| `…/nvstream/NvConnection.java` | session bring-up: `startApp` `:225` chooses `launch` vs `resume` (`:317/:378`), `start` `:388` → `MoonBridge.startConnection` `:459` | `NvHTTP`, `MoonBridge` |
| `…/nvstream/jni/MoonBridge.java` | JNI facade + callback sink; error-code constants (`ML_ERROR_*`) | `moonlight-core/simplejni.c`, `callbacks.c` |
| `app/src/main/jni/moonlight-core/moonlight-common-c/src/` | the protocol core: `ControlStream.c` (ENet control, peer timeout `:1802`), `VideoStream.c`, `AudioStream.c`, `InputStream.c`, `Connection.c` (termination funnel `:158`) | `enet/`, platform sockets |
| `…/preferences/PreferenceConfiguration.java` + `res/xml/preferences.xml` | every user setting (a new "reconnect grace period" goes here) | read by `Game` at start |
| `researches/01_why_session_drops_on_network_loss.md` | the cause map with file:line and server-log evidence | `ideas/01` |

## Cross-references & dependency rules

- Java never calls the C core except through `MoonBridge`; C never calls Java except through `callbacks.c`.
- `moonlight-common-c` is a submodule: a change there is a commit IN the submodule repo plus a pointer bump
  here. KAST's fork is `MikalaiKryvusha/moonlight-common-c` (interview #001, Q1: A); the F2 change lives on its branch
  `kast/enet-timeout`; `.gitmodules` points to the fork since the F2 merge `b2283048` (2026-09-26).
- KAIF files (`.kaif/`, root `*.md`, skill dirs) never touch product code, and product code never reads them.

## Entry points

1. `GOAL.md` → `STATUS.md` → `researches/01_why_session_drops_on_network_loss.md`.
2. Code: `Game.java` (`connectionTerminated`) → `NvConnection.java` → `moonlight-common-c/src/ControlStream.c`.
3. Build: `AGENT_GUIDE.md` → "Build".

---

> Keep this map honest: when you add, move, or rename a file/directory, update the tree and the table in
> the same change. The *internal* logic belongs in `PROJECT_ARCHITECTURE_INTERNAL_MAP.md`.
