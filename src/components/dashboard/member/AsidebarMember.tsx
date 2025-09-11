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
      className={`fixed top-0 left-0 h-full w-64  bg-white shadow-lg transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="grid items-center  p-4 border-b  ">
        <button
          onClick={onClose}
<<<<<<< HEAD
          className="text-black  ml-45 font-extrabold hover:text-secondary-300">
=======
          className="text-black hover:text-black ml-45 font-extrabold hover:text-secondary-300">
>>>>>>> 4c8f63c (commited dashboard)
          <X size={30} />
        </button>
        <div className="flex items-center gap-2  mt-20 ml-12 ">
          <img src={logo} alt="Logo" className="w-30 h-30 rounded-full " />
        </div>
      </div>
      <h1 className="text-2xl pt-4 text-center font-bold text-[#003B42]">
        QuickAction
      </h1>
      {/* Links */}
      <nav className="flex flex-col gap-2 p-4 font-poppins text-center font-bold">
        <Link
          to="/memberdashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 ">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/loan"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <BookMinus size={20} />
          Loan Profile
        </Link>
        <Link
          to="/payment"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <BadgeDollarSign size={20} />
          Payment
        </Link>
        <Link
          to="/loanprofile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <UserPen size={20} />
          User Profile
        </Link>
      </nav>

      {/* Logout (bottom) */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={HandlePage}
          className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-secondary-300 text-[#003B42] font-bold text-xl">
          <LogOut size={24} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AsidebarMember;
