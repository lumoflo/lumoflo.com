import * as z from "zod"
import { CompleteSlides, RelatedSlidesModel, CompleteStores, RelatedStoresModel } from "./index"

export const PostsModel = z.object({
  id: z.string().uuid(),
  post_link: z.string(),
  caption: z.string(),
  post_created_at: z.date(),
  created_at: z.date(),
  updated_at: z.date(),
  store_id: z.string().nullish(),
})

export interface CompletePosts extends z.infer<typeof PostsModel> {
  slides: CompleteSlides[]
  store?: CompleteStores | null
}

/**
 * RelatedPostsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostsModel: z.ZodSchema<CompletePosts> = z.lazy(() => PostsModel.extend({
  slides: RelatedSlidesModel.array(),
  store: RelatedStoresModel.nullish(),
}))
