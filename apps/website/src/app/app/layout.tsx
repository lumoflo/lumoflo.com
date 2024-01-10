import { UserButton } from "@clerk/nextjs";

import { MainNav } from "~/components/main-nav";
import { SiteFooter } from "~/components/site-footer";
import { StoreSwitcher } from "~/components/store-switcher";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={`relative flex min-h-screen flex-col`}>
        <div className="flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <div className="flex items-center space-x-2">
                
                <MainNav className="mx-6" />
                <StoreSwitcher />
              </div>
              <div className="ml-auto flex items-center space-x-4">
                <UserButton />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
