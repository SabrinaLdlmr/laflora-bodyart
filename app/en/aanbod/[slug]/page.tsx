import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AanbodDetail from "@/components/AanbodDetail";
import { alleSlugs, vindAanbodItem } from "@/lib/dictionaries";

const TAAL = "en" as const;

export function generateStaticParams() {
  return alleSlugs(TAAL).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = vindAanbodItem(TAAL, params.slug);
  if (!item) return {};
  return { title: item.naam, description: item.kort };
}

export default function Pagina({ params }: { params: { slug: string } }) {
  const item = vindAanbodItem(TAAL, params.slug);
  if (!item) notFound();

  return (
    <>
      <Nav taal={TAAL} />
      <AanbodDetail item={item} taal={TAAL} />
      <Footer taal={TAAL} />
    </>
  );
}
