import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Home from "@/components/Home";
import Footer from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.meta.titel,
  description: t.meta.beschrijving,
};

export default function Page() {
  return (
    <>
      <Nav taal="en" />
      <Home taal="en" />
      <Footer taal="en" />
    </>
  );
}
