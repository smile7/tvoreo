import { DesignCode } from "./DesignCode";
import { Mark, MarkBlueprint } from "./Mark";
import { CodeLines } from "@/lib/highlight";
import { PerfValue } from "./PerfValue";

const HERO_TSX = `
// app/(home)/hero.tsx · Tvoreo
import { Mark } from "@/components/mark";
import { LoadBadge } from "@/components/load-badge";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow">Софтуерно студио · Русе, България</p>

      <h1 id="hero-title">
        Творим софтуер
        <em className="accent">по мярка.</em>
      </h1>

      <p className="lede">Дизайн, който продава. Код, който издържа.</p>
      <p className="sub">
        Без шаблони и без WordPress: чист код, премиум UX
        и скорост, която се усеща.
      </p>

      <nav className="cta" aria-label="Основни действия">
        <Button href="#ocenka" magnetic>Започни проект</Button>
        <Button href="#proekti" variant="ghost">Виж проектите</Button>
      </nav>

      <Mark brackets="follow-cursor" open="on-scroll" />
      <LoadBadge source="PerformanceNavigationTiming" />
    </section>
  );
}
`;

export function Hero() {
  const design = (
    <div className="hero-inner">
      <div className="eyebrow">
        <p>Софтуерно студио · Русе, България</p>
        <p className="live-pill">
          <span className="dot" aria-hidden="true" /> Тази страница зареди за <PerfValue field="load" /> ms
        </p>
      </div>
      <h1 id="hero-title" className="hero-title">
        <span className="w" style={{ ["--i" as string]: 0 }}>Творим</span>{" "}
        <span className="w" style={{ ["--i" as string]: 1 }}>софтуер</span>{" "}
        <span className="w accent" style={{ ["--i" as string]: 2 }}>
          по&nbsp;мярка<span className="caret" aria-hidden="true">.</span>
        </span>
      </h1>
      <div className="hero-copy">
        <p className="lede">Дизайн, който продава. Код, който издържа.</p>
        <p className="sub">
          Tvoreo проектира и програмира уебсайтове, приложения, онлайн магазини и QR системи за бизнеси в
          България и Европа. Без шаблони и без WordPress: чист код, премиум UX и скорост, която се усеща.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#ocenka" data-magnetic data-estimate="">
            <span>Започни проект</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
          </a>
          <a className="btn btn-ghost" href="#proekti" data-magnetic>
            Виж проектите
          </a>
        </div>
        <ul className="hero-proof" aria-label="Нашите обещания">
          <li>Оценка до 24 часа</li>
          <li>Фиксирана оферта</li>
          <li>Кодът е твой</li>
        </ul>
      </div>
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-glow" />
        <Mark />
      </div>
    </div>
  );

  const code = (
    <div className="hero-code">
      <div className="ed-tabs">
        <span className="on">hero.tsx</span>
        <span>hero.css</span>
        <span>mark.svg</span>
      </div>
      <div className="ed-a">
        <CodeLines code={HERO_TSX} />
      </div>
      <div className="hero-stage">
        <MarkBlueprint />
      </div>
      <div className="ed-term">
        <span className="c-com">$</span> performance.getEntriesByType(&quot;navigation&quot;)
        <br />
        <span className="ok">✓</span> loadEventEnd: <PerfValue field="load" /> ms · TTFB <PerfValue field="ttfb" /> ms
      </div>
    </div>
  );

  return (
    <section className="hero" data-hero aria-labelledby="hero-title">
      <DesignCode design={design} code={code} />
    </section>
  );
}
