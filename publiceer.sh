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
  echo "Je staat op main. Daar publiceren we niet rechtstreeks."
  echo "Werk op de branch test en zet het daarna live met een merge naar main."
  echo ""
  echo "Overstappen kan zo:  git checkout test"
  exit 1
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
echo "Klaar. De branch $BRANCH staat nu op GitHub."
echo "Vercel maakt hiervan een voorbeeldversie."
echo "Live zetten doe je door $BRANCH samen te voegen met main."
