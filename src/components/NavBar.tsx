import logo from "assets/logo/agukalogo.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };
  const handleRegister = () => {
    navigate("/registermember");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="w-full text-white text-xl bg-[#003B42] flex justify-between items-center border-b border-primary-200 fixed font-poppins px-6 lg:px-[114px] py-3 z-20">
        {/* Logo */}
        <div className="w-[80px] lg:w-[100px]">
          <img src={logo} alt="aguka logo" className="rounded-full" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-20 items-center">
          <div className="space-x-10 font-bold">
            <a href="/">Why Aguka</a>
            <NavLink to="service" className="capitalize">
              Services
            </NavLink>
            <NavLink to="faq" className="uppercase">
              faq
            </NavLink>
            <a href="#footer" className="capitalize">
              Contact
            </a>
          </div>
          <div className="space-x-6 font-semibold text-xl">
            <button
              onClick={handleLogin}
              className="capitalize bg-[#002C32] hover:bg-[#E09721] rounded-xl px-5 py-2"
            >
              login
            </button>
            <button
              onClick={handleRegister}
              className="capitalize bg-[rgba(0,137,123,1)] hover:bg-[#F9A825] rounded-xl px-5 py-2"
            >
              get started
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-[70px] left-0 w-full bg-[#003B42] text-white z-20 p-6 space-y-6 font-bold">
          <a href="/" onClick={() => setIsOpen(false)}>
            Why Aguka
          </a>
          <NavLink to="service" onClick={() => setIsOpen(false)}>
            Services
          </NavLink>
          <NavLink to="faq" onClick={() => setIsOpen(false)}>
            FAQ
          </NavLink>
          <a href="#footer" onClick={() => setIsOpen(false)}>
            Contact
          </a>
          <div className="space-y-4 pt-4">
            <button
              onClick={handleLogin}
              className="w-full capitalize bg-[#002C32] hover:bg-[#E09721] rounded-xl px-5 py-4"
            >
              login
            </button>
            <button
              onClick={handleRegister}
              className="w-full capitalize bg-[rgba(0,137,123,1)] hover:bg-[#F9A825] rounded-xl px-5 py-4"
            >
              get started
            </button>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default NavBar;
