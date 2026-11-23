import Link from "next/link";
import NavMenu from "./NavMenu";
import { getDictionary, pad, type Taal } from "@/lib/dictionaries";

export default function Nav({ taal }: { taal: Taal }) {
  const t = getDictionary(taal);

  return (
    <header className="nav">
      <div className="omhulsel nav__binnen">
        <Link href={pad(taal, "/")} className="nav__merk">
          {t.nav.merk}
        </Link>
        <NavMenu label={t.nav.merk} openTekst={t.nav.menuOpen} sluitTekst={t.nav.menuSluit}>
          <Link href={pad(taal, "/#aanbod")}>{t.nav.aanbod}</Link>
          <Link href={pad(taal, "/#werkwijze")}>{t.nav.werkwijze}</Link>
          <Link href={pad(taal, "/#vragen")}>{t.nav.vragen}</Link>
          <Link href={pad(taal, "/#over")}>{t.nav.over}</Link>
          <Link href={pad(taal, "/#boeken")}>{t.nav.boeken}</Link>
          <Link href={t.nav.taalHref} className="nav__taal" hrefLang={taal === "nl" ? "en" : "nl"}>
            {t.nav.taal}
          </Link>
        </NavMenu>
      </div>
    </header>
  );
}
