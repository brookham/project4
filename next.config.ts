import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {hostname: "4lmhusn1jzhjjtxp.public.blob.vercel-storage.com"}
    ]
  }
};

export default nextConfig;
