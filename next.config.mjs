// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.dummyjson.com'], // Correct key is `domains`
    },
  };
  
  export default nextConfig;
  