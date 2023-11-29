import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    UPSTASH_URL: z.string(),
    UPSTASH_TOKEN: z.string(),
  },
  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
