/** @type {import('next').NextConfig} */
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
        destination: 'http://127.0.0.1:8080/admin',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;