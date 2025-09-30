import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-12">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
