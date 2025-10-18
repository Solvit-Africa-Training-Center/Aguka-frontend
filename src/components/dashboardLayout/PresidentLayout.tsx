import React, { useState } from "react";
import DashboardNavbar from "@components/dashboard/member/DashboardNavbar"; // reuse navbar
import { Outlet } from "react-router-dom";
import AsidebarPresident from "@components/dashboard/PresidentComponents/AsideBarPresident";

const PresidentLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#002F35] flex">
      <AsidebarPresident
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 mt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PresidentLayout;
