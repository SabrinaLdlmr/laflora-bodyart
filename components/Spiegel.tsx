import type { ReactNode } from "react";
import GoudenBloem from "./GoudenBloem";

const BOVEN_LAMPEN = 6;
const ZIJ_LAMPEN = 4;
const ONDER_LAMPEN = 7;

/**
 * De lampen liepen vroeger langs een halve ellips over de bovenkant. Die boog
 * tekende een halve cirkel onder de bloem, en dat is precies wat weg moest.
 * Nu staan ze op de vier rechte randen van de spiegel.
 *
 * Zes lampen boven, geen zeven: bij een even aantal valt er geen lamp precies
 * in het midden, en dus geen lamp achter de bloem.
 */
function bovenLampen() {
  return Array.from({ length: BOVEN_LAMPEN }, (_, i) => ({
    links: 6 + (88 * i) / (BOVEN_LAMPEN - 1),
    boven: 0,
  }));
}

function zijLampen() {
  const punten: { links: number; boven: number }[] = [];
  for (let i = 1; i <= ZIJ_LAMPEN; i += 1) {
    const boven = (100 * i) / (ZIJ_LAMPEN + 1);
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
 * Een spiegel met lampen langs de rand, zoals in een kleedkamer. De gouden
 * bloem staat boven het midden van de bovenrand.
 */
export default function Spiegel({ children }: { children: ReactNode }) {
  const lampen = [...bovenLampen(), ...zijLampen(), ...onderLampen()];

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
