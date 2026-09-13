# Wensen en open punten voor Jasmina

Opgesteld op 13 september 2026.

Dit is de lijst met dingen die nog aangepast of uitgezocht moeten worden aan de site.
Vink af wat klaar is en laat erbij staan wanneer het gedaan is.

## Aanpassen in de site

- [x] **Bilthoven wordt Amsterdam.** Overal waar de plaats genoemd wordt, dus ook bij de
      workshoplocatie. Let op de Nederlandse en de Engelse teksten, allebei bijwerken.
      Gedaan op 13 september 2026, in `nl.json` en `en.json`.

- [ ] **KvK-nummer in de footer zetten.** Het nummer is er nog niet, dus eerst opvragen
      bij Jasmina. La Flora staat als handelsnaam ingeschreven bij de KvK.

- [x] **Telefoonnummer vervangen.** Vervallen op 13 september 2026. Het nummer is
      helemaal van de site gehaald, ook uit `en.json`, dus er hoeft geen echt nummer
      meer opgevraagd te worden. Onder het contactformulier staat nu alleen nog het
      e-mailadres.

## Open punten uit het homepagevoorstel

Het voorstel in `docs/homepage-voorstel.md` is gebouwd op 13 september 2026. Deze
punten stonden er als open vraag in en zijn met een plaatshouder ingevuld.

- [ ] **Duur en prijs van de workshop voor tieners.** Op de pagina staat nu
      "een middag, in overleg" en "op aanvraag". Zodra Jasmina een bedrag en een
      lengte kiest, kunnen die in `dictionaries/nl.json` en `en.json` bij het item
      `workshop-voor-tieners`.

- [ ] **Maximale groepsgrootte bij de magische bloemenbeleving.** De tekst zegt nu
      nog "een tot drie kinderen", zoals het altijd was. Blijft dat zo?

- [ ] **De omleiding van de festivalpagina definitief maken.** In `next.config.mjs`
      staat `/aanbod/festivals` als tijdelijke omleiding naar het aanbod. Keurt
      Jasmina het voorstel goed, dan mag `permanent` daar op `true`.

- [ ] **De over-tekst noemt nog het festivalterrein.** Het voorstel liet die tekst
      bewust ongemoeid, maar festivals zijn wel uit het aanbod gehaald. Laten staan
      of aanpassen is een keuze voor Jasmina.

## Klaarzetten voor het contactformulier

- [ ] **Resend-sleutel op Vercel zetten.** De variabele heet `RESEND_API_KEY` en moet
      zowel voor Production als voor Preview ingevuld zijn.

- [ ] **Domein verifiëren bij Resend.** De mail gaat uit namens
      `info@laflorabodyart.nl`. Resend verstuurt pas als `laflorabodyart.nl` daar
      geverifieerd is met de juiste DNS-regels.

## Uitzoeken met Jasmina

- [ ] **Merknaam en doelgroep op één lijn brengen.** Het intro-filmpje zegt
      "Body-facepainting, Skin Jewels by Jasmina, feesten & bruiloften". De site spreekt
      over belevingssessies voor kinderen, moeders en festivals. Dat zijn twee
      verschillende verhalen. De keuze welke het wordt is aan Jasmina.

- [ ] **Origineel intro-filmpje opvragen in hoge resolutie.** De versie die nu gebruikt
      wordt is niet scherp genoeg.
