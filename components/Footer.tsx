const SERVICES = ["Изработка на сайт", "Онлайн магазин", "Уеб приложения", "Мобилни приложения", "QR меню за заведение", "Музеи и туризъм"];

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/tvoreo-logo-titlecase-tick-lat-white.svg" alt="Tvoreo" width="159" height="57" loading="lazy" />
          <p>Творим софтуер по мярка.</p>
        </div>
        <nav aria-label="Услуги">
          <p className="foot-h">Услуги</p>
          <ul>{SERVICES.map((s) => <li key={s}><a href="#uslugi">{s}</a></li>)}</ul>
        </nav>
        <nav aria-label="Студио">
          <p className="foot-h">Студио</p>
          <ul>
            <li><a href="#proekti">Проекти</a></li>
            <li><a href="#proces">Как работим</a></li>
            <li><a href="#ekip">За нас</a></li>
            <li><a href="#ocenka">Оценител</a></li>
          </ul>
        </nav>
        <div>
          <p className="foot-h">Фирма</p>
          <address>
            <span className="ph-inline">[Име на фирмата]</span> · ЕИК <span className="ph-inline">[…]</span>
            <br />
            <span className="ph-inline">[Адрес]</span>, Русе, България
            <br />
            <span className="ph-inline">[Телефон]</span>
          </address>
          <p className="foot-social">
            <span className="ph-inline">[LinkedIn]</span> <span className="ph-inline">[GitHub]</span> <span className="ph-inline">[Clutch]</span> <span className="ph-inline">[Google]</span>
          </p>
        </div>
      </div>
      <div className="foot-giant" aria-hidden="true">Tvoreo</div>
      <div className="wrap foot-bottom">
        <p>© 2026 Tvoreo · Софтуерно студио · Русе</p>
        <p>
          <span className="ph-inline">[Поверителност]</span> · <span className="ph-inline">[Бисквитки]</span>
        </p>
        <p className="foot-made">Направено с код, не с шаблон. Отвори конзолата ;)</p>
      </div>
    </footer>
  );
}
