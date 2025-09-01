import image from "assets/image/aguka community.png";

import { MoveRight } from "lucide-react";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
const Hero = () => {
  return (
    <div className="flex w-full min-h-screen ">
      <div className="grid grid-cols-2 mt-50  ml-[126px]">
        <div className="space-y-7 text-left w-[931px] h-[828px]">
          <h2 className="text-7xl text-white  capitalize  font-semibold">
            save together,
          </h2>
          <h2 className="text-7xl text-secondary-300 capitalize  font-semibold">
            grow together
          </h2>
          <p className=" text-[rgba(255,255,255,1)] text-2xl space-y-3 w-150 ">
            Join thousands building wealth through community-powered tontine
            circles. Pool your savings, take turns receiving, and achieve your
            financial goals faster.
          </p>
          <div className=" text-white pt-15 flex gap-10 w-full mt-20 ">
            <button className="bg-[rgba(0,59,66,1)] hover:bg-primary-500/50 p-4 w-60 rounded-xl capitalize text-xl flex ">
              <span>stay your circle </span>
              <span>
                <MoveRight className="size-6 mt-1 ml-2" />
              </span>
            </button>
            <button className="bg-[rgba(48,119,128,1)] hover:bg-primary-300 p-4 w-60 rounded-xl capitalize text-xl">
              why aguka ?
            </button>
          </div>
        </div>
        <div className="w-full  ">
          <img src={image} alt="avatar community " className=" w-full h-130 " />
          <div className="fixed ml-200">
            <BiSolidMessageRoundedDetail className="size-20 bg-secondary-300 rounded-full p-4 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
