import * as z from "zod"
import { CompleteOrders, RelatedOrdersModel, CompleteCustomers, RelatedCustomersModel } from "./index"

export const OtpModel = z.object({
  id: z.string().uuid(),
  email: z.string(),
  otp: z.string(),
  order_id: z.string(),
  customer_id: z.string().nullish(),
  expires: z.date(),
})

export interface CompleteOtp extends z.infer<typeof OtpModel> {
  order?: CompleteOrders | null
  customer?: CompleteCustomers | null
}

/**
 * RelatedOtpModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOtpModel: z.ZodSchema<CompleteOtp> = z.lazy(() => OtpModel.extend({
  order: RelatedOrdersModel.nullish(),
  customer: RelatedCustomersModel.nullish(),
}))
