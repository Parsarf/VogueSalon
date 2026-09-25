import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prototype imagery only. Replace with the salon's own photography on a
    // first-party CDN before production — see src/data/images.ts.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    // The placeholder host already returns correctly-sized AVIF/WebP (the size
    // is baked into the URL by `photoSrc`), so re-encoding locally only costs
    // cache. Drop this once the photography moves to a first-party origin.
    unoptimized: true,
  },
};

export default nextConfig;
