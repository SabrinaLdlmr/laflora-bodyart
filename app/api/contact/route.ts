import { NextResponse } from "next/server";

/**
 * Het contactformulier uit het boeken-blok komt hier binnen.
 *
 * Alles wordt op de server gecontroleerd. Wat de browser meestuurt is nooit
 * te vertrouwen, dus de controles hieronder staan los van de controles in
 * het formulier zelf.
 *
 * Drie drempels tegen ongewenste post:
 *   1. een honingpotje, een veld dat onzichtbaar is voor bezoekers. Vult
 *      iemand het toch in, dan is het een robot.
 *   2. een tijdcheck. Een mens doet er langer dan drie seconden over.
 *   3. een limiet per IP-adres.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ONTVANGER = "jasminaswonderland@gmail.com";
const AFZENDER = "La Flora Body Art <info@laflorabodyart.nl>";

const MINIMALE_INVULTIJD_MS = 3_000;
const FORMULIER_VERLOOPT_NA_MS = 3 * 60 * 60 * 1_000; // 3 uur
const MAXIMUM_PER_IP = 5;
const TIJDVAK_MS = 60 * 60 * 1_000; // per uur

type FoutCode =
  | "naam"
  | "email"
  | "datumPlek"
  | "bericht"
  | "teSnel"
  | "teVaak"
  | "algemeen";

/**
 * De tellerstand per IP-adres. Dit leeft in het geheugen van de server.
 * Op Vercel betekent dat: per draaiende instantie, en weg zodra die slaapt.
 * Het houdt losse robots tegen, het is geen slot op de deur.
 */
const verstuurd = new Map<string, number[]>();

function magVersturen(ip: string): boolean {
  const nu = Date.now();
  const eerder = (verstuurd.get(ip) ?? []).filter((t) => nu - t < TIJDVAK_MS);

  if (eerder.length >= MAXIMUM_PER_IP) {
    verstuurd.set(ip, eerder);
    return false;
  }

  eerder.push(nu);
  verstuurd.set(ip, eerder);

  // Oude adressen opruimen, anders groeit de map ongemerkt door.
  if (verstuurd.size > 500) {
    verstuurd.forEach((tijden, adres) => {
      if (tijden.every((t) => nu - t >= TIJDVAK_MS)) verstuurd.delete(adres);
    });
  }

  return true;
}

function leesIp(request: Request): string {
  const doorgestuurd = request.headers.get("x-forwarded-for");
  if (doorgestuurd) return doorgestuurd.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "onbekend";
}

function tekst(waarde: unknown, maximum: number): string {
  return typeof waarde === "string" ? waarde.trim().slice(0, maximum) : "";
}

/** Eén regel per veld, zodat niemand extra kopregels in de mail kan smokkelen. */
function eenRegel(waarde: string): string {
  return waarde.replace(/[\r\n]+/g, " ");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function fout(code: FoutCode, status: number) {
  return NextResponse.json({ ok: false, fout: code }, { status });
}

export async function POST(request: Request) {
  let binnen: Record<string, unknown>;
  try {
    binnen = (await request.json()) as Record<string, unknown>;
  } catch {
    return fout("algemeen", 400);
  }

  // 1. Het honingpotje. Gevuld betekent robot. We doen alsof het gelukt is,
  //    want een robot hoeft niet te weten waar hij door de mand viel.
  if (tekst(binnen.honing, 200) !== "") {
    return NextResponse.json({ ok: true });
  }

  // 2. De tijdcheck.
  const gestart = Number(binnen.gestart);
  const verstreken = Date.now() - gestart;
  if (!Number.isFinite(gestart) || verstreken < MINIMALE_INVULTIJD_MS) {
    return fout("teSnel", 400);
  }
  if (verstreken > FORMULIER_VERLOOPT_NA_MS) {
    return fout("algemeen", 400);
  }

  // 3. De velden zelf.
  const naam = eenRegel(tekst(binnen.naam, 80));
  const email = eenRegel(tekst(binnen.email, 120));
  const datumPlek = eenRegel(tekst(binnen.datumPlek, 160));
  const bericht = tekst(binnen.bericht, 4_000);
  const taal = binnen.taal === "en" ? "en" : "nl";

  if (naam.length < 2) return fout("naam", 422);
  if (!EMAIL.test(email)) return fout("email", 422);
  if (datumPlek.length < 2) return fout("datumPlek", 422);
  if (bericht.length < 5) return fout("bericht", 422);

  // 4. De limiet per IP-adres.
  if (!magVersturen(leesIp(request))) {
    return fout("teVaak", 429);
  }

  const sleutel = process.env.RESEND_API_KEY;

  const onderwerp =
    taal === "en"
      ? `Website message from ${naam} (${datumPlek})`
      : `Bericht via de site van ${naam} (${datumPlek})`;

  const regels = [
    `Naam: ${naam}`,
    `E-mail: ${email}`,
    `Datum en plek: ${datumPlek}`,
    `Taal van de site: ${taal}`,
    "",
    bericht,
    "",
    "Verstuurd via het contactformulier op hallo.laflorabodyart.nl",
  ].join("\n");

  // Zonder sleutel versturen we niets, maar loopt het formulier wel door.
  // Het bericht komt dan in het logboek van Vercel te staan, onder Runtime Logs.
  // Let op: de bezoeker ziet dan gewoon de bevestiging, terwijl er geen mail
  // aankomt. Dit is bedoeld voor de voorbeeldversies, niet voor de echte site.
  if (!sleutel) {
    console.log(
      ["RESEND_API_KEY ontbreekt, dit bericht is niet verstuurd.", onderwerp, regels].join(
        "\n",
      ),
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const antwoord = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sleutel}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: AFZENDER,
        to: [ONTVANGER],
        reply_to: email,
        subject: onderwerp,
        text: regels,
      }),
    });

    if (!antwoord.ok) {
      console.error("Resend gaf een fout", antwoord.status, await antwoord.text());
      return fout("algemeen", 502);
    }
  } catch (oorzaak) {
    console.error("Versturen mislukt", oorzaak);
    return fout("algemeen", 502);
  }

  return NextResponse.json({ ok: true });
}
