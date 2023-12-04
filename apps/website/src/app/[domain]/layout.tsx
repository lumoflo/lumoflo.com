import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "~/lib/fetcher";

export default async function SiteLayout({params,children,}: {
    params: { domain: string };
    children: ReactNode;
}) {
    const domain = decodeURIComponent(params.domain);
    const data = await getSiteData(domain);

    if (!data) {
        notFound();
    }

    // Optional: Redirect to custom domain if it exists

    if (
        domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
        data.customDomain &&
        process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
    ) {
        return redirect(`https://${data.customDomain}`);
    }

    return (
        <div>
            <div className="ease left-0 right-0 top-0 z-30 flex h-16 bg-white transition-all duration-150 dark:bg-black dark:text-white">
                <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center space-x-5 px-10 sm:px-20">
                    <Link href="/" className="flex items-center justify-center">
                        <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
                            <Image
                                alt={data.name || ""}
                                height={40}
                                src={data.logo || ""}
                                width={40}
                            />
                        </div>
                        <span className="ml-3 inline-block truncate font-title font-medium">
              {data.name}
            </span>
                    </Link>
                </div>
            </div>

            <div className="mt-20">{children}</div>
        </div>
    );
}
