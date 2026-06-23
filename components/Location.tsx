import { Kicker } from "./ui/Kicker";
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

        <div className="djv-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d337.97893142052175!2d-44.125764364104654!3d-19.929625253398672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6eb05b1a7fe3f%3A0x12e3bc626ee55e1!2sBarbearia%20do%20Jo%C3%A3o%20Victor!5e0!3m2!1spt-BR!2sbr!4v1782233824308!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0, width: "100%", height: "100%", borderRadius: "14px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Barbearia João Victor"
          />
        </div>
      </div>
    </section>
  );
}
