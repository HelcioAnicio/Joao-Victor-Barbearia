"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Kicker } from "./ui/Kicker";

const IG_URL = "https://www.instagram.com/joaovictorbarbearia_/";

type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const SHOTS: Shot[] = [
  { src: "/assets/foto-1.jpeg", alt: "Trabalho — fade + cachos lateral", width: 600, height: 800 },
  { src: "/assets/foto-3.jpeg", alt: "Trabalho — risca + degradê", width: 400, height: 533 },
  { src: "/assets/foto-4.jpeg", alt: "Trabalho — risca angulada frente", width: 400, height: 533 },
  { src: "/assets/foto-5.jpeg", alt: "Trabalho — fade + cachos costas", width: 800, height: 533 },
  { src: "/assets/foto-6.jpeg", alt: "Trabalho — resultado final", width: 400, height: 533 },
  { src: "/assets/foto-7.jpeg", alt: "Trabalho — fade baixo com topo texturizado", width: 400, height: 533 },
  { src: "/assets/foto-8.jpeg", alt: "Atendimento — corte infantil em andamento", width: 800, height: 533 },
  { src: "/assets/foto-9.jpeg", alt: "Trabalho — fade e nuca alinhada, vista de trás", width: 400, height: 533 },
];

export function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState("50% 50%");

  const active = SHOTS[activeIndex];

  function openLightbox(index: number) {
    setActiveIndex(index);
    setZoomed(false);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    setZoomed(false);
  }

  function goTo(index: number) {
    setActiveIndex((index + SHOTS.length) % SHOTS.length);
    setZoomed(false);
  }

  function handleStageClick(e: React.MouseEvent<HTMLDivElement>) {
    if (zoomed) {
      setZoomed(false);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setZoomed(true);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, activeIndex]);

  return (
    <section className="djv-sec" id="portfolio" aria-labelledby="portfolio-title">
      <div className="djv-sec-head djv-sec-head-row">
        <div>
          <Kicker>Trabalhos</Kicker>
          <h2 id="portfolio-title" className="djv-h2 djv-display">Portfólio</h2>
        </div>
        <a
          className="djv-btn is-ghost"
          href={IG_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Ver mais no Instagram @joaovictorbarbearia_"
        >
          @joaovictorbarbearia_
        </a>
      </div>

      <div className="djv-gallery-wrap">
        <button
          type="button"
          className="djv-gallery-feature"
          onClick={() => openLightbox(activeIndex)}
          aria-label={`Ampliar foto: ${active.alt}`}
        >
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 880px) 100vw, 800px"
            quality={85}
            priority
            style={{ objectFit: "cover" }}
          />
          <span className="djv-gallery-feature-hint">Clique para ampliar</span>
        </button>

        <div className="djv-gallery-thumbs" role="list" aria-label="Miniaturas da galeria">
          {SHOTS.map((shot, index) => (
            <button
              key={shot.src}
              type="button"
              role="listitem"
              className={"djv-gallery-thumb" + (index === activeIndex ? " is-active" : "")}
              onClick={() => setActiveIndex(index)}
              aria-label={shot.alt}
              aria-current={index === activeIndex}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="120px"
                quality={60}
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="djv-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="djv-lightbox-close"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            ×
          </button>
          <button
            type="button"
            className="djv-lightbox-nav is-prev"
            onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
            aria-label="Foto anterior"
          >
            ‹
          </button>

          <div
            className={"djv-lightbox-stage" + (zoomed ? " is-zoomed" : "")}
            onClick={(e) => { e.stopPropagation(); handleStageClick(e); }}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="90vw"
              quality={90}
              style={{
                objectFit: "contain",
                transform: zoomed ? "scale(2.2)" : "scale(1)",
                transformOrigin: zoomOrigin,
                transition: "transform .35s ease",
                cursor: zoomed ? "zoom-out" : "zoom-in",
              }}
            />
          </div>

          <button
            type="button"
            className="djv-lightbox-nav is-next"
            onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
            aria-label="Próxima foto"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
