import { Kicker } from "./ui/Kicker";

const SCHEDULE = [
  { days: "Terça a Sábado", periods: ["8h às 12h", "13h às 18h"] },
];

export function Booking({ whatsapp }: { whatsapp: string }) {
  const wa = String(whatsapp).replace(/\D/g, "");
  const href = `https://wa.me/${wa}?text=${encodeURIComponent("Olá! Gostaria de agendar um horário na Barbearia João Victor.")}`;

  return (
    <section className="djv-sec djv-agenda" id="agenda" aria-labelledby="agenda-title">
      <div className="djv-sec-head">
        <Kicker>Agende online</Kicker>
        <h2 id="agenda-title" className="djv-h2 djv-display">Horários de Atendimento</h2>
        <p className="djv-agenda-lead">
          Veja os dias e horários disponíveis e agende direto pelo WhatsApp.
        </p>
      </div>

      <div className="djv-agenda-card djv-hours-card">
        {SCHEDULE.map(({ days, periods }) => (
          <div key={days} className="djv-hours-row">
            <span className="djv-hours-days">{days}</span>
            <div className="djv-hours-periods">
              {periods.map((p) => (
                <span key={p} className="djv-hours-period">{p}</span>
              ))}
            </div>
          </div>
        ))}

        <div className="djv-hours-closed">
          <span>Domingo e Segunda</span>
          <span className="djv-hours-closed-label">Fechado</span>
        </div>

        <a
          className="djv-btn is-gold is-lg djv-hours-cta"
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          Agendar pelo WhatsApp
        </a>
      </div>

      <p className="djv-agenda-foot">
        Para encaixes fora do horário, é só chamar no WhatsApp.
      </p>
    </section>
  );
}
