# La Flora Body Art

Website voor **hallo.laflorabodyart.nl**. Next.js 14 met App Router en TypeScript.

## Snel starten

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Waar staat wat

| Ik wil...                    | Ga naar                                            |
| ---------------------------- | -------------------------------------------------- |
| een tekst aanpassen          | `dictionaries/nl.json` (en `en.json`)               |
| een kleur of letter aanpassen| `app/globals.css`, bovenin bij `:root`              |
| een foto toevoegen           | `public/beelden/`, daarna het pad in de json zetten |
| een dienst toevoegen         | een item bij `aanbod.items` in beide json-bestanden |
| iets aan de opmaak veranderen| `components/`                                       |

## De vijf stappen, zoals ze hier staan

**1. Project opzetten.** App Router, TypeScript. Nederlands staat op `/`, Engels op `/en/`.
Elke dienst heeft ook een eigen pagina: `/aanbod/bellypainting`, `/en/aanbod/bellypainting`,
enzovoort. Die worden automatisch gemaakt uit de json, dus je hoeft nooit een route aan te
maken voor een nieuwe dienst.

Wil je voorlopig alleen Nederlands? Verwijder de map `app/en` en de taalknop uit
`components/Nav.tsx`. De rest blijft gewoon werken.

**2. Huisstijl in CSS-variabelen.** Alles staat bovenin `app/globals.css`:

| Variabele            | Kleur     | Waar je het ziet             |
| -------------------- | --------- | ---------------------------- |
| `--kleur-nacht`      | `#241634` | achtergrond                  |
| `--kleur-druif`      | `#4B2E63` | vlakken en kaarten           |
| `--kleur-bloesem`    | `#F2A0B8` | het bloemige accent, knoppen |
| `--kleur-goud`       | `#E0B450` | de glitter, lijnen, labels   |
| `--kleur-blad`       | `#94A97C` | kleine groene details        |
| `--kleur-maanlicht`  | `#FBF4EE` | tekst                        |

Letters: **Grandstander** cursief voor titels, **Jost** voor lopende tekst. Ze zitten als npm-pakket in het project (`@fontsource`), dus de site laadt niets van buitenaf en werkt ook zonder internet tijdens het bouwen.
`<link>` in `app/layout.tsx`. Wil je later de ingebouwde optimalisatie van Next, dan kun je
dat omzetten naar `next/font/google`.

**3. Teksten los van code.** Er staat geen zin in een pagina of component. Alles komt uit
`dictionaries/nl.json` en `dictionaries/en.json`. De structuur van `nl.json` is de norm:
`lib/dictionaries.ts` leidt daar de types uit af, dus als je in het Nederlands een veld
toevoegt en in het Engels vergeet, klaagt TypeScript.

**4. Gedeelde componenten.** De belangrijkste is `components/Beeld.tsx`. Zowel de kaart in het
overzicht als de detailpagina gebruikt dat component. Ze kunnen dus nooit uit de pas lopen.
Hetzelfde geldt voor `Home.tsx` en `AanbodDetail.tsx`: die worden door de Nederlandse en de
Engelse route allebei gebruikt, met alleen een andere taal erin.

**5. Deploy-workflow.** Zie hieronder.

## Naar GitHub en Vercel

```bash
git init
git add -A
git commit -m "eerste versie"
git branch -M main
git remote add origin git@github.com:JOUWNAAM/laflora-bodyart.git
git push -u origin main
```

Daarna in Vercel: **Add New → Project → importeer de repo**. Next.js wordt automatisch
herkend, je hoeft niets in te stellen.

Domein koppelen: in Vercel bij **Settings → Domains** `hallo.laflorabodyart.nl` toevoegen.
Vercel geeft je een CNAME-regel. Die zet je bij je hostingpartij in het DNS van
`laflorabodyart.nl`:

```
Type   Naam    Waarde
CNAME  hallo   cname.vercel-dns.com
```

## Publiceren

```bash
./publiceer.sh "nieuwe foto's bij bellypainting"
```

Het script controleert de types, doet een proefbouw, slaat je wijzigingen op en stuurt ze naar
GitHub. Vercel zet het daarna vanzelf live.

## Nog te doen

- Echte foto's in `public/beelden/`
- E-mailadres, telefoonnummer, Instagram en KvK-nummer in de json invullen
- Teksten naar je eigen woorden herschrijven, wat er nu staat is een startpunt
- Eventueel een boekingsformulier, bijvoorbeeld met Resend
