#!/bin/sh
# Rebuild the Rish Da Barbher site into ./rishdabarbher (served at ogreheart.net/rishdabarbher/).
# Usage: scripts/build-rishdabarbher.sh [path to rishDabarbher repo]
set -e
SRC="${1:-$HOME/jlightheart-repo/rishDabarbher}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/rishdabarbher"

(cd "$SRC" && pnpm install --frozen-lockfile && FIGMA_PUBLIC_URL=/rishdabarbher pnpm build)
rm -rf "$OUT"
cp -R "$SRC/dist" "$OUT"
echo "Built $SRC into $OUT"
