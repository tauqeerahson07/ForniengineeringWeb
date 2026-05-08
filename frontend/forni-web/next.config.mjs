/** @type {import('next').NextConfig} */
const cloudflare_domain = process.env.CLOUDFLARE_HOSTNAME
const backend_url = process.env.NEXT_BASE

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: cloudflare_domain ? [
      {
        protocol: "https",
        hostname: cloudflare_domain,
      },
    ] : [],
  },

  // Redirect admin to backend
  async redirects() {
    return [
      {
        source: '/admin',
        destination: `${backend_url}/admin/`,
        permanent: false,
      },
    ];
  },

  // Rewrite URLs for API calls
  async rewrites() {
    return {
      beforeFiles: [
        // Services API
        {
          source: '/api/services',
          destination: `${backend_url}/api/services`,
        },
        {
          source: '/api/services/:id',
          destination: `${backend_url}/api/services/:id`,
        },
        // Spare Parts API
        {
          source: '/api/spare-parts',
          destination: `${backend_url}/api/spare-parts`,
        },
        {
          source: '/api/spare-parts/:id',
          destination: `${backend_url}/api/spare-parts/:id`,
        },
        // Furnaces API
        {
          source: '/api/furnaces',
          destination: `${backend_url}/api/furnaces`,
        },
        {
          source: '/api/furnaces/:id',
          destination: `${backend_url}/api/furnaces/:id`,
        },
      ],
    };
  },
};

export default nextConfig;