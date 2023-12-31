import { unstable_cache } from "next/cache";
import PrismaClient from "@server/prisma/prisma.service";

import { env } from "~/env.mjs";

export async function getSiteData(domain: string) {
  const db = new PrismaClient();
  const subdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      return db.stores.findUnique({
        where: subdomain ? { subdomain: subdomain } : { customDomain: domain },
        include: { user: true },
      });
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}
