import Link from "next/link";
import { getDictionary, pad, type Taal } from "@/lib/dictionaries";

/** De pagina met algemene voorwaarden. De teksten staan in de woordenboeken onder "voorwaarden". */
export default function Voorwaarden({ taal }: { taal: Taal }) {
  const t = getDictionary(taal).voorwaarden;

  return (
    <main className="detail">
      <div className="omhulsel" style={{ maxWidth: "46rem" }}>
        <Link href={pad(taal, "/")} className="detail__terug">
          {t.terug}
        </Link>
        <h1 className="detail__titel">{t.titel}</h1>
        <p>{t.intro}</p>
        {t.secties.map((sectie) => (
          <section key={sectie.kop} style={{ marginTop: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>{sectie.kop}</h2>
            {sectie.tekst.map((alinea) => (
              <p key={alinea.slice(0, 24)}>{alinea}</p>
            ))}
          </section>
        ))}
        <p style={{ marginTop: "2.5rem", fontSize: "0.9rem", opacity: 0.75 }}>{t.bijgewerkt}</p>
      </div>
    </main>
  );
}
