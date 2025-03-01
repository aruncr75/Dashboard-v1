import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        {!isMobile && <AppSidebar />}
        <main className="flex-1 pb-16 md:pb-0">
          <div className="max-w-7xl mx-auto animate-[scale-in_0.2s_ease-out]">
            {children}
          </div>
        </main>
        {isMobile && <MobileNav />}
      </div>
    </SidebarProvider>
  );
};