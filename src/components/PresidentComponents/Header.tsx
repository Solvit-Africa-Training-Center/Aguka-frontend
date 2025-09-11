
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useState } from "react";
import Sidebar from "@components/PresidentComponents/Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-[#003B42] text-white">
        <div className="flex items-center gap-10">
          {/* Menu button */}
          <FaBars
            className="text-2xl cursor-pointer hover:text-teal-300 transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          />
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        <FaUserCircle className="text-3xl" />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
