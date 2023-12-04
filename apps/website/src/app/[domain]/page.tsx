import Link from "next/link";
import {db} from "~/lib/prismaClient";
import {notFound} from "next/navigation";
import Image from "next/image";
import {getSiteData} from "~/lib/fetcher";
import {env} from "~/env.mjs";
import * as React from "react";

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
            <div className="mt-20">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto">
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Store Page for - {data.name}
                        </h1>
                        <h1 className="text-xl font-light text-gray-900 dark:text-white sm:text-xl flex flex-row flex-wrap items-center mt-2">
                            powered by&nbsp;
                            <Link className={"text-indigo-500 flex flex-row items-center font-semibold"} href={"https://lumoflo.com"}>
                                <img src="/cl_logo.svg" className="h-4" alt="Logo"/>.com
                            </Link>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}
