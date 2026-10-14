#!/bin/sh
# Rebuild the Rish Da Barbher site into ./barber (served at ogreheart.net/barber/).
# Usage: scripts/build-barber.sh [path to rishDabarbher repo]
set -e
SRC="${1:-$HOME/jlightheart-repo/rishDabarbher}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/barber"

(cd "$SRC" && pnpm install --frozen-lockfile && FIGMA_PUBLIC_URL=/barber pnpm build)
rm -rf "$OUT"
cp -R "$SRC/dist" "$OUT"
echo "Built $SRC into $OUT"
