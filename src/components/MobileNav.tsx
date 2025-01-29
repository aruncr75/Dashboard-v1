import { Home, BarChart, CheckSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: BarChart, label: "Analytics", path: "/analytics" },
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-[#403E43] px-4 py-2 flex justify-around items-center animate-slide-in md:hidden">
      {navItems.map(({ icon: Icon, label, path }) => (
        <Link
          key={path}
          to={path}
          className={`flex flex-col items-center p-2 ${
            location.pathname === path
              ? "text-[#06b6d4]"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Icon className="w-6 h-6" />
          <span className="text-xs mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  );
};