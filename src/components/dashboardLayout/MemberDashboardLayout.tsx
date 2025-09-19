import React, { useState } from "react";
import DashboardNavbar from "@components/dashboard/member/DashboardNavbar";
import AsidebarMember from "@components/dashboard/member/AsidebarMember";
import { Outlet } from "react-router-dom";

const MemberDashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#00353B] font-poppins">
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />

      <AsidebarMember
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="pt-24 px-8">
        <Outlet />
      </div>

     
    </div>
  );
};

export default MemberDashboardLayout;
