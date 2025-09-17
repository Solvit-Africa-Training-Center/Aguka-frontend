import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const HandlePage = () => {
    navigate("/");
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#003B42] text-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}>
      {/* Close button */}
      <div className="flex justify-end p-4">
        <FaTimes className="cursor-pointer text-xl" onClick={onClose} />
      </div>

      {/* Sidebar content */}
      <ul className="flex flex-col gap-4 p-4">
        <li className="hover:text-teal-300 cursor-pointer">Dashboard</li>
        <li className="hover:text-teal-300 cursor-pointer">Loans</li>
        <li className="hover:text-teal-300 cursor-pointer">Members</li>
        <li className="hover:text-teal-300 cursor-pointer">Settings</li>
      </ul>
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={HandlePage}
          className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-secondary-300 text-white font-bold text-xl">
          <LogOut size={24} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
