import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
