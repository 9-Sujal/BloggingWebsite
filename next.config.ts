import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

// Sujalg436@
// mongodb+srv://sujalg436_user:Sujalg436@@cluster0.rrzkt7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0