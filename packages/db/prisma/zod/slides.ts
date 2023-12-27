import * as z from "zod"
import { CompleteOrders, RelatedOrdersModel, CompletePosts, RelatedPostsModel } from "./index"

export const SlidesModel = z.object({
  id: z.string().uuid(),
  post_link: z.string(),
  slide_image_url: z.string(),
  post_caption: z.string(),
  index: z.number().int(),
  order_id: z.string().nullish(),
  post_id: z.string(),
  post_timestamp: z.date(),
})

export interface CompleteSlides extends z.infer<typeof SlidesModel> {
  orders?: CompleteOrders | null
  posts: CompletePosts
}

/**
 * RelatedSlidesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSlidesModel: z.ZodSchema<CompleteSlides> = z.lazy(() => SlidesModel.extend({
  orders: RelatedOrdersModel.nullish(),
  posts: RelatedPostsModel,
}))
