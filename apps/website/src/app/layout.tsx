import localFont from "next/font/local";

import { cn } from "@lumoflo/utils";

import "~/styles/globals.css";
import { Metadata } from "next";

import { fontSans } from "~/lib/fonts";
import { Providers } from "~/providers";

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
  // themeColor: [
  //     {media: "(prefers-color-scheme: light)", color: "white"},
  //     {media: "(prefers-color-scheme: dark)", color: "black"},
  // ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "lumoflo.com",
    title: "Lumoflo",
    description: "Lumoflo simplifies the process for Instagram sellers by offering tools like order management and shipment fulfillment. This allows you to concentrate on your business without getting caught up in operational complexities.",
    images: [`https://lumoflo.com/og.jpg`],
    siteName: "Lumoflo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumoflo",
    description: "",
    images: [`https://lumoflo.com/og.jpg`],
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
        url: "/favicon.svg",
        href: "/favicon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon.svg",
        href: "/favicon.svg",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
