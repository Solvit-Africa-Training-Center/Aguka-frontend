import React from "react";
import logo from "assets/logo/agukalogo.png";
import profilePic from "assets/logo/profile.jpg";

type LoanNavbarProps = {
  profileImage?: string;
};

const LoanNavbar: React.FC<LoanNavbarProps> = ({ profileImage = profilePic }) => {
  return (
    <div className="bg-[#003B42] text-white flex items-center justify-between px-4 sm:px-6 py-4 font-poppins w-full">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" />

      {/* Title */}
      <h1 className="text-lg sm:text-2xl font-bold text-center flex-1">
        Loan Profile
      </h1>

      {/* Profile Picture */}
      <img
        src={profileImage}
        alt="User"
        className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white"
      />
    </div>
  );
};

export default LoanNavbar;
