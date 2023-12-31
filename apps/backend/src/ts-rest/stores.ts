import { initContract } from "@ts-rest/core";
import { StoresModel } from "prisma/zod";
import { z } from "zod";

const c = initContract();

const PostsSchema = StoresModel;
const GetResponse = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
});
export const StoresApi = c.router({
  getStores: {
    method: "GET",
    path: "/posts/:id/slides",
    responses: {
      201: GetResponse,
    },
    summary: "Get all the slides for a post.",
  },
});
