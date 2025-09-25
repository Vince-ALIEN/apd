/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
