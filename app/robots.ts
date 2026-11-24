import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const live = process.env.TVOREO_INDEX === "1";
  return {
    rules: live ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: "https://tvoreo.com/sitemap.xml",
  };
}
