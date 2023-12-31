// Importing env files here to validate on build

import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    externalDir: true,
  },
  images: {
    remotePatterns: [],
    domains: ["localhost", "images.lumoflo.com"],
  },
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@lumoflo/db",
    "@lumoflo/utils",
    "@lumoflo/ui",
    "@lumoflo/kv",
    "@lumoflo/r2",
    "@lumoflo/types",
    "@lumoflo/auth",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
