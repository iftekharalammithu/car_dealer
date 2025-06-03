import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
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
};

export default nextConfig;
