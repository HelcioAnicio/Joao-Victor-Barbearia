"use client";

import { useState } from "react";
import { Kicker } from "./ui/Kicker";
import { FaStar, FaGoogle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const REVIEWS_URL = "https://maps.app.goo.gl/5TyFXAfiRcXe6RL58";

type ReviewT = {
  name: string;
  text: string;
  rating: number;
};

const REVIEWS: ReviewT[] = [
  {
    name: "Hederson Luciano",
    text: "Excelente atendimento. Sou cliente há mais de 5 anos, sempre um bom atendimento. Local limpo, ambiente acolhedor. Rola até um cafezinho 😀",
    rating: 5,
  },
  {
    name: "Isaías Reis",
    text: "Sem dúvida a melhor barbearia de Contagem, vale a pena ir. Atendimento nota mil.",
    rating: 5,
  },
  {
    name: "Fernando Augusto",
    text: "Uma das melhores barbearias que já frequentei, excelente atendimento.",
    rating: 5,
  },
  {
    name: "Pions Games",
    text: "Ótima barbearia, corte cabelo com eles há mais de 7 anos, experiência indiscutível e também super atenciosos. Recomendo muito ir cortar o cabelo com eles.",
    rating: 5,
  },
  {
    name: "Quemuel Moraes",
    text: "Barbearia top, atendimento alta qualidade, super indico!",
    rating: 5,
  },
  {
    name: "Italo Ruddieri",
    text: "Sou cliente fixo e assíduo, ótimos profissionais.",
    rating: 5,
  },
  {
    name: "Luiz Fernando dos Santos",
    text: "Muito bom atendimento, ótimo 😃☺️😃",
    rating: 5,
  },
  {
    name: "Júlio Cezar Freitas",
    text: "Ótimos profissionais.",
    rating: 5,
  },
  {
    name: "Leandro Silva",
    text: "Pontualidade, limpeza, qualidade e profissionalismo em cada atendimento.",
    rating: 5,
  },
];

const GROUP_SIZE = 3;
const SLIDES: ReviewT[][] = [];
for (let i = 0; i < REVIEWS.length; i += GROUP_SIZE) {
  SLIDES.push(REVIEWS.slice(i, i + GROUP_SIZE));
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="djv-review-stars" role="img" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} aria-hidden="true" className={i < rating ? "is-on" : "is-off"} />
      ))}
    </div>
  );
}

export function Reviews() {
  const [slide, setSlide] = useState(0);
  const last = SLIDES.length - 1;

  const go = (dir: -1 | 1) => {
    setSlide((s) => (s + dir + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="djv-sec" id="avaliacoes" aria-labelledby="avaliacoes-title">
      <div className="djv-sec-head djv-sec-head-row">
        <div>
          <Kicker>O que dizem</Kicker>
          <h2 id="avaliacoes-title" className="djv-h2 djv-display">Avaliações</h2>
        </div>
        <a
          className="djv-btn is-ghost"
          href={REVIEWS_URL}
          target="_blank"
          rel="noreferrer noopener"
        >
          <FaGoogle aria-hidden="true" /> Avaliar no Google
        </a>
      </div>

      <div className="djv-reviews">
        <button
          className="djv-review-nav is-prev"
          onClick={() => go(-1)}
          aria-label="Avaliações anteriores"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>

        <div className="djv-reviews-viewport">
          <div
            className="djv-reviews-track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {SLIDES.map((group, gi) => (
              <div className="djv-reviews-slide" key={gi} aria-hidden={gi !== slide}>
                {group.map((r, ri) => (
                  <article className="djv-review-card" key={ri}>
                    <div className="djv-review-top">
                      <Stars rating={r.rating} />
                      <FaGoogle aria-hidden="true" className="djv-review-google" />
                    </div>
                    <p className="djv-review-text">&ldquo;{r.text}&rdquo;</p>
                    <span className="djv-review-name">{r.name}</span>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          className="djv-review-nav is-next"
          onClick={() => go(1)}
          aria-label="Próximas avaliações"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>

      <div className="djv-reviews-dots" role="tablist" aria-label="Selecionar grupo de avaliações">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={"djv-reviews-dot" + (i === slide ? " is-active" : "")}
            onClick={() => setSlide(i)}
            aria-label={`Ir para grupo ${i + 1}`}
            aria-selected={i === slide}
            role="tab"
          />
        ))}
      </div>
    </section>
  );
}
