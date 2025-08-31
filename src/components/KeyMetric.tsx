import { Users, DollarSign } from "lucide-react";

const KeyMetrics: React.FC = () => {
  return (
    <div className="bg-[rgba(0,59,66,1)] text-white pt-[79px] pb-[79px] pr-[110px] pl-[110px] font-poppins ">
      <h2 className="text-center text-7xl font-bold mb-6 ">Key Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3   space-y-15 text-2xl capitalize text-center w-full ">
        <div className="bg-[#307780] rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
          <Users className="size-10 mb-10 text-secondary-500" />
          <div className="text-left space-y-3">
            <h2 className="text-4xl font-black ">10,000 +</h2>
            <span className="">active members</span>
          </div>
        </div>
        <div className="bg-[#307780]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
          <DollarSign className="size-10 mb-10 text-secondary-500" />
          <h2 className="text-4xl font-black uppercase">$50m+</h2>
          <span>funds circle</span>
        </div>
        <div className="bg-[#307780]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
          <h2 className="text-4xl font-black uppercase text-secondary-500">
            98 %
          </h2>
          <span>success rate</span>
        </div>
        <div className="bg-[#307780]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
          <Users className="size-10 mb-10 text-secondary-500" />
          <h2 className="text-4xl font-black  uppercase">10,000 +</h2>
          <span>active members</span>
        </div>
        <div className="bg-[#307780]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
          <DollarSign className="size-10 mb-10 text-secondary-500" />
          <h2 className="text-4xl font-black uppercase">$1m +</h2>
          <span>funds cicle</span>
        </div>
        <div className="bg-[#307780]  rounded-md w-[450px] h-[365px] place-items-center pt-20 ">
          <h2 className="text-4xl font-black uppercase text-secondary-500">
            80%
          </h2>
          <span>success rate</span>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
