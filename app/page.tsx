import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Proof } from "@/components/Proof";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { WhyCode } from "@/components/WhyCode";
import { Process } from "@/components/Process";
import { Estimator } from "@/components/Estimator";
import { Tiers } from "@/components/Tiers";
import { Team } from "@/components/Team";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { LoadBadge } from "@/components/LoadBadge";
import { Interactions } from "@/components/Interactions";
import { FAQ } from "@/lib/faq";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://tvoreo.com/#studio",
      name: "Tvoreo",
      alternateName: "Творео",
      slogan: "Творим софтуер по мярка.",
      description:
        "Софтуерно студио от Русе: уебсайтове, приложения, онлайн магазини и QR системи по поръчка за бизнеси в България и Европа.",
      url: "https://tvoreo.com",
      logo: "https://tvoreo.com/brand/tvoreo-logo.svg",
      founder: { "@type": "Person", name: "Силвена Митева" },
      address: { "@type": "PostalAddress", addressLocality: "Русе", addressCountry: "BG" },
      areaServed: ["BG", "EU"],
      knowsLanguage: ["bg", "en"],
      // Добави telephone, email, streetAddress и sameAs (LinkedIn, GitHub, Clutch, Google), когато са готови.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги",
        itemListElement: [
          "Уебсайтове по поръчка",
          "Онлайн магазини",
          "Уеб приложения и платформи",
          "Мобилни приложения",
          "QR менюта и поръчки за заведения",
          "Дигитални решения за музеи и събития",
          "UX/UI дизайн",
          "SEO и оптимизация за AI търсачки",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://tvoreo.com/#website",
      url: "https://tvoreo.com",
      name: "Tvoreo",
      inLanguage: "bg-BG",
      publisher: { "@id": "https://tvoreo.com/#studio" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <span id="top" />
        <Hero />
        <Proof />
        <Services />
        <Work />
        <WhyCode />
        <Process />
        <Estimator />
        <Tiers />
        <Team />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <LoadBadge />
      <Interactions />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
