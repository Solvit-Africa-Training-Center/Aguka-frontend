import logo from "assets/logo/agukalogo.png";
import { NavLink } from "react-router-dom";

NavLink;
const NavBar: React.FC = () => {
  return (
    <div className=" w-full text-white text-2xl bg-primary-700 flex justify-between   fixed font-poppins pt-3 pb-3 pr-[114px] pl-[114px]">
      <div className="w-[100px] ">
        <img src={logo} alt="aguka logo" className="rounded-full" />
      </div>
      <div className="flex space-x-20 mt-5">
        <div className="space-x-10 font-bold p-4">
          <NavLink to="aguka" className="capitalize ">
            why anguka
          </NavLink>
          <NavLink to="service" className="capitalize">
            Services
          </NavLink>
          <NavLink to="faq" className="uppercase">
            faq
          </NavLink>
          <NavLink to="contact" className="capitalize ">
            Contact
          </NavLink>
        </div>
        <div className="space-x-10 font-semibold text-xl">
          <button className="capitalize bg-primary-400/40 rounded-xl p-4 text-center w-30">login</button>
          <button className="capitalize bg-primary-400/60 rounded-xl p-4 text-center ">get started</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
