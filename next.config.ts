import type { NextConfig } from "next";

// Файловете в public/ нямат хеш в името, затова кешът е за ден, а не "immutable".
const DAY_CACHE = "public, max-age=86400, stale-while-revalidate=604800";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: DAY_CACHE }] },
      { source: "/work/:path*", headers: [{ key: "Cache-Control", value: DAY_CACHE }] },
    ];
  },
};

export default nextConfig;
