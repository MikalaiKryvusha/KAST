#!/usr/bin/env bash
# KAST (plan 12) - open a Super Artemis settings dialog through the settings search on a stand profile and screenshot it.
# usage: STAND_SERIAL=<ip:port> bash tools/stand/open-dialog.sh <profile> <port|land> "<search text>" "<row title>" <out.webp> [locale]
#   e.g. bash tools/stand/open-dialog.sh s24u port custom "Custom Resolution" D:/shots/s24_port.webp en-US
# The profile pair and the rotation are applied again right before the dialog opens, because Titan turns auto-rotate back on.
# [NOT-TESTED]
set -u
PROFILE=$1; ORIENT=$2; QUERY=$3; ROW=$4; OUT=$5; LOCALE=${6:-}
PKG=com.mohitarora.superartemis.debug
A=/c/Android/Sdk/platform-tools/adb.exe
export MSYS_NO_PATHCONV=1 UI_SERIAL=$STAND_SERIAL
HERE=$(cd "$(dirname "$0")" && pwd -W)
UI="node $HERE/../ui.mjs"
STAND="node $HERE/stand.mjs"

# The app starts in the asked rotation: once the settings are open, Titan does not rotate them (seen 2026-11-07)
$STAND apply "$PROFILE" "$ORIENT" || exit 1
if [ -n "$LOCALE" ]; then $A -s "$STAND_SERIAL" shell cmd locale set-app-locales $PKG --locales "$LOCALE"; fi
$A -s "$STAND_SERIAL" shell am force-stop $PKG
$A -s "$STAND_SERIAL" shell monkey -p $PKG -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 2.5
# The settings button and the search bar are found by their content descriptions / hints in the current language
$UI tap "${SETTINGS_TEXT:-Settings}" >/dev/null || exit 1
sleep 1.5
if [ "$QUERY" = "-" ]; then
  # A title adb cannot type (Cyrillic): scroll the list to the row instead of searching
  $STAND apply "$PROFILE" "$ORIENT" >/dev/null || exit 1
  $UI seek "$ROW" >/dev/null || exit 1
else
  $UI tap "${SEARCH_TEXT:-Search settings}" >/dev/null || exit 1
  sleep 1
  $A -s "$STAND_SERIAL" shell input text "$QUERY"
  sleep 1.5
  # On a short landscape screen the keyboard covers the results: hide it with Back, only while it is shown (a Back
  # without the keyboard would leave the settings)
  if $A -s "$STAND_SERIAL" shell dumpsys input_method | grep -q "mInputShown=true"; then
    $A -s "$STAND_SERIAL" shell input keyevent 4
    sleep 1
  fi
  $UI tap "$ROW" >/dev/null || exit 1
  sleep 1.5
  # Rotation again BEFORE the dialog opens: the dialog picks its layout from the screen height at opening
  $STAND apply "$PROFILE" "$ORIENT" >/dev/null || exit 1
  $UI tap "$ROW" >/dev/null || exit 1
fi
sleep 1.5
# STEP_TO_STOP=1: plus then minus, so the dialog stands on a stop and its label is bold
if [ "${STEP_TO_STOP:-0}" = "1" ]; then
  $UI tap "+" >/dev/null; sleep 0.5; $UI tap "-" >/dev/null; sleep 0.8
fi
$UI shot "$OUT"
