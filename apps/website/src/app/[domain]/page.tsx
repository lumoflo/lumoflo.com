import Link from "next/link";
import {db} from "@gramflow/db";
import {notFound} from "next/navigation";
import Image from "next/image";
import {getSiteData} from "~/lib/fetcher";
import {env} from "~/env.mjs";

export async function generateStaticParams() {
    const allSites = await db.stores.findMany({
        select: {
            subdomain: true,
            customDomain: true,
        },
        // feel free to remove this filter if you want to generate paths for all sites
        where: {
            subdomain: "api",
        },
    });

    return allSites
        // @ts-ignore
        .flatMap(({subdomain, customDomain}) => [
            subdomain && {
                domain: `${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
            },
            customDomain && {
                domain: customDomain,
            },
        ])
        .filter(Boolean);
}

export default async function SiteHomePage({
                                               params,
                                           }: {
    params: { domain: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const data = await getSiteData(domain);

    if (!data) {
        notFound();
    }

    return (
        <>
            <div
                className="ease left-0 right-0 top-0 z-30 flex h-16 bg-white transition-all duration-150 dark:bg-black dark:text-white">
                <div
                    className="mx-auto flex h-full max-w-screen-xl items-center justify-center space-x-5 px-10 sm:px-20">
                    <Link href="/" className="flex items-center justify-center">
                        <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
                            <Image
                                alt={data.name || ""}
                                height={40}
                                src={"https://unsplash.it/40/40"}
                                width={40}
                            />
                        </div>
                        <span className="ml-3 inline-block truncate font-title font-medium">
              {data.name}
            </span>
                    </Link>
                </div>
            </div>

            <div className="mt-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            {data.name}
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
