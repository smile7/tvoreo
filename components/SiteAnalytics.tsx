"use client";
import { useEffect } from "react";
import { Analytics, type BeforeSend } from "@vercel/analytics/react";

/* QR кодът на визитката води към /?ref=card и посещението се отчита като /card в Vercel Analytics → Pages.
   Параметърът се чете при зареждане на модула, защото се маха от адреса преди скриптът на Analytics да тръгне. */
const CARD_REF = "card";
let cardVisit = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("ref") === CARD_REF;

const reportCardVisit: BeforeSend = (event) => {
  if (!cardVisit || event.type !== "pageview") return event;
  cardVisit = false;
  return { ...event, url: `${new URL(event.url).origin}/${CARD_REF}` };
};

export function SiteAnalytics() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("ref") !== CARD_REF) return;
    url.searchParams.delete("ref");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  return <Analytics beforeSend={reportCardVisit} />;
}
