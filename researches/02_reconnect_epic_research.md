# Research 02 — the reconnect epic: industry practice, local state, requirements

> **Created:** 2026-09-26 (agent; rung 1 of `/plan-epic` for the reconnect epic, owner's word «принимаемся за
> разработку KAST … сначала планирование, потом по планам работы») · **Parent:** `ideas/01_reconnect_grace_period.md`,
> `researches/01_why_session_drops_on_network_loss.md`, `MASTER_PLAN.md` Ф1–Ф4 · **Status:** complete 2026-09-26 12:18 +03:00;
> feeds `plans/02_EPIC_reconnect.md` · **Outbound:** —

Three sources, synthesized: (A) the industry sweep — 35 findings with verbatim quotes, Appendix A below (delegated to a
subagent; all 7 code quotes re-found in this tree by `grep -F`, 2 web quotes re-fetched by `gh api` and matched — the
Artemis owner's PR invitation and Vibepollo #443's open resume failure); (B) local recon — `researches/01` plus what was
observed on 2026-09-26; (C) the owner's requirements.

## B. Local recon — what stands where the epic lands (observed 2026-09-26)

| # | Fact | Observed how |
|---|---|---|
| B1 | Client control-stream ENet timeout is hard-coded `enet_peer_timeout(peer, 2, 10000, 10000)`; the 3DS branch of the same file already uses `60000` | `moonlight-common-c/src/ControlStream.c` (researches/01 table; quote A-2.1 re-found locally) |
| B2 | `Game.connectionTerminated` maps every non-zero code to stop + dialog + `finish()`; no reconnect code exists | researches/01 (`Game.java:3563`) |
| B3 | Server: Vibepollo `2.0.0-beta.3` with OUR `sunshine.exe` (`control_peer_timeout = 60000`) since 11:23:37; `ping_timeout = 60000` — BOTH server kill switches of A-2.5 are raised; log line `Control peer timeout set to 60000 ms` fired on each client connect (11:27:58, 11:35:05) | `C:\Program Files\Apollo\config\logs\sunshine-20260926-112337-930.log` |
| B4 | Server-side hold itself (a silent client kept ≥ 55 s) is NOT yet observed — plan 01 step 7 | — |
| B5 | Session 11:27:58–11:30:07 (client "Mac", ZeroTier `10.147.17.247`) ended CLIENT-side: a burst of lost frames at 11:30:05 (IDR forced), then ICMP "port unreachable" on the server's UDP sends at 11:30:07.445 and `CLIENT DISCONNECTED` at 11:30:07.493 — the client closed its sockets; whether by the user or by a client error is unknown without the client log | same server log |
| B6 | Stream quality on today's paths is poor: 7–42 loss-triggered IDR frames per minute over 19 min of the Mac session (11:35–11:54), no disconnect | `grep -c 'generating IDR'` per minute, same log |
| B7 | Neither overlay network gets a direct path to the host: Titan over Tailscale goes via DERP relay `fra` (158–452 ms); the Mac over ZeroTier is `RELAY`. Hypothesis: NordVPN on the host (all traffic exits via NordWhisper; Tailscale netcheck shows the Nord exit IP `187.15.174.93` as ours) blocks hole punching. Not yet tested (needs NordVPN off for 2 min) | `tailscale ping`, `tailscale netcheck`, `zerotier-one_x64.exe -q peers` |
| B8 | Test device: HEADWOLF Titan 1, Android 16 / API 36, MediaTek MT8792, arm64-v8a; wireless adb over Tailscale works (`adb.exe` excluded in NordVPN split tunneling); Artemis `com.limelight.noir` and `com.limelight.perf` installed. AVD is ruled out by the owner | `adb shell getprop`, `HOUSE_RULES.md` П1 |
| B9 | Build: AGP 8.13 / Gradle 8.13, `JAVA_HOME` = JDK 17, NDK `27.0.12077973`, compileSdk 36 / targetSdk 34; no Android SDK on the machine yet (only platform-tools in `D:\Android\Sdk`); drive C has 22 GB free, D has 37 GB — SDK, NDK and the Gradle cache go to D | `app/build.gradle`, `build.gradle`, `Get-PSDrive` |
| B10 | Identity: debug = `com.limelight.noirdebug` "Diana", release = `com.limelight.noir` "Artemis"; the `nonRoot_game` flavor's `obtainium_app_url` points to Artemis's GitHub — KAST must repoint or drop it; Moonlight's author asks every fork to change the applicationId | `app/build.gradle` lines 57, 96–140 |

## C. Requirements (the owner's words — `ideas/01`, `GOAL.md`)

- «при временной потере сети до 60 секунд НЕ завершать игровую сессию. Сохранять последний декодированный видеокадр;
  при восстановлении network connectivity выполнять корректное восстановление streaming connection без возврата
  пользователя на список хостов» (`ideas/01`, verbatim in commit `6444caf9`).
- Requirements 1–4 of `ideas/01`: server termination unchanged · configurable grace period, default 60 s · detailed
  disconnect/reconnect logging · wait policy as separate options: wait time AND retry frequency (commit `842621d1`).
- `GOAL.md` → «Как выглядит успех», items 1–6; `MASTER_PLAN.md` principles: observation before edit; real termination
  untouchable; small diff to Artemis; one decision — one place.
- Standing rule П1 (`HOUSE_RULES.md`): tests on real devices only.

