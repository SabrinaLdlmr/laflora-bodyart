# CLAUDE.md

Afspraken voor het werken aan dit project.

## Het project

La Flora Body Art is een website gebouwd met Next.js 14 (App Router, TypeScript, React 18).
De site staat live op https://laflora-bodyart.vercel.app en wordt gehost op Vercel.
Straks komt hij op https://laflorabodyart.nl, zodra het domein bij Vimexx is gekoppeld.
De code staat op GitHub: https://github.com/SabrinaLdlmr/laflora-bodyart

## Werkafspraken

**Geen Node lokaal.** Op deze computer staat geen Node of npm. Draai dus geen
`npm install`, `npm run dev`, `npm run build` of `npm run typecheck`. De build gebeurt
volledig op Vercel: zodra er naar GitHub gepusht wordt, bouwt Vercel de nieuwe versie.
Controleer wijzigingen door de code te lezen, niet door lokaal te bouwen.

**Werken mag direct op `main`.** Gewone wijzigingen en commits gaan op `main`. Een push
naar `main` gaat rechtstreeks live via Vercel, dus dat is het moment om zeker te weten
dat het klopt.

**De branch `test` is optioneel.** Gebruik die voor grotere experimenten, als je eerst
een voorbeeldversie wilt zien voordat het live gaat. Vercel bouwt van elke branch een
eigen voorbeeldversie. Is het goed, dan voeg je `test` samen met `main`.

**Nederlands is de voertaal.** Overleg, commitberichten, comments in de code en
documentatie zijn in het Nederlands.

**Geen em-dashes in teksten.** Gebruik in alle zichtbare teksten op de site, in
documentatie en in commitberichten een gewone komma, een dubbele punt of een korte zin
in plaats van een em-dash.

**Elke pagina heeft een deelafbeelding (og:image), en dat is altijd het logo.** De
afbeelding staat in `lib/dictionaries.ts` als `DEELBEELD` (`/beelden/laflora-deelbeeld.jpg`,
1200 bij 630: de gouden roos met La Flora). Alle pagina's gebruiken die, ook de
detailpagina's van het aanbod. **Nooit een foto van een kind als deelafbeelding.**
Komt er een nieuwe pagina bij, geef die dan ook `openGraph` met `images` en `DEELBEELD` mee. `metadataBase` in `app/layout.tsx` volgt vanzelf het productiedomein.

**Positionering.** La Flora doet kleine, magische feestjes in sprookjessferen: maximaal
acht kinderen in anderhalf uur. Het moet duidelijk blijven dat Jasmina niet beschikbaar
is voor stuif-in feesten en grote, snelle klussen. Schrijf geen teksten die tempo,
aantallen of een rij kinderen beloven.

## Meertaligheid

De site is Nederlands en Engels. De teksten staan in `dictionaries/nl.json` en
`dictionaries/en.json`. De Nederlandse pagina's staan onder `app/`, de Engelse onder
`app/en/`. Een tekst aanpassen betekent dus bijna altijd: beide woordenboeken bijwerken,
zodat de twee talen gelijk blijven lopen.

## Mappen

- `app/` de pagina's (Next.js App Router), met `app/en/` als Engelse variant
- `components/` herbruikbare onderdelen
- `dictionaries/` de teksten per taal
- `lib/` hulpfuncties
- `public/` beelden en andere vaste bestanden

## Instellingen op Vercel

Het contactformulier verstuurt mail via Resend. Daarvoor moet op Vercel de
omgevingsvariabele `RESEND_API_KEY` ingesteld staan, voor Production en Preview.
Die sleutel hoort nooit in de code of in git. Lokaal zou hij in `.env.local` staan,
en dat bestand wordt door `.gitignore` buiten git gehouden.

De afzender is `info@laflorabodyart.nl`. Resend verstuurt alleen namens een domein dat
daar geverifieerd is, dus `laflorabodyart.nl` moet in Resend aangemeld zijn met de
bijbehorende DNS-regels. Zolang dat niet klaar is, komt er geen mail aan.

## De twee scripts

**`publiceer.sh`** publiceert de huidige map in één commando:
`./publiceer.sh "korte omschrijving"`. Zonder bericht gebruikt het script de datum en
tijd. Het doet `git add -A`, een commit en een push naar de huidige branch, en stopt
als er niets gewijzigd is. Er wordt niets gebouwd of getypecheckt, dat doet Vercel na
de push. Sta je op `main`, dan waarschuwt het script dat de wijziging rechtstreeks
live gaat, en pusht het daarna gewoon.

**`vernieuw-laflora.sh`** is bedoeld voor een nieuwe versie die als zip uit de chat komt.
Het zoekt de nieuwste `laflora-bodyart*.zip` in de map Downloads, pakt die uit in een
tijdelijke map, en vervangt daarmee de hele inhoud van `~/laflora-bodyart` (op `.git`,
`node_modules` en `.next` na). Daarna zet het zo nodig git en de GitHub-remote klaar,
commit het alles en pusht het naar `main`. Het script draait geen build en heeft dus
geen Node nodig. Omdat het rechtstreeks naar `main` pusht en de projectmap overschrijft,
is het een zwaar middel: gebruik het alleen bewust voor een complete nieuwe versie.
