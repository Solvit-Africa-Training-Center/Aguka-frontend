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
    <div className="w-full text-white font-poppins">
      <div className="p-6 sm:p-10 flex flex-col md:flex-row gap-10 bg-[#456E73] w-full">
        {/* Logo + Description */}
        <div className="flex-1">
          <div>
            <img src={logo} alt="logo aguka" className="w-20 rounded-full" />
          </div>
          <div className="w-full mt-4 space-y-3 text-base sm:text-lg">
            <span>
              Empowering communities to build wealth together through modern
              Unguka. Join thousands who are achieving their financial goals
              faster.
            </span>
            <div className="flex gap-3 text-xl sm:text-2xl mt-3">
              <FaInstagramSquare />
              <FaFacebook />
              <FaLinkedin />
              <FcGoogle />
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col capitalize mt-6 md:mt-0 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4">legal</h2>
          <Link
            to="/faq"
            className="text-base sm:text-lg md:text-xl hover:underline"
          >
            privacy policy
          </Link>
          <Link
            to="service"
            className="text-base sm:text-lg md:text-xl hover:underline"
          >
            terms of service
          </Link>
          <Link
            to="/"
            className="text-base sm:text-lg md:text-xl hover:underline"
          >
            compliance
          </Link>
          <Link
            to="/"
            className="text-base sm:text-lg md:text-xl hover:underline"
          >
            security
          </Link>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col capitalize mt-6 md:mt-0 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4">quick link</h2>
          <a
            href="#about"
            className="text-base sm:text-lg md:text-xl hover:underline"
          >
            why aguka
          </a>
          <Link
            to="service"
            className="text-base sm:text-lg md:text-xl hover:underline"
          >
            services
          </Link>
          <Link
            to="faq"
            className="text-base sm:text-lg md:text-xl uppercase hover:underline"
          >
            faq
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col mt-6 md:mt-0 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl capitalize mb-4">
            contact us
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <MdOutlineMail className="text-secondary-300 size-5 sm:size-6 md:size-8" />
            <span className="text-base sm:text-lg md:text-xl">
              unguka@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MdWifiCalling3 className="text-secondary-300 size-5 sm:size-6 md:size-8" />
            <span className="text-base sm:text-lg md:text-xl">
              +250781138331
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-secondary-300 size-5 sm:size-6 md:size-8" />
            <span className="text-base sm:text-lg md:text-xl">
              kigali, rwanda
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full text-accent-200 p-6 sm:p-10">
        <hr className="w-full sm:w-[300px] mx-auto" />
        <div className="text-xs sm:text-sm text-center pt-4 sm:pt-6 capitalize">
          <span>
            &copy; 2025 Aguka. all rights reserved. Building Wealth through
            community.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
