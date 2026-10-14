#!/bin/sh
# Copy the Brooks AI page into ./brooks (served at ogreheart.net/brooks/),
# pointed at the Brooks API server on Render.
# Usage: scripts/sync-brooks.sh [path to brooks-ai repo]
set -e
SRC="${1:-$HOME/jlightheart-repo/brooks-ai}"
API_URL="${BROOKS_API_URL:-https://brooks-ai.onrender.com}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/brooks"

mkdir -p "$OUT"
sed "s|<script>|<script>window.BROOKS_API = \"$API_URL\";</script>\n<script>|" "$SRC/web/index.html" \
  | sed "s|<title>brooks-ai</title>|<title>Brooks AI — Ogreheart</title>|" > "$OUT/index.html"
echo "Copied $SRC/web/index.html into $OUT (API: $API_URL)"
