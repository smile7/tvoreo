import { Mark } from "./Mark";

export function Team() {
  return (
    <section className="team" id="ekip" aria-labelledby="team-title">
      <div className="wrap team-grid">
        <figure className="portrait" data-reveal>
          <div className="portrait-ph">
            <Mark />
            <span>[Портрет на основателката]</span>
            <small>Снимка от фотосесия · за попълване</small>
          </div>
          <figcaption>
            <b>Силвена Митева</b>
            <span>Основател · програмист и предприемач</span>
          </figcaption>
        </figure>
        <div className="team-copy">
          <p className="kicker" data-reveal>07 — Екипът</p>
          <h2 id="team-title" className="h2" data-reveal>
            Говориш директно <span className="muted">с хората, които пишат кода.</span>
          </h2>
          <p className="team-text" data-reveal>
            Tvoreo е основано от Силвена Митева, програмист и предприемач от Русе. От{" "}
            <span className="ph-inline">[X]</span> години създаваме уебсайтове и софтуер, от{" "}
            <span className="ph-inline">[пример]</span> до All4Ruse, платформата за събитията в града.
          </p>
          <p className="team-text" data-reveal>
            Вярваме, че добрият софтуер се вижда в детайла: как зарежда, как се чете и как кара човек да натисне
            „Поръчай“. За по-големите проекти работим с доказани специалисти, но ти винаги имаш един контакт.
          </p>
          <ul className="team-links" data-reveal>
            <li><a href="#ekip" className="link-arrow">GitHub <span className="ph-inline">[линк]</span></a></li>
            <li><a href="#ekip" className="link-arrow">LinkedIn <span className="ph-inline">[линк]</span></a></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
