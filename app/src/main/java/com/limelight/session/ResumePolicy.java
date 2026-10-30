package com.limelight.session;

import com.limelight.nvstream.jni.MoonBridge;

// NOTE: Decides when a stream that ended is resumed by itself and how long to wait between attempts.
// NOTE: It holds no Android state, so Game only reads its inputs and every rule here is covered by unit tests (based on KAST, MikalaiKryvusha/KAST).
public final class ResumePolicy {
    private ResumePolicy() {
    }

    // NOTE: An end is resumed only when it is a transport death: a code the network can cause, after the host had gone silent.
    // NOTE: 0 and -102 to -104 are the host ending the stream on purpose and are never resumed.
    // NOTE: -1, -101 and positive codes (a socket errno or a host reason) are resumed only after a silence, because the same codes
    // NOTE: also come from a host that disconnects a live channel or from a failed allocation at stream setup.
    // NOTE: -100 (no video ever, usually a closed UDP port) and anything else end the stream as before.
    public static boolean isTransportDeath(int errorCode, boolean silentBefore) {
        switch (errorCode) {
            case MoonBridge.ML_ERROR_GRACEFUL_TERMINATION:
            case MoonBridge.ML_ERROR_UNEXPECTED_EARLY_TERMINATION:
            case MoonBridge.ML_ERROR_PROTECTED_CONTENT:
            case MoonBridge.ML_ERROR_FRAME_CONVERSION:
            case MoonBridge.ML_ERROR_NO_VIDEO_TRAFFIC:
                return false;
            case -1:
            case MoonBridge.ML_ERROR_NO_VIDEO_FRAME:
                return silentBefore;
            default:
                return errorCode > 0 && silentBefore;
        }
    }

    // Whether a stream that has been silent for this long is still inside the network drop grace period
    public static boolean withinGrace(long silentMs, int graceSeconds) {
        return silentMs < graceSeconds * 1000L;
    }

    static final int RETRY_BASE_MS = 1000;
    static final double RETRY_MULTIPLIER = 1.6;
    static final double RETRY_JITTER = 0.2;
    static final int RETRY_CAP_MS = 5000;

    // NOTE: The wait before attempt number attempt (1 based): 1 s growing by 1.6 per attempt with 20 % jitter, never longer than 5 s.
    // NOTE: The jitter keeps many clients of one host from retrying in step. random01 is a uniform number in [0, 1), passed in for the tests.
    // NOTE: When the phone's network comes back, Game starts an attempt at once and skips this wait.
    public static long retryDelayMs(int attempt, double random01) {
        double base = RETRY_BASE_MS * Math.pow(RETRY_MULTIPLIER, Math.max(0, attempt - 1));
        double jittered = base * (1 - RETRY_JITTER + 2 * RETRY_JITTER * random01);
        return Math.min(RETRY_CAP_MS, Math.round(jittered));
    }
}
