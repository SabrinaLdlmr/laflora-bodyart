#!/usr/bin/env bash
#
# vernieuw-laflora.sh
#
# Pakt de nieuwste laflora-bodyart.zip uit je map Downloads,
# zet die over je projectmap heen, en stuurt alles naar GitHub.
# Vercel pikt het daarna vanzelf op.
#
# Gebruik:
#   1. Download de zip uit de chat (die belandt in Downloads)
#   2. Open Terminal
#   3. Typ:  bash ~/Downloads/vernieuw-laflora.sh
#
# Je hoeft niets in te vullen. Het script vertelt onderweg wat het doet.

set -euo pipefail

PROJECT="$HOME/laflora-bodyart"
DOWNLOADS="$HOME/Downloads"
REPO="https://github.com/SabrinaLdlmr/laflora-bodyart.git"
BERICHT="${1:-update $(date '+%d-%m-%Y %H:%M')}"

echo ""
echo "  La Flora Bodyart, nieuwe versie publiceren"
echo "  ==========================================="
echo ""

# ---------------------------------------------------------------- 1. de zip
ZIP=$(ls -t "$DOWNLOADS"/laflora-bodyart*.zip 2>/dev/null | head -1 || true)

if [[ -z "$ZIP" ]]; then
  echo "  Ik vind geen laflora-bodyart.zip in je map Downloads."
  echo "  Download hem eerst uit de chat en draai dit script opnieuw."
  exit 1
fi

echo "  Gevonden: $(basename "$ZIP")"

# ------------------------------------------------------------- 2. uitpakken
TIJDELIJK=$(mktemp -d)
trap 'rm -rf "$TIJDELIJK"' EXIT
unzip -q "$ZIP" -d "$TIJDELIJK"

BRON="$TIJDELIJK/laflora-bodyart"
if [[ ! -f "$BRON/package.json" ]]; then
  BRON=$(find "$TIJDELIJK" -name package.json -maxdepth 3 | head -1 | xargs dirname)
fi

echo "  Uitgepakt."

# --------------------------------------------------- 3. projectmap klaarmaken
if [[ ! -d "$PROJECT" ]]; then
  echo "  Nieuwe projectmap aanmaken op $PROJECT"
  mkdir -p "$PROJECT"
fi

cd "$PROJECT"

if [[ ! -d .git ]]; then
  echo "  Git opstarten"
  git init -q
  git branch -M main
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "  GitHub koppelen"
  git remote add origin "$REPO"
fi

# ------------------------------------------------- 4. bestanden overzetten
# Alles behalve .git en node_modules wordt vervangen door de nieuwe versie.
echo "  Bestanden vervangen"
find "$PROJECT" -mindepth 1 -maxdepth 1 \
  ! -name '.git' ! -name 'node_modules' ! -name '.next' \
  -exec rm -rf {} +

cp -R "$BRON"/. "$PROJECT"/

AANTAL=$(find "$PROJECT/public/beelden" -type f 2>/dev/null | wc -l | tr -d ' ')
echo "  $AANTAL bestanden in de beeldenmap"

# --------------------------------------------------------- 5. naar GitHub
if [[ -z "$(git status --porcelain)" ]]; then
  echo ""
  echo "  Er is niets veranderd. Je site was al up to date."
  exit 0
fi

echo "  Opslaan: $BERICHT"
git add -A

# Git wil weten wie je bent. Eenmalig invullen als dat nog niet gebeurd is.
if ! git config user.name >/dev/null 2>&1; then
  if [[ -t 0 ]]; then
    echo ""
    read -r -p "  Je naam (bijvoorbeeld Sabrina): " NAAM
    read -r -p "  Je mailadres: " MAIL
    git config --global user.name "${NAAM:-Sabrina}"
    git config --global user.email "${MAIL:-sabrina@laflorabodyart.nl}"
    echo ""
  else
    git config user.name "Sabrina"
    git config user.email "sabrina@laflorabodyart.nl"
  fi
fi

git commit -q -m "$BERICHT"

echo "  Naar GitHub sturen"
echo ""
echo "  Vraagt hij om een wachtwoord? Plak dan je token."
echo "  Je gebruikersnaam is SabrinaLdlmr."
echo ""

git push -u origin main

echo ""
echo "  Klaar. Vercel bouwt nu de nieuwe versie."
echo "  Over een minuut of twee staat hij live."
echo ""
