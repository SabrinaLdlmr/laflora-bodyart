import Link from "next/link";
import AanbodKaart from "./AanbodKaart";
import Contactformulier from "./Contactformulier";
import Evenement from "./Evenement";
import Glitters from "./Glitters";
import Film from "./Film";
import Spiegel from "./Spiegel";
import GoudenBloem from "./GoudenBloem";
import Beeld from "./Beeld";
import Sectie from "./Sectie";
import { getDictionary, pad, type Taal } from "@/lib/dictionaries";

/**
 * Eén homepage voor beide talen. De taal bepaalt alleen welk woordenboek
 * erin gaat, dus NL en EN kunnen nooit uit elkaar groeien qua opbouw.
 */
export default function Home({ taal }: { taal: Taal }) {
  const t = getDictionary(taal);

  return (
    <main>
      <section className="hero">
        <Glitters />
        <div className="omhulsel">
          <Spiegel>
          <p className="bovenkop">{t.hero.bovenkop}</p>
          <h1 className="hero__naam">{t.hero.naam}</h1>
          <p className="hero__ondertitel">{t.hero.ondertitel}</p>
          <p className="hero__tekst">{t.hero.tekst}</p>
          <div className="hero__knoppen">
            <Link href={pad(taal, "/#boeken")} className="knop knop--vol">
              {t.hero.knopPrimair}
            </Link>
            <Link href={pad(taal, "/#aanbod")} className="knop knop--leeg">
              {t.hero.knopSecundair}
            </Link>
          </div>
          </Spiegel>
        </div>
      </section>

      <div className="sierlijn">
        <GoudenBloem groot={58} />
      </div>

      <Evenement taal={taal} />

      <Sectie id="aanbod" bovenkop={t.aanbod.bovenkop} titel={t.aanbod.titel} intro={t.aanbod.intro}>
        <ul className="aanbod">
          {t.aanbod.items.map((item, i) => (
            <AanbodKaart
              key={item.slug}
              item={item}
              taal={taal}
              meerLabel={t.aanbod.meer}
              uitgelicht={i === 0}
              blad={((i % 4) + 1) as 1 | 2 | 3 | 4}
            />
          ))}
        </ul>
      </Sectie>

      <Sectie id="werkwijze" bovenkop={t.werkwijze.bovenkop} titel={t.werkwijze.titel}>
        <ol className="stappen">
          {t.werkwijze.stappen.map((stap) => (
            <li key={stap.titel} className="stap">
              <h3>{stap.titel}</h3>
              <p>{stap.tekst}</p>
            </li>
          ))}
        </ol>
      </Sectie>

      <Sectie>
        <Film
          bron="/beelden/lijnen-op-de-arm.mp4"
          poster="/beelden/lijnen-op-de-arm.jpg"
          bijschrift={t.film.bijschrift}
        />
      </Sectie>

      <Sectie id="over">
        <div className="tweeluik">
          <div>
            <p className="bovenkop">{t.over.bovenkop}</p>
            <h2 className="sectie__titel">{t.over.titel}</h2>
            <div style={{ marginTop: "1.5rem" }}>
              {t.over.tekst.map((alinea) => (
                <p key={alinea.slice(0, 24)}>{alinea}</p>
              ))}
            </div>
          </div>
          <Beeld bron={t.over.beeld} alt={t.over.titel} vorm="breed" blad={3} />
        </div>
      </Sectie>

      <div className="sierlijn">
        <GoudenBloem groot={58} />
      </div>

      <Sectie id="boeken" gecentreerd>
        <div className="boeken">
          <p className="bovenkop">{t.boeken.bovenkop}</p>
          <h2 className="sectie__titel">{t.boeken.titel}</h2>
          <p style={{ marginTop: "1.5rem", color: "var(--tekst-zacht)" }}>{t.boeken.tekst}</p>
          <Contactformulier taal={taal} />
          <p className="boeken__ofmail">{t.boeken.formulier.ofMail}</p>
          <ul className="boeken__gegevens">
            <li>
              <a href={`mailto:${t.boeken.email}`}>{t.boeken.email}</a>
            </li>
            <li>
              <a href={`tel:${t.boeken.telefoon.replace(/\s/g, "")}`}>{t.boeken.telefoon}</a>
            </li>
            <li>
              <a href={t.boeken.instagramHref} target="_blank" rel="noreferrer">
                {t.boeken.instagram}
              </a>
            </li>
          </ul>
        </div>
      </Sectie>
    </main>
  );
}
