import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AgukaJourney = () => {
  return (
    <div className="w-full pt-[90px] pr-[120px] pl-[120px] pb-[90px] bg-[#003B42CC] place-items-center  text-white font-poppins">
      <div className="pt-[50px] pl-[131px] pr-[131px] pb-[131px] border-0 rounded-2xl bg-[#456E73] w-200 h-80 space-y-10 text-left">
        <div className="w-[1208px] h-[397px] grid gap-[50px]">
          <div className="w-1208px h-[228px]">
            <div className="w-[1208px] h-[95px] space-y-3">
              <h2 className="text-4xl text-white capitalize font-poppins font-bold">
                ready to start your aguka journey?
              </h2>
              <div className="w-150 text-left justify-center ">
                <span className="text-xl">
                  Join thousands of members who are already building wealth
                  through community savings.
                </span>
              </div>
            </div>
            <div className="flex w-[859px] h-[119px] gap-10 ">
              <div className="grid pt-[30px] pr-[15px] pl-[46px] pb-[30px]">
                {/* <button className="p-4 flex gap-2 bg-[#003B42] hover:bg-secondary-300 w-50 h-16 capitalize rounded-md items-center ">
                  <Link to="/registergroup" className="text-xl">create group</Link>
                  <span>
                    <ArrowRight />
                  </span>
                </button> */}
<Link to="/registergroup" className="p-4 flex gap-2 bg-[#003B42] hover:bg-secondary-300 w-50 h-16 capitalize rounded-md items-center text-xl">
  create group
  <span>
    <ArrowRight />
  </span>
</Link>
              </div>
              <div className="w-[377px] h-[119px] pt-[30px] pr-[15px]  pb-[30px]">
                <button className="p-4 flex gap-2 border-1 border-#D4D4D4 rounded-md w-65 h-16 bg-[#D4D4D4] capitalize items-center">
                  <span className="text-xl">join existing group</span>
                  <span className="">
                    <ArrowRight className="animate-ping" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgukaJourney;
