const STEPS = [
  { t: "Запитване", d: "През оценителя, за около 2 минути. Без ангажимент.", m: "2 мин" },
  { t: "Оценка на цена и срок", d: "Изпращаме ти я лично до 24 часа в работни дни.", m: "до 24 ч" },
  { t: "Разговор и фиксирана оферта", d: "Уточняваме детайлите и получаваш оферта, която не се променя по пътя.", m: "30 мин" },
  { t: "Прототип", d: "Виждаш и кликаш дизайна, преди да напишем ред код.", m: "дизайн" },
  { t: "Разработка с тестов линк", d: "Следиш напредъка на живо, а не чакаш до края.", m: "на живо" },
  { t: "Старт, обучение и поддръжка", d: "Пускаме, обучаваме те и оставаме наблизо.", m: "и после" },
];

export function Process() {
  return (
    <section className="process" id="proces" aria-labelledby="proc-title">
      <div className="wrap proc-grid">
        <div className="proc-head">
          <p className="kicker" data-reveal>04 — Как работим</p>
          <h2 id="proc-title" className="h2" data-reveal>
            Ясен процес, <span className="muted">без изненади.</span>
          </h2>
          <p className="sec-lede" data-reveal>
            Срокът, цената и кой отговаря за какво са ясни от първия ден.
          </p>
        </div>
        <div className="steps" data-steps>
          <div className="steps-line" aria-hidden="true"><span /></div>
          <ol>
          {STEPS.map((s, i) => (
            <li key={s.t} className="step" data-step>
              <span className="step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="step-b">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
              <span className="step-m">{s.m}</span>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
