package com.limelight.session;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import com.limelight.nvstream.jni.MoonBridge;

import org.junit.Test;

// NOTE: Covers which stream ends are resumed by themselves, the grace period edge and the wait between attempts.
public class ResumePolicyTest {
    @Test
    public void theHostEndingTheStreamIsNeverResumed() {
        int[] finals = {MoonBridge.ML_ERROR_GRACEFUL_TERMINATION, MoonBridge.ML_ERROR_UNEXPECTED_EARLY_TERMINATION,
                MoonBridge.ML_ERROR_PROTECTED_CONTENT, MoonBridge.ML_ERROR_FRAME_CONVERSION, MoonBridge.ML_ERROR_NO_VIDEO_TRAFFIC};
        for (int code : finals) {
            assertFalse("code " + code, ResumePolicy.isTransportDeath(code, true));
            assertFalse("code " + code, ResumePolicy.isTransportDeath(code, false));
        }
    }

    @Test
    public void networkCodesAreResumedOnlyAfterASilence() {
        int[] network = {-1, MoonBridge.ML_ERROR_NO_VIDEO_FRAME, 110, 10054};
        for (int code : network) {
            assertTrue("code " + code, ResumePolicy.isTransportDeath(code, true));
            assertFalse("code " + code, ResumePolicy.isTransportDeath(code, false));
        }
    }

    @Test
    public void otherNegativeCodesAreNotResumed() {
        assertFalse(ResumePolicy.isTransportDeath(-5, true));
    }

    @Test
    public void theGracePeriodEdge() {
        assertTrue(ResumePolicy.withinGrace(29_999, 30));
        assertFalse(ResumePolicy.withinGrace(30_000, 30));
        assertTrue(ResumePolicy.withinGrace(299_000, 300));
    }

    @Test
    public void theWaitGrowsAndStopsAtTheCap() {
        // random01 = 0.5 is the middle of the jitter, so the wait is exactly 1 s x 1.6^(attempt - 1)
        assertEquals(1000, ResumePolicy.retryDelayMs(1, 0.5));
        assertEquals(1600, ResumePolicy.retryDelayMs(2, 0.5));
        assertEquals(2560, ResumePolicy.retryDelayMs(3, 0.5));
        assertEquals(4096, ResumePolicy.retryDelayMs(4, 0.5));
        assertEquals(ResumePolicy.RETRY_CAP_MS, ResumePolicy.retryDelayMs(5, 0.5));
        assertEquals(ResumePolicy.RETRY_CAP_MS, ResumePolicy.retryDelayMs(40, 0.99));
    }

    @Test
    public void theJitterStaysWithinTwentyPercent() {
        assertEquals(800, ResumePolicy.retryDelayMs(1, 0.0));
        assertEquals(1200, ResumePolicy.retryDelayMs(1, 0.999999));
    }
}
