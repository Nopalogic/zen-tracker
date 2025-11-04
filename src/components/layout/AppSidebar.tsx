import { List, Timer } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ComponentProps } from "react";
import { NavMenus } from "./NavMenus";

const data = {
  projects: [
    {
      title: "Trackers",
      url: "/",
      icon: Timer,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: List,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <div className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Zen Tracker</span>
                <span className="truncate text-xs">Time Tracker App</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenus items={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
