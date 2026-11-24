import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/Geologica.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const body = localFont({
  src: "./fonts/Onest.woff2",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
  preload: true,
});

const SITE = "https://tvoreo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Tvoreo — софтуерно студио в Русе | Уебсайтове и приложения по поръчка",
  description:
    "Tvoreo проектира и програмира уебсайтове, приложения, онлайн магазини и QR системи за бизнеси в България и Европа. Без шаблони и без WordPress: чист код, премиум UX и скорост, която се усеща.",
  // hreflang: когато се добави английската версия на /en, добави и en: "/en" тук и в sitemap.ts.
  alternates: { canonical: "/", languages: { "bg-BG": "/", "x-default": "/" } },
  applicationName: "Tvoreo",
  authors: [{ name: "Tvoreo" }],
  keywords: ["уебсайт по поръчка", "изработка на уебсайт Русе", "уеб дизайн", "онлайн магазин", "мобилно приложение", "QR меню", "софтуерно студио", "Next.js"],
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: SITE,
    siteName: "Tvoreo",
    title: "Tvoreo — Творим софтуер по мярка.",
    description:
      "Софтуерно студио от Русе: уебсайтове, приложения, онлайн магазини и QR системи по поръчка.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tvoreo — Творим софтуер по мярка.",
    description: "Софтуерно студио от Русе: уебсайтове, приложения, онлайн магазини и QR системи по поръчка.",
  },
  // Прототипът не се индексира, докато не зададем TVOREO_INDEX=1 при истинския старт.
  robots: process.env.TVOREO_INDEX === "1" ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F5F7FA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Позволява на анимациите за поява да скриват съдържание само когато има JS.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
