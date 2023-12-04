// Importing env files here to validate on build

import "./src/env.mjs";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
    ],
    domains: ["localhost", "images.lumoflo.com", ],
  },
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@gramflow/db",
    "@gramflow/utils",
    "@gramflow/ui",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
