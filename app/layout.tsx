import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import "@fontsource/grandstander/latin-400-italic.css";
import "@fontsource/grandstander/latin-500-italic.css";
import "@fontsource/grandstander/latin-600-italic.css";
import "@fontsource/jost/latin-300.css";
import "@fontsource/jost/latin-400.css";
import "@fontsource/jost/latin-500.css";
import "./globals.css";
import { DEELBEELD } from "@/lib/dictionaries";

const t = getDictionary("nl");

/**
 * Vercel vult VERCEL_PROJECT_PRODUCTION_URL zelf met het productiedomein. Zolang
 * laflorabodyart.nl nog niet gekoppeld is, is dat laflora-bodyart.vercel.app. Daarna
 * wordt het vanzelf het eigen domein, zonder dat hier iets aangepast hoeft te worden.
 */
const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://laflorabodyart.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: t.meta.titel,
    template: `%s · ${t.meta.titel}`,
  },
  description: t.meta.beschrijving,
  openGraph: {
    title: t.meta.titel,
    description: t.meta.beschrijving,
    type: "website",
    locale: "nl_NL",
    images: [{ url: DEELBEELD, width: 1200, height: 630, alt: t.meta.titel }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
