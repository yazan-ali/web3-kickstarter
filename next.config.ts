import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.kickstarter.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
