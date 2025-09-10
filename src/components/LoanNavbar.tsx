
import React from "react";
import logo from "assets/logo/agukalogo.png";
import profilePic from "assets/logo/profile.jpg"; 

type LoanNavbarProps = {
  userName?: string; 
  profileImage?: string; 
};

const LoanNavbar: React.FC<LoanNavbarProps> = ({ profileImage = profilePic }) => {
  return (
    <div className="bg-[#004147] text-white flex items-center justify-between px-6 py-4 rounded-t-xl font-poppins">
      <img
        src={logo}
        alt="Logo"
        className="w-20 h-20 rounded-full"/>

      <h1 className="text-xl font-bold">Loan Profile</h1>

      <img src={profileImage} alt="User" className="h-20 w-20 rounded-full border border-white"/>
      
    </div>
  );
};

export default LoanNavbar;
