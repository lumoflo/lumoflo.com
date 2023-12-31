import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    // prisma
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),

    // upstash
    UPSTASH_URL: z.string(),
    UPSTASH_TOKEN: z.string(),

    // clerk
    CLERK_SECRET_KEY: z.string(),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string(),
    CLERK_JWT: z.string(),

    // logsnag

    LOG_SNAG_API_TOKEN: z.string(),

    // resend
    // RESEND_API_KEY: z.string(),
    // RESEND_DOMAIN: z.string(),

    // instagram
    // INSTAGRAM_TOKEN: z.string(),

    // supabase
    SUPABASE_URL: z.string().url(),

    // delivery
    // DELHIVERY_API_KEY: z.string(),

    // misc
    ENV: z.string(),
    BASE_URL: z.string(),

    // //slack
    // SLACK_TOKEN: z.string(),
    // SLACK_WEBHOOK_URL_ACCEPTED: z.string().url(),
    // SLACK_WEBHOOK_URL_CREATED: z.string().url(),
    // SLACK_WEBHOOK_URL_CSV_FILE: z.string().url(),

    // trigger
    TRIGGER_API_KEY: z.string(),
    TRIGGER_API_URL: z.string().url(),
    TRIGGER_ID: z.string(),
    TRIGGER_SUPABASE_ID: z.string(),

    //vercel
    NEXT_PUBLIC_ROOT_DOMAIN: z.string(),
    NEXT_PUBLIC_BACKEND_URL: z.string(),
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX: z.string(),
    AUTH_BEARER_TOKEN: z.string(),
    PROJECT_ID_VERCEL: z.string(),
    TEAM_ID_VERCEL: z.string().optional(), //optional
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR : z.string(),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    // clerk
    LOG_SNAG_API_TOKEN: process.env.LOG_SNAG_API_TOKEN,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    CLERK_WEBHOOK_SIGNING_SECRET: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    CLERK_JWT: process.env.CLERK_JWT,

    // prisma
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,

    // instagram
    // INSTAGRAM_TOKEN : process.env.INSTAGRAM_TOKEN,

    // resend
    // RESEND_API_KEY : process.env.RESEND_API_KEY,
    // RESEND_DOMAIN : process.env.RESEND_DOMAIN,

    // delhivery
    // DELHIVERY_API_KEY : process.env.DELHIVERY_API_KEY,

    //upstack
    UPSTASH_URL: process.env.UPSTASH_URL,
    UPSTASH_TOKEN: process.env.UPSTASH_TOKEN,

    //node
    ENV: process.env.ENV,
    BASE_URL: process.env.BASE_URL,

    // slack
    // SLACK_TOKEN : process.env.SLACK_TOKEN,
    // SLACK_WEBHOOK_URL_ACCEPTED : process.env.SLACK_WEBHOOK_URL_ACCEPTED,
    // SLACK_WEBHOOK_URL_CREATED : process.env.SLACK_WEBHOOK_URL_CREATED,
    // SLACK_WEBHOOK_URL_CSV_FILE : process.env.SLACK_WEBHOOK_URL_CSV_FILE,

    // supabase
    SUPABASE_URL: process.env.SUPABASE_URL,

    // trigger
    TRIGGER_API_KEY: process.env.TRIGGER_API_KEY,
    TRIGGER_API_URL: process.env.TRIGGER_API_URL,
    TRIGGER_ID: process.env.TRIGGER_ID,
    TRIGGER_SUPABASE_ID: process.env.TRIGGER_SUPABASE_ID,

    //vercel
    NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX:
      process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX,
    AUTH_BEARER_TOKEN: process.env.AUTH_BEARER_TOKEN,
    PROJECT_ID_VERCEL: process.env.PROJECT_ID_VERCEL,
    TEAM_ID_VERCEL: process.env.TEAM_ID_VERCEL, //optional
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
