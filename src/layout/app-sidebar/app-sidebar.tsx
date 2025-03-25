import * as React from "react";
import { Ban, ListChecks, Loader } from "lucide-react";

import { NavMain } from "@/layout/app-sidebar/nav-main";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

export interface NavMainItem {
  title: string;
  url: string;
  icon: React.ElementType;
  isActive: boolean;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [navMain, setNavMain] = React.useState<NavMainItem[]>([
    {
      title: "Gateways",
      url: "/",
      icon: ListChecks,
      isActive: true,
    },
    {
      title: "404",
      url: "/404",
      icon: Ban,
      isActive: false,
    },
    {
      title: "Loading",
      url: "/loading",
      icon: Loader,
      isActive: false,
    },
  ]);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <div className="text-lg font-black font-mono p-3 border rounded-sm mb-4 bg-neutral-950 text-orange-500">
          {import.meta.env.VITE_APP_NAME || "WNMT"}
        </div>
        <NavMain items={navMain} setActiveItem={setNavMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
