import logo from "assets/logo/agukalogo.png";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { MdWifiCalling3 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="p-10 flex gap-10 font-poppins w-full text-white space-x-50 ">
        <div className="place-items-center ml-30">
          <div className="justify-center ">
            <img src={logo} alt="logo aguka" className="w-20 rounded-full " />
          </div>
          <div className="w-60 space-y-3 text-xl">
            <span className="">
              Empowering communities to build wealth together through modern
              Unguka. Join thousands who are achieving their financial goals
              faster.
            </span>
            <div className="flex gap-2 text-2xl text-secondary-300 mt-3">
              <FaInstagramSquare />
              <FaFacebook />
              <FaLinkedin />
              <FcGoogle />
              
            </div>
          </div>
        </div>
        <div className="flex flex-col capitalize mt-10">
          <h2 className="text-3xl capitalize space-y-10 mb-5">legal</h2>
          <Link to="/faq" className="text-xl">privancy policy</Link>
          <Link to="service" className="text-xl">terms of service</Link>
          <Link to="/"className="text-xl">compliance</Link>
          <Link to="/" className="text-xl">security</Link>
        </div>
        <div className="flex flex-col capitalize mt-10">
          <h2 className="text-3xl capitalize space-y-10 mb-5">quick link</h2>
          <a href="#about" className="text-xl">why aguka</a>
          <Link to="service" className="text-xl">services</Link>
          <Link to="faq" className="text-xl uppercase">faq</Link>
        </div>
        <div className="flex flex-col ">
          <h2 className="text-3xl capitalize space-y-10 mb-5 mt-10">contact us</h2>
          <div className="flex">
            <MdOutlineMail className="text-secondary-300 size-8 " />
            <span className="text-xl">unguka@gmail.com</span>
          </div>
          <div className="flex">
            <MdWifiCalling3 className="text-secondary-300 size-8 " />
            <span className="text-xl">+250781138331</span>
          </div>
          <div className="flex">
            <FaLocationDot className="text-secondary-300 size-8 " />
            <span className="text-xl">kigali,rwanda</span>
          </div>
        </div>
      </div>
      <div className=" w-full text-accent-100 p-5 relative">
        <hr className="w-300 text-center absolute left-70 " />
        <div className="text-sm text-center pt-15 capitalize">
          <span>
            &copy; 2025 Aguka.all rights reserved.Building Wealth through
            community.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
