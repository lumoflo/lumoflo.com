import Link from "next/link";
import { notFound } from "next/navigation";

import { env } from "~/env.mjs";
import { getSiteData } from "~/lib/fetcher";

export async function generateStaticParams() {
  const req = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/stores/domains`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.CLERK_JWT}`,
    },
  });
  if (!req.ok) {
    console.log("Failed to fetch domains");
  }

  const allSites = await req.json();
  console.log({ allSites });
  return (
    allSites
      // @ts-ignore
      .flatMap(({ subdomain, customDomain }) => [
        subdomain && {
          domain: `${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        },
        customDomain && {
          domain: customDomain,
        },
      ])
      .filter(Boolean)
  );
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  console.log("Decord URI Component", domain)
  const data = await getSiteData(domain);

  if (!data) {
    notFound();
  }

  return (
    <>
      <div className="mt-20">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Store Page for - {data.name}
            </h1>
            <h1 className="mt-2 flex flex-row flex-wrap items-center text-xl font-light text-gray-900 dark:text-white sm:text-xl">
              powered by&nbsp;
              <Link
                className={
                  "flex flex-row items-center font-semibold text-indigo-500"
                }
                href={"https://lumoflo.com"}
              >
                <img src="/cl_logo.svg" className="h-4" alt="Logo" />
                .com
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
