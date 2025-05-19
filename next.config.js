/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/stack-sage",
    output: "export",
    reactStrictMode: true,
    assetPrefix: "/stack-sage/",
    images: {
        unoptimized: true,
    },
  };
  
  module.exports = nextConfig;