"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AuthNavMenu() {
  return (
    <nav className="dark:bg-gray-950 z-20 w-full border dark:border-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div>
          <Link href={`/`} className="text-lg font-bold">
            {/* {theme === "dark" ? ( */}
            
            <img src="/cl_logo.svg" className="mr-3 h-6" alt="Logo" />
            {/* )} */}
          </Link>
    
        </div>

        <div className="flex items-center gap-x-3">
          <div className={"p-3"}>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div>
            {/* <ThemeToggle /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
