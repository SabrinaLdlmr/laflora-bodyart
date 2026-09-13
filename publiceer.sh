#!/usr/bin/env bash
# Publiceren in één commando.
#   ./publiceer.sh "tekst op de contactpagina aangepast"
# Zonder bericht pakt hij automatisch de datum en tijd.
#
# Dit script bouwt niets. Er staat geen Node op deze computer.
# Vercel doet de typecheck en de bouw zodra er gepusht is.

set -euo pipefail

BERICHT="${1:-update $(date '+%d-%m-%Y %H:%M')}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

if [[ "$BRANCH" == "main" ]]; then
  echo "Let op: je staat op main. Dit gaat rechtstreeks live."
  echo ""
fi

if [[ -z "$(git status --porcelain)" ]]; then
  echo "Er is niets veranderd. Klaar."
  exit 0
fi

echo "→ Wijzigingen opslaan op $BRANCH: $BERICHT"
git add -A
git commit -m "$BERICHT"

echo "→ Naar GitHub sturen"
git push -u origin "$BRANCH"

echo ""
if [[ "$BRANCH" == "main" ]]; then
  echo "Klaar. Vercel bouwt nu de nieuwe versie."
  echo "Over een minuut of twee staat het live op https://hallo.laflorabodyart.nl"
else
  echo "Klaar. De branch $BRANCH staat nu op GitHub."
  echo "Vercel maakt hiervan een voorbeeldversie."
  echo "Live zetten doe je door $BRANCH samen te voegen met main."
fi
