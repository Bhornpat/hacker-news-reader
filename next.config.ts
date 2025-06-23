import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // It's generally recommended to keep this disabled for production.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
