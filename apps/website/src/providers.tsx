"use client";

import {SessionProvider} from "next-auth/react";
import {Toaster} from "sonner";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from "react";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {ThemeProvider} from "next-themes";


const queryClient = new QueryClient()

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Toaster className="dark:hidden"/>
            <Toaster theme="dark" className="hidden dark:block"/>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
                    {children}
                </ThemeProvider>
                <ReactQueryDevtools initialIsOpen={false}/>
            </QueryClientProvider>
        </SessionProvider>
    );
}