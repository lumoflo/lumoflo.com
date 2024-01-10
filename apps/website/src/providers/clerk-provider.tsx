"use client";

import React, {useEffect} from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTheme } from "next-themes";
import { dark } from '@clerk/themes';



export function ClerkProviderWrapper({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    useEffect(()=>{
        console.log(resolvedTheme)
    },[resolvedTheme])
    return (
            <ClerkProvider
                appearance={{
                    baseTheme: resolvedTheme === "dark" ? dark : undefined,
                }}
            >
                {children}
            </ClerkProvider>
    );
}
