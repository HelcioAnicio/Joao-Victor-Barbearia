import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Barbearia João Victor — São Luiz, desde 2011",
  description:
    "Corte, barba terapia, sobrancelha e tintura. Feitos no detalhe, do jeito que homem nenhum reclama. Ter–Sáb · 8h–18h · Rua Ilhéus, 88 — Bairro São Luiz.",
  keywords: ["barbearia", "João Victor", "São Luiz", "corte", "barba", "sobrancelha"],
  openGraph: {
    title: "Barbearia João Victor",
    description: "Corte, barba terapia, sobrancelha e tintura — feitos no detalhe.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Hanken+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
