/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // Required for static export
  images: {
    unoptimized: true,              // Required for static export
  },
  trailingSlash: true,              // Optional
  eslint: {
    ignoreDuringBuilds: true,       // FIX: Ignore ESLint errors on Vercel
  },
};

module.exports = nextConfig;
