import { DashboardConfig } from "~/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Orders",
      href: "/dashboard",
      icon: "shoppingCart",
    },
    {
      title: "Stores",
      href: "/dashboard/stores",
      icon: "shoppingBag",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}