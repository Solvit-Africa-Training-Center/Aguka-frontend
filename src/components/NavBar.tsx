import logo from "assets/logo/agukalogo.png";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className=" w-full text-white text-2xl bg-[#003B42] flex justify-between   fixed font-poppins pt-3 pb-3 pr-[114px] pl-[114px] z-20">
      <div className="w-[100px] ">
        <img src={logo} alt="aguka logo" className="rounded-full" />
      </div>
      <div className="flex space-x-20 mt-5">
        <div className="space-x-10 font-bold p-4">
          <a href="#about" className="capitalize ">
            why aguka
          </a>

          <NavLink to="service" className="capitalize">
            Services
          </NavLink>
          <NavLink to="faq" className="uppercase">
            faq
          </NavLink>
          <a href="#footer" className="capitalize ">
            Contact
          </a>
        </div>
        <div className="space-x-10 font-semibold text-xl">
          <button
            onClick={handleLogin}
            className="capitalize bg-[#002C32] hover:bg-[#E09721] w-30 rounded-xl p-4 text-center ">
            login
          </button>
          <button
            onClick={handleRegister}
            className="capitalize  bg-[rgba(0,137,123,1)] hover:bg-[#F9A825] rounded-xl p-4 text-center ">
            get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
