import React from "react";
import { X, LayoutDashboard,UserPen, Users, BookMinus, LogOut, BadgeDollarSign, Bell } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AsidebarPresident: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="grid items-center p-4 border-b">
        <button
          onClick={onClose}
          className="ml-40 text-black hover:text-secondary-300">
          <X size={30} />
        </button>
        <div className="flex items-center justify-center mt-6">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
        </div>
      </div>

      <h1 className="text-2xl pt-4 text-center font-bold text-[#003B42]">
        President Panel
      </h1>

      <nav className="flex flex-col gap-2 p-4 font-poppins font-bold">
        <Link
          to="presidentdashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
         <Link
          to="loanprofile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <BookMinus size={20} />
          Loan Profile
        </Link>
         <Link
          to="approvals"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <BadgeDollarSign size={20} />
          Approval & Decisions
        </Link>
        <Link
          to="managemembers"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <Users size={20} />
          Manage members
        </Link>
         <Link
          to="notifications"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <Bell size={20} />
           Notifications
        </Link>
        <Link
          to="userprofile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <UserPen size={20} />
          User Profile
        </Link>

      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-secondary-300 text-[#003B42] font-bold text-xl">
          <LogOut size={24} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AsidebarPresident;
