"use client";

import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { About } from "./About";
import { Portfolio } from "./Portfolio";
import { Booking } from "./Booking";
import { Location } from "./Location";
import { Footer } from "./Footer";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "5500000000000";

function scrollToAgenda() {
  const el = document.querySelector("#agenda") as HTMLElement | null;
  if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
}

export function PageClient() {
  return (
    <>
      <Nav onAgendar={scrollToAgenda} />
      <main id="conteudo-principal">
        <Hero />
        <Services onAgendar={scrollToAgenda} />
        <About />
        <Portfolio />
        <Booking whatsapp={WHATSAPP} />
        <Location whatsapp={WHATSAPP} onAgendar={scrollToAgenda} />
      </main>
      <Footer />
    </>
  );
}
