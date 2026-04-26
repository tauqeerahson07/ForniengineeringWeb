/** @type {import('next').NextConfig} */
const backend_url = process.env.NEXT_BASE
const cloudflare_domain = process.env.CLOUDFLARE_HOSTNAME
const nextConfig = {
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
    remotePatterns: [
      {
        protocol:"https",
        hostname: cloudflare_domain
      },
    ],
  },
};

export default nextConfig;