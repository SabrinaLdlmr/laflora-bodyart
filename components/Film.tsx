type Props = {
  bron: string;
  poster: string;
  bijschrift?: string;
};

/**
 * Een stil filmpje dat vanzelf loopt. Zonder geluid, zonder knoppen.
 * Wie in zijn systeem heeft staan dat beweging rustig moet blijven,
 * krijgt het posterbeeld te zien in plaats van de loop.
 */
export default function Film({ bron, poster, bijschrift }: Props) {
  return (
    <figure className="film">
      <video
        className="film__beeld"
        src={bron}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={bijschrift}
      />
      {bijschrift && <figcaption className="film__bijschrift">{bijschrift}</figcaption>}
    </figure>
  );
}
