import * as z from "zod"

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
