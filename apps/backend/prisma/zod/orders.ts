import * as z from "zod"
import { Status, COURIER } from "@prisma/client"

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
  pickup_id: z.string().nullish(),
})
