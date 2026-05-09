/** @type {import('next').NextConfig} */
const cloudflare_domain = process.env.CLOUDFLARE_HOSTNAME || '35ffd708fb9c5296e361d1923425135c.r2.cloudflarestorage.com'
const backend_url = process.env.NEXT_PUBLIC_BACKEND || 'https://forniengineeringweb.onrender.com/api'
const admin_url = process.env.NEXT_BASE || 'https://forniengineeringweb.onrender.com'

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: cloudflare_domain,
      },
    ],
  },

  // Redirect admin to backend
  async redirects() {
    return [
      {
        source: '/admin',
        destination: `${admin_url}/admin/`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;