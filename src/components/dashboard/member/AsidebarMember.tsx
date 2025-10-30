import React from "react";
import {
  X,
  LayoutDashboard,
  BookMinus,
  BadgeDollarSign,
  UserPen,
  LogOut,
} from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { FaMoneyCheck } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AsidebarMember: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const HandlePage = () => {
    navigate("/");
  };
  return (
    <div
      onMouseLeave={onClose}
      className={`fixed top-0 left-0 h-full w-[280px] sm:w-[300px] md:w-[320px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex flex-col p-4 border-b">
        <button
          onClick={onClose}
          className="text-black self-end hover:text-secondary-300 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7" />
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
      <nav className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4 font-poppins font-bold">
        <Link
          to="memberdashboard"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base group"
        >
          <LayoutDashboard className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-secondary-300 transition-colors" />
          <span className="group-hover:translate-x-0.5 transition-transform">
            Dashboard
          </span>
        </Link>
        <Link
          to="loanprofile"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base group"
        >
          <BookMinus className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-secondary-300 transition-colors" />
          <span className="group-hover:translate-x-0.5 transition-transform">
            Loan Profile
          </span>
        </Link>
        <Link
          to="contribution"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base group"
        >
          <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-secondary-300 transition-colors flex items-center justify-center">
            <FaMoneyCheck className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </div>
          <span className="group-hover:translate-x-0.5 transition-transform">
            Contribution
          </span>
        </Link>
        <Link
          to="payment"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base group"
        >
          <BadgeDollarSign className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-secondary-300 transition-colors" />
          <span className="group-hover:translate-x-0.5 transition-transform">
            Payment
          </span>
        </Link>
        <Link
          to="userprofile"
          className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors text-sm sm:text-base group"
        >
          <UserPen className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:text-secondary-300 transition-colors" />
          <span className="group-hover:translate-x-0.5 transition-transform">
            User Profile
          </span>
        </Link>
      </nav>

      {/* Logout (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t bg-white">
        <button
          onClick={HandlePage}
          className="flex items-center justify-center gap-2 sm:gap-3 p-2.5 sm:p-3 w-full rounded-lg hover:bg-secondary-300 text-[#003B42] font-bold text-base sm:text-lg transition-colors group"
        >
          <LogOut className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:rotate-12 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default AsidebarMember;
