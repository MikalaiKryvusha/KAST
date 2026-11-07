#!/usr/bin/env bash
# OBT-2/OBT-3 (testcases/TC_distribution_freedom.md): open the README's Obtainium link on the device, import the app, refresh,
# read the app card. Usage: bash tools/obt-check.sh <README.md> <app name in Obtainium> <out-dir D:/...>
# Needs: Obtainium (dev.imranr.obtainium.fdroid) and Chrome on the device; adb from the SDK (HOUSE_RULES).
set -u
README=$1; NAME=$2; OUT=$3
export MSYS_NO_PATHCONV=1
ADB=/c/Android/Sdk/platform-tools/adb.exe; S=${S:-192.168.1.3:37447}
export PATH=/c/Android/Sdk/platform-tools:$PATH
cd "$(dirname "$0")/.."
ui() { UI_SERIAL=$S node tools/ui.mjs "$@"; }
mkdir -p "$OUT"
L=$(grep -oE 'https://apps\.obtainium\.imranr\.dev/redirect\?r=[^"]+' "$README" | head -1)
echo "link: ${L:0:110}…"
$ADB -s $S shell am start -a android.intent.action.VIEW -d "\"$L\"" com.android.chrome >/dev/null 2>&1; sleep 8
echo "import dialog: $(ui texts | grep -cE 'Import app|Импорт')"; ui shot "$OUT/1-import.webp" >/dev/null
# ui.mjs prints «NOT FOUND» but exits 0 - choose the button by the screen text (Obtainium follows the system language)
if ui texts | grep -qx "Продолжить"; then ui tap "Продолжить" >/dev/null; else ui tap "Continue" >/dev/null; fi; sleep 8
$ADB -s $S shell monkey -p dev.imranr.obtainium.fdroid -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1; sleep 4
$ADB -s $S shell input swipe 800 700 800 1800 500; sleep 15
echo "list:"; ui texts | grep -A1 -F "$NAME" | head -3
ui tap "$NAME" >/dev/null 2>&1; sleep 5
echo "card:"; ui texts | head -8; ui shot "$OUT/2-card.webp" >/dev/null
$ADB -s $S shell input keyevent 4; sleep 2
