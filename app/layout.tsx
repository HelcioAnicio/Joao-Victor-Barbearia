import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barbearia João Victor — São Luiz, desde 2011",
  description:
    "Corte, barba terapia, sobrancelha e tintura. Feitos no detalhe, do jeito que homem nenhum reclama. Ter–Sáb · 8h–18h · Rua Ilhéus, 88 — Bairro São Luiz.",
  keywords: [
    // Nome / marca
    "barbearia do João",
    "barbearia do João Victor",
    "barbearia João Victor",
    "João Victor barbearia",
    "barbearia do Victor",
    // Genéricas + localização
    "barbearia",
    "barbearia perto de mim",
    "barbearia Contagem",
    "barbearia São Luiz Contagem",
    "barbearia Industrial São Luiz",
    "barbearia bairro São Luiz",
    "melhor barbearia de Contagem",
    "barbearia Rua Ilhéus",
    // Serviços
    "corte de cabelo",
    "corte de cabelo masculino",
    "corte de cabelo Contagem",
    "corte na navalha",
    "corte degradê",
    "corte fade",
    "barba",
    "barba terapia",
    "barboterapia",
    "aparar barba",
    "sobrancelha masculina",
    "design de sobrancelha",
    "tintura de cabelo masculino",
    "cobertura de grisalho",
    "corte infantil",
    "corte cabelo infantil Contagem",
    // Intenção de busca
    "agendar corte de cabelo",
    "agendar barbearia",
    "barbearia agendamento WhatsApp",
    "barbearia avaliação Google",
  ],
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
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body>
        <a className="djv-skip-link" href="#conteudo-principal">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
