import type { ReactNode } from "react";
import GoudenBloem from "./GoudenBloem";

const BOOG_LAMPEN = 11;
const ZIJ_LAMPEN = 4;
const ONDER_LAMPEN = 7;

/** De boog bovenaan is een halve ellips. Hier lopen we hem af. */
function boogLampen() {
  return Array.from({ length: BOOG_LAMPEN }, (_, i) => {
    const hoek = Math.PI - (i * Math.PI) / (BOOG_LAMPEN - 1);
    return {
      links: 50 + 50 * Math.cos(hoek),
      boven: 24 - 24 * Math.sin(hoek),
    };
  });
}

function zijLampen() {
  const punten: { links: number; boven: number }[] = [];
  for (let i = 1; i <= ZIJ_LAMPEN; i += 1) {
    const boven = 24 + ((100 - 24) * i) / (ZIJ_LAMPEN + 1);
    punten.push({ links: 0, boven });
    punten.push({ links: 100, boven });
  }
  return punten;
}

function onderLampen() {
  return Array.from({ length: ONDER_LAMPEN }, (_, i) => ({
    links: 6 + (88 * i) / (ONDER_LAMPEN - 1),
    boven: 100,
  }));
}

/**
 * Een spiegel met een boog erboven en lampen langs de rand, zoals in een
 * kleedkamer. De gouden bloem staat in de top van de boog.
 */
export default function Spiegel({ children }: { children: ReactNode }) {
  const lampen = [...boogLampen(), ...zijLampen(), ...onderLampen()];

  return (
    <div className="spiegel">
      <div aria-hidden="true">
        {lampen.map((l, i) => (
          <span
            key={`${l.links}-${l.boven}-${i}`}
            className="lamp"
            style={{
              left: `${l.links}%`,
              top: `${l.boven}%`,
              animationDelay: `${(i * 0.37) % 7}s`,
            }}
          />
        ))}
      </div>

      <div className="spiegel__bloem">
        {/*
          176 is de grootste maat die de css gebruikt, zie --bloem-hero.
          Zo wordt het beeld altijd verkleind en nooit opgerekt.
        */}
        <GoudenBloem groot={176} prioriteit />
      </div>

      {children}
    </div>
  );
}
