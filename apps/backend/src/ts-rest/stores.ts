import { initContract } from "@ts-rest/core";
import { StoresModel } from "prisma/zod";
import { z } from "zod";

const c = initContract();

export const StoresApi = c.router({
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
