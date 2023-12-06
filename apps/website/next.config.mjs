// Importing env files here to validate on build

import "./src/env.mjs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import PrismaPlugin from '@prisma/nextjs-monorepo-workaround-plugin'

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  images: {
    remotePatterns: [
    ],
    domains: ["localhost", "images.lumoflo.com", ],
  },
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@lumoflo/db",
    "@lumoflo/utils",
    "@lumoflo/ui",
    "@lumoflo/kv",
    "@lumoflo/r2",
    "@lumoflo/auth",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
