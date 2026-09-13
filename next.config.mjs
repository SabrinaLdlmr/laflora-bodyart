/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // De pagina Bewuste festivals is uit het aanbod gehaald. Oude links,
      // bijvoorbeeld uit Instagram of uit Google, komen nu bij het overzicht uit
      // in plaats van op een foutmelding.
      //
      // permanent staat bewust op false. Dat geeft een tijdelijke omleiding, die
      // browsers niet blijvend onthouden. Zodra Jasmina het voorstel definitief
      // goedkeurt mag hier true staan.
      { source: "/aanbod/festivals", destination: "/#aanbod", permanent: false },
      { source: "/en/aanbod/festivals", destination: "/en/#aanbod", permanent: false },
    ];
  },
};

export default nextConfig;
