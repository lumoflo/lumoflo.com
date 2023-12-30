import * as z from "zod"
import { Size } from "@prisma/client"

export const SlidesModel = z.object({
  id: z.string().uuid(),
  post_link: z.string(),
  slide_image_url: z.string(),
  post_caption: z.string(),
  index: z.number().int(),
  quantity: z.number().int(),
  size: z.nativeEnum(Size),
  created_at: z.date(),
  price: z.number(),
  order_id: z.string().nullish(),
  post_id: z.string(),
  post_timestamp: z.date(),
})
