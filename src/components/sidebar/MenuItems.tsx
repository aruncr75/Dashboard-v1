import { Home, BarChart, CheckSquare, Repeat, TestTube, BookOpen, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export const menuItems = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Tasks", icon: CheckSquare, path: "/tasks" },
  { title: "Analytics", icon: BarChart, path: "/analytics" },
  { title: "Routine", icon: Repeat, path: "/routine" },
  { title: "Journaling", icon: BookOpen, path: "/journaling" },
  { title: "Gemini AI", icon: Bot, path: "/gemini-ai" }, // Updated path and title
  { title: "Test", icon: TestTube, path: "/test" },
];

export function MenuItems() {
  const location = useLocation();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton asChild tooltip={item.title}>
            <Link
              to={item.path}
              className={`flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-primary/20 hover:text-primary"
              }`}
            >
              <div className="flex items-center space-x-2">
                <item.icon className="w-5 h-5" />
                <span className="animate-fade-in transition-opacity duration-300 sidebar-text">
                  {item.title}
                </span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}