import Link from "next/link";
import { getDictionary, pad, type Taal } from "@/lib/dictionaries";

export default function Nav({ taal }: { taal: Taal }) {
  const t = getDictionary(taal);

  return (
    <header className="nav">
      <div className="omhulsel nav__binnen">
        <Link href={pad(taal, "/")} className="nav__merk">
          {t.nav.merk}
        </Link>
        <nav className="nav__links" aria-label={t.nav.merk}>
          <Link href={pad(taal, "/#workshop")}>{t.nav.evenement}</Link>
          <Link href={pad(taal, "/#aanbod")}>{t.nav.aanbod}</Link>
          <Link href={pad(taal, "/#werkwijze")}>{t.nav.werkwijze}</Link>
          <Link href={pad(taal, "/#over")}>{t.nav.over}</Link>
          <Link href={pad(taal, "/#boeken")}>{t.nav.boeken}</Link>
          <Link href={t.nav.taalHref} className="nav__taal" hrefLang={taal === "nl" ? "en" : "nl"}>
            {t.nav.taal}
          </Link>
        </nav>
      </div>
    </header>
  );
}
