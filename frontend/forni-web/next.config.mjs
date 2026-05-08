/** @type {import('next').NextConfig} */
const cloudflare_domain = process.env.CLOUDFLARE_HOSTNAME
const backend_url = process.env.NEXT_PUBLIC_BACKEND

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
};

export default nextConfig;