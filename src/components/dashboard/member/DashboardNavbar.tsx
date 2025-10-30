import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "lucide-react";
import type { RootState } from "services/store/store";
import logo from "assets/logo/agukalogo.png";

interface DashboardNavbarProps {
  onOpenSidebar: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onOpenSidebar }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const firstChar = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "?";

  const displayName = user?.name || user?.email || "Guest";

  return (
    <div className="w-full bg-[#003B42]/95 backdrop-blur-sm flex justify-between font-poppins fixed z-10 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 shadow-lg">
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
        <button
          onClick={onOpenSidebar}
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-white hover:text-secondary-300 transition-colors" />
        </button>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <img
            src={logo}
            alt="Aguka logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-md"
          />
          <span className="text-lg sm:text-xl md:text-2xl text-white font-bold hidden sm:block">
            Dashboard
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-2 sm:gap-3 bg-black/20 py-1.5 px-2 sm:px-3 rounded-full">
          <div className="bg-secondary-400 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center text-sm sm:text-base md:text-lg font-medium shadow-sm">
            {firstChar}
          </div>
          <span className="text-xs sm:text-sm md:text-base text-white font-medium pr-1">
            {displayName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
