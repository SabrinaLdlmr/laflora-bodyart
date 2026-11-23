import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Voorwaarden from "@/components/Voorwaarden";
import { DEELBEELD, getDictionary, pad } from "@/lib/dictionaries";

const TAAL = "nl" as const;
const t = getDictionary(TAAL).voorwaarden;

export const metadata: Metadata = {
  title: t.titel,
  description: t.beschrijving,
  alternates: { canonical: pad(TAAL, "/voorwaarden") },
  openGraph: {
    title: t.titel,
    description: t.beschrijving,
    type: "website",
    locale: "nl_NL",
    images: [{ url: DEELBEELD, alt: t.titel }],
  },
};

export default function Pagina() {
  return (
    <>
      <Nav taal={TAAL} />
      <Voorwaarden taal={TAAL} />
      <Footer taal={TAAL} />
    </>
  );
}
