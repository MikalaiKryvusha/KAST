#!/bin/bash
# KAST (plans/10, 2026-10-31): one network-loss run on Titan WITHOUT touching the PC network: start Desktop in the given app, turn
# Titan Wi-Fi off for N seconds by a script that runs ON the tablet (it turns Wi-Fi back on with no link to the PC), screenshot
# in the middle and after (WebP), collect the client log and the host log lines into C:/Android/private/evidence/ (private).
# usage: bash tools/titan-wifi-drop.sh <seconds> <tag> [package]   (package default: com.mohitarora.superartemis.debug)
# Needs: Titan on Wi-Fi with no mobile data, the UI agent (HOUSE_RULES section 6), Vibepollo channels = 2 so the owner stream stays.
# [TESTED: 2026-10-31 00:49-00:59 · plans/10, «Runs so far»: three runs, evidence saved, adb back after each]
N="$1"; TAG="$2"; PKG="${3:-com.mohitarora.superartemis.debug}"
export PATH="/c/Android/Sdk/platform-tools:$PATH" PYTHONUTF8=1 PYTHONIOENCODING=utf-8 MSYS_NO_PATHCONV=1
S=100.99.111.48:5555
U="python -X utf8 C:/Android/private/ui-agent/ui.py --serial $S"
E="C:/Android/private/evidence/$(date +%Y%m%d-%H%M%S)-wifi$N-$TAG"; mkdir -p "$E"
cd /d/work/ai_sandbox/KAST
LOG=$(ls -t "/c/Program Files/Apollo/config/logs/"sunshine-*.log | head -1)

adb connect $S > /dev/null
adb -s $S shell input keyevent KEYCODE_WAKEUP
adb -s $S shell settings put system accelerometer_rotation 0
adb -s $S shell settings put system user_rotation 0
adb -s $S shell am force-stop $PKG
adb -s $S shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 > /dev/null 2>&1
sleep 4
timeout 90 $U --start ping > /dev/null 2>&1
timeout 60 $U "tapText Krinik's PC Vibepollo" > /dev/null; sleep 5
START=$(date '+%Y-%m-%d %H:%M:%S')
adb -s $S shell input tap 271 544
for i in $(seq 1 30); do sleep 2; if iconv -f cp1251 -t utf-8 "$LOG" | awk -v s="[$START" '$0 >= s' | grep -q "CLIENT CONNECTED"; then echo "connected after $((i*2)) s"; break; fi; done
sleep 8
adb -s $S logcat -c
HALF=$((N/2))
echo "DROP START $(date '+%H:%M:%S.%N' | cut -c1-12) seconds=$N"
adb -s $S shell "nohup sh -c 'cmd wifi set-wifi-enabled disabled; sleep $HALF; screencap -p /sdcard/sa_mid.png; sleep $((N-HALF)); cmd wifi set-wifi-enabled enabled' > /dev/null 2>&1 &"
sleep $((N + 20))
for i in $(seq 1 30); do adb connect $S > /dev/null 2>&1; if adb -s $S shell true > /dev/null 2>&1; then echo "adb back after $((N + 20 + i*2)) s"; break; fi; sleep 2; done
sleep 6
adb -s $S exec-out screencap -p | magick png:- -quality 75 "webp:$E/after.webp"
adb -s $S exec-out cat /sdcard/sa_mid.png | magick png:- -quality 75 "webp:$E/mid.webp" && adb -s $S shell rm /sdcard/sa_mid.png
adb -s $S logcat -d -v time > "$E/client.log"
iconv -f cp1251 -t utf-8 "$LOG" | awk -v s="[$START" '$0 >= s' | grep -v "Debug:" > "$E/host.log"
echo "EVIDENCE $E"
grep -a -E "ResumeLoop|NetworkDrop|Connection terminated" "$E/client.log" | cut -c1-170
grep -a -E "CLIENT (CONNECTED|DIS)|Session (ended|resuming|pausing)|GET /(launch|resume)|active sessions" "$E/host.log" | cut -c1-130
