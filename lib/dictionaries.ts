import nl from "@/dictionaries/nl.json";
import en from "@/dictionaries/en.json";

export type Taal = "nl" | "en";

/** De structuur van nl.json is de waarheid. en.json moet daaraan voldoen. */
export type Woordenboek = typeof nl;
export type AanbodItem = Woordenboek["aanbod"]["items"][number];

const woordenboeken: Record<Taal, Woordenboek> = {
  nl,
  en,
};

export function getDictionary(taal: Taal): Woordenboek {
  return woordenboeken[taal];
}

/** Alle paden beginnen met /en zodra we in het Engels zitten. */
export function pad(taal: Taal, route: string): string {
  const schoon = route.startsWith("/") ? route : `/${route}`;
  if (taal === "nl") return schoon;
  return schoon === "/" ? "/en" : `/en${schoon}`;
}

export function vindAanbodItem(taal: Taal, slug: string): AanbodItem | undefined {
  return getDictionary(taal).aanbod.items.find((item) => item.slug === slug);
}

export function alleSlugs(taal: Taal): string[] {
  return getDictionary(taal).aanbod.items.map((item) => item.slug);
}
