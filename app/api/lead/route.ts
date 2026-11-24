import { NextResponse } from "next/server";

// Приема запитвания от оценителя и кратката форма.
// Доставка (нужна е настройка в Vercel → Environment Variables):
//   RESEND_API_KEY + LEAD_TO (+ LEAD_FROM)  → имейл до екипа през Resend
//   LEAD_WEBHOOK_URL                         → JSON към webhook (Slack, Make, Zapier, CRM)
// Без настройка запитването НЕ се доставя никъде и отговорът е delivered: false.

type Body = Record<string, unknown>;
const s = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Вътрешен етикет само за екипа, не се показва на клиента.
function tag(b: Body) {
  const budget = s(b.budget);
  const when = s(b.when);
  if (["b3", "b4"].includes(budget) || (budget === "b2" && ["asap", "q"].includes(when))) return "hot";
  if (budget === "unknown" || when === "flex") return "early";
  return "warm";
}

export async function POST(req: Request) {
  let b: Body;
  try {
    b = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Невалидна заявка." }, { status: 400 });
  }
  // Honeypot: ботовете попълват скритото поле. Отговаряме „ок“, без да правим нищо.
  if (s(b.company)) return NextResponse.json({ ok: true, delivered: false });

  const name = s(b.name, 120);
  const contact = s(b.contact, 200);
  const isMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const isPhone = (contact.match(/\d/g) || []).length >= 7;
  if (name.length < 2 || (!isMail && !isPhone))
    return NextResponse.json({ ok: false, error: "Провери името и контакта." }, { status: 422 });

  const lead = {
    source: s(b.source, 20) || "estimator",
    tag: tag(b),
    name,
    contact,
    type: s(b.type, 40),
    size: s(b.size, 40),
    feats: Array.isArray(b.feats) ? b.feats.map((f) => s(f, 40)).slice(0, 20) : [],
    when: s(b.when, 40),
    budget: s(b.budget, 40),
    tier: s(b.tier, 40),
    site: s(b.site, 300),
    note: s(b.note, 4000),
    at: new Date().toISOString(),
  };

  const text = Object.entries(lead)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");

  let delivered = false;
  try {
    if (process.env.RESEND_API_KEY && process.env.LEAD_TO) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_FROM || "Tvoreo <noreply@tvoreo.com>",
          to: process.env.LEAD_TO.split(","),
          reply_to: isMail ? contact : undefined,
          subject: `[${lead.tag}] Ново запитване от ${name}`,
          text,
        }),
      });
      delivered = r.ok;
    } else if (process.env.LEAD_WEBHOOK_URL) {
      const r = await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: `Ново запитване (${lead.tag})\n${text}`, lead }),
      });
      delivered = r.ok;
    } else {
      console.info("[tvoreo] Запитване (без настроена доставка):\n" + text);
    }
  } catch (e) {
    console.error("[tvoreo] Грешка при доставка на запитване", e);
    return NextResponse.json({ ok: false, error: "Не успяхме да го изпратим. Пиши ни директно." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered });
}
