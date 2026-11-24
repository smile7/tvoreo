type Tile = { id: string; type: string; title: string; text: string; cls: string; ui: React.ReactNode };

const Arrow = () => (
  <svg className="tile-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TILES: Tile[] = [
  {
    id: "web",
    type: "site",
    title: "Уебсайтове по поръчка",
    text: "Бързи, красиви и твои. Проектирани около клиентите ти, не около шаблон.",
    cls: "t-web",
    ui: (
      <div className="ui-browser">
        <div className="ub-bar"><i /><i /><i /><span>tvoeto-ime.bg</span></div>
        <div className="ub-body">
          <div className="ub-hero"><b /><b /><em /></div>
          <div className="ub-grid"><s /><s /><s /></div>
        </div>
        <div className="ub-cursor" />
      </div>
    ),
  },
  {
    id: "shop",
    type: "shop",
    title: "Онлайн магазини",
    text: "От продукта до плащането, без триене.",
    cls: "t-shop",
    ui: (
      <div className="ui-shop">
        <div className="us-card"><div className="us-img" /><b /><em>Добави</em></div>
        <div className="us-cart"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 4h2l2.4 11h11L21 7H6.2" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="9" cy="19.5" r="1.5" fill="currentColor"/><circle cx="17" cy="19.5" r="1.5" fill="currentColor"/></svg><span className="us-n"><i>1</i><i>2</i></span></div>
        <div className="us-fly" />
      </div>
    ),
  },
  {
    id: "app",
    type: "webapp",
    title: "Уеб приложения",
    text: "Вход, профили, резервации, табла. Платформи, които растат с бизнеса.",
    cls: "t-app",
    ui: (
      <div className="ui-dash">
        <div className="ud-side"><i /><i /><i /><i /></div>
        <div className="ud-main">
          <div className="ud-kpi"><b /><b /><b /></div>
          <div className="ud-bars">{[42, 68, 51, 84, 60, 92, 74].map((h, i) => <s key={i} style={{ ["--h" as string]: `${h}%`, ["--i" as string]: i }} />)}</div>
        </div>
      </div>
    ),
  },
  {
    id: "mobile",
    type: "mobile",
    title: "Мобилни приложения",
    text: "iOS и Android от един код.",
    cls: "t-mobile",
    ui: (
      <div className="ui-phone">
        <div className="up-notch" />
        <div className="up-list">{[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="up-row"><i /><b /></div>)}</div>
      </div>
    ),
  },
  {
    id: "qr",
    type: "qr",
    title: "Заведения и QR",
    text: "QR меню, поръчка и плащане от масата.",
    cls: "t-qr",
    ui: (
      <div className="ui-qr">
        <div className="uq-code">
          {Array.from({ length: 49 }).map((_, i) => {
            const r = Math.floor(i / 7), c = i % 7;
            const finder = (r < 2 && c < 2) || (r < 2 && c > 4) || (r > 4 && c < 2);
            const on = finder || [3, 9, 10, 17, 19, 23, 24, 25, 29, 31, 33, 38, 39, 44, 46, 48].includes(i);
            return <i key={i} className={on ? "on" : ""} />;
          })}
        </div>
        <div className="uq-scan" />
      </div>
    ),
  },
  {
    id: "museum",
    type: "other",
    title: "Музеи и туризъм",
    text: "Дигитални гидове, аудио, карти и офлайн режим.",
    cls: "t-museum",
    ui: (
      <div className="ui-museum">
        <svg className="um-map" viewBox="0 0 200 120" aria-hidden="true">
          <path d="M10 90 C 50 40, 80 110, 120 60 S 180 30, 192 20" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" />
          <circle cx="120" cy="60" r="5" />
        </svg>
        <div className="um-wave">{Array.from({ length: 18 }).map((_, i) => <s key={i} style={{ ["--i" as string]: i }} />)}</div>
      </div>
    ),
  },
];

export function Services() {
  return (
    <section className="services" id="uslugi" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="sec-head sec-head-split">
          <p className="kicker" data-reveal>01 — Какво правим</p>
          <h2 id="svc-title" className="h2" data-reveal>
            Всичко дигитално, <span className="muted">от една ръка.</span>
          </h2>
          <p className="sec-lede" data-reveal>
            От лендинг за една седмица до платформа с хиляди потребители. Когато проектът изисква друг
            специалист, ние го привличаме, а ти имаш един отговорен контакт.
          </p>
        </div>

        <ul className="bento">
          {TILES.map((t) => (
            <li key={t.id} className={`tile ${t.cls}`} data-spot data-reveal>
              <a href="#ocenka" data-estimate={t.type} data-cursor="Оцени">
                <div className="tile-ui" aria-hidden="true">{t.ui}</div>
                <div className="tile-txt">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
                <Arrow />
              </a>
            </li>
          ))}
          <li className="tile t-other" data-spot data-reveal>
            <a href="#ocenka" data-estimate="other" data-cursor="Разкажи">
              <div className="tile-q" aria-hidden="true">
                <span className="q-l">‹</span>
                <span className="q-m">?</span>
                <span className="q-r">›</span>
              </div>
              <div className="tile-txt">
                <h3>Нещо друго?</h3>
                <p>Разкажи ни идеята. Ако може да се програмира, ще намерим начин.</p>
              </div>
              <Arrow />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
