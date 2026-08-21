import Link from "next/link";
import Beeld from "./Beeld";
import { getDictionary, pad, type AanbodItem, type Taal } from "@/lib/dictionaries";

/**
 * De detailpagina gebruikt hetzelfde Beeld-component als de kaart in het
 * overzicht. Verander je daar iets, dan verandert het hier mee.
 */
export default function AanbodDetail({ item, taal }: { item: AanbodItem; taal: Taal }) {
  const t = getDictionary(taal);

  return (
    <main className="detail">
      <div className="omhulsel">
        <Link href={pad(taal, "/#aanbod")} className="detail__terug">
          {t.detail.terug}
        </Link>

        <div className="detail__raster">
          <div>
            <p className="bovenkop">{t.aanbod.bovenkop}</p>
            <h1 className="detail__titel">{item.naam}</h1>
            {item.beschrijving.map((alinea) => (
              <p key={alinea.slice(0, 24)}>{alinea}</p>
            ))}

            <ul className="feiten">
              <li>
                <span className="feiten__label">{t.detail.duur}</span>
                <span>{item.duur}</span>
              </li>
              <li>
                <span className="feiten__label">{t.detail.vanaf}</span>
                <span>{item.vanaf}</span>
              </li>
              <li>
                <span className="feiten__label">{t.detail.voor}</span>
                <span>{item.voor}</span>
              </li>
            </ul>

            {item.praktisch.length > 0 && (
              <div className="praktisch">
                <p className="bovenkop">{t.detail.praktisch}</p>
                <ul>
                  {item.praktisch.map((regel) => (
                    <li key={regel.slice(0, 24)}>{regel}</li>
                  ))}
                </ul>
              </div>
            )}

            <a href={`mailto:${t.boeken.email}?subject=${encodeURIComponent(item.naam)}`} className="knop knop--vol">
              {t.detail.knop}
            </a>
          </div>

          <Beeld bron={item.beeld} alt={item.naam} vorm="kaart" blad={4} prioriteit />
        </div>
      </div>
    </main>
  );
}
