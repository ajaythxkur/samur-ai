import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NETWORK: process.env.NETWORK,
  }
};

export default nextConfig;
