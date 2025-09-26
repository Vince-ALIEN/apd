/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apd-7ov8.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
