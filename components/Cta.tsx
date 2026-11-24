import { QuickForm } from "./QuickForm";

export function Cta() {
  return (
    <section className="cta-final" id="kontakt" aria-labelledby="cta-title">
      <div className="wrap cta-grid">
        <div className="cta-l">
          <p className="kicker kicker-d" data-reveal>10 — Контакт</p>
          <h2 id="cta-title" className="h-xl" data-reveal>
            Имаш идея? <span className="accent-d">Да я направим истинска.</span>
          </h2>
          <p className="sec-lede" data-reveal>Разкажи ни накратко. Отговаряме лично до 24 часа в работни дни.</p>
          <a className="btn btn-xl" href="#ocenka" data-magnetic data-estimate="" data-reveal>
            <span>Започни проект</span>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </a>
          <ul className="contacts" data-reveal>
            <li><span>Разговор</span><a href="#kontakt">Запази 30 минути <span className="ph-inline">[Cal.com]</span></a></li>
            <li><span>Телефон</span><span className="ph-inline">[+359 …]</span></li>
            <li><span>Имейл</span><span className="ph-inline">[hello@tvoreo.com]</span></li>
            <li><span>Viber / WhatsApp</span><span className="ph-inline">[номер]</span></li>
          </ul>
        </div>
        <div className="cta-r" data-reveal>
          <p className="qf-h">За бързащите</p>
          <QuickForm />
        </div>
      </div>
    </section>
  );
}
