import { getDictionary, type Taal } from "@/lib/dictionaries";

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
          <a href={`mailto:${t.boeken.email}`}>{t.boeken.email}</a> · {t.footer.kvk} ·{" "}
          {new Date().getFullYear()} {t.footer.rechten}
        </p>
      </div>
    </footer>
  );
}
