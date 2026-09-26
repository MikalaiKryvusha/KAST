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
        assertEquals(KastReconnectPolicy.END_FINAL, KastReconnectPolicy.endClass(0));        // host closed the app (K4)
        assertEquals(KastReconnectPolicy.END_TRANSPORT, KastReconnectPolicy.endClass(-1));   // ENet peer died (K1 baseline, control)
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(-100));   // no video traffic — not decided yet
        assertEquals(KastReconnectPolicy.END_UNKNOWN, KastReconnectPolicy.endClass(104));    // errno or a host reason — ambiguous
    }

    @Test
    public void withinGraceIsStrictlyBelowTheWait() {
        assertTrue(KastReconnectPolicy.withinGrace(10110, 60));   // F3 instrument run: ended at 10.11 s of a 60 s wait
        assertFalse(KastReconnectPolicy.withinGrace(60000, 60));
        assertTrue(KastReconnectPolicy.withinGrace(0, 60));       // no silence before the end (note for step 1, second half)
    }
}
