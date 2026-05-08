/** @type {import('next').NextConfig} */
const backend_url = process.env.NEXT_BASE
const cloudflare_domain = process.env.CLOUDFLARE_HOSTNAME

const nextConfig = {
  // Enable SWR (Stale-While-Revalidate) for better caching
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ]
  },
  
  async rewrites() {
    return [
      {
        source: "/product",
        destination: "/api/furnaces",
      },
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/admin',
        destination: `${backend_url}/admin`,
        permanent: false,
      },
    ];
  },
  
  images: {
    remotePatterns: cloudflare_domain ? [
      {
        protocol: "https",
        hostname: cloudflare_domain,
      },
    ] : [],
    // Optimize images for production
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  compress: true,
  productionBrowserSourceMaps: false,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
    NEXT_BASE: process.env.NEXT_BASE,
    CLOUDFLARE_HOSTNAME: process.env.CLOUDFLARE_HOSTNAME,
  },
};

export default nextConfig;