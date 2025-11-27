import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
});

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
};

export default withPWA(nextConfig);
