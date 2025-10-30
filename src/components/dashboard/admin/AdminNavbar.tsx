import React, { useState } from "react";
import { Menu, Settings, CircleUserRound } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { Outlet } from "react-router-dom";
import AsidebarAdmin from "./AsidebarAdmin";

const AdminNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#003B42] flex flex-wrap justify-between items-center font-poppins p-2 sm:p-3 md:p-4 fixed z-10 shadow-lg">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="focus:outline-none"
          >
            <Menu className="text-white w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 hover:text-secondary-300 transition" />
          </button>
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full"
          />
          <span className="text-lg sm:text-xl md:text-2xl text-white font-bold hidden sm:block">
            Dashboard
          </span>
        </div>

        {/* Center Section - Welcome */}
        <div className="flex items-center gap-2 order-last sm:order-none w-full sm:w-auto justify-center sm:justify-start mt-2 sm:mt-0">
          <div className="text-base sm:text-lg md:text-xl text-white capitalize flex items-center gap-2">
            welcome,
            <span className="text-xs sm:text-sm text-secondary-300">{}</span>
            <CircleUserRound className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-secondary-400" />
          </div>
        </div>

        {/* Right Section - Settings */}
        <div className="flex items-center gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-[#948E8E] rounded-lg bg-[#003B42] transition cursor-pointer hover:bg-[#004a54]">
          <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-400" />
          <span className="text-xs sm:text-sm text-white whitespace-nowrap">
            Settings
          </span>
        </div>
      </div>

      <AsidebarAdmin
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="pt-20 sm:pt-22 md:pt-24">
        <Outlet />
      </div>
    </>
  );
};

export default AdminNavbar;
