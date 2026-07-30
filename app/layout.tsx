import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

// Peso 600 normal é o único usado em títulos (h1/h2) — é o candidato a LCP,
// então é o único preloadado. O itálico só aparece na citação, abaixo da
// dobra, e fica marcado como preload:false para não competir no caminho crítico.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-cormorant",
  display: "swap",
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  variable: "--font-cormorant-italic",
  display: "swap",
  preload: false,
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

const SITE_URL = "https://www.joaovictor-barbearia.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    locale: "pt_BR",
    type: "website",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Barbearia João Victor",
  image: `${SITE_URL}/assets/logo.png`,
  url: SITE_URL,
  telephone: "+5531997992262",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Ilhéus, 88",
    addressLocality: "Contagem",
    addressRegion: "MG",
    postalCode: "32073-200",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -19.929625253398672,
    longitude: -44.125764364104654,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "13:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "26",
  },
  sameAs: ["https://www.instagram.com/joaovictorbarbearia_/"],
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
      className={`${cormorant.variable} ${cormorantItalic.variable} ${hanken.variable} ${spaceMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="djv-skip-link" href="#conteudo-principal">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
