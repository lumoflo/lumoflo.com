import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const GetStoresResponse = z
  .object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
  })
  .array();
export const UsersApi = c.router({
  getStores: {
    method: "GET",
    path: "/users/:id/stores",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      201: GetStoresResponse,
    },
    summary: "Get all the stores for a user.",
  },
});
