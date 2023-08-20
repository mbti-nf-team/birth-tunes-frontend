/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  experimental: {
    typedRoutes: true,
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
