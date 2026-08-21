import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import "@fontsource/grandstander/latin-400-italic.css";
import "@fontsource/grandstander/latin-500-italic.css";
import "@fontsource/grandstander/latin-600-italic.css";
import "@fontsource/jost/latin-300.css";
import "@fontsource/jost/latin-400.css";
import "@fontsource/jost/latin-500.css";
import "./globals.css";

const t = getDictionary("nl");

export const metadata: Metadata = {
  metadataBase: new URL("https://hallo.laflorabodyart.nl"),
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
