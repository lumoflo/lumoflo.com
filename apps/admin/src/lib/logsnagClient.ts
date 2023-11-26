import { LogSnag } from "logsnag";

import { env } from "~/env.mjs";

const globalForLogSnag = globalThis as { logsnag?: LogSnag };

export const LogSnagClient =
  globalForLogSnag ||
  new LogSnag({
    token: env.LOG_SNAG_API_TOKEN,
    project: "lumoflo",
  });

if (process.env.NODE_ENV !== "production") globalForLogSnag = LogSnagClient;
