import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "7gexo7oc4kxixfb3.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
