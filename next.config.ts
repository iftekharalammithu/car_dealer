import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    authInterrupts: true,
    nodeMiddleware: true,
    reactCompiler: true,
    optimizeCss: true,
    optimizeServerReact: true,
    optimisticClientCache: true,
    optimizePackageImports: ["lucide-icons", "date-fns"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "*",
        protocol: "https",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strick-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "x-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Permissions-Policy",
            value: `camera=(), microphone=(), geolocation=() , midi=() , sync-xhr=() , fullscreen=(self "${process.env.NEXT_PUBLIC_APP_URL}") , geolocation=("${process.env.NEXT_PUBLIC_APP_URL}")`,
          },
          {
            key: "Refferer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
