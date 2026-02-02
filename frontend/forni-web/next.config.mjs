/** @type {import('next').NextConfig} */
const backend_url = process.env.NEXT_BASE
const supabase_domain = process.env.SUPABASSECRETHOSTNAME
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
        hostname: supabase_domain,
        pathname:"storage/v1/**",
      },
    ],
  },
};

export default nextConfig;