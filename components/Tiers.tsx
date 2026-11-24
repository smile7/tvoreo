const TIERS = [
  {
    id: "start",
    n: "Старт",
    lead: "Бърз и фокусиран.",
    who: "За кампании, занаятчии, кабинети и заведения.",
    gets: ["Лендинг или сайт-визитка", "QR меню за заведение", "Одит на текущ сайт"],
    term: <>Обикновено 1–2 седмици</>,
  },
  {
    id: "business",
    n: "Бизнес",
    lead: "Сайт или магазин по мярка.",
    who: "За фирми, които искат да изглеждат водещи в сектора си.",
    gets: ["Дизайн и код по поръчка", "Лесно редактиране (CMS)", "Двуезичност и SEO основа"],
    term: <>Обикновено <span className="ph-inline">[4–8]</span> седмици</>,
    featured: true,
  },
  {
    id: "product",
    n: "Продукт",
    lead: "Приложения и платформи.",
    who: "За идеи с потребители, профили, плащания и интеграции.",
    gets: ["Уеб и мобилни приложения", "Платформи и табла", "Интеграции със склад, CRM, куриери"],
    term: <>Започваме с кратко проучване и прототип</>,
  },
];

export function Tiers() {
  return (
    <section className="tiers" aria-labelledby="tiers-title">
      <div className="wrap">
        <div className="sec-head">
          <p className="kicker" data-reveal>06 — Формати</p>
          <h2 id="tiers-title" className="h2" data-reveal>
            Три начина <span className="muted">да започнем.</span>
          </h2>
        </div>
        <div className="tier-grid">
          {TIERS.map((t, i) => (
            <article key={t.id} className={`tier ${t.featured ? "tier-f" : ""}`} data-reveal data-spot style={{ ["--i" as string]: i }}>
              <header>
                <span className="tier-i" aria-hidden="true">0{i + 1}</span>
                <h3>{t.n}</h3>
                {t.featured && <span className="pill">Препоръчваме</span>}
              </header>
              <p className="tier-lead">{t.lead}</p>
              <p className="tier-who">{t.who}</p>
              <ul>
                {t.gets.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <p className="tier-term">{t.term}</p>
              <a className={`btn ${t.featured ? "btn-light" : "btn-outline"}`} href="#ocenka" data-estimate-tier={t.id} data-magnetic>
                Започни с {t.n}
              </a>
            </article>
          ))}
        </div>
        <p className="tiers-note" data-reveal>
          Всеки проект получава персонална оценка до 24 часа и фиксирана оферта след разговор.
        </p>
      </div>
    </section>
  );
}
