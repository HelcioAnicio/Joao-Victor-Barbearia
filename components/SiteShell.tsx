"use client";

import { Nav } from "./Nav";
import { Services } from "./Services";
import { Location } from "./Location";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? "5500000000000";

function scrollToAgenda() {
  const el = document.querySelector("#agenda") as HTMLElement | null;
  if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
}

export function SiteShell() {
  return (
    <>
      <Nav onAgendar={scrollToAgenda} />
      <Services onAgendar={scrollToAgenda} />
      <Location whatsapp={WHATSAPP} onAgendar={scrollToAgenda} />
    </>
  );
}
