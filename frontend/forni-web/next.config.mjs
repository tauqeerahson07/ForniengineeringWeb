/** @type {import('next').NextConfig} */
const backend_url = process.env.NEXT_PUBLIC_BACKEND 
const admin_url = process.env.NEXT_BASE

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
    unoptimized: true, // Disable optimization for R2 images with query parameters
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