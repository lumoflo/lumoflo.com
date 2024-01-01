import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { getSiteData } from "~/lib/fetcher";
import {env} from "~/env.mjs";
import {MainNav} from "~/components/main-nav";
import {ThemeToggle} from "~/components/mode-toggle";
import * as React from "react";
import GithubStarBtn from "~/app/home/components/github-star-btn";
import Footer from "~/components/footer";
import {Button} from "@lumoflo/ui";
import Link from "next/link";

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
                    <div className={"flex flex-row items-center gap-4"}>
                        <ThemeToggle />
                        <Link href={`${env.BASE_URL == "localhost:3000" ? "http" : "https"}://app.${env.BASE_URL}/sign-in`}>
                            <Button variant={"ghost"}>
                                Login
                            </Button>
                        </Link>
                        <Link href={`https://elegant-gibbon-19.accounts.dev/sign-up?redirect_url=http%3A%2F%2Fapp.localhost%3A3000%2Fsign-in`}>
                            <Button className={"text-white"}>
                                Sign&nbsp;Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[1fr]">
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            <Footer/>
        </div>
    );
}
