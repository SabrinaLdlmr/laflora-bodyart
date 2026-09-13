"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { getDictionary, type Taal } from "@/lib/dictionaries";

/**
 * Het contactformulier in het boeken-blok.
 *
 * De echte controle gebeurt op de server, in app/api/contact/route.ts.
 * Wat hier staat is er alleen om de bezoeker meteen te laten zien wat er
 * nog mist, zodat niemand hoeft te wachten op een antwoord van de server.
 *
 * Het honingpotje en het tijdstip van openen gaan mee in het bericht.
 * De server gebruikt die twee om robots eruit te vissen.
 */

type Status = "invullen" | "bezig" | "gelukt";
type Veld = "naam" | "email" | "datumPlek" | "bericht";
type FoutCode = Veld | "teSnel" | "teVaak" | "algemeen";

const LEEG = { naam: "", email: "", datumPlek: "", bericht: "", honing: "" };
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default function Contactformulier({ taal }: { taal: Taal }) {
  const t = getDictionary(taal);
  const f = t.boeken.formulier;

  const [velden, setVelden] = useState(LEEG);
  const [status, setStatus] = useState<Status>("invullen");
  const [fouten, setFouten] = useState<Partial<Record<Veld, string>>>({});
  const [melding, setMelding] = useState<string>("");

  const gestart = useRef<number>(0);
  const bevestiging = useRef<HTMLDivElement>(null);
  const id = useId();

  // Het tijdstip waarop het formulier in beeld kwam. Pas na het monteren,
  // anders zou de server een ander getal invullen dan de browser.
  useEffect(() => {
    gestart.current = Date.now();
  }, []);

  // Na het versturen de aandacht naar de bevestiging brengen, ook voor wie
  // de site met een schermlezer gebruikt.
  useEffect(() => {
    if (status === "gelukt") bevestiging.current?.focus();
  }, [status]);

  function wijzig(veld: Veld | "honing", waarde: string) {
    setVelden((vorige) => ({ ...vorige, [veld]: waarde }));
    if (veld === "honing") return;
    if (fouten[veld]) {
      setFouten((vorige) => {
        const rest = { ...vorige };
        delete rest[veld];
        return rest;
      });
    }
  }

  function controleer(): Partial<Record<Veld, string>> {
    const gevonden: Partial<Record<Veld, string>> = {};
    if (velden.naam.trim().length < 2) gevonden.naam = f.fout.naam;
    if (!EMAIL.test(velden.email.trim())) gevonden.email = f.fout.email;
    if (velden.datumPlek.trim().length < 2) gevonden.datumPlek = f.fout.datumPlek;
    if (velden.bericht.trim().length < 5) gevonden.bericht = f.fout.bericht;
    return gevonden;
  }

  async function verstuur(gebeurtenis: FormEvent<HTMLFormElement>) {
    gebeurtenis.preventDefault();
    if (status === "bezig") return;

    setMelding("");
    const gevonden = controleer();
    setFouten(gevonden);
    if (Object.keys(gevonden).length > 0) return;

    setStatus("bezig");

    try {
      const antwoord = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...velden, taal, gestart: gestart.current }),
      });

      const uitslag = (await antwoord.json().catch(() => null)) as
        | { ok: boolean; fout?: FoutCode }
        | null;

      if (antwoord.ok && uitslag?.ok) {
        setVelden(LEEG);
        setStatus("gelukt");
        return;
      }

      const code = uitslag?.fout ?? "algemeen";
      setStatus("invullen");

      if (code === "naam" || code === "email" || code === "datumPlek" || code === "bericht") {
        const vanServer: Partial<Record<Veld, string>> = {};
        vanServer[code] = f.fout[code];
        setFouten(vanServer);
      } else {
        setMelding(f.fout[code] ?? f.fout.algemeen);
      }
    } catch {
      setStatus("invullen");
      setMelding(f.fout.algemeen);
    }
  }

  if (status === "gelukt") {
    return (
      <div className="formulier__gelukt" role="status" tabIndex={-1} ref={bevestiging}>
        <p className="formulier__geluktTitel">{f.geluktTitel}</p>
        <p className="formulier__geluktTekst">{f.geluktTekst}</p>
        <button type="button" className="knop knop--leeg" onClick={() => setStatus("invullen")}>
          {f.nogEen}
        </button>
      </div>
    );
  }

  const bezig = status === "bezig";

  return (
    <form className="formulier" onSubmit={verstuur} noValidate>
      <p className="formulier__titel">{f.titel}</p>

      <Regel id={`${id}-naam`} label={f.naam} verplicht={f.verplicht} fout={fouten.naam}>
        <input
          id={`${id}-naam`}
          name="naam"
          type="text"
          autoComplete="name"
          maxLength={80}
          placeholder={f.naamPlaatshouder}
          value={velden.naam}
          onChange={(e) => wijzig("naam", e.target.value)}
          aria-invalid={fouten.naam ? true : undefined}
          aria-describedby={fouten.naam ? `${id}-naam-fout` : undefined}
          disabled={bezig}
        />
      </Regel>

      <Regel id={`${id}-email`} label={f.email} verplicht={f.verplicht} fout={fouten.email}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={120}
          placeholder={f.emailPlaatshouder}
          value={velden.email}
          onChange={(e) => wijzig("email", e.target.value)}
          aria-invalid={fouten.email ? true : undefined}
          aria-describedby={fouten.email ? `${id}-email-fout` : undefined}
          disabled={bezig}
        />
      </Regel>

      <Regel id={`${id}-datum`} label={f.datumPlek} verplicht={f.verplicht} fout={fouten.datumPlek}>
        <input
          id={`${id}-datum`}
          name="datumPlek"
          type="text"
          maxLength={160}
          placeholder={f.datumPlekPlaatshouder}
          value={velden.datumPlek}
          onChange={(e) => wijzig("datumPlek", e.target.value)}
          aria-invalid={fouten.datumPlek ? true : undefined}
          aria-describedby={fouten.datumPlek ? `${id}-datum-fout` : undefined}
          disabled={bezig}
        />
      </Regel>

      <Regel id={`${id}-bericht`} label={f.bericht} verplicht={f.verplicht} fout={fouten.bericht}>
        <textarea
          id={`${id}-bericht`}
          name="bericht"
          rows={5}
          maxLength={4000}
          placeholder={f.berichtPlaatshouder}
          value={velden.bericht}
          onChange={(e) => wijzig("bericht", e.target.value)}
          aria-invalid={fouten.bericht ? true : undefined}
          aria-describedby={fouten.bericht ? `${id}-bericht-fout` : undefined}
          disabled={bezig}
        />
      </Regel>

      {/* Het honingpotje. Onzichtbaar voor bezoekers, robots vullen het wel in. */}
      <div className="formulier__honing" aria-hidden="true">
        <label htmlFor={`${id}-honing`}>{f.honingLabel}</label>
        <input
          id={`${id}-honing`}
          name="honing"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={velden.honing}
          onChange={(e) => wijzig("honing", e.target.value)}
        />
      </div>

      {melding && (
        <p className="formulier__melding" role="alert">
          {melding}
        </p>
      )}

      <button type="submit" className="knop knop--vol formulier__knop" disabled={bezig}>
        {bezig ? f.bezig : f.verstuur}
      </button>
    </form>
  );
}

function Regel({
  id,
  label,
  verplicht,
  fout,
  children,
}: {
  id: string;
  label: string;
  verplicht: string;
  fout?: string;
  children: ReactNode;
}) {
  return (
    <p className="formulier__regel">
      <label htmlFor={id}>
        {label} <span className="formulier__verplicht">{verplicht}</span>
      </label>
      {children}
      {fout && (
        <span className="formulier__fout" id={`${id}-fout`}>
          {fout}
        </span>
      )}
    </p>
  );
}
