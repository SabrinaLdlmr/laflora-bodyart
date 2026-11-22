/** @type {import('next').NextConfig} */

/**
 * Oude aanbodpagina's en waar ze nu naartoe gaan. Oude links, bijvoorbeeld uit
 * Instagram of uit Google, komen zo op een passende plek uit in plaats van op
 * een foutmelding. Elke regel geldt voor zowel de Nederlandse als de Engelse site.
 *
 * Diensten die zijn vervallen gaan naar het overzicht van het aanbod. Diensten
 * die alleen een nieuwe naam kregen gaan naar hun nieuwe pagina.
 */
const omleidingen = [
  // Vervallen: alles draait nu om kleine, magische feestjes
  ["/aanbod/festivals", "/#aanbod"],
  ["/aanbod/bellypainting", "/#aanbod"],
  ["/aanbod/gezicht-en-glitter", "/#aanbod"],
  ["/aanbod/handen-en-armen", "/#aanbod"],
  // Nieuwe naam
  ["/aanbod/magische-bloemenbeleving", "/aanbod/bloemen-experience"],
  ["/aanbod/workshop-voor-tieners", "/aanbod/workshop-bloemetjes-maken"],
];

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return omleidingen.flatMap(([van, naar]) => [
      { source: van, destination: naar, permanent: true },
      { source: `/en${van}`, destination: `/en${naar}`, permanent: true },
    ]);
  },
};

export default nextConfig;
