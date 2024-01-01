import { unstable_cache } from "next/cache";

import { env } from "~/env.mjs";

export async function getSiteData(domain: string) {
  const subdomain = domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  return await unstable_cache(
    async () => {
      const data = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/stores/domain?${
          subdomain ? `subdomain=${subdomain}` : `customDomain=${domain}`
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.CLERK_JWT}`,
          },
        },
      ).then((res) => res.json());
      console.log({ pageData: data });

      return data;
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    },
  )();
}
