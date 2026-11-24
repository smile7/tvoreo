"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { sendLead } from "@/lib/lead";

type Opt = { v: string; l: string; d?: string; i?: string };

const TYPES: Opt[] = [
  { v: "landing", l: "Лендинг страница", d: "Една страница за кампания, събитие или продукт", i: "M4 5h16v14H4zM4 9h16" },
  { v: "site", l: "Фирмен сайт по поръчка", d: "Няколко раздела, CMS, SEO основа", i: "M3 5h18v14H3zM3 9h18M8 13h8M8 16h5" },
  { v: "shop", l: "Онлайн магазин", d: "Каталог, количка, плащане, доставка", i: "M3 4h2l2.4 11h11L21 7H6.2M9 20h.01M17 20h.01" },
  { v: "webapp", l: "Уеб приложение / платформа", d: "Вход, профили, табла, резервации", i: "M3 4h18v16H3zM8 4v16M11 9h7M11 13h5" },
  { v: "mobile", l: "Мобилно приложение", d: "iOS и Android", i: "M7 2h10v20H7zM11 18h2" },
  { v: "qr", l: "QR меню / поръчка за заведение", d: "Меню, поръчка и плащане от масата", i: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM18 18h3v3h-3z" },
  { v: "other", l: "Нещо друго", d: "Музей, система, интеграция, идея", i: "M8 6 2 12l6 6M16 6l6 6-6 6" },
];
const SIZES: Opt[] = [
  { v: "s", l: "Малък", d: "Няколко екрана. Напр. лендинг, сайт-визитка, QR меню." },
  { v: "m", l: "Среден", d: "Няколко раздела, CMS, двуезичност. Напр. фирмен сайт или магазин." },
  { v: "l", l: "Голям / сложен", d: "Профили, плащания, интеграции, админ панел. Напр. платформа." },
];
const FEATURES: Opt[] = [
  { v: "multi", l: "Два и повече езика" },
  { v: "login", l: "Вход и профили" },
  { v: "pay", l: "Онлайн плащания" },
  { v: "integr", l: "Интеграции (склад, CRM, куриери)" },
  { v: "cms", l: "Сам редактирам съдържанието (CMS)" },
  { v: "booking", l: "Резервации / календар" },
  { v: "unsure", l: "Още не знам, искам съвет" },
];
const WHENS: Opt[] = [
  { v: "asap", l: "Възможно най-скоро" },
  { v: "q", l: "До 3 месеца" },
  { v: "half", l: "До 6 месеца" },
  { v: "flex", l: "Гъвкаво, проучвам" },
];
const BUDGETS: Opt[] = [
  { v: "b1", l: "€300 – €1 000" },
  { v: "b2", l: "€1 000 – €3 000" },
  { v: "b3", l: "€3 000 – €10 000" },
  { v: "b4", l: "€10 000+", d: "по-голям проект" },
  { v: "unknown", l: "Още не знам" },
];

const STEP_TITLES = ["Какво искаш да създадем?", "Колко голям е проектът?", "Какво трябва да може?", "Кога трябва да е готово?", "Какъв бюджет предвиждаш?", "Как да се свържем с теб?"];
const SHORT = ["Тип", "Обхват", "Функции", "Срок", "Бюджет", "Контакт"];

const label = (list: Opt[], v: string) => list.find((o) => o.v === v)?.l ?? "";

export function Estimator() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [feats, setFeats] = useState<string[]>([]);
  const [when, setWhen] = useState("");
  const [budget, setBudget] = useState("");
  const [tier, setTier] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [site, setSite] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [delivered, setDelivered] = useState(true);
  const [sendErr, setSendErr] = useState("");
  const [hp, setHp] = useState("");
  const titleRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  // Бутоните „Започни проект“, плочките и форматите отварят оценителя с вече избран отговор.
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ type?: string; tier?: string }>).detail || {};
      if (status === "done") return;
      if (d.tier) {
        setTier(d.tier);
        setSize(d.tier === "start" ? "s" : d.tier === "business" ? "m" : "l");
        if (d.tier === "business") setType((t) => t || "site");
        if (d.tier === "product") setType((t) => t || "webapp");
        setStep(d.tier === "start" ? 0 : 2);
      } else if (d.type) {
        setType(d.type);
        setStep(1);
      }
    };
    window.addEventListener("tvoreo:estimate", on);
    return () => window.removeEventListener("tvoreo:estimate", on);
  }, [status]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    titleRef.current?.focus({ preventScroll: true });
  }, [step, status]);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const pick = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    window.setTimeout(next, 260);
  };
  const toggleFeat = (v: string) =>
    setFeats((f) => (v === "unsure" ? (f.includes("unsure") ? [] : ["unsure"]) : f.includes(v) ? f.filter((x) => x !== v) : [...f.filter((x) => x !== "unsure"), v]));

  const canNext = [!!type, !!size, true, !!when, !!budget, true][step];

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (name.trim().length < 2) err.name = "Напиши името си.";
    const c = contact.trim();
    const isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
    const isPhone = (c.match(/\d/g) || []).length >= 7;
    if (!isMail && !isPhone) err.contact = "Въведи имейл или телефон, на който да ти отговорим.";
    if (!consent) err.consent = "Нужно е съгласието ти, за да ти отговорим.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("sending");
    setSendErr("");
    const r = await sendLead({ source: "estimator", type, size, feats, when, budget, tier, name, contact, site, note, company: hp });
    if (!r.ok) {
      setStatus("idle");
      setSendErr(r.error || "Нещо се обърка. Опитай пак.");
      return;
    }
    setDelivered(r.delivered !== false);
    setStatus("done");
  };

  const reset = () => {
    setStep(0); setType(""); setSize(""); setFeats([]); setWhen(""); setBudget(""); setTier("");
    setName(""); setContact(""); setSite(""); setNote(""); setConsent(false); setErrors({}); setSendErr(""); setStatus("idle");
  };

  const summary = [
    label(TYPES, type),
    label(SIZES, size),
    feats.length ? feats.map((f) => label(FEATURES, f)).join(", ") : step > 2 ? "Без допълнителни" : "",
    label(WHENS, when),
    label(BUDGETS, budget),
    name ? name : "",
  ];

  const Radio = ({ list, value, onPick, name: n, cols = 2, big = false }: { list: Opt[]; value: string; onPick: (v: string) => void; name: string; cols?: number; big?: boolean }) => (
    <div className={`opts opts-${cols} ${big ? "opts-big" : ""}`}>
      {list.map((o) => (
        <label key={o.v} className="opt" data-on={value === o.v}>
          <input type="radio" name={n} value={o.v} checked={value === o.v} onChange={() => onPick(o.v)} />
          {o.i && (
            <svg className="opt-i" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
              <path d={o.i} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          )}
          <span className="opt-l">{o.l}</span>
          {o.d && <span className="opt-d">{o.d}</span>}
          <span className="opt-check" aria-hidden="true" />
        </label>
      ))}
    </div>
  );

  return (
    <section className="est" id="ocenka" aria-labelledby="est-title">
      <div className="wrap est-grid">
        <div className="est-l">
          <p className="kicker kicker-d" data-reveal>05 — Оценител</p>
          <h2 id="est-title" className="h2" data-reveal>
            Колко ще струва <span className="accent-d">моят проект?</span>
          </h2>
          <p className="sec-lede" data-reveal>
            Отговори на няколко кратки въпроса и до 24 часа ще ти изпратим оценка на цена и срок. Безплатно и без
            ангажимент.
          </p>
          <div className="est-sum" aria-live="polite" data-reveal>
            <p className="est-sum-h">Твоето запитване</p>
            <ol>
              {SHORT.map((s, i) => (
                <li key={s} data-done={!!summary[i] || (status === "done")} data-cur={status !== "done" && step === i}>
                  <span className="es-k">{s}</span>
                  <span className="es-v">{summary[i] || "—"}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="est-card" data-reveal>
          {status === "done" ? (
            <div className="est-done" role="status">
              <svg className="done-mark" viewBox="-124 -124 248 248" aria-hidden="true">
                <path className="dm-l" d="M-36.12 -49.88 L-86 0 L-36.12 49.88" />
                <path className="dm-r" d="M36.12 -49.88 L86 0 L36.12 49.88" />
                <path className="dm-c" d="M-30 2 L-8 24 L34 -22" pathLength="1" />
              </svg>
              <h3 ref={titleRef} tabIndex={-1}>Получихме запитването ти.</h3>
              <p>До 24 часа в работни дни ще ти изпратим оценка на цена и срок.</p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#kontakt" data-magnetic>Запази разговор още сега</a>
                <button className="btn btn-ghost-d" onClick={reset}>Ново запитване</button>
              </div>
              {!delivered && <p className="proto-note">Демо режим: доставката на запитвания още не е настроена, затова нищо не е изпратено.</p>}
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="est-top">
                <p className="est-count">
                  Стъпка <b>{step + 1}</b> от 6
                </p>
                <div className="est-bar" aria-hidden="true">
                  {SHORT.map((s, i) => (
                    <span key={s} data-on={i <= step} />
                  ))}
                </div>
              </div>

              <fieldset className="est-step" key={step}>
                <legend className="sr-only">{STEP_TITLES[step]}</legend>
                <h3 className="est-q" ref={titleRef} tabIndex={-1}>
                  {STEP_TITLES[step]}
                </h3>

                {step === 0 && Radio({ list: TYPES, value: type, onPick: pick(setType), name: "type", big: true })}
                {step === 1 && Radio({ list: SIZES, value: size, onPick: pick(setSize), name: "size", cols: 1 })}
                {step === 2 && (
                  <div className="chips">
                    {FEATURES.map((f) => (
                      <label key={f.v} className="chip" data-on={feats.includes(f.v)}>
                        <input type="checkbox" checked={feats.includes(f.v)} onChange={() => toggleFeat(f.v)} />
                        <span className="chip-box" aria-hidden="true" />
                        {f.l}
                      </label>
                    ))}
                  </div>
                )}
                {step === 3 && Radio({ list: WHENS, value: when, onPick: pick(setWhen), name: "when" })}
                {step === 4 && (
                  <>
                    {Radio({ list: BUDGETS, value: budget, onPick: pick(setBudget), name: "budget" })}
                    <p className="est-hint">Това е твоят ориентир, не наша цена. Помага ни да предложим правилния обхват.</p>
                  </>
                )}
                {step === 5 && (
                  <div className="fields">
                    <div className="field">
                      <label htmlFor="f-name">Име *</label>
                      <input id="f-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
                      {errors.name && <p className="err" id="e-name">{errors.name}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-contact">Имейл или телефон *</label>
                      <input id="f-contact" autoComplete="email" value={contact} onChange={(e) => setContact(e.target.value)} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "e-contact" : undefined} />
                      {errors.contact && <p className="err" id="e-contact">{errors.contact}</p>}
                    </div>
                    <div className="field field-w">
                      <label htmlFor="f-site">Линк към текущия ти сайт <span className="opt-mark">по желание</span></label>
                      <input id="f-site" type="url" inputMode="url" placeholder="https://" value={site} onChange={(e) => setSite(e.target.value)} />
                    </div>
                    <div className="field field-w">
                      <label htmlFor="f-note">Разкажи накратко <span className="opt-mark">по желание</span></label>
                      <textarea id="f-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <label className="consent field-w" data-on={consent}>
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent} />
                      <span className="chip-box" aria-hidden="true" />
                      <span>Съгласен/на съм данните ми да се използват само за отговор на това запитване.</span>
                    </label>
                    {errors.consent && <p className="err field-w">{errors.consent}</p>}
                    <div className="hp" aria-hidden="true">
                      <label htmlFor="f-company">Фирма</label>
                      <input id="f-company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>
                    {sendErr && <p className="err field-w" role="alert">{sendErr}</p>}
                  </div>
                )}
              </fieldset>

              <div className="est-nav">
                <button type="button" className="btn-text" onClick={back} disabled={step === 0}>
                  ← Назад
                </button>
                {step < 5 ? (
                  <button type="button" className="btn btn-primary" onClick={next} disabled={!canNext}>
                    {step === 2 && feats.length === 0 ? "Пропусни" : "Напред"} →
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled={status === "sending"} data-magnetic>
                    {status === "sending" ? <span className="spin" aria-label="Изпращане" /> : "Изпрати запитването"}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
