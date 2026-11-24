"use client";
import { useEffect, useState } from "react";
import { onPerf, type PerfSnapshot } from "@/lib/perf";

/* Значок на живо: „Тази страница зареди за X ms“, измерено от браузъра. */
export function LoadBadge() {
  const [p, setP] = useState<PerfSnapshot | null>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    onPerf(setP);
    const targets = ["[data-hero]", "#ocenka", "#kontakt", "footer"].map((s) => document.querySelector(s)).filter(Boolean) as Element[];
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
        setHidden(seen.size > 0);
      },
      { threshold: 0.05 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  if (!p) return null;
  return (
    <div className="load-badge" data-open={open} data-hidden={hidden}>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="lb-more" data-cursor="Детайли">
        <span className="dot" aria-hidden="true" />
        <span className="lb-txt">
          Тази страница зареди за <b>{p.load} ms</b>
        </span>
      </button>
      <div id="lb-more" className="lb-more" hidden={!open}>
        <dl>
          <div><dt>Първи байт</dt><dd>{p.ttfb} ms</dd></div>
          <div><dt>DOM готов</dt><dd>{p.dom} ms</dd></div>
          <div><dt>Изтеглени</dt><dd>{p.cached ? "от кеша" : `${p.kb} KB`}</dd></div>
          <div><dt>Заявки</dt><dd>{p.requests}</dd></div>
        </dl>
        <p>Измерено от твоя браузър чрез Navigation Timing API.</p>
      </div>
    </div>
  );
}
