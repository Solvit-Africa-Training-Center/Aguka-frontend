import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SecretaryNavbar from "@components/dashboard/secretary/SecretaryNavbar";
import SecretaryAsidebar from "@components/dashboard/secretary/SecretaryAsidebar";

const SecretaryDashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div>
      <SecretaryNavbar />
      <div>
        <SecretaryAsidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SecretaryDashboardLayout;
