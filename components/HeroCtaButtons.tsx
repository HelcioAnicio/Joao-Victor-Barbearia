"use client";

export function HeroCtaButtons() {
  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#portfolio") as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  const scrollToAgenda = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector("#agenda") as HTMLElement | null;
    if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: "smooth" });
  };

  return (
    <div className="djv-hero-cta">
      <button className="djv-btn is-gold is-lg" onClick={scrollToAgenda}>
        Agendar horário
      </button>
      <a
        className="djv-btn is-ghost is-lg"
        href="#portfolio"
        onClick={scrollToPortfolio}
      >
        Ver portfólio
      </a>
    </div>
  );
}
