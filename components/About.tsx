import Image from "next/image";
import { Kicker } from "./ui/Kicker";

export function About() {
  return (
    <section className="djv-about" id="sobre" aria-labelledby="sobre-title">
      <div className="djv-about-grid">
        <div className="djv-about-media">
          <Image
            src="/assets/foto-joao.jpeg"
            alt="João Victor trabalhando na barbearia"
            width={480}
            height={600}
            className="djv-about-img"
            sizes="(max-width: 880px) 100vw, 40vw"
            quality={85}
            style={{ borderRadius: "10px", objectFit: "cover", width: "100%", height: "auto" }}
          />
          <div className="djv-about-badge" aria-label="Mais de 13 anos de experiência">
            <b>+13</b>
            <span>anos de<br />navalha</span>
          </div>
        </div>

        <div className="djv-about-body">
          <Kicker>Sobre</Kicker>
          <h2 id="sobre-title" className="djv-h2 djv-display">
            O homem por trás<br />da cadeira
          </h2>
          <p>
            João é daqueles que tratam corte como ofício. Dedicado e atencioso,
            está sempre se aprimorando em cursos e levando técnica nova pra
            cadeira — sem nunca abrir mão do detalhe.
          </p>
          <p>
            É esse cuidado que faz cliente virar cliente de anos. Cada corte sai
            pensado pro rosto, pro estilo e pra rotina de quem senta ali.
          </p>
          <blockquote className="djv-quote">
            <span aria-hidden="true">"</span>
            Sou cliente desde 2015 — e o capricho é sempre o mesmo.
          </blockquote>
          <div className="djv-about-stats" aria-label="Destaques">
            <div>
              <b>2011</b>
              <span>aqui no São Luiz</span>
            </div>
            <div>
              <b>Detalhe</b>
              <span>é a marca da casa</span>
            </div>
            <div>
              <b>Cursos</b>
              <span>sempre se aprimorando</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
