/**
 * Een laag met kleine lichtjes. Er zijn twee sets: "hemel" voor boven in de
 * pagina en "strooisel" voor een rustigere plek zoals de reviews. De posities staan vast, zodat de server en
 * de browser hetzelfde tekenen. Wil je meer of minder glitter, pas dan
 * de lijsten hieronder aan.
 */
type Lichtje = { links: string; boven: string; groot: number; wacht: number };

/* De volle hemel boven in de pagina */
const hemel: Lichtje[] = [
  { links: "4%", boven: "16%", groot: 26, wacht: 0 },
  { links: "11%", boven: "64%", groot: 16, wacht: 1.9 },
  { links: "18%", boven: "36%", groot: 34, wacht: 3.4 },
  { links: "24%", boven: "82%", groot: 14, wacht: 0.7 },
  { links: "30%", boven: "8%", groot: 20, wacht: 2.6 },
  { links: "8%", boven: "44%", groot: 18, wacht: 4.1 },
  { links: "36%", boven: "90%", groot: 24, wacht: 1.2 },
  { links: "58%", boven: "88%", groot: 18, wacht: 3.1 },
  { links: "66%", boven: "10%", groot: 22, wacht: 0.4 },
  { links: "72%", boven: "58%", groot: 32, wacht: 2.2 },
  { links: "80%", boven: "28%", groot: 16, wacht: 4.4 },
  { links: "87%", boven: "74%", groot: 28, wacht: 1.6 },
  { links: "93%", boven: "20%", groot: 20, wacht: 3.7 },
  { links: "96%", boven: "52%", groot: 15, wacht: 0.9 },
];

/*
 * Een zachter strooisel voor tussen de reviews. Minder lichtjes, en vooral
 * langs de randen en tussen de kopjes, zodat ze niet over de tekst vallen.
 */
const strooisel: Lichtje[] = [
  { links: "3%", boven: "12%", groot: 22, wacht: 0.8 },
  { links: "6%", boven: "58%", groot: 14, wacht: 3.2 },
  { links: "2%", boven: "86%", groot: 18, wacht: 1.9 },
  { links: "46%", boven: "6%", groot: 16, wacht: 4.0 },
  { links: "62%", boven: "14%", groot: 24, wacht: 2.4 },
  { links: "40%", boven: "94%", groot: 14, wacht: 0.3 },
  { links: "95%", boven: "22%", groot: 26, wacht: 1.4 },
  { links: "97%", boven: "66%", groot: 16, wacht: 3.7 },
  { links: "92%", boven: "90%", groot: 20, wacht: 2.8 },
];

const sets = { hemel, strooisel };

export default function Glitters({ soort = "hemel" }: { soort?: keyof typeof sets }) {
  const lichtjes = sets[soort];
  return (
    <div className="glitters" aria-hidden="true">
      {lichtjes.map((l) => (
        <span
          key={`${l.links}-${l.boven}`}
          className="glitter"
          style={{
            left: l.links,
            top: l.boven,
            width: `${l.groot}px`,
            height: `${l.groot}px`,
            animationDelay: `${l.wacht}s`,
          }}
        />
      ))}
    </div>
  );
}
