import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { MenuItems } from "./sidebar/MenuItems";
import { MoreDropdown } from "./sidebar/MoreDropdown";
import { SidebarHeader } from "./sidebar/SidebarHeader";

export function AppSidebar() {
  return (
    <Sidebar defaultCollapsed={false} collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <MenuItems />
            <MoreDropdown />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}