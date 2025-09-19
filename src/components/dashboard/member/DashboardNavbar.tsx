import React, { useState } from "react";
import type { RootState } from "services/store/store";
import { Menu, Bell } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { Outlet } from "react-router-dom";
import AsidebarMember from "./AsidebarMember";
import { useSelector } from "react-redux";
const DashboardNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  // Compute initials safely
  const firstChar = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <>
      <div className="w-full bg-[#003B42] flex justify-between font-poppins p-4 fixed z-10">
        <div className="w-full p-2 flex items-center gap-10">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="text-white size-10 hover:text-secondary-300" />
          </button>
          <div className="flex gap-4 items-center">
            <img src={logo} alt="logo" className="w-25 h-25 rounded-full" />
            <span className="text-2xl text-white font-bold">Dashboard</span>
          </div>
        </div>
        <div className="flex gap-10 items-center text-2xl text-white relative right-30">
          <Bell className="size-10 absolute" />
          <span className="bg-red-500 rounded-full text-sm h-5 w-5 items-center mb-13 ml-5 pl-1 pb-5">
            2
          </span>
          <div className="font-poppins flex items-center">
            <div className="bg-secondary-400 text-white rounded-full w-15 h-15 flex items-center justify-center text-2xl">
              {firstChar}
            </div>
            <span className="text-sm">{user ? user.name : "Guest"}</span>
          </div>
        </div>
        <Outlet />
      </div>

      {/* Sidebar Component */}
      <AsidebarMember
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default DashboardNavbar;
