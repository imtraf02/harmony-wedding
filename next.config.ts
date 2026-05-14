import type { NextConfig } from 'next';

const config: NextConfig = {
  compress        : true,
  poweredByHeader : false,
  reactStrictMode : true,

  // Silence the "webpack config with no turbopack config" warning
  turbopack: {},

  async redirects() {
    return [
      { source: '/gallery',        destination: '/portfolio',            permanent: true },
      { source: '/services/video', destination: '/services/videography', permanent: true },
      { source: '/services/photo', destination: '/services/photography', permanent: true },
      { source: '/location',       destination: '/studios',              permanent: true },
      { source: '/contact-us',     destination: '/contact',              permanent: true },
    ];
  },

  images: {
    formats         : ['image/webp'],
    deviceSizes     : [640, 750, 1080, 1920],
    imageSizes      : [64, 128, 256, 384],
    minimumCacheTTL : 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default config;
