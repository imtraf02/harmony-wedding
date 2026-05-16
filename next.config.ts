import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    // Disable optimization for user-uploaded images — Nginx already serves
    // them with caching. /_next/image cannot fetch from localhost:3000/uploads/
    // when those files live outside public/ (e.g. /var/lib/wedding/uploads/).
    unoptimized: process.env.UPLOAD_DIR ? path.isAbsolute(process.env.UPLOAD_DIR ?? '') : false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],

    serverActions: {
      bodySizeLimit: '100mb',
    },

    proxyClientMaxBodySize: 100 * 1024 * 1024,
  },

  async redirects() {
    return [
      { source: '/gallery', destination: '/portfolio', permanent: true },
      { source: '/services/video', destination: '/services/videography', permanent: true },
      { source: '/services/photo', destination: '/services/photography', permanent: true },
      { source: '/location', destination: '/studios', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
    ]
  },
}

export default nextConfig