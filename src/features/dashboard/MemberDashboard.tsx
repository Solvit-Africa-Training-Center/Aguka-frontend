import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import DashboardNavbar from "@components/dashboard/member/DashboardNavbar";
import LineChartDashboard from "@components/dashboard/member/LineChartDashboard";
import RecentTransactions from "@components/dashboard/member/RecentTransaction";
import { Percent } from "lucide-react";
import { Wallet } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { WalletMinimal } from "lucide-react";
import { CreditCard } from "lucide-react";

const MemberDashboard: React.FC = () => {
  const contributionData = [
    { month: "Jan", contribution: 0 },
    { month: "Feb", contribution: 30000 },
    { month: "Mar", contribution: 3000 },
    { month: "Apr", contribution: 4000 },
    { month: "May", contribution: 50000 },
    { month: "Jun", contribution: 50000 },
    { month: "Jul", contribution: 90000 },
    { month: "Aug", contribution: 120000 },
    { month: "Sep", contribution: 200000 },
    { month: "Oct", contribution: 190000 },
    { month: "Nov", contribution: 200000 },
    { month: "Dec", contribution: 265000 },
  ];
  return (
    <div className="w-full min-h-screen bg-[#00353B] font-poppins">
      <div>
        <DashboardNavbar />
      </div>
      <div className="p-10 grid grid-cols-2 w-full gap-10 pt-45">
        <div>
          <LineChartDashboard data={contributionData} />
        </div>
        <div>
          <div className="text-white grid grid-cols-2 gap-10 mt-20 w-150 ml-30">
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">
                  current balance 
                </h2>
                <Wallet className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 945,250
              </span>
              <div className=" flex p-2 bg-[#F9A825] text-black text-2xl font-bold w-30 place-content-center  ml-10 rounded-full">
                <span>+12.5</span>
                <span>
                  <Percent className="size-8 font-bold " />
                </span>
              </div>
              <span>Available for Withdrawal</span>
            </div>
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">
                  My contribution
                </h2>
                <TrendingUp className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 945,250
              </span>
              <div className=" flex p-2 bg-[#F9A825] text-black text-2xl font-bold w-30 place-content-center  ml-10 rounded-full">
                <span>+8.2</span>
                <span>
                  <Percent className="size-8 font-bold " />
                </span>
              </div>
              <span>TotalContributed this year</span>
            </div>
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5 ">
                <h2 className="capitalize text-xl font-bold ">
                 dividend payout
                </h2>
                <WalletMinimal className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 5000
              </span>
              <span className="capitalize p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                dec 28
              </span>
              <span>Next expected Payout</span>
            </div>
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825] ">
              <div className="flex space-x-5 justify-between">
                <h2 className="capitalize text-xl font-bold">total loan</h2>
                <CreditCard className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 5000
              </span>
              <span className="capitalize p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                 dec 25
              </span>
              <span>pay your debt properly</span>
            </div>
          </div>
        </div>
        <div className="w-230 font-poppins">
          <RecentTransactions />
        </div>
        <div className="font-poppins text-[#b2b2b2] mt-15 border border-b-0 overflow-y-scroll scroll-smooth scrollbar-hide shadow-lg w-180 h-120 rounded-2xl  p-4 ">
          <h2 className="text-left ml-10 text-3xl capitalize p-2 text-[#F9A825] font- bold">
            community feeds
          </h2>
          <div>
            <CommunityFeed />
          </div>
        </div>
      </div>
      <div className="place-items-center">
        <hr className="w-300  text-[#D4D4D4] p-5" />
        <div className="text-sm text-center pt-15 capitalize text-[#D4D4D4] p-4 ">
          <span>
            &copy; 2025 Aguka.all rights reserved.Building Wealth through
            community.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
