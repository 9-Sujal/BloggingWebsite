import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  eslint:{
    ignoreDuringBuilds:true,
  },
  env: {
    API:
      process.env.NODE_ENV === "production"
        ? "https://my-blogs-gamma.vercel.app/api"
        : "http://localhost:3000/api",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

