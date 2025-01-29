import { Menu, ChevronLeft } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

export function SidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex items-center justify-between p-4">
      {isCollapsed ? (
        <ChevronLeft className="w-6 h-6 text-primary" />
      ) : (
        <span className="text-xl font-bold animated-gradient-text">Todo App</span>
      )}
      <SidebarTrigger>
        <Menu className="w-6 h-6 transition-transform duration-300 hover:rotate-180 sidebar-icon" />
      </SidebarTrigger>
    </div>
  );
}