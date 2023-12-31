import * as z from "zod"

export const StoresModel = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  user_id: z.string().nullish(),
  instagram_token: z.string(),
  username: z.string(),
  subdomain: z.string().nullish(),
  customDomain: z.string().nullish(),
})
