import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "~/lib/fetcher";
import {env} from "~/env.mjs";
import {MainNav} from "~/components/main-nav";
import {ThemeToggle} from "~/components/mode-toggle";
import * as React from "react";

export default async function SiteLayout({params,children,}: {
    params: { domain: string };
    children: ReactNode;
}) {

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

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={mainStoreNav}/>
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
