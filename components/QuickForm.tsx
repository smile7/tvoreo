"use client";
import { useState, type FormEvent } from "react";
import { sendLead } from "@/lib/lead";

export function QuickForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [err, setErr] = useState<string>("");
  const [delivered, setDelivered] = useState(true);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const contact = String(fd.get("contact") || "").trim();
    const what = String(fd.get("what") || "").trim();
    if (!name || !contact || !what) {
      setErr("Попълни трите полета, за да ти отговорим.");
      return;
    }
    setErr("");
    setState("sending");
    const r = await sendLead({ source: "quick", name, contact, note: what, company: String(fd.get("company") || "") });
    if (!r.ok) {
      setState("idle");
      setErr(r.error || "Нещо се обърка. Опитай пак.");
      return;
    }
    setDelivered(r.delivered !== false);
    setState("done");
  };

  if (state === "done")
    return (
      <div className="qf-done" role="status">
        <svg viewBox="-124 -124 248 248" className="done-mark sm" aria-hidden="true">
          <path className="dm-l" d="M-36.12 -49.88 L-86 0 L-36.12 49.88" />
          <path className="dm-r" d="M36.12 -49.88 L86 0 L36.12 49.88" />
          <path className="dm-c" d="M-30 2 L-8 24 L34 -22" pathLength="1" />
        </svg>
        <p><b>Благодарим!</b> Отговаряме лично до 24 часа в работни дни.</p>
        {!delivered && <p className="proto-note">Демо режим: доставката още не е настроена, нищо не е изпратено.</p>}
      </div>
    );

  return (
    <form className="qf" onSubmit={submit} noValidate aria-describedby={err ? "qf-err" : undefined}>
      <div className="field">
        <label htmlFor="q-name">Име</label>
        <input id="q-name" name="name" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="q-contact">Имейл или телефон</label>
        <input id="q-contact" name="contact" autoComplete="email" />
      </div>
      <div className="field field-w">
        <label htmlFor="q-what">Какво искаш да създадем?</label>
        <textarea id="q-what" name="what" rows={3} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="q-company">Фирма</label>
        <input id="q-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      {err && <p className="err field-w" id="qf-err" role="alert">{err}</p>}
      <button className="btn btn-light field-w" type="submit" disabled={state === "sending"} data-magnetic>
        {state === "sending" ? <span className="spin" aria-label="Изпращане" /> : "Изпрати"}
      </button>
    </form>
  );
}
