import * as z from "zod"
import { CompleteOrders, RelatedOrdersModel } from "./index"

export const PickupsModel = z.object({
  id: z.string().uuid(),
  pickup_id: z.number().int(),
  pickup_location: z.string(),
  pickup_date: z.string(),
})

export interface CompletePickups extends z.infer<typeof PickupsModel> {
  orders: CompleteOrders[]
}

/**
 * RelatedPickupsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPickupsModel: z.ZodSchema<CompletePickups> = z.lazy(() => PickupsModel.extend({
  orders: RelatedOrdersModel.array(),
}))
