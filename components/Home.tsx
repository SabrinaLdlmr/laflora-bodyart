import Link from "next/link";
import AanbodKaart from "./AanbodKaart";
import Contactformulier from "./Contactformulier";
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
          {t.hero.bovenkop && <p className="bovenkop">{t.hero.bovenkop}</p>}
          <h1 className="hero__naam">{t.hero.naam}</h1>
          <p className="hero__ondertitel">{t.hero.ondertitel}</p>
          <p className="hero__regio">{t.hero.regio}</p>
          <p className="hero__tekst">{t.hero.tekst}</p>
          <div className="hero__knoppen">
            <Link href={pad(taal, "/#boeken")} className="knop knop--vol">
              {t.hero.knopPrimair}
            </Link>
            <Link href={pad(taal, "/#aanbod")} className="knop knop--leeg">
              {t.hero.knopSecundair}
            </Link>
          </div>
          <p className="hero__instagram">
            <a href={t.boeken.instagramHref} target="_blank" rel="noopener noreferrer">
              {t.hero.instagramTekst} <span>{t.boeken.instagram}</span>
            </a>
          </p>
          </Spiegel>
        </div>
      </section>

      <div className="sierlijn">
        <GoudenBloem groot={58} />
      </div>

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

      <Sectie id="voor-wie" titel={t.voorwie.titel} intro={t.voorwie.intro}>
        <ul className="kenmerken">
          {t.voorwie.punten.map((punt) => (
            <li key={punt.slice(0, 24)}>{punt}</li>
          ))}
        </ul>
      </Sectie>

      <Sectie id="vragen" titel={t.vragen.titel}>
        {/*
          details en summary zijn het ingebouwde uitklapmechanisme van de
          browser. Geen javascript nodig, en het werkt met het toetsenbord en
          met een schermlezer zoals het hoort.
        */}
        <div className="vragen">
          {t.vragen.items.map((item) => (
            <details key={item.vraag} className="vraag">
              <summary>{item.vraag}</summary>
              <p className="vraag__antwoord">{item.antwoord}</p>
            </details>
          ))}
        </div>
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
          <Beeld bron={t.over.beeld} alt={t.over.beeldAlt} vorm="kaart" blad={3} />
        </div>
      </Sectie>

      <Sectie id="ervaringen" glitter bovenkop={t.ervaringen.bovenkop} titel={t.ervaringen.titel}>
        <div className="ervaringen">
          {t.ervaringen.items.map((item) => (
            <figure key={item.naam} className="ervaring">
              <blockquote className="ervaring__tekst">
                <p>{item.tekst}</p>
              </blockquote>
              <figcaption className="ervaring__naam">
                {item.naam}
                <span>{item.bron}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Sectie>

      <Sectie id="past-het" titel={t.passend.titel}>
        <p className="passend__tekst">{t.passend.intro}</p>
        {t.passend.onderdelen.map((onderdeel) => (
          <div key={onderdeel.kop}>
            <h3 className="passend__subkop">{onderdeel.kop}</h3>
            <p className="passend__tekst">{onderdeel.tekst}</p>
            <ul className="kenmerken passend__punten">
              {onderdeel.punten.map((punt) => (
                <li key={punt.kop}>
                  <strong>{punt.kop}</strong> {punt.tekst}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {t.passend.slot.map((alinea) => (
          <p key={alinea.slice(0, 24)} className="passend__tekst">{alinea}</p>
        ))}
      </Sectie>

      <Sectie id="projecten" bovenkop={t.projecten.bovenkop} titel={t.projecten.titel}>
        <p className="passend__tekst">{t.projecten.tekst}</p>
        <Link href={pad(taal, "/#boeken")} className="knop knop--leeg">
          {t.projecten.knop}
        </Link>
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
          <ul className="boeken__gegevens">
            <li>
              <a href={t.boeken.instagramHref} target="_blank" rel="noopener noreferrer">
                Instagram {t.boeken.instagram}
              </a>
            </li>
          </ul>
        </div>
      </Sectie>
    </main>
  );
}
