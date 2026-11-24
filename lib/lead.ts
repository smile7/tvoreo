export type LeadPayload = {
  source: "estimator" | "quick";
  name: string;
  contact: string;
  type?: string;
  size?: string;
  feats?: string[];
  when?: string;
  budget?: string;
  tier?: string;
  site?: string;
  note?: string;
  company?: string; // honeypot: истински хора не го виждат
};

export type LeadResult = { ok: boolean; delivered?: boolean; error?: string };

export async function sendLead(p: LeadPayload): Promise<LeadResult> {
  try {
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(p),
    });
    const j = (await r.json().catch(() => ({}))) as LeadResult;
    if (!r.ok) return { ok: false, error: j.error || "Нещо се обърка. Опитай пак." };
    return j;
  } catch {
    return { ok: false, error: "Няма връзка. Провери интернета и опитай пак." };
  }
}
