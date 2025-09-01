import { Users } from "lucide-react";
import { DollarSign, Calendar, SquareArrowOutUpRight } from "lucide-react";

const About: React.FC = () => {
  return (
    <div>
      <hr className=" w-full text-primary-300/20" />
      <div className="bg-[#003B42] text-white pt-[75px] pb-[75px] pr-[68px] pl-[68px] font-poppins">
        <h2 className="text-center text-7xl font-bold mb-10 capitalize">
          why aguka?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-10">
          {/* Card 1 */}
          <div className="p-8 border border-primary-200 rounded-2xl shadow-sm ">
            <span className="text-xl font-bold text-primary-600 bg-secondary-300 rounded-full p-5 -mx-15 "><strong className="animate-bounce ">01</strong></span>
            <Users className="w-15 h-15 text-primary-500 mb-4 bg-primary-200 p-4 rounded-2xl"/>
            <h3 className="text-lg font-semibold mb-2">From Your Circle</h3>
            <p className="text-gray-400 text-1xl font-poppins">
              Gather 5-20 trusted friends, family, or community members to
              create your tontine circle.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-primary-200 rounded-2xl shadow-sm ">
            <span className="text-xl font-bold text-primary-600 bg-secondary-300 rounded-full p-5 ">02</span>
            <Calendar className="w-15 h-15 text-primary-500 mb-4 bg-primary-200 p-4 rounded-2xl" />
            <h3 className="text-lg font-semibold mb-2">
              Set Contribution Schedule
            </h3>
            <p className="text-gray-400 text-1xl font-poppins">
              Decide on regular contribution amounts and frequency — weekly,
              monthly, or custom intervals.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-primary-200 rounded-2xl shadow-sm ">
            <span className="text-xl font-bold text-primary-600 bg-secondary-300 rounded-full p-5 ">03</span>
            <DollarSign className="w-15 h-15 text-primary-500 mb-4 bg-primary-200 p-4 rounded-2xl" />
            <h3 className="text-lg font-semibold mb-2">Take Turns Receiving</h3>
            <p className="text-gray-400 text-1xl font-poppins">
              Each member receives the full pot in rotation, creating powerful
              savings momentum for everyone.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 border border-primary-200 rounded-2xl shadow-sm ">
            <span className="text-xl font-bold text-primary-600 bg-secondary-300 rounded-full p-5 ">04</span>
            <SquareArrowOutUpRight className="w-15 h-15 text-primary-500 mb-4 bg-primary-200 p-4 rounded-2xl" />
            <h3 className="text-lg font-semibold mb-2">
              Build Wealth Together
            </h3>
            <p className="text-gray-400 text-1xl font-poppins">
              Watch your financial goals become achievable through the power of
              collective savings and accountability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
