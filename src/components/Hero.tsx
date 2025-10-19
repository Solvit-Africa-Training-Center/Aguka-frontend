import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex w-full  min-h-screen bg-cover bg-center bg-[url('/bg-gif.gif')]  font-poppins">
      <div className="space-y-7 inset-0 bg-[#003B42B2]/90 w-full  md:mt-10 place-content-center items-center place-items-center">
        <div className="flex flex-col space-y-2 text-center md:text-left w-full">
          <h2 className="text-3xl  sm:text-[64px] md:text-[80px] lg:text-[90px] text-white mt-40 capitalize font-semibold px-8">
            <span className="text-secondary-300 capitalize font-semibold md:ml-10 ">
              save together,
            </span>
            <span className="text-white capitalize font-semibold">
              grow together
            </span>
          </h2>

          <p className="text-[#F4F4F4] text-sm sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[30px] font-poppins text-center mx-auto px-4">
            Join thousands building wealth through community-powered tontine
            circles. Pool your savings, take turns receiving, and achieve your
            financial goals faster.
          </p>

          <div className=" text-white md:pt-15 flex  gap-10  md:mt-5 relative justify-center">
            <div className="flex flex-col md:grid md:grid-cols-2 md:space-x-10 gap-4">
              <button className="bg-[rgba(0,59,66,1)] hover:bg-[#FFA629] p-4 md:p-6  w-60 rounded-xl capitalize text-xl flex  font-semibold">
                <Link to="/registermember">start your circle </Link>
                <span>
                  <MoveRight className="size-6 mt-1 ml-2" />
                </span>
              </button>
              <a href="#about">
                {" "}
                <button className="bg-[rgba(48,119,128,1)] hover:bg-[#F9A825] p-4 md:p-6 w-60 rounded-xl capitalize text-xl font-semibold ">
                  why aguka ?
                </button>
              </a>
            </div>

            <button className="fixed right-5 size-10 bg-primary-500 rounded-full items-center flex  mt-10 animate animate-bounce outline outline-accent-50">
              <div className="flex flex-col items-center p-2">
                <i className="ri-movie-2-ai-fill text-2xl md:text-4xl text-[#FFA629] " />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
