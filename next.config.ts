import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        'https://storage.googleapis.com/decora-alpha-deno/floor_plans/**'
      ),
    ],
  },
};

export default nextConfig;
