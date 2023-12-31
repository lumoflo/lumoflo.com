import { initContract } from "@ts-rest/core";
import { z } from "zod";

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

const GetResponse = z
  .object({
    id: z.string(),
    slide_image_url: z.string(),
  })
  .array();
export const PostsApi = c.router({
  getSlides: {
    method: "GET",
    path: "/posts/:id/slides",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      201: GetResponse,
    },
    summary: "Get all the slides for a post.",
  },
});
