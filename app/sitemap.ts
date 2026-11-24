import type { MetadataRoute } from "next";

// Когато има английска версия на /en, добави alternates: { languages: { bg: "https://tvoreo.com/", en: "https://tvoreo.com/en" } }.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://tvoreo.com/", lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
