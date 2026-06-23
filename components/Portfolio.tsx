import Image from "next/image";
import { Kicker } from "./ui/Kicker";

const IG_URL = "https://www.instagram.com/joaovictorbarbearia_/";

type Shot = {
  src: string;
  alt: string;
  mod?: "tall" | "wide" | "";
  width: number;
  height: number;
};

const SHOTS: Shot[] = [
  { src: "/assets/foto-1.jpeg", alt: "Trabalho — fade + cachos lateral",     mod: "tall", width: 600, height: 800 },
  { src: "/assets/foto-3.jpeg", alt: "Trabalho — risca + degradê",           mod: "",     width: 400, height: 533 },
  { src: "/assets/foto-4.jpeg", alt: "Trabalho — risca angulada frente",     mod: "",     width: 400, height: 533 },
  { src: "/assets/foto-5.jpeg", alt: "Trabalho — fade + cachos costas",      mod: "wide", width: 800, height: 533 },
  { src: "/assets/foto-6.jpeg", alt: "Trabalho — resultado final",           mod: "",     width: 400, height: 533 },
];

function GalleryItem({ shot }: { shot: Shot }) {
  const cls = "djv-gallery-item" + (shot.mod ? " is-" + shot.mod : "");
  return (
    <div className={cls}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={
          shot.mod === "wide"
            ? "(max-width: 880px) 100vw, 50vw"
            : shot.mod === "tall"
            ? "(max-width: 880px) 50vw, 25vw"
            : "(max-width: 880px) 50vw, 25vw"
        }
        quality={80}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

export function Portfolio() {
  return (
    <section className="djv-sec" id="portfolio" aria-labelledby="portfolio-title">
      <div className="djv-sec-head djv-sec-head-row">
        <div>
          <Kicker>Trabalhos</Kicker>
          <h2 id="portfolio-title" className="djv-h2 djv-display">Portfólio</h2>
        </div>
        <a
          className="djv-btn is-ghost"
          href={IG_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Ver mais no Instagram @joaovictorbarbearia_"
        >
          @joaovictorbarbearia_
        </a>
      </div>

      <div className="djv-gallery" role="list" aria-label="Galeria de trabalhos">
        {SHOTS.map((shot) => (
          <GalleryItem key={shot.src} shot={shot} />
        ))}
      </div>
    </section>
  );
}
