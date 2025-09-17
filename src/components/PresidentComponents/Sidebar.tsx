import { FaTimes } from "react-icons/fa";
import logo from "assets/logo/agukalogo.png";
import { LayoutDashboard, BookMinus, BadgeDollarSign, UserPen, Settings, LogOut, Calendar} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
   const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#F4F4F4] text-[#003B42] font-semibold shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <FaTimes className="cursor-pointer text-xl" onClick={onClose} />
      </div>
<div className="flex justify-center items-center py-6">
  <img src={logo} alt="aguka logo" className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover"/>
</div>

      {/* Sidebar content */}
      <ul className="flex flex-col gap-4 p-4 text-xl mt-5">
      <li className="flex items-center gap-4 cursor-pointer hover:text-teal-600" onClick={() => navigate("/presidentdashboard")}><LayoutDashboard className="w-5 h-5 text-gray-600" /> <span>Dashboard</span></li>
      <li className="flex items-center gap-4 cursor-pointer hover:text-teal-600" onClick={() => navigate("/loan")} ><BookMinus className="w-5 h-5 text-gray-600"/><span>Loan Profile</span></li>
      <li className="flex items-center gap-4 cursor-pointer hover:text-teal-600" onClick={() => navigate("/approvals")} ><BadgeDollarSign className="w-5 h-5 text-gray-600"/><span>Approval&Decisions</span></li>
      <li className="flex items-center gap-4 cursor-pointer hover:text-teal-600"><Calendar className="w-5 h-5 text-gray-600"/><span>Calender</span></li>
      <li className="flex items-center gap-4 cursor-pointer hover:text-teal-600"><UserPen className="w-5 h-5 text-gray-600"/><span>User Profile</span> </li>
      <li className="flex items-center gap-4 cursor-pointer hover:text-teal-600"><Settings className="w-5 h-5 text-gray-600"/><span>Settings</span></li>
      </ul>
      <div>
      <ul className="flex flex-col gap-4 p-4 text-xl mt-20">
        <li className="flex items-center gap-2 cursor-pointer hover:text-teal-600 text-xl" onClick={() => navigate("/")}><LogOut/><span>Logout</span></li>
      </ul>
      </div>
    </div>
  );
};

export default Sidebar;
