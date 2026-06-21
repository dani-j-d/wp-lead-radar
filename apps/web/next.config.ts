import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true
  },
  serverExternalPackages: ["db", "better-sqlite3"]
};

export default nextConfig;