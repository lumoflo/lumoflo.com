import * as z from "zod"
import { CompleteOrders, RelatedOrdersModel, CompletePosts, RelatedPostsModel } from "./index"

export const SlidesModel = z.object({
  id: z.string(),
  parent_post_id: z.string(),
  post_link: z.string(),
  order_id: z.string().nullish(),
  post_id: z.string().nullish(),
})

export interface CompleteSlides extends z.infer<typeof SlidesModel> {
  orders?: CompleteOrders | null
  posts?: CompletePosts | null
}

/**
 * RelatedSlidesModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSlidesModel: z.ZodSchema<CompleteSlides> = z.lazy(() => SlidesModel.extend({
  orders: RelatedOrdersModel.nullish(),
  posts: RelatedPostsModel.nullish(),
}))
