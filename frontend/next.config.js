/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "appetizing-balance-03c58ad391.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
