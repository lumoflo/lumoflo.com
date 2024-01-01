import { COURIER, Status } from "@prisma/client";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const OrdersSchema = z.object({
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
});
export const OrdersApi = c.router({
  createOrder: {
    method: "POST",
    path: "/orders",
    responses: {
      201: z.object({
        id: z.string(),
      }),
    },
    body: z.object({
      slides: z.string().array(),
      prices: z.string().array(),
    }),
    summary: "Create an order",
  },
});
