import React from "react";
import { useSelector } from "react-redux";
import { Menu, } from "lucide-react";
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
    <div className="w-full bg-[#003B42] flex justify-between font-poppins p-4 fixed z-10">
      <div className="w-full p-2 flex items-center gap-10">
        <button onClick={onOpenSidebar}>
          <Menu className="text-white size-10 hover:text-secondary-300" />
        </button>
        <div className="flex gap-4 items-center">
          <img src={logo} alt="logo" className="w-25 h-25 rounded-full" />
          <span className="text-2xl text-white font-bold">Dashboard</span>
        </div>
      </div>
      <div className="flex gap-10 items-center text-2xl text-white relative right-30">
      <div className="font-poppins flex items-center gap-2">
  <div className="bg-secondary-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
    {firstChar}
  </div>
  <span className="text-sm text-white">{displayName}</span>
</div>

      </div>
    </div>
  );
};

export default DashboardNavbar;
