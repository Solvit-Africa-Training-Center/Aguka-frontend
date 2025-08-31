import logo from "assets/logo/agukalogo.png";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { MdWifiCalling3 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className="p-10 flex gap-10 font-poppins w-full text-white">
      <div className="place-items-center">
        <div className="justify-center ">
          <img src={logo} alt="logo aguka" className="w-20 rounded-full " />
        </div>
        <div className="">
          <span className="">
            Empowering communities to build wealth together through modern
            Unguka. Join thousands who are achieving their financial goals
            faster.
          </span>
          <div className="flex gap-5">
            <Instagram />
            <Facebook />
            <Linkedin />
            <FcGoogle />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h2>legal</h2>
        <span>privancy policy</span>
        <span>terms of service</span>
        <span>compliance</span>
        <span>security</span>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl">quick link</h2>
        <span>why aguka</span>
        <span>services</span>
        <span>faq</span>
      </div>
      <div className="flex flex-col">
        <h2>contactus</h2>
        <MdOutlineMail />
        <span>unguka@gmail.com</span>
        <MdWifiCalling3 />
        <span>+250781138331</span>
        <FaLocationDot />
        <span>kigali,rwanda</span>
      </div>
    </div>
  );
};

export default Footer;
