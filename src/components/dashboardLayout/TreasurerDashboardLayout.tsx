import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TreasurerAsidebar from "@components/dashboard/TreasurerComponents/TreasurerAsidebar";
import TreasurerNavbar from "@components/dashboard/TreasurerComponents/TreasurerNavbar";

const TreasurerDashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div>
      <TreasurerNavbar />
      <div>
        <TreasurerAsidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TreasurerDashboardLayout;
