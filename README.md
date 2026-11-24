# Tvoreo — началната страница

Next.js (App Router) + TypeScript + собствен CSS. Само начална страница (BG).

## Пускане
    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start

## Променливи (Vercel → Settings → Environment Variables)
- `TVOREO_INDEX=1`: позволява индексиране (robots). Без нея сайтът е `noindex`. Задай я само при истинския старт.
- Доставка на запитвания от оценителя и кратката форма (`/api/lead`), едно от двете:
  - `RESEND_API_KEY` + `LEAD_TO` (имейл/и със запетая) + по желание `LEAD_FROM`: имейл през Resend (домейнът трябва да е потвърден в Resend).
  - `LEAD_WEBHOOK_URL`: JSON към webhook (Slack, Make, Zapier, CRM).
  Без тях формите работят, но показват „Демо режим“ и нищо не се изпраща.
  Всяко запитване получава вътрешен етикет hot / warm / early (вижда се само в имейла до екипа).

## SEO / AI
- Мета, Open Graph и Twitter карта (`app/opengraph-image.png`), canonical, hreflang bg-BG + x-default.
- JSON-LD: ProfessionalService (с каталог услуги, без цени), WebSite, FAQPage.
- `public/llms.txt`, `robots.txt`, `sitemap.xml`.
- При английска версия на `/en`: добави `en` в `alternates.languages` (app/layout.tsx) и в `app/sitemap.ts`.

## За попълване (в кода са с клас `ph-inline` / `ph-text` / `ph-tag`)
Виж списъка в отчета; търси `ph-` в `components/`.
