"use client";
import { useEffect, useState } from "react";
import { onPerf, type PerfSnapshot } from "@/lib/perf";

const ROWS: { k: string; tpl: string; tv: string }[] = [
  { k: "Вид", tpl: "Темата, която ползват и хиляди други сайтове", tv: "Проектиран само за твоя бизнес и клиенти" },
  { k: "Скорост", tpl: "Тема и плъгини зареждат код, който не ти трябва", tv: "Само кодът, който страницата реално използва" },
  { k: "Сигурност", tpl: "Зависи от редовните обновления на плъгините", tv: "Без плъгини: по-малко врати за пробив" },
  { k: "Развитие", tpl: "Ограничено от възможностите на темата", tv: "Прераства в магазин, приложение или платформа" },
  { k: "Собственост", tpl: "Лицензи и абонаменти за теми и плъгини", tv: "Кодът и акаунтите са на твое име" },
];

export function WhyCode() {
  const [mode, setMode] = useState<"tpl" | "tv">("tv");
  const [p, setP] = useState<PerfSnapshot | null>(null);
  const [cls, setCls] = useState(0);

  useEffect(() => {
    onPerf(setP);
    let total = 0;
    try {
      const po = new PerformanceObserver((list) => {
        for (const e of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
          if (!e.hadRecentInput) total += e.value;
        }
        setCls(total);
      });
      po.observe({ type: "layout-shift", buffered: true });
      return () => po.disconnect();
    } catch {
      /* браузърът не поддържа layout-shift */
    }
  }, []);

  const metrics = [
    { l: "Пълно зареждане", v: p ? `${p.load}` : "…", u: "ms" },
    { l: "Първи байт (TTFB)", v: p ? `${p.ttfb}` : "…", u: "ms" },
    { l: "Изтеглени данни", v: p ? (p.cached ? "кеш" : `${p.kb}`) : "…", u: p && !p.cached ? "KB" : "" },
    { l: "Заявки", v: p ? `${p.requests}` : "…", u: "" },
    { l: "Подскачане (CLS)", v: cls.toFixed(3), u: "" },
  ];

  return (
    <section className="why" aria-labelledby="why-title">
      <div className="wrap why-grid">
        <div className="why-l">
          <p className="kicker" data-reveal>03 — Код срещу шаблон</p>
          <h2 id="why-title" className="h2" data-reveal>
            Защо код, <span className="muted">а не шаблон?</span>
          </h2>
          <p className="sec-lede" data-reveal>
            Шаблонът е добро начало. Когато бизнесът ти иска повече (скорост, уникален вид, функции по мярка и сигурност без постоянни
            плъгини), идва ред на кода. Правим сайтове, които зареждат мигновено, класират се по-добре и растат
            заедно с теб.
          </p>

          <div className="seg" role="radiogroup" aria-label="Сравнение" data-reveal>
            <button role="radio" aria-checked={mode === "tpl"} onClick={() => setMode("tpl")}>
              Типичен шаблонен сайт
            </button>
            <button role="radio" aria-checked={mode === "tv"} onClick={() => setMode("tv")}>
              Tvoreo
            </button>
            <span className="seg-pill" data-pos={mode} aria-hidden="true" />
          </div>

          <dl className="cmp" data-mode={mode} key={mode} aria-live="polite">
            {ROWS.map((r, i) => (
              <div key={r.k} className="cmp-row" style={{ ["--i" as string]: i }}>
                <dt>{r.k}</dt>
                <dd>
                  <span className="cmp-icon" aria-hidden="true">{mode === "tv" ? "✓" : "—"}</span>
                  {mode === "tv" ? r.tv : r.tpl}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="lab" aria-label="Измерено на тази страница" data-reveal>
          <div className="lab-head">
            <span className="live-tag"><span className="dot" aria-hidden="true" /> на живо</span>
            <span className="lab-src">PerformanceNavigationTiming</span>
          </div>
          <p className="lab-title">Измерено на тази страница, току-що, в твоя браузър.</p>
          <ul className="lab-list">
            {metrics.map((m) => (
              <li key={m.l}>
                <span>{m.l}</span>
                <b>
                  {m.v}
                  {m.u && <small> {m.u}</small>}
                </b>
              </li>
            ))}
          </ul>
          <p className="lab-note">
            Не са рекламни цифри: идват директно от браузъра ти. Презареди страницата и ще видиш нови.
          </p>
        </aside>
      </div>
    </section>
  );
}
