import React from "react";
import { X, LayoutDashboard, UserPen, LogOut } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AsidebarAdmin: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const HandlePage = () => {
    navigate("/");
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-[280px] sm:w-[300px] md:w-[320px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col p-4 border-b">
        <button
          onClick={onClose}
          className="text-black self-end hover:text-secondary-300 transition-colors"
        >
          <X size={24} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
        </button>
        <div className="flex items-center justify-center mt-8 mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full shadow-md"
          />
        </div>
      </div>
      <h1 className="text-xl sm:text-2xl py-4 text-center font-bold text-[#003B42]">
        QuickAction
      </h1>
      {/* Links */}
      <nav className="flex flex-col gap-1 sm:gap-2 p-3 sm:p-4 font-poppins font-bold">
        <Link
          to="/admindashboard"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base"
        >
          <LayoutDashboard className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          Dashboard
        </Link>
        
        <Link
          to="/admindashboard/userprofile"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base"
        >
          <UserPen className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          User Profile
        </Link>
      </nav>

      {/* Logout (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t bg-white">
        <button
          onClick={HandlePage}
          className="flex items-center justify-center gap-2 sm:gap-3 p-2.5 sm:p-3 w-full rounded-lg hover:bg-secondary-300 text-[#003B42] font-bold text-base sm:text-lg md:text-xl transition-colors"
        >
          <LogOut className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AsidebarAdmin;
