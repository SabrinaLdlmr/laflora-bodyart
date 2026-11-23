import Link from "next/link";
import { getDictionary, pad, type Taal } from "@/lib/dictionaries";

export default function Footer({ taal }: { taal: Taal }) {
  const t = getDictionary(taal);

  return (
    <footer className="footer">
      <hr className="glitterlijn" />
      <div className="omhulsel footer__binnen" style={{ paddingTop: "2.5rem" }}>
        <p style={{ margin: 0 }}>
          {t.footer.merk}. {t.footer.regel}.
        </p>
        <p style={{ margin: 0 }}>
          <a href={t.boeken.instagramHref} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>{" "}
          ·{" "}
          {t.footer.kvk && <>{t.footer.kvk} · </>}
          <Link href={pad(taal, "/voorwaarden")}>{t.footer.voorwaarden}</Link> ·{" "}
          {new Date().getFullYear()} {t.footer.rechten}
        </p>
        <p className="footer__maker">
          {t.footer.gemaaktDoor}{" "}
          <a
            href="https://www.linkedin.com/in/sabrina-leidelmeijer-210a9813"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sabrina Leidelmeijer
          </a>
        </p>
      </div>
    </footer>
  );
}
