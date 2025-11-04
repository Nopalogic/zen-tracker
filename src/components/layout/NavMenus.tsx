import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ElementType } from "react";
import { Link, useLocation } from "react-router-dom";

export function NavMenus({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: ElementType;
  }[];
}) {
  const { pathname } = useLocation();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          return (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton
                asChild
                isActive={checkIsActive(pathname, item.url)}
                tooltip={item.title}
              >
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function checkIsActive(href: string, url: string) {
  return (
    href === url || // /endpint?search=param
    href.split("?")[0] === url // endpoint
  );
}
