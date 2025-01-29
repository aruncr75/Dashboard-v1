import { Menu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dropdownItems = [
  { title: "Dashboard", path: "/" },
  { title: "Tasks", path: "/tasks" },
  { title: "Analytics", path: "/analytics" },
];

export function MoreDropdown() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300">
              <div className="flex items-center space-x-2">
                <Menu className="w-5 h-5" />
                <span className="animate-fade-in transition-opacity duration-300 sidebar-text">
                  More
                </span>
              </div>
              <ChevronDown className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover">
            {dropdownItems.map((item) => (
              <DropdownMenuItem key={item.path} asChild>
                <Link
                  to={item.path}
                  className="w-full cursor-pointer hover:bg-primary/20 hover:text-primary"
                >
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}