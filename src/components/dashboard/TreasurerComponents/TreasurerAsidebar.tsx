import React from "react";
import { X, LayoutDashboard, User, UserPen, LogOut } from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuNotebook } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import { FaMoneyCheck } from "react-icons/fa6";
import logo from "assets/logo/agukalogo.png";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const TreasurerAsidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to the landing page after logout
  };

  return (
    <div
      onMouseLeave={onClose}
      className={`fixed top-0 left-0 h-full w-68 bg-white shadow-lg transform transition-transform duration-300 z-50
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="grid items-center p-4 border-b">
        <button
          onClick={onClose}
          className="text-black font-extrabold hover:text-secondary-300 place-self-end">
          <X size={30} />
        </button>
        <div className="flex items-center gap-2 mt-10 ml-12">
          <img src={logo} alt="Logo" className="w-30 h-30 rounded-full" />
        </div>
      </div>
      <h1 className="text-2xl pt-4 text-center font-bold text-[#003B42]">
        QuickAction
      </h1>
      <nav className="flex flex-col gap-2 p-4 font-poppins text-center font-bold">
        <Link
          to="/treasurerdashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/treasurerdashboard/allowcontribution"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <TbUsersGroup size={20} />
          contribution
        </Link>
        <Link
          to="/treasurerdashboard/contribution"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <FaMoneyCheck size={20} />
          Pay Contribution
        </Link>
        <Link
          to="/treasurerdashboard/userprofile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <UserPen size={20} />
          User Profile
        </Link>
        <Link
          to="/treasurerdashboard/loanprofile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700 ">
          <UserPen size={20} />
          Loan
        </Link>
        <Link
          to="/treasurerdashboard/myaccount"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <User size={20} />
          My Account
        </Link>
        <Link
          to="/treasurerdashboard/report"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700">
          <LuNotebook size={20} />
          Document&Report
        </Link>
        <Link
          to="/treasurerdashboard/loanapproval"
          className="flex items-center gap-3 p-3  rounded-lg hover:bg-gray-100 text-gray-700">
          <HiOutlineSpeakerphone size={25} />
          Loan Approval
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

export default TreasurerAsidebar;
