import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "t1.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
