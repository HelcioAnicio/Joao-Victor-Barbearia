import Image from "next/image";
import { Kicker } from "./ui/Kicker";
import { Rule } from "./ui/Rule";
import { Diamond } from "./ui/Diamond";
import { HeroCtaButtons } from "./HeroCtaButtons";

const ADDRESS = "Rua Ilhéus, 88 — Bairro São Luiz";

export function Hero() {
  return (
    <section className="djv-hero" id="top" aria-label="Apresentação">
      {/* Fundo com gradiente radial — sem CSS background-image, div explícito */}
      <div className="djv-hero-bg" aria-hidden="true" />

      {/* Moldura com losangos decorativos nos extremos */}
      <div className="djv-hero-frame" aria-hidden="true" />

      <div className="djv-hero-in">
        {/* Logo circular com next/image */}
        <div className="djv-hero-logo">
          <Image
            src="/assets/logo.jpg"
            alt="Logotipo da Barbearia João Victor"
            width={94}
            height={94}
            priority
            style={{ borderRadius: "50%", objectFit: "cover", display: "block" }}
          />
        </div>

        <Kicker>Barbearia&nbsp;&nbsp;•&nbsp;&nbsp;Desde 2011</Kicker>

        <h1 className="djv-hero-title djv-display">João Victor</h1>

        <Rule wide />

        <p className="djv-hero-sub">
          Corte, barba terapia, sobrancelha e tintura — feitos no detalhe,
          do jeito que homem nenhum reclama.
        </p>

        <HeroCtaButtons />

        <div className="djv-hero-meta" aria-label="Horário e endereço">
          <span>Ter–Sáb · 8h–12h&nbsp;/&nbsp;13h–18h</span>
          <Diamond size={5} />
          <span>{ADDRESS}</span>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a className="djv-scroll" href="#servicos" aria-label="Rolar para serviços">
        <span>rolar</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
