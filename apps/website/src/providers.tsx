"use client";

import React, {useEffect} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { SWRConfig } from "swr";
import { dark } from '@clerk/themes';
import {ClerkProviderWrapper} from "~/providers/clerk-provider";


const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  useEffect(()=>{
      console.log(resolvedTheme)
  },[resolvedTheme])
  return (
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <ClerkProviderWrapper
            >
              <Toaster className="dark:hidden"/>
              <Toaster theme="dark" className="hidden dark:block"/>
              <SWRConfig value={{}}>
                <QueryClientProvider client={queryClient}>
                  {children}
                  <ReactQueryDevtools initialIsOpen={false}/>
                </QueryClientProvider>
              </SWRConfig>
            </ClerkProviderWrapper>
          </ThemeProvider>
  );
}
