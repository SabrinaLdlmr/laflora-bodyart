# Wensen en open punten voor Jasmina

Opgesteld op 13 september 2026, bijgewerkt op 22 november 2026.

Dit is de lijst met dingen die nog aangepast of uitgezocht moeten worden aan de site.
Vink af wat klaar is en laat erbij staan wanneer het gedaan is.

## Nieuwe opzet van het aanbod (updates oktober en november 2026)

Gebouwd op 22 november 2026. Alles draait nu om kleine, magische feestjes in
sprookjessferen: maximaal acht kinderen in anderhalf uur.

- [x] **Vier diensten plus de Rozen Glitterbar.** Magisch meidenfeestje, Bloemen
      experience voor hooggevoelige kinderen, Moeder-dochter experience (in het
      atelier), Workshop bloemetjes maken, en de Rozen Glitterbar als "binnenkort los
      te boeken". Prijzen: 110 euro per feestje, uurtarief vanaf 60 euro.
- [x] **Vervallen:** Bellypainting, Gezicht en glitter, Handen en armen. De oude
      adressen leiden door naar het aanbod (zie `next.config.mjs`).
- [x] **Grens duidelijk benoemd.** Niet beschikbaar voor stuif-in feesten,
      evenementen en grote, snelle klussen: in de intro van het aanbod, bij het
      meidenfeestje, in de FAQ en in het blok Past mijn werkwijze bij jouw feest?
      De zin over vijf tot tien minuten per gezicht en een rij kinderen is weg.
- [x] **Kopje Projecten** toegevoegd, met tarief vanaf 60 euro per uur.
- [x] **Workshop van 10 oktober** van de homepage gehaald. Het onderdeel staat nog
      in de code (`components/Evenement.tsx`) voor een volgende workshop.
- [x] **Festivalterrein** uit de over-tekst gehaald, festivalomleiding definitief.

## Nog te bevestigen door Jasmina (gevraagd via WhatsApp, 22 november)

- [ ] **Btw.** Op de site staat nu "excl. btw", zoals Jasmina het aanleverde. Voor
      particulieren moeten prijzen inclusief btw. Btw-plichtig: 110 wordt 133,10 en
      60 wordt 72,60. Kleineondernemersregeling: 110 en 60 zijn de eindprijs en
      "excl. btw" gaat eraf.
- [ ] **Bellypainting echt weg?** Aangenomen van wel.
- [ ] **Reiskosten bij moeder-dochter.** Die is in het atelier, dus nu zonder
      reiskosten op de site.
- [ ] **Duur workshop bloemetjes maken.** Jasmina schreef "1,2 uur". Op de site staat
      nu "ruim een uur".
- [ ] **KvK-nummer in de footer.** Zolang het er niet is, staat er niets (geen
      nepnummer meer).

## Klaarzetten voor livegang en het contactformulier

- [ ] **Domein koppelen.** laflorabodyart.nl bij Vimexx naar Vercel laten wijzen.
      Samen met Jasmina inloggen.
- [ ] **Resend-sleutel op Vercel zetten.** De variabele heet `RESEND_API_KEY` en moet
      zowel voor Production als voor Preview ingevuld zijn.
- [ ] **Domein verifiëren bij Resend.** De mail gaat uit namens
      `info@laflorabodyart.nl`. Resend verstuurt pas als `laflorabodyart.nl` daar
      geverifieerd is met de juiste DNS-regels.
- [ ] **info@laflorabodyart.nl aanmaken.**

## Uitzoeken met Jasmina

- [ ] **Feedbackpagina.** Op 30 september voorbereid (formulier op /feedback, reacties
      met toestemming op de site), nog niet gebouwd. Wil ze die nog?
- [ ] **Origineel intro-filmpje opvragen in hoge resolutie.** De versie die nu gebruikt
      wordt is niet scherp genoeg.
