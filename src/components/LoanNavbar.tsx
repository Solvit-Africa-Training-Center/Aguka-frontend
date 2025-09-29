import React from "react";
import logo from "assets/logo/agukalogo.png";
import profilePic from "assets/logo/profile.jpg";

type LoanNavbarProps = {
  profileImage?: string;
};

const LoanNavbar: React.FC<LoanNavbarProps> = ({
  profileImage = profilePic,
}) => {
  return (
    <div className="bg-[#003B42] text-white flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 font-poppins w-full">
      {/* Logo */}
      <img
        src={logo}
        alt="Logo"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
      />

      {/* Title */}
      <h1 className="text-base sm:text-xl md:text-2xl font-bold text-center flex-1 mx-2 sm:mx-4">
        Loan Profile
      </h1>

      {/* Profile Picture */}
      <img
        src={profileImage}
        alt="User"
        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full border-2 border-white"
      />
    </div>
  );
};

export default LoanNavbar;
