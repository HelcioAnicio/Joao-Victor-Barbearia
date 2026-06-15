"use client";

export function LocationButtons({
  mapsUrl,
  onAgendar,
}: {
  mapsUrl: string;
  onAgendar: () => void;
}) {
  return (
    <div className="djv-contato-cta">
      <button className="djv-btn is-gold" onClick={onAgendar}>
        Agendar pelo WhatsApp
      </button>
      <a
        className="djv-btn is-ghost"
        href={mapsUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        Abrir no mapa
      </a>
    </div>
  );
}
