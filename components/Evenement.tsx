import Beeld from "./Beeld";
import { getDictionary, type Taal } from "@/lib/dictionaries";

/**
 * De eerstvolgende workshop. Het aantal vrije plekken rekent zichzelf uit
 * uit plaatsenTotaal min plaatsenBezet in de json. Je hoeft dus alleen
 * plaatsenBezet op te hogen na elke aanmelding.
 */
export default function Evenement({ taal }: { taal: Taal }) {
  const t = getDictionary(taal);
  const e = t.evenement;

  const vrij = Math.max(0, e.plaatsenTotaal - e.plaatsenBezet);
  const vol = vrij === 0;
  const bijnaVol = vrij > 0 && vrij <= 3;

  const onderwerp = `${e.titel} ${e.datum}`;
  const mailto = `mailto:${t.boeken.email}?subject=${encodeURIComponent(onderwerp)}`;

  return (
    <section id="workshop" className="sectie">
      <div className="omhulsel">
        <div className="evenement">
          <div className="evenement__beeld">
            <Beeld bron={e.beeld} alt={e.titel} vorm="kaart" blad={2} />
          </div>

          <div>
            <p className="bovenkop">{e.bovenkop}</p>
            <h2 className="sectie__titel">{e.titel}</h2>

            <p className={`vlag ${vol ? "vlag--vol" : bijnaVol ? "vlag--bijna" : ""}`}>
              {vol ? e.volgeboekt : `${vrij} ${vrij === 1 ? e.plekVrij : e.plekkenVrij}`}
            </p>

            <div style={{ marginTop: "1.25rem" }}>
              {e.tekst.map((alinea) => (
                <p key={alinea.slice(0, 24)}>{alinea}</p>
              ))}
            </div>

            <ul className="feiten">
              <li>
                <span className="feiten__label">{e.labelDatum}</span>
                <span>{e.datum}</span>
              </li>
              <li>
                <span className="feiten__label">{e.labelTijd}</span>
                <span>{e.tijd}</span>
              </li>
              <li>
                <span className="feiten__label">{e.labelLocatie}</span>
                <span>{e.locatie}</span>
              </li>
              <li>
                <span className="feiten__label">{e.labelPrijs}</span>
                <span>
                  {e.prijs}
                  <span className="feiten__bij">{e.prijsToelichting}</span>
                </span>
              </li>
              <li>
                <span className="feiten__label">{e.labelPlaatsen}</span>
                <span>
                  {e.plaatsenBezet} / {e.plaatsenTotaal}
                </span>
              </li>
            </ul>

            <a href={mailto} className="knop knop--vol">
              {vol ? e.wachtlijst : e.knop}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
