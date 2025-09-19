import React, { useState } from "react";
import { Menu, Settings, CircleUserRound } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { Outlet } from "react-router-dom";
import AsidebarAdmin from "./AsidebarAdmin";

const AdminNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#003B42] flex justify-between items-center font-poppins p-4 fixed z-10 shadow-lg">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="focus:outline-none">
            <Menu className="text-white size-10 hover:text-secondary-300 transition" />
          </button>
          <img src={logo} alt="logo" className="w-25 h-25 rounded-full" />
          <span className="text-2xl text-white font-bold">Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          
          <div className="text-xl text-white capitalize">
            welcome,<span className="text-sm text-secondary-300">{}</span>
          </div>
          <CircleUserRound className="size-8 text-secondary-400" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border border-[#948E8E] rounded-lg bg-[#003B42]  transition cursor-pointer">
          <Settings className="size-6 text-secondary-400" />
          <span className="text-sm text-white">Settings</span>
        </div>
      </div>

      <AsidebarAdmin
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="pt-24">
        <Outlet />
      </div>
    </>
  );
};

export default AdminNavbar;
