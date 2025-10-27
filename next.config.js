// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Required for static export
  images: {
    unoptimized: true,        // Required for static export
  },
  trailingSlash: true,        // Optional: helps with static routing
};

export default nextConfig;