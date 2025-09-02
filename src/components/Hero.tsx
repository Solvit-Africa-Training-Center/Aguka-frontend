import { MoveRight } from "lucide-react";
const Hero = () => {
  return (
    <div className="flex w-full min-h-screen bg-cover bg-center bg-[url('/bg-gif.gif')] font-poppins">
      <div className="space-y-7 inset-0 bg-[#003B42B2]/90 w-full mt-20">
        <div className="flex flex-col space-y-5  text-center ">
          <h2 className="text-8xl text-white mt-50 capitalize  font-semibold">
            save together,
            <span className="text-8xl text-secondary-300 capitalize  font-semibold">
              grow together
            </span>
          </h2>

          <p className=" text-[#F4F4F4] text-3xl w-300 font-poppins text-center ml-80 ">
            Join thousands building wealth through community-powered tontine
            circles. Pool your savings, take turns receiving, and achieve your
            financial goals faster.
          </p>

          <div className=" text-white pt-15 flex gap-10  mt-20 relative justify-center">
            <div className="flex gap-14 ">
              <button className="bg-[rgba(0,59,66,1)] hover:bg-[#FFA629] p-4 w-60 rounded-xl capitalize text-xl flex ">
                <span>start your circle </span>
                <span>
                  <MoveRight className="size-6 mt-1 ml-2" />
                </span>
              </button>
              <button className="bg-[rgba(48,119,128,1)] hover:bg-[#F9A825] p-4 w-60 rounded-xl capitalize text-xl ">
                why aguka ?
              </button>
            </div>

            <button className="fixed right-5 size-20 bg-primary-500 rounded-full items-center flex  mt-20 animate animate-pulse">
             
              <div>
                <i className="ri-movie-2-ai-fill text-5xl text-[#FFA629] ml-4 " />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
