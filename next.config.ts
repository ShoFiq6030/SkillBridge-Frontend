

import type { NextConfig } from "next";
import { env } from "./src/env";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [{
      source: "/api/:path*",
      destination: `${env.NEXT_PUBLIC_API_URL}/api/:path*`
    }]
  }
};

export default nextConfig;


