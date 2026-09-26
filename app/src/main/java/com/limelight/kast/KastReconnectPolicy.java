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
     * The class of a connectionTerminated code. 0 — the host ended it on purpose; -1 — the ENet control peer died
     * (observed in F1/F2). Every other code stays unknown until the recon table of plan 06, step 1 closes its FORK.
     */
    public static String endClass(int errorCode) {
        if (errorCode == MoonBridge.ML_ERROR_GRACEFUL_TERMINATION) {
            return END_FINAL;
        }
        return errorCode == -1 ? END_TRANSPORT : END_UNKNOWN;
    }

    /** Whether an end after {@code silenceElapsedMs} of silence still falls inside the grace period. */
    public static boolean withinGrace(long silenceElapsedMs, int graceSeconds) {
        return silenceElapsedMs < graceSeconds * 1000L;
    }
}
