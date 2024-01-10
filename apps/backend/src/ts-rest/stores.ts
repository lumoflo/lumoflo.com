import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { StoresModel } from "../../prisma/zod";

const c = initContract();

export const StoresApi = c.router({
  getStores: {
    method: "GET",
    path: "/stores",
    responses: {
      201: StoresModel.omit({
        instagram_token: true,
        created_at: true,
        updated_at: true,
      }).array(),
    },
    summary: "Get all the stores for a user.",
  },

  addStore: {
    method: "POST",
    path: "/stores",
    body: StoresModel.pick({
      name: true,
      subdomain: true,
      instagram_token: true,
    }),
    responses: {
      201: StoresModel.omit({
        instagram_token: true,
        created_at: true,
        updated_at: true,
      }),
    },
    summary: "Add a store for a user.",
  },

  getDomains: {
    method: "GET",
    path: "/domains",
    responses: {
      201: z
        .object({
          subdomain: z.string().nullable(),
          customDomain: z.string().nullable(),
        })
        .array(),
    },
    summary: "Get all the custom-domains and subdomains.",
  },
  getADomain: {
    method: "GET",
    path: "/domain",
    query: z.object({
      subdomain: z.string().nullable(),
      customDomain: z.string().nullable(),
    }),
    responses: {
      201: StoresModel.omit({ instagram_token: true }).nullable(),
    },
    summary: "Get a custom-domain or subdomain.",
  },
});
