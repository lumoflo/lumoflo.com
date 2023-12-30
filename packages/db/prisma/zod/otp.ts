import * as z from "zod"

export const OtpModel = z.object({
  id: z.string().uuid(),
  email: z.string(),
  otp: z.string(),
  order_id: z.string(),
  customer_id: z.string().nullish(),
  expires: z.date(),
})
