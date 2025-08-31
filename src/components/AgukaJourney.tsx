import { ArrowRight } from "lucide-react";


const AgukaJourney = () => {
  return (
    <div className="w-full p-10 bg-[#003B42CC] place-items-center  text-white">
      <div className="p-10 border-0 rounded-2xl bg-[#456E73] w-200 h-80 space-y-8 text-left">
        <h2 className="text-4xl text-white capitalize font-poppins font-bold text-center">
          ready to start your aguka journey?
        </h2>
        <div className="w-150 text-left justify-center ml-20">
          <span className="text-xl">
            Join thousands of members who are already building wealth through
            community savings.
          </span>
        </div>

        <div className="flex gap-10 text-center ml-40   ">
          <button className="p-4 flex gap-2 bg-[#003B42] w-50 capitalize rounded-md items-center">
            <span className="text-xl">create group</span>
            <span>
              <ArrowRight />
            </span>
          </button>
          <button className="p-4 flex gap-2 border-1 border-bg-#D4D4D4 rounded-md w-60 capitalize items-center">
            <span className="text-xl">join existing group</span>
            <span>
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgukaJourney;
