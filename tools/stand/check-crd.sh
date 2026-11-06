#!/usr/bin/env bash
# KAST (plan 12, criteria 2-4 + control) - functional run of the Custom Resolution dialog on Titan, the user's path.
# usage: STAND_SERIAL=<ip:port> bash tools/stand/check-crd.sh <profile> <out dir>
# Prints one PASS/FAIL line per case with what was read; screenshots of each case go to <out dir>. [NOT-TESTED]
set -u
PROFILE=$1; OUT=$2
PKG=com.mohitarora.superartemis.debug
A=/c/Android/Sdk/platform-tools/adb.exe
export MSYS_NO_PATHCONV=1 UI_SERIAL=$STAND_SERIAL
HERE=$(cd "$(dirname "$0")" && pwd -W)
UI="node $HERE/../ui.mjs"
mkdir -p "$OUT"

dump() { $A -s "$STAND_SERIAL" shell 'uiautomator dump /sdcard/u.xml >/dev/null; cat /sdcard/u.xml'; }
texts() { $UI texts; }
saved() { $A -s "$STAND_SERIAL" shell "run-as $PKG sh -c 'cat shared_prefs/*_preferences.xml'" | grep -o 'name="edit_diy_w_h">[^<]*' | sed 's/.*>//'; }
ok_enabled() { dump | grep -o '<node[^>]*text="OK"[^>]*' | grep -o 'enabled="[a-z]*"' | head -1; }
open() { bash "$HERE/open-dialog.sh" "$PROFILE" port custom "Custom Resolution" "$OUT/$1.webp" en-US >/dev/null 2>&1; }
# Replace the text of a field shown with value $1 by $2: tap it (select-all on focus), type, hide the keyboard
type_into() {
  $UI tap "$1" >/dev/null; sleep 0.5
  $A -s "$STAND_SERIAL" shell input keyevent KEYCODE_MOVE_END
  for i in 1 2 3 4 5; do $A -s "$STAND_SERIAL" shell input keyevent 67; done
  $A -s "$STAND_SERIAL" shell input text "$2"; sleep 0.5
}
hide_ime() { if $A -s "$STAND_SERIAL" shell dumpsys input_method | grep -q "mInputShown=true"; then $A -s "$STAND_SERIAL" shell input keyevent 4; sleep 0.8; fi; }
verdict() { if [ "$2" = "1" ]; then echo "PASS $1 - $3"; else echo "FAIL $1 - $3"; fi; }

# Case 4 control first: a size typed and saved must be read back exactly, or the read-back proves nothing
open c0_open
W=$(texts | sed -n '/^-$/{n;p}' | head -1); H=$(texts | sed -n '/^×$/{n;p}' | head -1)
type_into "$W" 1920; type_into "$H" 1080; hide_ime
$UI tap OK >/dev/null; sleep 1.5
S=$(saved); verdict "control: 1920x1080 saved" "$([ "$S" = "1920x1080" ] && echo 1)" "edit_diy_w_h=$S"

# Case 2: 16:9 then plus moves to the next stop, its label bold (current stop shown in texts)
open c2_open
$UI tap "16:9" >/dev/null; sleep 0.8
B1=$(texts | tr '\n' ' ')
$UI tap "+" >/dev/null; sleep 0.8
$UI shot "$OUT/c2_169_plus.webp" >/dev/null
B2=$(texts | tr '\n' ' ')
verdict "16:9 tapped" "$(echo "$B1" | grep -q '1920 × 1080\|1920 1080' && echo 1)" "after 16:9: $(echo "$B1" | grep -o '[0-9]\{3,4\} × [0-9]\{3,4\}')"
verdict "16:9 plus" "$(echo "$B2" | grep -q '2560 × 1440' && echo 1)" "after +: $(echo "$B2" | grep -o '[0-9]\{3,4\} × [0-9]\{3,4\}')"
$A -s "$STAND_SERIAL" shell input keyevent 4; sleep 1

# Case 3: odd width disables OK and shows the reason
open c3_open
W=$(texts | sed -n '/^-$/{n;p}' | head -1)
type_into "$W" 1921; hide_ime
$UI shot "$OUT/c3_odd.webp" >/dev/null
R=$(texts | grep -c "Width and height must be even"); E=$(ok_enabled)
verdict "odd width: reason shown" "$([ "$R" -ge 1 ] && echo 1)" "reason lines=$R"
verdict "odd width: OK disabled" "$([ "$E" = 'enabled="false"' ] && echo 1)" "OK $E"
$A -s "$STAND_SERIAL" shell input keyevent 4; sleep 1

# Case 4: a typed size is saved as WxH
open c4_open
W=$(texts | sed -n '/^-$/{n;p}' | head -1); H=$(texts | sed -n '/^×$/{n;p}' | head -1)
type_into "$W" 2000; type_into "$H" 1000; hide_ime
$UI shot "$OUT/c4_typed.webp" >/dev/null
$UI tap OK >/dev/null; sleep 1.5
S=$(saved); verdict "typed 2000x1000 saved" "$([ "$S" = "2000x1000" ] && echo 1)" "edit_diy_w_h=$S"
