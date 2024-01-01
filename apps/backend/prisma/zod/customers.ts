import * as z from "zod"
import { CompleteOrders, RelatedOrdersModel, CompleteOtp, RelatedOtpModel } from "./index"

export const CustomersModel = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  phone_no: z.string(),
  address: z.string(),
  pincode: z.string(),
  landmark: z.string().nullish(),
  locality: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  instagram_username: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export interface CompleteCustomers extends z.infer<typeof CustomersModel> {
  orders: CompleteOrders[]
  otp: CompleteOtp[]
}

/**
 * RelatedCustomersModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCustomersModel: z.ZodSchema<CompleteCustomers> = z.lazy(() => CustomersModel.extend({
  orders: RelatedOrdersModel.array(),
  otp: RelatedOtpModel.array(),
}))
