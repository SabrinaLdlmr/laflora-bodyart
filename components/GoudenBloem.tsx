import Image from "next/image";

type Props = {
  /** Breedte in pixels. De hoogte volgt de verhouding van de foto. */
  groot?: number;
  className?: string;
  prioriteit?: boolean;
};

/** De verhouding van het uitgeknipte beeld. */
const BREEDTE = 446;
const HOOGTE = 625;

/**
 * Het merkteken van La Flora: een van Sabrina's eigen geschilderde rozen,
 * met de gouden kroon erboven en het krulornament eronder, uitgeknipt van
 * het zwarte oefenbord. Overal op de site komt dit ene beeld terug.
 *
 * Het beeld was 446 bij 686. Onderin stond nog de bovenrand van een tweede,
 * bleke roos, die als een halve maan onder het ornament uitkwam. Die is
 * weggesneden, vandaar de hoogte van 625.
 */
export default function GoudenBloem({ groot = 64, className = "", prioriteit = false }: Props) {
  const hoogte = Math.round((groot * HOOGTE) / BREEDTE);

  return (
    <Image
      className={`bloem ${className}`}
      src="/beelden/laflora-bloem.png"
      alt="La Flora"
      width={groot}
      height={hoogte}
      priority={prioriteit}
    />
  );
}
