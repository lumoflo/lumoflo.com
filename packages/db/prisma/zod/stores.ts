import * as z from "zod"
import { CompleteUsers, RelatedUsersModel, CompletePosts, RelatedPostsModel, CompleteOrders, RelatedOrdersModel } from "./index"

export const StoresModel = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  user_id: z.string().nullish(),
  instagram_token: z.string(),
  username: z.string(),
  subdomain: z.string(),
})

export interface CompleteStores extends z.infer<typeof StoresModel> {
  user?: CompleteUsers | null
  posts: CompletePosts[]
  orders: CompleteOrders[]
}

/**
 * RelatedStoresModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoresModel: z.ZodSchema<CompleteStores> = z.lazy(() => StoresModel.extend({
  user: RelatedUsersModel.nullish(),
  posts: RelatedPostsModel.array(),
  orders: RelatedOrdersModel.array(),
}))