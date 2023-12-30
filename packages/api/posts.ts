import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { Size } from "@lumoflo/db";

const c = initContract();

const PostsSchema = z.object({
  id: z.string().uuid(),
  post_link: z.string(),
  caption: z.string(),
  post_created_at: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
  store_id: z.string().nullish(),
});
export const PostsApi = c.router({
  createOrder: {
    method: "GET",
    path: "/posts/:id/slides",
    responses: {
      201: PostsSchema,
    },
    summary: "Get all the slides for a post.",
  },
});
