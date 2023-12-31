// import { COURIER, PrismaClient, Status } from "@prisma/client";
import PrismaClient from "@server/prisma/prisma.service";

export * from "@prisma/client";
export * from "./prisma/zod";
const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

export default PrismaClient;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
