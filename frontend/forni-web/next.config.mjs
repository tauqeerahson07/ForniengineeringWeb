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
};

export default nextConfig;