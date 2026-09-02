import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
