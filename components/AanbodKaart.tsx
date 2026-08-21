import Link from "next/link";
import Beeld from "./Beeld";
import { pad, type AanbodItem, type Taal } from "@/lib/dictionaries";

type Props = {
  item: AanbodItem;
  taal: Taal;
  meerLabel: string;
  /** De eerste kaart is breder, dus die krijgt een liggend beeld. */
  uitgelicht?: boolean;
  blad?: 1 | 2 | 3 | 4;
};

export default function AanbodKaart({ item, taal, meerLabel, uitgelicht = false, blad = 1 }: Props) {
  return (
    <li>
      <Link href={pad(taal, `/aanbod/${item.slug}`)} className="kaart">
        <Beeld bron={item.beeld} alt={item.naam} vorm={uitgelicht ? "breed" : "kaart"} blad={blad} />
        <div className="kaart__tekst">
          <h3 className="kaart__naam">{item.naam}</h3>
          <p className="kaart__kort">{item.kort}</p>
          <span className="kaart__meer">{meerLabel}</span>
        </div>
      </Link>
    </li>
  );
}
