"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  openTekst: string;
  sluitTekst: string;
};

/**
 * Het menu op de telefoon. Op een groot scherm staan de links gewoon naast
 * elkaar en is de knop verborgen (zie .nav__knop in globals.css). Op een
 * smal scherm klapt het menu pas uit na een tik op de hamburgerknop, zodat
 * de bovenkant van de pagina vrij blijft voor de spiegel en de bloem.
 *
 * Een tik op een link sluit het menu weer, net als de Escape-toets.
 */
export default function NavMenu({ children, label, openTekst, sluitTekst }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const opEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", opEscape);
    return () => window.removeEventListener("keydown", opEscape);
  }, [open]);

  function opKlik(e: MouseEvent<HTMLElement>) {
    if ((e.target as HTMLElement).closest("a")) setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="nav__knop"
        aria-expanded={open}
        aria-controls="hoofdmenu"
        aria-label={open ? sluitTekst : openTekst}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="hoofdmenu"
        className="nav__links"
        data-open={open}
        aria-label={label}
        onClick={opKlik}
      >
        {children}
      </nav>
    </>
  );
}
