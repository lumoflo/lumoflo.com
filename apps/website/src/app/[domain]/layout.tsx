import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "~/lib/fetcher";
import {env} from "~/env.mjs";
import {MainNav} from "~/components/main-nav";
import {UserButton} from "@clerk/nextjs";
import {SiteFooter} from "~/components/site-footer";
import {ThemeToggle} from "~/components/mode-toggle";
import * as React from "react";

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
        domain.endsWith(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
        data.customDomain &&
        process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
    ) {
        return redirect(`https://${data.customDomain}`);
    }


    const mainStoreNav = [
        {
            title: "Documentation",
            href: "/docs",
        },
        {
            title: "Support",
            href: "/support",
            disabled: true,
        },
    ]

    const logo = <>
        <div className="inline-block h-8 w-8 overflow-hidden rounded-full align-middle">
            <img
                alt={data.name || ""}
                src={"https://unsplash.it/40/40"}
                className={"rounded-full h-40 w-40"}
            />
        </div>
        <span className="ml-3 inline-block truncate font-title font-bold">
            {data.name}
        </span>
    </>

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={mainStoreNav} logo={logo} />
                    <ThemeToggle />
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[1fr]">
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
