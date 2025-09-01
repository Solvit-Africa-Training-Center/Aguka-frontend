import logo from "assets/logo/agukalogo.png";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { MdWifiCalling3 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="p-10 flex gap-10 font-poppins w-full text-white space-x-50 ">
      <div className="place-items-center ">
        <div className="justify-center ">
          <img src={logo} alt="logo aguka" className="w-20 rounded-full " />
        </div>
        <div className="w-100 space-y-3 text-xl">
          <span className="">
            Empowering communities to build wealth together through modern
            Unguka. Join thousands who are achieving their financial goals
            faster.
          </span>
          <div className="flex gap-2 text-2xl">
            <Instagram />
            <Facebook />
            <Linkedin />
            <FcGoogle />
          </div>
        </div>
      </div>
      <div className="flex flex-col capitalize">
        <h2 className="text-3xl capitalize space-y-10 mb-5">legal</h2>
        <span className="text-xl">privancy policy</span>
        <span className="text-xl">terms of service</span>
        <span className="text-xl">compliance</span>
        <span className="text-xl">security</span>
      </div>
      <div className="flex flex-col capitalize">
        <h2 className="text-3xl capitalize space-y-10 mb-5">quick link</h2>
        <span className="text-xl">why aguka</span>
        <span className="text-xl">services</span>
        <span className="text-xl uppercase">faq</span>
      </div>
      <div className="flex flex-col ">
        <h2 className="text-3xl capitalize space-y-10 mb-5">contact us</h2>
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
  );
};

export default Footer;
