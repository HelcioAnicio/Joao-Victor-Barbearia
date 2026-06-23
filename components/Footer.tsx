import Image from "next/image";

const IG_URL  = "https://www.instagram.com/joaovictorbarbearia_/";
const ADDRESS = "Rua Ilhéus, 88 — Bairro São Luiz";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="djv-footer">
      <div className="djv-footer-in">
        <div className="djv-footer-brand">
          <Image
            src="/assets/logo.png"
            alt=""
            width={46}
            height={46}
            aria-hidden="true"
            style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid var(--line)" }}
          />
          <div>
            <b>Barbearia João Victor</b>
            <span>Desde 2011 · São Luiz</span>
          </div>
        </div>
        <nav className="djv-footer-links" aria-label="Links do rodapé">
          <a href="#servicos">Serviços</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#agenda">Agenda</a>
          <a href={IG_URL} target="_blank" rel="noreferrer noopener">Instagram</a>
        </nav>
      </div>
      <div className="djv-footer-base">
        <span>© {year} Barbearia João Victor</span>
        <span>{ADDRESS}</span>
      </div>
    </footer>
  );
}
