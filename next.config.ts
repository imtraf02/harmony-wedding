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

  // Cấu hình Server Actions (Top-level theo chuẩn Next.js 15/16)
  // @ts-ignore - Bỏ qua nếu IDE của bạn chưa cập nhật bộ gõ NextConfig mới nhất
  serverActions: {
    bodySizeLimit: '100mb',
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
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
