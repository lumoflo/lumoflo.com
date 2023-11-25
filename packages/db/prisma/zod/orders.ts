import * as z from "zod"
import { Status, COURIER } from "@prisma/client"
import { CompleteStores, RelatedStoresModel, CompleteSlides, RelatedSlidesModel, CompleteCustomers, RelatedCustomersModel, CompleteOtp, RelatedOtpModel, CompletePickups, RelatedPickupsModel } from "./index"

export const OrdersModel = z.object({
  id: z.string().uuid(),
  order_id: z.string(),
  status: z.nativeEnum(Status),
  store_id: z.string().nullish(),
  prebook: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
  customer_id: z.string().nullish(),
  length: z.number().nullish(),
  breadth: z.number().nullish(),
  height: z.number().nullish(),
  weight: z.number().nullish(),
  awb: z.string().nullish(),
  remarks: z.string().nullish(),
  courier: z.nativeEnum(COURIER),
  shipping_cost: z.number().nullish(),
  pickup_id: z.string(),
})

export interface CompleteOrders extends z.infer<typeof OrdersModel> {
  store?: CompleteStores | null
  posts: CompleteSlides[]
  customer?: CompleteCustomers | null
  ptp: CompleteOtp[]
  pickup: CompletePickups
}

/**
 * RelatedOrdersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrdersModel: z.ZodSchema<CompleteOrders> = z.lazy(() => OrdersModel.extend({
  store: RelatedStoresModel.nullish(),
  posts: RelatedSlidesModel.array(),
  customer: RelatedCustomersModel.nullish(),
  ptp: RelatedOtpModel.array(),
  pickup: RelatedPickupsModel,
}))
