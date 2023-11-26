import * as z from "zod"
import { CompleteStores, RelatedStoresModel } from "./index"

export const UsersModel = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  email: z.string(),
  verified: z.boolean(),
})

export interface CompleteUsers extends z.infer<typeof UsersModel> {
  stores: CompleteStores[]
}

/**
 * RelatedUsersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUsersModel: z.ZodSchema<CompleteUsers> = z.lazy(() => UsersModel.extend({
  stores: RelatedStoresModel.array(),
}))
