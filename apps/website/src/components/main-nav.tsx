import Link from "next/link";

import { cn } from "@lumoflo/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
//     return (
//         <div className="flex gap-6 md:gap-10">
//             <Link href="/" className="hidden items-center space-x-2 md:flex">
//                 {
//                     logo ? logo : <img src="/cl_logo.svg" className="mr-3 h-4" alt="Logo"/>
//                 }
//                 {/* <span className="hidden font-bold sm:inline-block">
//           {siteConfig.name}
//         </span> */}
//             </Link>
//             {items?.length ? (
//                 <nav className="hidden gap-6 md:flex">
//                     {items?.map((item, index) => (
//                         <Link
//                             key={index}
//                             href={item.disabled ? "#" : item.href}
//                             className={cn(
//                                 "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
//                                 item.href.startsWith(`/${segment}`)
//                                     ? "text-foreground"
//                                     : "text-foreground/60",
//                                 item.disabled && "cursor-not-allowed opacity-80",
//                             )}
//                         >
//                             {item.title}
//                         </Link>
//                     ))}
//                 </nav>
//             ) : null}
//             <button
//                 className="flex items-center space-x-2 md:hidden"
//                 onClick={() => setShowMobileMenu(!showMobileMenu)}
//             >
//                 {showMobileMenu ? <Icons.close/> : <Icons.logo/>}
//                 {
//                     logo ? logo : <img src="/cl_logo.svg" className="mr-3 h-4" alt="Logo"/>
//                 }
//             </button>
//             {showMobileMenu && items && (
//                 <MobileNav items={items} logo={logo}>{children}</MobileNav>
//             )}
//         </div>
//     );
}
