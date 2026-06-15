"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Kicker } from "./ui/Kicker";

const DOW      = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const DOW_FULL = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
const MON      = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
const MON_FULL = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const OPEN_DAYS = [2, 3, 4, 5, 6];
const ALL_SLOTS = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];

function upcomingDays(count: number): Date[] {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  let guard = 0;
  while (out.length < count && guard < 60) {
    if (OPEN_DAYS.includes(d.getDay())) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
    guard++;
  }
  return out;
}

function isPast(date: Date, slot: string): boolean {
  const now = new Date();
  if (date.toDateString() !== now.toDateString()) return false;
  const [h, m] = slot.split(":").map(Number);
  return h * 60 + m <= now.getHours() * 60 + now.getMinutes() + 30;
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function dateLabel(d: Date) {
  return `${DOW[d.getDay()]}, ${d.getDate()} ${MON[d.getMonth()]}`;
}
function dateLabelFull(d: Date) {
  return `${DOW_FULL[d.getDay()]}, ${d.getDate()} de ${MON_FULL[d.getMonth()]}`;
}

export function Booking({ whatsapp }: { whatsapp: string }) {
  const days = useMemo(() => upcomingDays(10), []);
  const [activeDay, setActiveDay] = useState(0);
  const [sel, setSel] = useState<{ dayIdx: number; slot: string } | null>(null);
  const [busyMap, setBusyMap] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const fetchBusy = useCallback(
    async (idx: number) => {
      const date = toISO(days[idx]);
      if (busyMap[date] !== undefined) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/availability?date=${date}`);
        const data = await res.json();
        setBusyMap((prev) => ({ ...prev, [date]: data.busy ?? [] }));
      } catch {
        setBusyMap((prev) => ({ ...prev, [date]: [] }));
      } finally {
        setLoading(false);
      }
    },
    [days, busyMap]
  );

  useEffect(() => { fetchBusy(activeDay); }, [activeDay]); // eslint-disable-line

  const day      = days[activeDay];
  const busySlots = busyMap[toISO(day)] ?? null;

  const pick = (slot: string) => {
    if (!busySlots || busySlots.includes(slot) || isPast(day, slot)) return;
    setSel({ dayIdx: activeDay, slot });
  };

  const scrollRail = (dir: number) =>
    railRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });

  const selDay = sel ? days[sel.dayIdx] : null;
  const wa = String(whatsapp).replace(/\D/g, "");
  const confirmMsg = sel && selDay
    ? encodeURIComponent(
        `Olá! Gostaria de agendar um horário na Barbearia João Victor.\n\n📅 ${dateLabelFull(selDay)}\n🕐 ${sel.slot}\n\nFica de pé?`
      )
    : "";
  const confirmHref = sel ? `https://wa.me/${wa}?text=${confirmMsg}` : "#";

  return (
    <section className="djv-sec djv-agenda" id="agenda" aria-labelledby="agenda-title">
      <div className="djv-sec-head">
        <Kicker>Agende online</Kicker>
        <h2 id="agenda-title" className="djv-h2 djv-display">Escolha seu horário</h2>
        <p className="djv-agenda-lead">
          Selecione o dia e a hora que preferir. A confirmação é rápida,
          direto no WhatsApp — o dia e o horário já vão preenchidos na mensagem.
        </p>
      </div>

      <div className="djv-agenda-card" role="region" aria-label="Calendário de agendamento">
        {/* Trilho de dias */}
        <div className="djv-day-rail-wrap">
          <button className="djv-rail-arrow" onClick={() => scrollRail(-1)} aria-label="Dias anteriores">
            ‹
          </button>
          <div className="djv-day-rail" ref={railRef} role="tablist" aria-label="Dias disponíveis">
            {days.map((d, i) => {
              const iso = toISO(d);
              const busy = busyMap[iso] ?? [];
              const free = ALL_SLOTS.filter((s) => !busy.includes(s) && !isPast(d, s)).length;
              return (
                <button
                  key={iso}
                  role="tab"
                  aria-selected={i === activeDay}
                  className={"djv-day" + (i === activeDay ? " is-active" : "")}
                  onClick={() => setActiveDay(i)}
                  aria-label={`${dateLabelFull(d)}, ${free} horários livres`}
                >
                  <span className="djv-day-dow">{DOW[d.getDay()]}</span>
                  <span className="djv-day-num">{d.getDate()}</span>
                  <span className="djv-day-mon">{MON[d.getMonth()]}</span>
                  <span className="djv-day-free">{free} livres</span>
                </button>
              );
            })}
          </div>
          <button className="djv-rail-arrow" onClick={() => scrollRail(1)} aria-label="Próximos dias">
            ›
          </button>
        </div>

        {/* Cabeçalho de horários */}
        <div className="djv-slots-head">
          <span role="status" aria-live="polite">{dateLabelFull(day)}</span>
          <span className="djv-slots-legend" aria-hidden="true">
            <i className="lg-free" /> livre
            <i className="lg-busy" /> ocupado
          </span>
        </div>

        {/* Grade de horários */}
        <div className="djv-slots" role="radiogroup" aria-label={`Horários de ${dateLabelFull(day)}`}>
          {ALL_SLOTS.map((s) => {
            const booked = busySlots ? busySlots.includes(s) : false;
            const past   = isPast(day, s);
            const isSel  = sel?.dayIdx === activeDay && sel?.slot === s;
            const dis    = booked || past;
            return (
              <button
                key={s}
                role="radio"
                aria-checked={isSel}
                className={"djv-slot" + (dis ? " is-busy" : "") + (isSel ? " is-sel" : "")}
                disabled={dis}
                onClick={() => pick(s)}
                aria-label={`${s}${booked ? " — ocupado" : past ? " — passou" : ""}`}
              >
                {s}
                {past && !booked && <small>passou</small>}
              </button>
            );
          })}
        </div>

        <div className="djv-slots-divider" aria-hidden="true">
          manhã 8h–12h · tarde 13h–18h
        </div>

        {/* Barra de confirmação */}
        <div
          className={"djv-confirm" + (sel ? " is-on" : "")}
          role="region"
          aria-label="Confirmar agendamento"
          aria-live="polite"
        >
          <div>
            {sel && selDay ? (
              <>
                <span className="djv-confirm-label">Seu horário</span>
                <span className="djv-confirm-val djv-display">
                  {dateLabel(selDay)} · {sel.slot}
                </span>
              </>
            ) : (
              <span className="djv-confirm-empty">Escolha um horário acima para continuar</span>
            )}
          </div>
          <a
            className={"djv-btn is-gold is-lg" + (!sel ? " is-disabled" : "")}
            href={confirmHref}
            target={sel ? "_blank" : undefined}
            rel="noreferrer"
            aria-disabled={!sel}
            onClick={(e) => { if (!sel) e.preventDefault(); }}
          >
            Confirmar no WhatsApp
          </a>
        </div>
      </div>

      <p className="djv-agenda-foot">
        Horários sujeitos a confirmação. Para encaixes fora do horário, é só chamar no WhatsApp.
      </p>
    </section>
  );
}
