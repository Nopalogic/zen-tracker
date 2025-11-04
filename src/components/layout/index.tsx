import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar variant="floating" />
        <SidebarInset>
          <header className="h-16 w-[inherit]">
            <div className="relative flex h-full items-center px-4">
              <SidebarTrigger variant="outline" className="max-md:scale-125" />
            </div>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
