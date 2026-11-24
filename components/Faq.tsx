import { FAQ } from "@/lib/faq";

function withPh(text: string) {
  return text.split(/(\[[^\]]+\])/).map((p, i) => (p.startsWith("[") ? <span key={i} className="ph-inline">{p}</span> : p));
}

export function Faq() {
  return (
    <section className="faq" id="vaprosi" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <p className="kicker" data-reveal>09 — Въпроси</p>
          <h2 id="faq-title" className="h2" data-reveal>
            Често задавани <span className="muted">въпроси.</span>
          </h2>
          <p className="sec-lede" data-reveal>Не намираш отговора? Пиши ни, отговаряме лично.</p>
        </div>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <details key={f.q} className="qa" name="faq" data-reveal open={i === 0}>
              <summary>
                <span className="qa-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="qa-q">{f.q}</span>
                <span className="qa-x" aria-hidden="true" />
              </summary>
              <div className="qa-a">
                <p>{withPh(f.a)}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
