#!/usr/bin/env bash
# KAST (plan 12, step 5) - Custom Resolution dialog screenshots over device profiles and locales.
# usage: STAND_SERIAL=<ip:port> bash tools/stand/sweep-crd.sh <out dir> <job> [<job> ...]
#   job = <profile>:<port|land>:<locale>   locale one of en ru es fr de
# Each job: profile pair + rotation, app locale, the dialog opened, plus/minus to a stop, WebP shot <profile>_<orient>_<locale>.webp.
# Titan is reset to its own state at the end. [NOT-TESTED]
set -u
OUTDIR=$1; shift
HERE=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$OUTDIR"
export STEP_TO_STOP=1
for job in "$@"; do
  IFS=: read -r P O L <<<"$job"
  case $L in
    en) TAG=en-US; Q=custom;  ROW="Custom Resolution";             S="Settings";      H="Search settings" ;;
    ru) TAG=ru;    Q=-;       ROW="Пользовательское разрешение";   S="Настройки";     H="Поиск настроек" ;;
    es) TAG=es;    Q=Resoluci; ROW="Resolución personalizada";     S="Ajustes";       H="Buscar ajustes" ;;
    fr) TAG=fr;    Q=personnalis; ROW="Résolution personnalisée";  S="Réglages";      H="Rechercher dans les réglages" ;;
    de) TAG=de;    Q=Benutzerdefinierte; ROW="Benutzerdefinierte Auflösung"; S="Einstellungen"; H="Einstellungen durchsuchen" ;;
    *) echo "unknown locale $L"; continue ;;
  esac
  OUT="$OUTDIR/${P}_${O}_${L}.webp"
  if SETTINGS_TEXT="$S" SEARCH_TEXT="$H" bash "$HERE/open-dialog.sh" "$P" "$O" "$Q" "$ROW" "$OUT" "$TAG" >/dev/null 2>&1; then
    echo "ok   $job"
  else
    echo "FAIL $job"
  fi
done
node "$HERE/stand.mjs" reset
