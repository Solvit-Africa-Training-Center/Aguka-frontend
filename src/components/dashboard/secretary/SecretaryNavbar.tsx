import React, { useState } from "react";
import type { RootState } from "services/store/store";
import { Menu } from "lucide-react";
import logo from "assets/logo/agukalogo.png";

import { useSelector } from "react-redux";
import SecretaryAsidebar from "./SecretaryAsidebar";
const SecretaryNavbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  // Compute initials safely
  const firstChar = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "?";

  const displayName = user?.name || user?.email || "Guest";

  return (
    <>
<<<<<<< HEAD

      <div className="w-full bg-[#003B42] flex justify-between font-poppins p-2 fixed z-10 shadow-lg">
=======
      <div className="w-full bg-[#003B42] flex justify-between font-poppins p-4 fixed z-10 shadow-lg font-poppins">
>>>>>>> 67e1d4a (merge refactor)
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
          {/* <Bell className="size-10 absolute" />
          <span className="bg-red-500 rounded-full text-sm h-5 w-5 items-center mb-13 ml-5 pl-1 pb-5">
            2
          </span> */}
          <div className="font-poppins flex items-center">
            <div className="bg-secondary-400 text-white rounded-full w-15 h-15 flex items-center justify-center text-2xl">
              {firstChar}
            </div>
            <span className="text-sm">{displayName}</span>
          </div>
        </div>
      </div>

      {/* Sidebar Component */}
      <SecretaryAsidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default SecretaryNavbar;
