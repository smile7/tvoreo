import { PerfValue } from "./PerfValue";

const MARQUEE = [
  "Без шаблони",
  "Без WordPress",
  "Next.js · TypeScript",
  "iOS и Android",
  "Оценка до 24 часа",
  "Фиксирана оферта",
  "Кодът е твой",
  "Русе → България → Европа",
];

export function Proof() {
  return (
    <section className="proof" aria-label="Доказателства">
      <div className="marquee" data-cursor="">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <ul key={k} aria-hidden={k === 1 ? true : undefined}>
              {MARQUEE.map((m) => (
                <li key={m}>
                  <svg viewBox="-90 -60 180 120" width="22" height="15" aria-hidden="true">
                    <path d="M-36 -50 L-86 0 L-36 50 M36 -50 L86 0 L36 50" fill="none" stroke="currentColor" strokeWidth="14" />
                  </svg>
                  {m}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="wrap stats">
        <div className="stat" data-reveal>
          <p className="stat-v">
            <span className="ph-inline">[N]</span>
          </p>
          <p className="stat-l">години опит</p>
          <span className="ph-tag">за попълване</span>
        </div>
        <div className="stat" data-reveal>
          <p className="stat-v">
            <span className="ph-inline">[N]</span>
          </p>
          <p className="stat-l">пуснати проекта</p>
          <span className="ph-tag">за попълване</span>
        </div>
        <div className="stat stat-live" data-reveal>
          <p className="stat-v">
            <PerfValue field="load" />
            <small>ms</small>
          </p>
          <p className="stat-l">зареждане на тази страница, измерено току-що във твоя браузър</p>
          <span className="live-tag"><span className="dot" aria-hidden="true" /> на живо</span>
        </div>
        <div className="stat" data-reveal>
          <p className="stat-v">
            <span className="ph-inline">[цифра]</span>
          </p>
          <p className="stat-l">реален резултат от All4Ruse</p>
          <span className="ph-tag">за попълване</span>
        </div>
      </div>
    </section>
  );
}
