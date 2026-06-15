import Image from "next/image";
import { Kicker } from "./ui/Kicker";
import { Diamond } from "./ui/Diamond";
import { LocationButtons } from "./LocationButtons";

const ADDRESS  = "Rua Ilhéus, 88 — Bairro São Luiz";
const IG_URL   = "https://www.instagram.com/joaovictorbarbearia_/";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Rua Ilhéus 88 São Luiz barbearia");

function fmtPhone(num: string) {
  const d = String(num || "").replace(/\D/g, "").replace(/^55/, "");
  if (d.length >= 10) {
    const ddd  = d.slice(0, 2);
    const rest = d.slice(2);
    const mid  = rest.length === 9 ? rest.slice(0, 5) : rest.slice(0, 4);
    const end  = rest.length === 9 ? rest.slice(5)    : rest.slice(4);
    return `(${ddd}) ${mid}-${end}`;
  }
  return num;
}

function waLink(number: string, text?: string) {
  const digits = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}` + (text ? `?text=${encodeURIComponent(text)}` : "");
}

export function Location({ whatsapp, onAgendar }: { whatsapp: string; onAgendar: () => void }) {
  return (
    <section className="djv-sec" id="contato" aria-labelledby="contato-title">
      <div className="djv-contato-grid">
        <div>
          <Kicker>Onde nos achar</Kicker>
          <h2 id="contato-title" className="djv-h2 djv-display">Passa lá</h2>
          <dl className="djv-info-list">
            <div>
              <dt>Endereço</dt>
              <dd>{ADDRESS}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>
                Terça a sábado<br />
                8h–12h&nbsp;·&nbsp;13h–18h<br />
                <span className="djv-muted">Domingo e segunda — fechado</span>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a
                  href={waLink(whatsapp, "Olá! Vim pelo site da Barbearia João Victor.")}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {fmtPhone(whatsapp)}
                </a>
              </dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd>
                <a href={IG_URL} target="_blank" rel="noreferrer noopener">
                  @joaovictorbarbearia_
                </a>
              </dd>
            </div>
          </dl>
          <LocationButtons mapsUrl={MAPS_URL} onAgendar={onAgendar} />
        </div>

        <a
          className="djv-map"
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Ver Rua Ilhéus, 88 no Google Maps"
        >
          <Image
            src="/assets/mapa.jpg"
            alt="Mapa mostrando a localização da Barbearia João Victor na Rua Ilhéus, 88"
            width={600}
            height={450}
            sizes="(max-width: 880px) 100vw, 50vw"
            quality={80}
            style={{ objectFit: "cover", width: "100%", height: "auto", borderRadius: "14px" }}
          />
          <span className="djv-map-pin">
            <Diamond size={8} />&nbsp;São Luiz
          </span>
        </a>
      </div>
    </section>
  );
}
