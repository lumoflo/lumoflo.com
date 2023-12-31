import * as z from "zod"

export const PostsModel = z.object({
  id: z.string().uuid(),
  post_link: z.string(),
  caption: z.string(),
  post_created_at: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
  store_id: z.string().nullish(),
})
