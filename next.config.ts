import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port:'',
        pathname: '/ramdom/**'
      }
    ]
  }
};

export default nextConfig;
