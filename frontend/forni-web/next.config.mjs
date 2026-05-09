/** @type {import('next').NextConfig} */

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "35ffd708fb9c5296e361d1923425135c.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "vxlkpbtobodxceewbozs.supabase.co",
      },
    ],
    unoptimized: true, // Disable optimization for R2 images with query parameters
  },

  // Redirect admin to backend
  async redirects() {
    const adminUrl = process.env.NEXT_BASE || 'https://forniengineeringweb.onrender.com';
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