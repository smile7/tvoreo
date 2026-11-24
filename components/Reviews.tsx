export function Reviews() {
  return (
    <section className="reviews" aria-labelledby="rev-title">
      <div className="wrap">
        <div className="sec-head sec-head-row">
          <div>
            <p className="kicker" data-reveal>08 — Отзиви</p>
            <h2 id="rev-title" className="h2" data-reveal>
              Какво казват <span className="muted">клиентите.</span>
            </h2>
          </div>
          <div className="rev-badges" data-reveal>
            <span className="badge-ph">Google рейтинг <span className="ph-inline">[след профила]</span></span>
            <span className="badge-ph">Clutch <span className="ph-inline">[по-късно]</span></span>
          </div>
        </div>
        <div className="rev-grid">
          {[1, 2, 3].map((n) => (
            <figure key={n} className="rev" data-reveal style={{ ["--i" as string]: n }}>
              <span className="rev-q" aria-hidden="true">“</span>
              <blockquote>
                <p className="ph-text">[Реален отзив №{n} от клиент. Публикуваме само истински отзиви, с разрешение.]</p>
              </blockquote>
              <figcaption>
                <span className="rev-av" aria-hidden="true" />
                <span>
                  <b className="ph-text">[Име и роля]</b>
                  <small className="ph-text">[или инициали и сектор]</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
