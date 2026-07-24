"use client";

import { FaWhatsapp } from "react-icons/fa";

function waLink(number: string, text?: string) {
  const digits = String(number || "").replace(/\D/g, "");
  return `https://wa.me/${digits}` + (text ? `?text=${encodeURIComponent(text)}` : "");
}

export function WhatsappFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      className="djv-wa-float"
      href={waLink(whatsapp, "Olá! Vim pelo site da Barbearia João Victor.")}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar no WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
