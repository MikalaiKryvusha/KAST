package com.limelight.kast;

import com.limelight.nvstream.jni.MoonBridge;

/**
 * KAST (plans/06_epic02_F3_resume.md, steps 1 and 6): the pure rules of the reconnect policy, kept out of Game so they
 * can be unit-tested (app/src/test/java/com/limelight/kast/KastReconnectPolicyTest.java) and grow with F3.
 * [TESTED: 2026-09-26 · KastReconnectPolicyTest; on Titan the same rules gave policy grace=60000 enet=10000 and
 * end class=transport withinGrace=true — testcases/reports/2026-09-26_F3_instrument.md]
 */
public final class KastReconnectPolicy {
    private KastReconnectPolicy() {}

    /** The end classes logged as "end class=…" (step 1, first half: log only). */
    public static final String END_FINAL = "final";
    public static final String END_TRANSPORT = "transport";
    public static final String END_UNKNOWN = "unknown";

    /**
     * The client ENet timeout in ms: the grace period, or the debug-only instrument when it is set and SHORTER than the
     * grace period (its purpose; this also bounds it, so seconds * 1000 cannot overflow for grace ≤ 300 s).
     */
    public static int enetTimeoutMs(int graceSeconds, int debugEnetSeconds) {
        int seconds = debugEnetSeconds > 0 && debugEnetSeconds < graceSeconds ? debugEnetSeconds : graceSeconds;
        return seconds * 1000;
    }

    /**
     * The class of a connectionTerminated code (plan 06, step 1 — the recon table of the core's termination codes).
     * FORK: options code only | code + "was the control stream silent before the end" | code + a network event · price of
     * error: resuming after a real host end keeps the user on a dead screen; not resuming after a network change shows
     * the old dialog (the pre-F3 behaviour) · consulted: moonlight-common-c sources (ControlStream.c, VideoStream.c,
     * AudioStream.c, InputStream.c, Limelight.h — the table in plan 06), research 02 finding 4. Chosen: code + silence —
     * resume only when sure; the network event (step 3) may widen it later.
     * <ul>
     * <li>0 — the host closed the app on purpose → final.</li>
     * <li>-102 / -103 / -104 — the host ended the stream (early end, protected content, frame conversion) → final.</li>
     * <li>-1 — the ENet control peer died or a stream receive failed → transport.</li>
     * <li>-101 (no full frame) and positive codes (a socket errno, OR a host reason passed as-is — the two overlap) →
     * transport only after a silence; without one → unknown.</li>
     * <li>-100 (no video ever: a closed UDP port at start) and anything else → unknown.</li>
     * </ul>
     */
    public static String endClass(int errorCode, boolean silenceBefore) {
        switch (errorCode) {
            case MoonBridge.ML_ERROR_GRACEFUL_TERMINATION:
            case MoonBridge.ML_ERROR_UNEXPECTED_EARLY_TERMINATION:
            case MoonBridge.ML_ERROR_PROTECTED_CONTENT:
            case MoonBridge.ML_ERROR_FRAME_CONVERSION:
                return END_FINAL;
            case -1:
                return END_TRANSPORT;
            case MoonBridge.ML_ERROR_NO_VIDEO_FRAME:
                return silenceBefore ? END_TRANSPORT : END_UNKNOWN;
            default:
                return errorCode > 0 && silenceBefore ? END_TRANSPORT : END_UNKNOWN;
        }
    }

    /** Whether an end after {@code silenceElapsedMs} of silence still falls inside the grace period. */
    public static boolean withinGrace(long silenceElapsedMs, int graceSeconds) {
        return silenceElapsedMs < graceSeconds * 1000L;
    }
}
