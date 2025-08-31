import image from "assets/image/avatar.png";
import { MoveRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex  min-h-screen font-poppins ">
      <div className="  flex  gap-10 mt-50 p-10">
        <div className="space-y-7 text-left ">
          <h2 className="text-7xl text-white  capitalize  font-semibold">
            save together,
          </h2>
          <h2 className="text-7xl text-secondary-300 capitalize  font-semibold">
            grow together
          </h2>
          <p className=" text-[rgba(255,255,255,1)] text-3xl space-y-3 w-150 ">
            Join thousands building wealth through community-powered tontine
            circles. Pool your savings, take turns receiving, and achieve your
            financial goals faster.
          </p>
          <div className=" text-white pt-15 flex gap-20 ">
            <button className="bg-[rgba(0,59,66,1)] hover:bg-primary-500/50 p-4 w-50 rounded-xl capitalize text-xl flex ">
              <span>stay your circle </span>
              <span>
                <MoveRight className="size-6 mt-1 ml-2" />
              </span>
            </button>
            <button className="bg-[rgba(48,119,128,1)] hover:bg-primary-300 p-4 w-50 rounded-xl capitalize text-xl">
              why aguka ?
            </button>
          </div>
        </div>
        <div className="">
          <img
            src={image}
            alt="avatar community"
            className="w-[500px] h-[500px] "
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
