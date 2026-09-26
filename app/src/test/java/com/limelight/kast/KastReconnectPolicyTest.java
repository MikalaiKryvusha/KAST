package com.limelight.kast;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * KAST (plans/06, steps 1 and 6): the reconnect policy rules. Each case names the fact of the runs it guards
 * (testcases/reports/2026-09-26_F2_hold.md, 2026-09-26_F3_instrument.md).
 */
public class KastReconnectPolicyTest {

    @Test
    public void enetTimeoutIsTheGracePeriodWithoutTheInstrument() {
        assertEquals(60000, KastReconnectPolicy.enetTimeoutMs(60, 0));   // F2 K1: policy grace=60000
        assertEquals(10000, KastReconnectPolicy.enetTimeoutMs(10, 0));   // F2 control: wait 10 s
    }

    @Test
    public void theInstrumentShortensTheEnetTimeoutOnlyBelowTheGrace() {
        assertEquals(10000, KastReconnectPolicy.enetTimeoutMs(60, 10));  // F3 instrument run: enet=10000 at grace 60
        assertEquals(60000, KastReconnectPolicy.enetTimeoutMs(60, 60));  // equal to the grace — ignored
        assertEquals(60000, KastReconnectPolicy.enetTimeoutMs(60, 90));  // longer than the grace — ignored
        assertEquals(60000, KastReconnectPolicy.enetTimeoutMs(60, -5));  // negative — ignored
    }

    @Test
    public void aHugeDebugValueCannotOverflow() {
        assertEquals(300000, KastReconnectPolicy.enetTimeoutMs(300, Integer.MAX_VALUE));
    }

    @Test
    public void endClassesOfTheObservedCodes() {
        assertEquals(KastReconnectPolicy.END_FINAL, KastReconnectPolicy.endClass(0, false));      // host closed the app (K4)
        assertEquals(KastReconnectPolicy.END_TRANSPORT, KastReconnectPolicy.endClass(-1, true));  // ENet peer died after a silence (F2 control)
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(-1, false));   // a host-sent ENet disconnect on a live channel
    }

    @Test
    public void hostEndsAreFinalEvenAfterASilence() {
        assertEquals(KastReconnectPolicy.END_FINAL, KastReconnectPolicy.endClass(0, true));
        assertEquals(KastReconnectPolicy.END_FINAL, KastReconnectPolicy.endClass(-102, true));   // early termination
        assertEquals(KastReconnectPolicy.END_FINAL, KastReconnectPolicy.endClass(-103, false));  // protected content
        assertEquals(KastReconnectPolicy.END_FINAL, KastReconnectPolicy.endClass(-104, false));  // frame conversion
    }

    @Test
    public void ambiguousCodesNeedASilenceToCountAsTransport() {
        assertEquals(KastReconnectPolicy.END_TRANSPORT, KastReconnectPolicy.endClass(104, true));  // errno after a silence
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(104, false));   // errno or a host reason — cannot tell
        assertEquals(KastReconnectPolicy.END_TRANSPORT, KastReconnectPolicy.endClass(-101, true)); // no full frame during a silence
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(-101, false));
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(-100, true));   // no video ever — a closed port
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(-7, true));     // anything unlisted
    }

    @Test
    public void withinGraceIsStrictlyBelowTheWait() {
        assertTrue(KastReconnectPolicy.withinGrace(10110, 60));   // F3 instrument run: ended at 10.11 s of a 60 s wait
        assertFalse(KastReconnectPolicy.withinGrace(60000, 60));
        assertTrue(KastReconnectPolicy.withinGrace(0, 60));       // no silence before the end (note for step 1, second half)
    }
}
