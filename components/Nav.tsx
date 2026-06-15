"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const LINKS: [string, string][] = [
  ["Serviços", "#servicos"],
  ["Sobre", "#sobre"],
  ["Portfólio", "#portfolio"],
  ["Agenda", "#agenda"],
  ["Contato", "#contato"],
];

function smoothScroll(href: string) {
  const el = document.querySelector(href) as HTMLElement | null;
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: "smooth" });
}

export function Nav({ onAgendar }: { onAgendar: () => void }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    smoothScroll(href);
  };

  return (
    <header className={"djv-nav" + (solid ? " is-solid" : "")}>
      <div className="djv-nav-in">
        <a className="djv-brand" href="#top" onClick={(e) => go(e, "#top")} aria-label="Barbearia João Victor — início">
          <Image
            src="/assets/logo.jpg"
            alt=""
            width={34}
            height={34}
            className="djv-brand-mark"
            priority
          />
          <span className="djv-brand-wm">
            João Victor
            <small>Barbearia</small>
          </span>
        </a>

        <nav className={"djv-links" + (open ? " is-open" : "")} aria-label="Navegação principal">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => go(e, href)}>{label}</a>
          ))}
          <button
            className="djv-btn is-gold djv-links-cta"
            onClick={() => { setOpen(false); onAgendar(); }}
          >
            Agendar
          </button>
        </nav>

        <div className="djv-nav-right">
          <button className="djv-btn is-gold djv-nav-cta" onClick={onAgendar}>
            Agendar
          </button>
          <button
            className="djv-burger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-open={open ? 1 : 0}
          >
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
