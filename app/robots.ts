import type { MetadataRoute } from "next";

/**
 * De robots.txt van de site. Zoekmachines en AI-crawlers mogen alle pagina's
 * lezen, maar blijven weg bij /api/, waar het contactformulier binnenkomt.
 *
 * Nette bots houden zich hieraan. Spambots niet; die worden tegengehouden door
 * de controles in app/api/contact/route.ts (honingpotje, tijdcheck en limiet).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
  };
}
