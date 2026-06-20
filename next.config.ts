import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      { source: "/login", destination: "/", permanent: false },
      { source: "/account", destination: "/", permanent: false },
      { source: "/account/:path*", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
