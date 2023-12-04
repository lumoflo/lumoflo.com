import { intervalTrigger } from "@trigger.dev/sdk";
import { z } from "zod";

import { InstagramMediaCount } from "@gramflow/instagram";
import { KvMediaCountFetcher } from "@gramflow/kv";

import { env } from "~/env.mjs";
import { db } from "~/lib/prismaClient";
import { client } from "~/trigger";

const instagramResponseSchema = z.object({
  media_count: z.number(),
  id: z.string(),
});

client.defineJob({
  id: "instagram-post-sync-job",
  name: "Insta Posts Sync Job",
  version: "0.0.1",
  enabled: true,
  trigger: intervalTrigger({
    seconds: 60,
  }),
  run: async (_, io, ctx) => {
    try {
      const stores = await db.stores.findMany({
        where: {
          instagram_token: {
            not: undefined,
          },
        },
        select: {
          instagram_token: true,
          username: true,
        },
      });

      for (const store of stores) {
        const username = store.username;
        const token = store.instagram_token;

        await io.runTask(
          "media-syncing",
          async (task) => {
            const instagramMediaCount = await InstagramMediaCount({
              username,
              token,
            });
            const kvMediaCount = await KvMediaCountFetcher({ username });

            if (kvMediaCount < instagramMediaCount) {
              const diff = instagramMediaCount - kvMediaCount;
              await io.logger.info(`Difference in posts: ${diff}`);
              await fetch(`/api/instagram?count=${diff}?username=${username}`, {
                headers: {
                  Authorization: `Bearer ${env.CLERK_JWT}`,
                },
              });
            }
          },
          { name: `Media Syncing for ${username}` },
        );
      }
      return { status: "success" };
    } catch (e) {
      await io.logger.error(
        `Error while syncing instagram posts: ${JSON.stringify(e)}`,
      );
      return { status: "error" };
    }
  },
});
