#!/usr/bin/env bash
# Publiceren in één commando.
#   ./publiceer.sh "tekst op de contactpagina aangepast"
# Zonder bericht pakt hij automatisch de datum en tijd.

set -euo pipefail

BERICHT="${1:-update $(date '+%d-%m-%Y %H:%M')}"

echo "→ Controle op typefouten in de code"
npm run typecheck

echo "→ Proefbouw"
npm run build

if [[ -z "$(git status --porcelain)" ]]; then
  echo "Er is niets veranderd. Klaar."
  exit 0
fi

echo "→ Wijzigingen opslaan: $BERICHT"
git add -A
git commit -m "$BERICHT"

echo "→ Naar GitHub sturen"
git push

echo ""
echo "Klaar. Vercel bouwt nu de nieuwe versie."
echo "Over een minuut of twee staat het live op https://hallo.laflorabodyart.nl"
