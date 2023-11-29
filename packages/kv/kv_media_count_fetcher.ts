import { Redis } from "@upstash/redis";

import { env } from "./env.mjs";

const redis = new Redis({
  url: env.UPSTASH_URL,
  token: env.UPSTASH_TOKEN,
});

export const KvMediaCountFetcher = async ({
  username,
}: {
  username: string;
}) => {
  return (await redis.get<number>(`${username}_media_count`)) ?? 0;
};
