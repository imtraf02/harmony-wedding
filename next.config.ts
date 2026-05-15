import type { NextConfig } from 'next'


const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },

  async redirects() {
    return [
      { source: '/gallery', destination: '/portfolio', permanent: true },
      { source: '/services/video', destination: '/services/videography', permanent: true },
      { source: '/services/photo', destination: '/services/photography', permanent: true },
      { source: '/location', destination: '/studios', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
