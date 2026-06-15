"use client";

import { Kicker } from "./ui/Kicker";
import { Diamond } from "./ui/Diamond";

const SERVICES: [string, string, string][] = [
  ["01", "Corte", "Clássico ou moderno — máquina e tesoura, acabamento na navalha e contorno desenhado."],
  ["02", "Barba terapia", "Toalha quente, óleos e finalização. Relaxa, hidrata e dá forma ao contorno."],
  ["03", "Sobrancelha", "Alinhamento na navalha pra emoldurar o olhar com naturalidade."],
  ["04", "Tintura", "Cobertura de grisalhos e cor sob medida, com acabamento natural."],
];

export function Services({ onAgendar }: { onAgendar: () => void }) {
  return (
    <section className="djv-sec" id="servicos" aria-labelledby="servicos-title">
      <div className="djv-sec-head">
        <Kicker>O que fazemos</Kicker>
        <h2 id="servicos-title" className="djv-h2 djv-display">Serviços</h2>
      </div>
      <div className="djv-svc-grid" role="list">
        {SERVICES.map(([n, title, desc]) => (
          <article className="djv-svc" key={n} role="listitem">
            <div className="djv-svc-top">
              <span className="djv-svc-n" aria-hidden="true">{n}</span>
              <Diamond size={8} />
            </div>
            <h3 className="djv-svc-title">{title}</h3>
            <p className="djv-svc-desc">{desc}</p>
            <div className="djv-svc-foot">
              <span className="djv-tag">Consulte valores</span>
              <button className="djv-link-btn" onClick={onAgendar}>
                Agendar →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
