import type { ReactNode } from "react";

type Props = {
  id?: string;
  bovenkop?: string;
  titel?: string;
  intro?: string;
  gecentreerd?: boolean;
  children: ReactNode;
};

export default function Sectie({ id, bovenkop, titel, intro, gecentreerd = false, children }: Props) {
  return (
    <section id={id} className="sectie">
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
