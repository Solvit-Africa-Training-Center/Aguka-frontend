import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AgukaJourney = () => {
  return (
    <div className="w-full pt-[90px] pr-[20px] pl-[20px] sm:pr-[120px] sm:pl-[120px] pb-[90px] bg-[#003B42CC] place-items-center text-white font-poppins">
      <div className="pt-[50px] pl-[20px] pr-[20px] sm:pl-[131px] sm:pr-[131px] pb-[50px] sm:pb-[131px] border-0 rounded-2xl bg-[#456E73] w-full sm:w-200 h-auto sm:h-80 space-y-10 text-left">
        <div className="grid gap-6 sm:gap-[50px]">
          <div>
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl text-white capitalize font-poppins font-bold">
                ready to start your aguka journey?
              </h2>
              <div className="w-full sm:w-150 text-left">
                <span className="text-base sm:text-xl">
                  Join thousands of members who are already building wealth
                  through community savings.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-[859px] gap-4 sm:gap-10 mt-6">
              <div className="grid pt-4 pr-0 pl-0 sm:pt-[30px] sm:pr-[15px] sm:pl-[46px] pb-4 sm:pb-[30px]">
                <Link
                  to="/login"
                  className="p-4 flex gap-2 bg-[#003B42] hover:bg-secondary-300 w-full sm:w-50 h-16 capitalize rounded-md items-center text-xl justify-center">
                  create group
                  <span>
                    <ArrowRight />
                  </span>
                </Link>
              </div>

              <div className="w-full sm:w-[377px] h-16 sm:h-[119px] pt-4 pr-0 pb-4 sm:pt-[30px] sm:pr-[15px] sm:pb-[30px]">
                <button className="p-4 flex gap-2 border-1 border-#D4D4D4 rounded-md w-full sm:w-65 h-16 bg-[#D4D4D4] capitalize items-center justify-center">
                  <span className="text-xl">join existing group</span>
                  <span>
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
