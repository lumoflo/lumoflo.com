import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
      //cloudlfare
      CF_ACCESS_KEY_ID: z.string(),
      CF_SECRET_ACCESS_KEY: z.string(),
      CF_ACCOUNT_ID: z.string(),
      CF_IMAGES_BUCKET_NAME: z.string(),
      CF_FILES_BUCKET_NAME: z.string(),
  },
  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});
