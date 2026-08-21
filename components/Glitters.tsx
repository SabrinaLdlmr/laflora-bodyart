/**
 * Een laag met kleine lichtjes. De posities staan vast, zodat de server en
 * de browser hetzelfde tekenen. Wil je meer of minder glitter, pas dan
 * deze lijst aan.
 */
const lichtjes = [
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

export default function Glitters() {
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
