import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import DashboardNavbar from "@components/dashboard/member/DashboardNavbar";
import LineChartDashboard from "@components/dashboard/member/LineChartDashboard";
import RecentTransactions from "@components/dashboard/member/RecentTransaction";

import { Wallet } from "lucide-react";
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
              <span className=" p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                +12.5
              </span>
              <span>Available for Withdrawal</span>
            </div>
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">
                  My contribution
                </h2>
                <Wallet className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 945,250
              </span>
              <span className=" p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                +12.5
              </span>
              <span>TotalContributed this year</span>
            </div>
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5 ">
                <h2 className="capitalize text-xl font-bold ">
                  Upcoming payment
                </h2>
                <Wallet className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 945,250
              </span>
              <span className=" p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                +12.5
              </span>
              <span>Next expected Payout</span>
            </div>
            <div className="w-70 h-80 border-0 border-[#F9A825] rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">Amount payable</h2>
                <Wallet className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize ">
                rwf 945,250
              </span>
              <span className=" p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                +12.5
              </span>
              <span>pay your debt properly</span>
            </div>
          </div>
        </div>
        <div className="w-230 font-poppins">
          <RecentTransactions />
        </div>
        <div className="font-poppins text-white h-100 border overflow-y-scroll shadow-lg rounded-md w-180">
          <h2 className="text-center text-2xl capitalize">community feed</h2>
          <div>
            <CommunityFeed/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
