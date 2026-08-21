import Image from "next/image";

type Props = {
  /** Pad in /public, bijvoorbeeld "/beelden/bellypainting.jpg". Leeg laten mag. */
  bron?: string;
  alt: string;
  /** "kaart" is staand (4:5), "breed" is liggend (16:9). */
  vorm?: "kaart" | "breed";
  /** Welke van de vier bladvormen. Zo krijgt geen beeld dezelfde rand. */
  blad?: 1 | 2 | 3 | 4;
  prioriteit?: boolean;
};

/**
 * Eén component voor elk beeld op de site.
 * Het overzicht en de detailpagina gebruiken dit allebei, dus ze kunnen
 * per definitie nooit uit de pas lopen.
 * Zolang er nog geen foto is, tonen we een rustig verloop.
 */
export default function Beeld({ bron, alt, vorm = "kaart", blad = 1, prioriteit = false }: Props) {
  return (
    <div className={`beeld beeld--${vorm} beeld--blad-${blad}`}>
      {bron ? (
        <Image
          src={bron}
          alt={alt}
          fill
          sizes="(max-width: 720px) 100vw, 480px"
          style={{ objectFit: "cover" }}
          priority={prioriteit}
        />
      ) : (
        <span className="beeld__leeg" aria-hidden="true">
          La Flora
        </span>
      )}
    </div>
  );
}
