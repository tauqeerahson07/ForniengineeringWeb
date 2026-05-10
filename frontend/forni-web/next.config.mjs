/** @type {import('next').NextConfig} */
const adminUrl = process.env.NEXT_BASE
const cloudflarestorage = process.env.CLOUDFLARE_HOSTNAME
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: cloudflarestorage,
      }
    ]
},

  // Redirect admin to backend
  async redirects() {
    return [
      {
        source: '/admin',
        destination: `${adminUrl}/admin/`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;