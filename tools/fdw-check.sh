#!/usr/bin/env bash
# FDW-2..FDW-7 for one package on Titan (TC_distribution_freedom.md). Usage: fdw.sh <package> <out-dir D:/...>
# Precondition: the new debug build is installed and FDW-1 was just shown (dialog on screen) or the app is fresh.
set -u
P=$1; OUT=$2
ADB=/c/Android/Sdk/platform-tools/adb.exe; S=${S:-192.168.1.3:37447}
export PATH=/c/Android/Sdk/platform-tools:$PATH
cd /d/work/ai_sandbox/KAST
ui() { UI_SERIAL=$S node tools/ui.mjs "$@"; }
shot() { MSYS_NO_PATHCONV=1 UI_SERIAL=$S node tools/ui.mjs shot "$OUT/$1.webp" >/dev/null; }
start() { $ADB -s $S shell am force-stop $P; $ADB -s $S shell monkey -p $P -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep ${1:-4}; }
dialog() { ui texts | grep -c "Google объявила"; }
crashes() { $ADB -s $S logcat -d -b crash | grep -c "$P"; }
top() { $ADB -s $S shell dumpsys activity activities | grep -m1 -E "topResumedActivity|mResumedActivity" | sed 's/^ *//'; }
$ADB -s $S logcat -b crash -c

echo "== FDW-4 Details"
start; echo "dialog=$(dialog)"; ui tap "ПОДРОБНЕЕ" >/dev/null; sleep 4; echo "top: $(top)"; shot fdw4_details_browser
$ADB -s $S shell input keyevent 4; sleep 2; echo "top after back: $(top)"; echo "crash lines=$(crashes)"

echo "== FDW-5 Solution"
start; echo "dialog=$(dialog)"; ui tap "РЕШЕНИЕ" >/dev/null; sleep 4; echo "top: $(top)"; shot fdw5_solution_browser
$ADB -s $S shell input keyevent 4; sleep 2; echo "top after back: $(top)"; echo "crash lines=$(crashes)"

echo "== FDW-6 rotation while shown"
start; echo "dialog before=$(dialog)"
$ADB -s $S shell settings put system accelerometer_rotation 0; $ADB -s $S shell settings put system user_rotation 1; sleep 4
echo "OK buttons after rotate=$(ui texts | grep -cx 'ОК')"; echo "dialog after=$(dialog)"; shot fdw6_rotated
$ADB -s $S shell settings put system user_rotation 0; sleep 3; echo "crash lines=$(crashes)"

echo "== FDW-2 OK remembered"
start; echo "dialog=$(dialog)"; ui tap "ОК" >/dev/null; sleep 2; start; echo "dialog after OK+relaunch=$(dialog)"; shot fdw2_after_ok

echo "== FDW-3 new versionCode"
$ADB -s $S shell run-as $P sh -c "'grep -h versionCodeWarn shared_prefs/*.xml'"
$ADB -s $S shell run-as $P sh -c "'sed -i -E \"s/(name=.versionCodeWarn. value=.)[0-9]+/\\10/\" shared_prefs/${P}_preferences.xml'"
$ADB -s $S shell run-as $P sh -c "'grep -h versionCodeWarn shared_prefs/*.xml'"
start; echo "dialog after lowered pref=$(dialog)"; shot fdw3_new_version; ui tap "ОК" >/dev/null; sleep 1

echo "== FDW-7 app's own first screen after OK"
start; echo "dialog=$(dialog)"; ui texts | head -12; shot fdw7_app_screen
echo "crash lines total=$(crashes)"
