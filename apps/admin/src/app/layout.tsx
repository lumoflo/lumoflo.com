import localFont from "next/font/local";

import { TailwindIndicator } from "@gramflow/ui";
import { cn } from "@gramflow/utils";

import { ThemeProvider } from "~/providers/theme-provider";
import "~/styles/globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { fontSans } from "~/lib/fonts";
import QueryProvider from "~/providers/query-provider";

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "Lumoflo",
    template: `Lumoflo`,
  },
  description: "",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "lumoflo.com",
    title: "Lumoflo",
    description: "",
    images: [`/cl_og.jpg`],
    siteName: "Lumoflo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumoflo",
    description: "",
    images: [`/cl_og.jpg`],
    creator: "@lumoflo",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: false,
    },
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon-dark.ico",
        href: "/favicon-dark.ico",
      },
    ],
  },
  manifest: `/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <QueryProvider>
          <head />
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable,
              fontHeading.variable,
            )}
          >
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Toaster theme="dark" />
              <div className={`relative flex min-h-screen flex-col`}>
                {children}
              </div>
            </ThemeProvider>

            <TailwindIndicator />
          </body>
        </QueryProvider>
      </html>
    </ClerkProvider>
  );
}
