import { Users, DollarSign } from "lucide-react";

const KeyMetrics: React.FC = () => {
  return (
    <div className="w-full bg-[rgba(0,59,66,1)] text-white pt-[79px] pb-[79px] pr-[110px] pl-[110px] font-poppins grid gap-[10px]">
      <h2 className="text-center text-7xl font-semibold mb-6 ">Key Metrics</h2>
      <div className=" text-2xl capitalize text-center w-full ml-20 grid gap-[67px]">
        <div className="flex gap-[69px]">
          <div className="bg-[#006C77]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
            <div className="flex flex-col w-[290px] h-[251px] text-left place-items-center  gap-[36px]">
              <Users className="size-20 mb-10 text-secondary-300" />
              <h2 className="text-5xl font-black ">10,000 +</h2>
              <span className="">active members</span>
            </div>
          </div>
          <div className="bg-[#006C77]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
            <div className="flex flex-col w-[290px] h-[251px] text-left place-items-center  gap-[36px]">
              <DollarSign className="size-20 mb-10 text-secondary-300  " />
              <h2 className="text-5xl font-black uppercase">$50m+</h2>
              <span>funds calculated</span>
            </div>
          </div>
          <div className="bg-[#006C77]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
            <div className="flex flex-col w-[290px] h-[251px] text-left place-items-center  gap-[36px]">
              <h2 className="text-5xl font-black uppercase text-secondary-300">
                98%
              </h2>
              <span>success rate</span>
            </div>
          </div>
        </div>
        <div className="flex gap-[69px]">
          <div className="bg-[#006C77]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
            <div className="flex flex-col w-[290px] h-[251px] text-left place-items-center  gap-[36px]">
              <Users className="size-20 mb-10 text-secondary-300" />
              <h2 className="text-5xl font-black  uppercase">10,000 +</h2>
              <span>active members</span>
            </div>
          </div>
          <div className="bg-[#006C77]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
            <div className="flex flex-col w-[290px] h-[251px] text-left place-items-center  gap-[36px]">
              <DollarSign className="size-20 mb-10 text-secondary-300" />
              <h2 className="text-5xl font-black uppercase">$1m +</h2>
              <span>funds calculated</span>
            </div>
          </div>
          <div className="bg-[#006C77]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
            <div className="flex flex-col w-[290px] h-[251px] text-left place-items-center  gap-[36px]">
              <h2 className="text-5xl font-black uppercase text-secondary-300">
                80%
              </h2>
              <span>success rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
