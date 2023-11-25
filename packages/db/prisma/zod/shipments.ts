import * as z from "zod"
import { COURIER } from "@prisma/client"
import { CompleteOrders, RelatedOrdersModel } from "./index"

export const ShipmentsModel = z.object({
  id: z.string().uuid(),
  awb: z.string().nullish(),
  length: z.string().nullish(),
  courier: z.nativeEnum(COURIER),
  breadth: z.string().nullish(),
  height: z.string().nullish(),
  weight: z.string().nullish(),
  shipping_cost: z.number().nullish(),
  order_id: z.string().nullish(),
})

export interface CompleteShipments extends z.infer<typeof ShipmentsModel> {
  order?: CompleteOrders | null
}

/**
 * RelatedShipmentsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedShipmentsModel: z.ZodSchema<CompleteShipments> = z.lazy(() => ShipmentsModel.extend({
  order: RelatedOrdersModel.nullish(),
}))