## Findings → implications for THIS epic

1. **Hold = every kill switch raised; the smallest decides** (A-2.1, A-2.5, A-3.1, A-3.2, A-3.4). The server side is done
   (B3), pending observation (B4). The client side needs `enet_peer_timeout(peer, 2, T, T)` with `T` from the grace-period
   setting → a change in `moonlight-common-c` → KAST's own fork of that submodule (Ф2 gate).
2. **Hold works only while addresses stay the same** (A-1.1, A-5.1, A-3.7): over Tailscale the `100.x` addresses survive a
   Wi-Fi↔LTE switch; a bare switch without a VPN goes straight to auto-resume. The owner's setup is Tailscale/ZeroTier, so
   hold is the primary layer.
3. **Two layers in sequence is the industry shape** (Citrix SR → ACR, WebRTC disconnected → ICE restart, RDP ARC —
   A-1.2…1.4, A-3.5): hold first, then auto-resume inside `Game`, then the old dialog at the grace deadline.
4. **Termination code decides retriable vs final** (A-2.3, A-6.1): 0 and server termination reasons end now; −1, socket
   errors and ENet timeouts enter hold/resume. One retry loop only — never ENet + HTTP + outer loop multiplying.
5. **Retry schedule** (A-4.1…4.4, A-5.2): event-driven first (attempt on the default network's `onAvailable`/`VALIDATED`),
   then capped backoff with jitter, bounded by the grace deadline, reset on success. The owner's «частота повторных
   попыток» option sets the fallback interval.
6. **Freeze-frame is free while the Surface lives** (A-5.3, A-5.4): do not set `KEY_PUSH_BLANK_BUFFERS_ON_STOP`, do not
   destroy the SurfaceView during hold; before any decoder/Surface teardown in auto-resume take a `PixelCopy` (A-5.5).
7. **An outage indicator needs its own watchdog** (A-2.4): the existing «poor connection» signal is frame-loss based and
   silent in a total outage. No blocking modal during the grace period (A-6.3).
8. **Log every transition with its reason** (A-1.3): code, errno, network callbacks, attempt number, elapsed time, outcome.
9. **Resume can fail on the server** (A-2.9, Vibepollo #443 open): detect a failed `/resume`, say so, stop at the deadline.
10. **Testing needs a network-drop instrument that does not kill the agent's own adb link** (B8): Android may switch
    wireless debugging off when Wi-Fi drops, and airplane mode drops adb. Candidates, to be chosen BY OBSERVATION in Ф1:
    (a) a Windows Firewall block rule on the host for the client's address — risk: established UDP flows may keep passing;
    (b) `tailscale down` / `up` on the host — drops adb for the same seconds, and the host sees an interface loss rather
    than silence; (c) phone-side Wi-Fi off with an on-device `nohup` restore — a true outage, but wireless debugging may
    not come back without the owner; (d) a packet-dropping tool on the host (WinDivert/clumsy) — installs a driver.
11. **Stream quality today is limited by relayed paths** (B6, B7) — outside the epic's code, but it inflates every
    measurement: Ф1 records the path type (direct/relay) next to every run.

## Open forks

| Fork | Class | Where it is closed |
|---|---|---|
| What the owner sees during an outage: frozen last frame + an indicator («Связь потеряна, восстанавливаю… N с») | taste (owner's eye) | Ф2: mock-up on the Titan, screenshot to the owner |
| Default retry interval and the allowed range of both options (grace period, retry interval) | engineering, recon-closed (A-4.1, A-4.4, A-6.2) | Ф2 operational plan, `FORK:` line citing this document |
| Network-drop instrument (finding 10) | engineering, by observation | Ф1 |
| Public fork of `moonlight-common-c` under the owner's GitHub account | outward action → owner's word | before Ф2 code |

---

# Appendix A — industry sweep (verbatim, 2026-09-26)

Date of sweep: 2026-09-26. Every finding has my short summary, then a verbatim quote copied from the source, then the source URL.
Code quotes use commit-pinned GitHub permalinks. Whitespace in quotes from line-wrapped pages (RFC text, HTML with hard line
breaks) has been collapsed to single spaces; nothing else was changed.

---

## 1. How mature streaming and remote-desktop products handle a drop

### 1.1 Parsec: 60 s to come back on the same IP address
Parsec's own error article for a client-side cutoff (12007) says the session waits 60 s by default, and only if the client comes
back from the same IP address. A new local IP after the outage is named as the typical reason the wait fails. (The support site is
behind Cloudflare; the text was read through the same Zendesk help-center article's JSON API.)

> You or your cat unplugged your internet. Don't do that please. We give your internet 60 seconds to reconnect by default on the same IP address. Sometimes, your router doesn't do that and chooses a new IP address for your computer.

Source: https://support.parsec.app/hc/en-us/articles/32361439718804-Error-Codes-12007-The-Network-Connection-On-Your-Client-Computer-Was-Cutoff

### 1.2 Citrix Session Reliability: the display freezes with a visible "lost" indicator, and the session stays alive
Citrix documents the same "hold" layer KAST plans: the session stays on the server, the user keeps seeing the frozen screen with a
clear indicator, and they carry on when the network returns, with no new login. The policy reference page says the display "becomes
opaque" while connectivity is lost
(https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/policies/reference/ica-policy-settings/session-reliability-policy-settings.html).

> With Session Reliability, the session remains active on the machine. To indicate lost connectivity, the user’s display freezes and the cursor changes to a spinning hourglass until connectivity resumes on the other side of the tunnel. The user continues to access the display during the interruption and can resume interacting with the application when the network connection is restored.

Source: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/manage-deployment/sessions.html

### 1.3 Citrix: two layers in sequence, hold first and then automatic reconnect, with reconnection events logged
Citrix runs exactly KAST's two-layer design. Session Reliability holds the session for up to its timeout, then Auto Client Reconnect
(ACR) takes over and reconnects to the disconnected session. On the same page, ACR for desktop sessions retries for five minutes by
default (registry `TransportReconnectRetryMaxTimeSeconds`), and there is a policy that logs successful and failed reconnections.

> If you use both Session Reliability and Auto Client Reconnect, the two features work in sequence. Session Reliability closes, or disconnects, the user session after the amount of time you specify in the Session reliability timeout policy setting. After that, the Auto Client Reconnect policy settings take effect, attempting to reconnect the user to the disconnected session.

> Auto Client Reconnect logging: Enables or disables logging of reconnection events in the event log. Logging is disabled by default. When enabled, the server’s system log captures information about successful and failed automatic reconnection events.

Source: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/manage-deployment/sessions.html

### 1.4 RDP Automatic Reconnection: an auto-reconnect cookie, retried either continuously or a set number of times
The protocol spec defines reconnecting to the same session after a short network failure without asking for the password again.
The server hands out a cookie, and the client retries either continuously or a predetermined number of times. The server checks that
the client reconnecting is the last one that was connected to the session.

> In the case of a disconnection due to a network error, the client attempts to reconnect to the server by trying to reconnect continuously or for a predetermined number of times.

Source: https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rdpbcgr/e729948a-3f4e-4568-9aef-d355e30b5389

### 1.5 RDP clients: auto-reconnect is on by default and can be turned off per connection
Auto-reconnect is a user-visible setting (the "Reconnect if the connection is dropped" checkbox in mstsc) and defaults to on. The
ActiveX control's `MaxReconnectAttempts` accepts 0 to 200 (https://learn.microsoft.com/en-us/windows/win32/termserv/imsrdpclientadvancedsettings2-maxreconnectattempts).

> Determines whether the local device will automatically try to reconnect to the remote computer if the connection is dropped, such as when there's a network connectivity interruption.

> Default value: 1

Source: https://learn.microsoft.com/en-us/azure/virtual-desktop/rdp-properties

### 1.6 GeForce NOW (SHIELD user guide): after a network interruption you rejoin within five minutes; after an idle kick you cannot
NVIDIA's own FAQ splits disconnects into two kinds. A network interruption keeps the game resumable for five minutes. A disconnect the
service caused on purpose (idle) cannot be rejoined. This is the legacy SHIELD guide; the current nvidia.custhelp.com pages were
blocked (see "Not found").

> If there is network interruption can I rejoin my game where I left off? Yes. If you reconnect within five minutes to the GeForce NOW server, you will rejoin your game where you left off.

Source: https://support-shield.nvidia.com/geforce-now-user-guide/Troubleshooting-gfn.htm

### 1.7 Mosh: warn the user, keep the session, resume when the network returns
Mosh is the reference design for interactive sessions on mobile links. A heartbeat at least every three seconds lets it tell the user
promptly that the link is silent, instead of hiding a dead connection the way SSH does. The session itself survives and resumes.

> If your Internet connection drops, Mosh will warn you — but the connection resumes when network service comes back.

> The heartbeats allow Mosh to inform the user when it hasn't heard from the server in a while (unlike SSH, where users may be unaware of a dropped connection until they try to type).

Source: https://mosh.org/

---

## 2. Moonlight ecosystem: prior art and maintainers' positions

### 2.1 moonlight-common-c: the control-stream ENet peer timeout is hard-coded to 10 s (60 s on 3DS only)
Upstream sets `enet_peer_timeout(peer, 2, 10000, 10000)` after connect. The only exception is the 3DS build, which already uses
60 000 ms, so the library itself runs with a 60 s value on one platform. Before commit `132833d` (2021, "Limit RTO to 2x RTT and fix
early peer timeout expiration") the call used ENet's default limit and minimum with a 10 s maximum.

> ```
> #ifdef __3DS__
>         // Set the peer timeout to 1 minute and limit backoff to 2x RTT
>         // The 3DS can take a bit longer to set up when starting fresh
>         enet_peer_timeout(peer, 2, 60000, 60000);
> #else
>         // Set the peer timeout to 10 seconds and limit backoff to 2x RTT
>         enet_peer_timeout(peer, 2, 10000, 10000);
> #endif
> ```

Source: https://github.com/moonlight-stream/moonlight-common-c/blob/62e066388f1a1b133e0bee947b9a374311a3354b/src/ControlStream.c#L1831-L1838

### 2.2 moonlight-common-c: the "no video" watchdog only guards the first frame, not the middle of a stream
The 10 s "no video traffic" termination (`ML_ERROR_NO_VIDEO_TRAFFIC`, commit `b46e06f`) only fires while
`receivedDataFromPeer` is still false. A silent video socket in the middle of a stream does not end the session by itself. Separately,
a hard `recvUdpSocket()` error does end it (`connectionTerminated(LastSocketFail())`, same function), and that path needs testing on
Android when an interface goes away.

> ```
>             if (!receivedDataFromPeer) {
>                 // If we wait many seconds without ever receiving a video packet,
>                 // assume something is broken and terminate the connection.
> ```

Source: https://github.com/moonlight-stream/moonlight-common-c/blob/62e066388f1a1b133e0bee947b9a374311a3354b/src/VideoStream.c#L147-L156

### 2.3 moonlight-common-c already separates "server ended it on purpose" from "the transport died"
The termination callback gets 0 when the host intentionally ends the stream (for example, the game exited). Anything non-zero is
unexpected, network loss included. `ControlStream.c` also ends the stream at once when the server's termination message arrives,
without waiting for an ENet disconnect (L1362-L1372). That split is what lets KAST end immediately on a real server termination and
hold or reconnect only on transport loss (-1, socket errors).

> ```
> // This callback is invoked when a connection is terminated after establishment.
> // The errorCode will be 0 if the termination was reported to be intentional
> // from the server (for example, the user closed the game). If errorCode is
> // non-zero, it means the termination was probably unexpected (loss of network,
> // crash, or similar conditions). This will not be invoked as a result of a call
> // to LiStopConnection() or LiInterruptConnection().
> ```

Source: https://github.com/moonlight-stream/moonlight-common-c/blob/62e066388f1a1b133e0bee947b9a374311a3354b/src/Limelight.h#L402-L408

### 2.4 moonlight-common-c: the "poor connection" status comes from frame-loss sampling, so it stays quiet during total silence
`connectionStatusUpdate(CONN_STATUS_POOR)` is computed in `connectionSawFrame()`, which runs only when frames arrive. During a total
outage no frames arrive, so the existing overlay hook never fires. A "Reconnecting…" overlay needs its own time-since-last-packet
watchdog.

> ```
>             // Notify the client of connection status changes based on frame loss rate
> ```

Source: https://github.com/moonlight-stream/moonlight-common-c/blob/62e066388f1a1b133e0bee947b9a374311a3354b/src/ControlStream.c#L471-L505

### 2.5 Sunshine server: two independent kill switches, the ENet DISCONNECT event and `ping_timeout`
On the host, a control-peer ENet disconnect stops the session, and so does a separate session ping deadline (`ping_timeout`, whose
documented default is 10000 ms, https://github.com/LizardByte/Sunshine/blob/e1e6700bbb47c21512b073ab91156db6e30b8a52/docs/configuration.md#ping_timeout).
The deadline is refreshed on every ENet event. A server-side hold therefore needs both of them raised. Vibepollo inherits this code.

> ```
>         case ENET_EVENT_TYPE_DISCONNECT:
>           BOOST_LOG(info) << "CLIENT DISCONNECTED"sv;
>           // No more clients to send video data to ^_^
>           if (session->state == session::state_e::RUNNING) {
>             session::stop(*session);
>           }
> ```

Source: https://github.com/LizardByte/Sunshine/blob/e1e6700bbb47c21512b073ab91156db6e30b8a52/src/stream.cpp#L763-L783

### 2.6 Moonlight's ENet fork (cgutman/enet, used by moonlight-common-c and by Sunshine through it) accepts a peer's new address
Upstream ENet drops any packet whose source address or port differs from the peer's recorded address (lsalzman/enet `protocol.c`
L1046-L1053). The Moonlight fork comments that check out and copies the new source address into the peer on every accepted packet.
So at the ENet level the control stream can in principle roam, as long as it is not timed out first. Whether the video and audio UDP
paths follow a new address was not verified.

> ```
>            /* ! enet_address_equal(& host -> receivedAddress, & peer -> address) || */
> ```

> ```
>        memcpy(& peer -> address, & host -> receivedPeerAddress, sizeof (host -> receivedPeerAddress));
> ```

Source: https://github.com/cgutman/enet/blob/aca87840b57f045a1f7f9299e4b1b9b8e2a5e2f1/protocol.c#L1044-L1091

### 2.7 Upstream maintainer (cgutman): address changes mid-stream are not officially supported
Asked about a stream that survived network interfaces being toggled mid-stream, the Moonlight maintainer said this was unsupported and that Moonlight does not
change the destination address during a stream. He also doubted the old GFE server would carry on. This is the stated upstream
position behind "no reconnect". No maintainer has answered the open reconnect requests (moonlight-qt #1379, #665, #1269;
moonlight-android #1412).

> Ah, that's definitely not officially supported. I'm quite surprised that it works at all. Moonlight doesn't change the destination IP address while it is streaming. It's unclear whether GeForce Experience would even continue the connection if that happened.

Source: https://github.com/moonlight-stream/moonlight-qt/issues/914#issuecomment-1354195752

### 2.8 Artemis owner: auto-reconnect is welcome, but he won't write it himself now, so a PR is invited
In the Artemis request "network disconnection … automatically waits for reconnection" (with an on-screen "reconnecting" prompt),
ClassicOldSong said it can be considered, and invited a PR. On #159 his answer was "Can be considered to add in the future."
(https://github.com/ClassicOldSong/moonlight-android/issues/159#issuecomment-2743018069).

> Auto-reconnect can be considered, but I'm busy on my main project right now, if you know how to code and really want it soon you can try implement it yourself and send a PR.

Source: https://github.com/ClassicOldSong/moonlight-android/issues/356#issuecomment-3214338206

### 2.9 Vibepollo: resuming a paused session can get stuck, and the resume part is still unresolved
AUTO-RESUME depends on the host's "paused, awaiting /resume" state. Vibepollo #443 reports a paused session that could neither be
resumed nor terminated. The owner fixed a deadlock in Terminate but says the resume failure itself is still open.

> A deadlock in the Terminate control has been corrected. The request could wait for a lock it already held, preventing cleanup and blocking subsequent launch or resume requests. The corrected path transfers that lock correctly and reaches cleanup. This correction will be included in the next release. It explains the failed Terminate recovery in the logs, but the initial resume failure occurred earlier and remains unresolved, so the whole issue is not being marked fixed.

Source: https://github.com/Nonary/Vibepollo/issues/443#issuecomment-5548444009

---

## 3. Transport-level practice for surviving network changes

### 3.1 ENet `enet_peer_timeout`: what timeoutLimit, timeoutMinimum and timeoutMaximum mean
A peer is disconnected when reliable traffic stays unacknowledged, either after the backoff has reached `timeoutLimit` and at least
`timeoutMinimum` has passed, or unconditionally after `timeoutMaximum`. The defaults are limit 32, minimum 5000 ms and maximum
30000 ms (`enet.h` L224-L226), which is where the "5-30 s" server behaviour comes from.

> The timeout parameter control how and when a peer will timeout from a failure to acknowledge reliable traffic. Timeout values use an exponential backoff mechanism, where if a reliable packet is not acknowledge within some multiple of the average RTT plus a variance tolerance, the timeout will be doubled until it reaches a set limit. If the timeout is thus at this limit and reliable packets have been sent but not acknowledged within a certain minimum time period, the peer will be disconnected. Alternatively, if reliable packets have been sent but not acknowledged for a certain maximum time period, the peer will be disconnected regardless of the current timeout limit value.

Source: https://github.com/lsalzman/enet/blob/5a9c537fd464b3c6d3c55e1d3bd47588faf71b42/peer.c#L477-L495

### 3.2 ENet timeout check: with a small limit, the minimum sets the effective hold time
In the check itself, `(1 << (sendAttempts-1)) >= timeoutLimit` becomes true after only two send attempts when limit = 2. From then on
the peer drops as soon as `timeoutMinimum` has passed since the oldest unacknowledged packet. Setting minimum = maximum (as
moonlight-common-c does) makes the hold time exactly that value. For a 60 s hold, both sides need `min = max = 60000`, or a large
limit together with max = 60000.

> ```
>        if (peer -> earliestTimeout != 0 &&
>              (ENET_TIME_DIFFERENCE (host -> serviceTime, peer -> earliestTimeout) >= peer -> timeoutMaximum ||
>                ((1u << (outgoingCommand -> sendAttempts - 1)) >= peer -> timeoutLimit &&
>                  ENET_TIME_DIFFERENCE (host -> serviceTime, peer -> earliestTimeout) >= peer -> timeoutMinimum)))
>        {
>           enet_protocol_notify_disconnect (host, peer, event);
> ```

Source: https://github.com/lsalzman/enet/blob/5a9c537fd464b3c6d3c55e1d3bd47588faf71b42/protocol.c#L1376-L1381

### 3.3 QUIC connection migration: a connection ID, not the address, identifies the connection
QUIC ties a connection to a connection ID rather than the 4-tuple, so it survives an IP or port change, with path validation for the
new address. This is the design ENet does not have (upstream ENet) or only partly has (the Moonlight fork, finding 2.6).

> The use of a connection ID allows connections to survive changes to endpoint addresses (IP address and port), such as those caused by an endpoint migrating to a new network.

> Receiving a packet from a new peer address containing a non-probing frame indicates that the peer has migrated to that address.

Source: https://www.rfc-editor.org/rfc/rfc9000.html#section-9

### 3.4 QUIC idle timeout: the effective value is the minimum of what the two endpoints announce
The hold time is set by the stricter side, which also holds for ENet on the client and on the server. Raising only one side does
nothing. QUIC also requires the idle timeout to be at least three probe timeouts.

> Each endpoint advertises a max_idle_timeout, but the effective value at an endpoint is computed as the minimum of the two advertised values (or the sole advertised value, if only one endpoint advertises a non-zero value).

Source: https://www.rfc-editor.org/rfc/rfc9000.html#section-10.1

### 3.5 WebRTC: "disconnected" is transient and may heal by itself; "failed" means an ICE restart
WebRTC standardises the same two tiers as KAST's plan. In the soft "disconnected" state you wait, because it often resolves by
itself. In "failed" you rebuild the transport with `restartIce()`, and per MDN "Existing media transmissions continue uninterrupted
during this process" (https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/restartIce).

> Checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than failed and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the connected state.

Source: https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState

### 3.6 WireGuard: built-in roaming at both ends
WireGuard, which Tailscale uses underneath, sends to the most recent authenticated source endpoint, so the tunnel survives a change of
the underlying IP on either side.

> Both client and server send encrypted data to the most recent IP endpoint for which they authentically decrypted data. Thus, there is full IP roaming on both ends.

Source: https://www.wireguard.com/

### 3.7 Tailscale: a node's tailnet IP does not change when the device moves between networks
Over Tailscale (the owner's setup), the addresses that Moonlight/ENet see stay the same across a Wi-Fi to LTE switch. This meets the
"same IP address" condition that Parsec (1.1) and upstream ENet (see 2.6) rely on, so the HOLD layer can work.

> These addresses stay the same, no matter where nodes move to in the physical world, which means you can share them without worrying about them changing.

Source: https://tailscale.com/kb/1033/ip-and-dns-addresses

---

## 4. Retry policy practice

### 4.1 gRPC connection backoff: 1 s start, ×1.6, capped at 120 s, ±20 % jitter, and a mobile caveat
gRPC's spec is the canonical parameter set for reconnecting a dropped channel. It explicitly allows a different algorithm when
wake-ups on a phone matter, and it resets the backoff once a connection is accepted.

> ```
> With specific parameters of
> MIN_CONNECT_TIMEOUT = 20 seconds
> INITIAL_BACKOFF = 1 second
> MULTIPLIER = 1.6
> MAX_BACKOFF = 120 seconds
> JITTER = 0.2
> ```

> Implementations with pressing concerns (such as minimizing the number of wakeups on a mobile phone) may wish to use a different algorithm, and in particular different jitter logic.

Source: https://github.com/grpc/grpc/blob/0f8d72ed71fd3051bc6a08c4df80e76b3d53a03e/doc/connection-backoff.md

### 4.2 AWS Architecture Blog: add jitter to backoff; exponential backoff without jitter is the clear loser
Randomising the delays spreads out retries that would otherwise land together. "Full Jitter" does the least work. The contention
argument matters most with many clients; for one client and one host it costs nothing and does no harm.

> The solution isn’t to remove backoff. It’s to add jitter.

> The no-jitter exponential backoff approach is the clear loser.

Source: https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/

### 4.3 Google SRE: always use randomized exponential backoff, and never retry forever
The SRE book asks for randomized exponential backoff and a hard limit on retries, and warns that synchronized retries after a
"network blip" amplify each other.

> Always use randomized exponential backoff when scheduling retries. See also "Exponential Backoff and Jitter" in the AWS Architecture Blog [Bro15]. If retries aren’t randomly distributed over the retry window, a small perturbation (e.g., a network blip) can cause retry ripples to schedule at the same time, which can then amplify themselves [Flo94].

> Limit retries per request. Don’t retry a given request indefinitely.

Source: https://sre.google/sre-book/addressing-cascading-failures/

### 4.4 ASP.NET Core SignalR: a "Reconnecting" state, a short default schedule, and a policy bounded by elapsed time
SignalR's client has a first-class `Reconnecting` state so the app can warn the user, a default delay schedule of 0/2/10/30 s, and
then `Closed`. The docs' own custom-policy example stops after 60 s of elapsed reconnect time, the same shape as KAST's "grace
period 60 s". The example uses random delays and returns null to stop.

> Without any parameters, `WithAutomaticReconnect()` configures the client to wait 0, 2, 10, and 30 seconds respectively before trying each reconnect attempt. It stops after four failed attempts.

> Before starting any reconnect attempts, the `HubConnection` transitions to the `HubConnectionState.Reconnecting` state and fires the `Reconnecting` event. This approach provides an opportunity to warn users that the connection is lost and to disable UI elements.

Source: https://learn.microsoft.com/en-us/aspnet/core/signalr/dotnet-client?view=aspnetcore-9.0

---

## 5. Android specifics

### 5.1 A change of the default network kills old connections, so HOLD cannot outlive a bare Wi-Fi to LTE switch
When the system switches the default network, new sockets use the new network and the old ones are forcibly closed later. Without a
VPN that keeps the same network object, a hold cannot bridge a Wi-Fi to cellular switch, and the client has to reconnect.

> When a new network becomes the default, any new connection the app opens uses this network. At some point later, all remaining connections on the previous default network are forcefully terminated.

Source: https://developer.android.com/develop/connectivity/network-ops/reading-network-state

### 5.2 `registerDefaultNetworkCallback`: `onLost` means "no longer the default", and a VPN keeps its identity while its underlying network changes
Use the default-network callback as the "network is back" signal, then wait for `onCapabilitiesChanged` (for example `VALIDATED`)
instead of querying synchronously. With Tailscale the VPN network stays and only its underlying transport changes, which fits HOLD.

> For a callback registered with registerDefaultNetworkCallback(), onLost() means the network has lost the status of being the default network. It might be disconnected.

> For example, a VPN can reconfigure itself to use a faster network that just came up, like switching from mobile to Wi-Fi for its underlying network. In this case, the network loses the TRANSPORT_CELLULAR transport and gains the TRANSPORT_WIFI transport, while keeping the TRANSPORT_VPN transport.

Source: https://developer.android.com/develop/connectivity/network-ops/reading-network-state

### 5.3 SurfaceFlinger keeps showing the last buffer it acquired
A SurfaceView layer that gets no new buffers keeps its last one on screen. The "last decoded frame stays visible" behaviour is
therefore the platform default while the Surface lives, as long as nobody pushes a blank buffer or destroys the Surface.

> When SurfaceFlinger receives the VSync signal, it walks through its list of layers looking for new buffers. If it finds a new buffer, SurfaceFlinger acquires the buffer; if not, it continues to use the previously acquired buffer. SurfaceFlinger must always display something, so it hangs on to one buffer.

Source: https://source.android.com/docs/core/graphics/surfaceflinger-windowmanager

### 5.4 MediaCodec blanks the surface on stop only if asked to
The opt-in key `KEY_PUSH_BLANK_BUFFERS_ON_STOP` exists to clear the previous content to black. Without it, stopping the decoder leaves
the last frame on the Surface. Media3's `PlayerView` behaves the same way: `setKeepContentOnPlayerReset` hides the frame by making a
"shutter" view visible rather than relying on the surface to clear
(https://developer.android.com/reference/androidx/media3/ui/PlayerView).

> If specified when configuring a video decoder rendering to a surface, causes the decoder to output "blank", i.e. black frames to the surface when stopped to clear out any previously displayed contents. The associated value is an integer of value 1.

Source: https://developer.android.com/reference/android/media/MediaFormat

### 5.5 PixelCopy can snapshot a SurfaceView's last frame, but only while the source exists
If the decoder or Surface has to be torn down during AUTO-RESUME, `PixelCopy.request(SurfaceView, Bitmap, …)` (API 24+) can grab the
last queued buffer to show as a still image. It fails with `ERROR_SOURCE_INVALID` if the source "is hardware-protected or destroyed",
so the capture has to happen before teardown.

> Requests for the display content of a SurfaceView to be copied into a provided Bitmap. The contents of the source will be scaled to fit exactly inside the bitmap. The pixel format of the source buffer will be converted, as part of the copy, to fit the bitmap's Bitmap.Config. The most recently queued buffer in the SurfaceView's Surface will be used as the source of the copy.

Source: https://developer.android.com/reference/android/view/PixelCopy

---

## 6. Anti-patterns the industry warns against

### 6.1 Retrying errors that cannot succeed, and retrying at several layers at once
Separate retriable from non-retriable failures, and don't stack retry loops on top of each other, because the attempts multiply. For
KAST: a real server termination is non-retriable. Transport loss is retried in one loop, not in ENet connect, HTTP /resume and an
outer loop at the same time.

> Think about the service holistically and decide if you really need to perform retries at a given level. In particular, avoid amplifying retries by issuing retries at multiple levels: a single request at the highest layer may produce a number of attempts as large as the product of the number of attempts at each layer to the lowest layer.

> Use clear response codes and consider how different failure modes should be handled. For example, separate retriable and nonretriable error conditions. Don’t retry permanent errors or malformed requests in a client, because neither will ever succeed.

Source: https://sre.google/sre-book/addressing-cascading-failures/

### 6.2 Holding a session open too long has a cost: Citrix defaults to 180 s and warns against extending it
Citrix ships a finite hold (180 s) and explicitly notes the security trade-off of a longer one, because the session reconnects
without re-authentication. The lesson is a bounded, configurable grace period, not an unlimited one.

> The Session reliability timeout policy setting has a default of 180 seconds, or three minutes. Although you can extend the amount of time session reliability keeps a session open, this feature is designed for user convenience. Therefore, it does not prompt the user for reauthentication. As you extend the amount of time a session is kept open, the chances increase that a user might get distracted and walk away from the user device. Those actions can potentially leave the session accessible to unauthorized users.

Source: https://docs.citrix.com/en-us/citrix-virtual-apps-desktops/manage-deployment/sessions.html

### 6.3 A blocking modal error that needs a human to press OK strands unattended clients
Moonlight users report that after one host blip every client sat on the "error code -1" dialog until someone pressed OK. Another
user asks for it to "pause/freeze for few seconds trying to reconnect" instead of crashing with -1 on a Wi-Fi blip under a second
(https://github.com/moonlight-stream/moonlight-qt/issues/1379#issuecomment-5152633485). Users have fallen back on external scripts
that scrape the UI.

> At least put an automatic timeout on the error messages so it closes and an external script can auto reconnect ?

> My server had a momentary disconnection from the network and now all the clients are hung, waiting for someone to press ok !

(A screenshot sits between the two sentences in the original comment.)

Source: https://github.com/moonlight-stream/moonlight-qt/issues/1379#issuecomment-2564870757

---

## Implications for KAST

- **HOLD must be raised at every kill switch, and the smallest one decides.** On the client that is the control-stream ENet timeout
  (10 s, hard-coded). On the host it is the ENet default (5-30 s) plus Sunshine/Vibepollo `ping_timeout` (default 10 s). The effective
  hold is the minimum of all of them, as with QUIC's idle timeout. For a 60 s hold, set `enet_peer_timeout(peer, limit, 60000, 60000)`
  on both sides; with a small limit, the minimum is what sets the time. Upstream already uses 60 s on 3DS. Rests on: 2.1, 2.5, 3.1,
  3.2, 3.4.
- **HOLD only helps while the addresses stay the same.** Parsec's 60 s window assumes the same IP, and Android forcibly closes
  connections on the old default network. Over Tailscale the tailnet IPs are stable and WireGuard roams underneath, so HOLD is viable
  for the owner's car/LTE scenario. A plain Wi-Fi to LTE switch without a VPN must go straight to AUTO-RESUME. The Moonlight ENet fork
  tolerates a new source address on the control stream, but video and audio were not verified. Rests on: 1.1, 5.1, 5.2, 3.6, 3.7,
  2.6, 3.3.
- **The two layers match what the industry ships.** Citrix Session Reliability then Auto Client Reconnect, WebRTC
  disconnected/failed with ICE restart, and RDP auto-reconnect to the same session all follow this order. Industry grace periods are
  60 s (Parsec), 180 s (Citrix hold), and 5 min (Citrix ACR for desktops, GeForce NOW rejoin). A 60 s default with a configurable upper
  bound is in line with them. Rests on: 1.1, 1.2, 1.3, 1.4, 1.6, 3.5.
- **Server termination versus transport loss:** decide from the termination code and never retry the former. errorCode 0 (or a
  server termination reason) means end now. -1, socket errors and ENet timeouts go into HOLD/AUTO-RESUME. This is the same split
  GeForce NOW makes between network interruption (rejoinable) and idle kick (not). Rests on: 2.3, 6.1, 1.6.
- **Retry schedule:** make it event-driven first (retry at once on `onAvailable`/`VALIDATED` of the default network), with capped
  exponential backoff plus jitter as a fallback, bounded by the grace deadline and not by an attempt count (SignalR's elapsed-time
  policy). Reset after success. Keep one retry loop, not ENet plus HTTP plus an outer loop multiplying each other. gRPC explicitly
  allows fewer wake-ups on phones. Rests on: 4.1, 4.2, 4.3, 4.4, 5.2, 6.1.
- **Freeze-frame is free while the Surface lives.** SurfaceFlinger keeps the last buffer. Don't configure
  `KEY_PUSH_BLANK_BUFFERS_ON_STOP`, and don't destroy the SurfaceView during HOLD. If AUTO-RESUME has to rebuild the decoder or
  Surface, take a PixelCopy snapshot before teardown and show it as an overlay until the first new frame. Rests on: 5.3, 5.4, 5.5.
- **The overlay needs its own watchdog.** The built-in "poor connection" signal is frame-loss based and never fires in total silence,
  so KAST needs a "no packets for N ms" timer to show "Reconnecting… Xs" over the frozen frame (Citrix hourglass/opaque display,
  Mosh warning, SignalR `Reconnecting`). Never use a blocking modal that waits for a human. Rests on: 2.4, 1.2, 1.7, 4.4, 6.3.
- **Log every transition with its reason.** Record the termination code, network callbacks, each attempt with elapsed time, and the
  final outcome, the way Citrix ACR logs successful and failed reconnections. Rests on: 1.3, 2.3.
- **AUTO-RESUME cannot assume /resume works.** Vibepollo still has an open resume-after-pause failure. The client must detect a
  failed /resume, report it clearly, and stop at the grace deadline instead of looping silently. Rests on: 2.9, 4.3, 6.2.
- **Upstream positions:** Moonlight upstream does not support address change mid-stream and has not answered reconnect requests;
  Artemis's owner invites a PR. The client-side AUTO-RESUME is KAST's own work, possibly upstreamable to Artemis later. Rests on: 2.7,
  2.8, 6.3.

---

## Not found / uncertain

- **Steam Remote Play / Steam Link:** no Valve documentation on behaviour during a network drop, grace period or reconnect policy
  was found. Search results were only community forum threads and third-party troubleshooting blogs.
- **Xbox Cloud Gaming (xCloud):** support.xbox.com pages render client-side and returned no text. The GDK docs found
  (`XGameStreamingRegisterConnectionStateChanged`) only cover connect/disconnect notifications and give no grace period.
- **GeForce NOW (current service):** nvidia.custhelp.com answer 3442 returned 403 or an Oracle error page, and the current GFN FAQ has
  no disconnect or rejoin text. The five-minute rejoin (1.6) comes from the legacy SHIELD user guide and may not describe today's
  service.
- **Chrome Remote Desktop:** Google's network guide covers ICE, STUN, TURN and TCP fallback, but not reconnect behaviour after a
  network change.
- **AnyDesk:** the "Session ended unexpectedly" article lists causes (connectivity loss and others), but documents no auto-reconnect
  after a network loss. The auto-reconnect found applies only to Remote Restart.
- **Parsec:** apart from the 12007 article (60 s, same IP), nothing documents the client UI during the wait, a user-configurable
  timeout, or the retry cadence. None appears in "All Advanced Configuration Options".
- **RDP "twenty attempts at five-second intervals" default:** found only in a Microsoft TechNet/Q&A forum archive that quotes the
  Group Policy text. admx.help returned HTTP 522, so it is not used as a finding.
- **AWS Builders' Library "Timeouts, retries, and backoff with jitter":** it redirects to builder.aws.com, which renders client-side,
  and no text could be extracted.
- **ENet roaming beyond the control stream:** the Moonlight ENet fork accepts a new peer address (2.6). Whether Sunshine/Vibepollo's
  video and audio UDP senders follow a new client address during a live stream was not verified.
- **Android UDP socket errors on interface loss:** `VideoStream.c` ends the session on any `recvUdpSocket()` error (2.2). Whether
  Android returns such an error (rather than just timing out) when Wi-Fi drops, with and without a VPN, was not confirmed from docs.
  This needs a device test.
- **Frame retention across `MediaCodec.release()`:** the platform keeps the last buffer (5.3) and blanks only on request (5.4). No
  document explicitly guarantees the frame survives codec release or reconfigure on every vendor, so it needs a device test.
- **Moonlight V+ (qiin2333/moonlight-vplus) and other Android forks:** a GitHub issue and code search found no auto-reconnect
  implementation, but code search returned nothing at all, so this is unconfirmed.
- **Vibepollo #522** (the owner's request for a configurable control-peer timeout, opened 2026-09-26) had no maintainer response at
  sweep time: https://github.com/Nonary/Vibepollo/issues/522
