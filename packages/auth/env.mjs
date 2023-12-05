import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
    server: {
        VERCEL_URL: z.string().nullish(),
        NEXT_PUBLIC_ROOT_DOMAIN: z.string(),
        AUTH_GITHUB_SECRET: z.string(),
        AUTH_GITHUB_ID: z.string(),

    }, client: {}, runtimeEnv: {
        VERCEL_URL: process.env.VERCEL_URL,
        NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    }, skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
