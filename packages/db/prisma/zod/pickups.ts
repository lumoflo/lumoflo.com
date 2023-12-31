import * as z from "zod"

export const PickupsModel = z.object({
  id: z.string().uuid(),
  pickup_id: z.number().int(),
  pickup_location: z.string(),
  pickup_date: z.string(),
})
