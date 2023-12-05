import * as z from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel, CompleteStores, RelatedStoresModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  username: z.string().nullish(),
  gh_username: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  stores: CompleteStores[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
  stores: RelatedStoresModel.array(),
}))
