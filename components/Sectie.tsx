import type { ReactNode } from "react";
import Glitters from "./Glitters";

type Props = {
  id?: string;
  bovenkop?: string;
  titel?: string;
  intro?: string;
  gecentreerd?: boolean;
  /* Zet fonkelende sterretjes achter deze sectie */
  glitter?: boolean;
  children: ReactNode;
};

export default function Sectie({ id, bovenkop, titel, intro, gecentreerd = false, glitter = false, children }: Props) {
  return (
    <section id={id} className={glitter ? "sectie sectie--glitter" : "sectie"}>
      {glitter && <Glitters soort="strooisel" />}
      <div className="omhulsel">
        {(bovenkop || titel || intro) && (
          <div className="sectie__kop" style={gecentreerd ? { marginInline: "auto", textAlign: "center" } : undefined}>
            {bovenkop && <p className="bovenkop">{bovenkop}</p>}
            {titel && <h2 className="sectie__titel">{titel}</h2>}
            {intro && <p className="sectie__intro">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
