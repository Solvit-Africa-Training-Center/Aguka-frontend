import React, { useMemo } from "react";
import type { RootState } from "services/store/store";
import { useSelector } from "react-redux";
import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import LineChartDashboard from "@components/dashboard/member/LineChartDashboard";
import RecentTransactions from "@components/dashboard/member/RecentTransaction";
import { Percent, Wallet, TrendingUp, WalletMinimal, CreditCard } from "lucide-react";
import { useGetContributionsByUserQuery } from "services/api/ContributionApi";
import type { Loan } from "types/Loan";
import { useGetLoansQuery } from "services/api/loanApi";
import type { Contribution } from "@models/Contribution";

const MemberDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "";

  // Fetch contributions
const { data: rawData = [] } = useGetContributionsByUserQuery();

console.log("Raw contributions:", rawData);

// Normalize contributions to integers and parse dates
const contributions = useMemo(
  () =>
    rawData.map((c: Contribution) => ({
      ...c,
      amount: Math.round(Number(c.amount)),
      contributionDate: new Date(c.contributionDate),
    })),
  [rawData]
);
  // Fetch loans
  const { data: loans = [] } = useGetLoansQuery();
  const userLoans = useMemo(
    () => loans.filter((loan: Loan) => loan.userId === userId),
    [loans, userId]
  );

  // Calculate total contributions this year
  const currentYear = new Date().getFullYear();
  const totalContribution = useMemo(
    () =>
      contributions
        .filter((c) => c.contributionDate.getFullYear() === currentYear)
        .reduce((sum, c) => sum + c.amount, 0),
    [contributions]
  );

  // Calculate total loans
  const totalLoan = useMemo(
    () => userLoans.reduce((sum, loan) => sum + loan.amount, 0),
    [userLoans]
  );

  // Example line chart data
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
      <div className="p-10 grid grid-cols-2 w-full gap-10 pt-45">
        {/* Line Chart */}
        <div>
          <LineChartDashboard data={contributionData} />
        </div>

        {/* Dashboard Cards */}
        <div>
          <div className="text-white grid grid-cols-2 gap-10 mt-20 w-150 ml-30">
            {/* Current Balance */}
            <div className="w-70 h-80 border-0 rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">current balance</h2>
                <Wallet className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize">
                rwf {totalContribution.toLocaleString()}
              </span>
              <div className="flex p-2 bg-[#F9A825] text-black text-2xl font-bold w-30 place-content-center ml-10 rounded-full">
                <span>+12.5</span>
                <Percent className="size-8 font-bold " />
              </div>
              <span>Available for Withdrawal</span>
            </div>

              {/* My Contribution */}
            <div className="w-70 h-80 border-0 rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">My contribution</h2>
                <TrendingUp className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize">
                rwf {totalContribution.toLocaleString()}
              </span>
              <div className="flex p-2 bg-[#F9A825] text-black text-2xl font-bold w-30 place-content-center ml-10 rounded-full">
                <span>+8.2</span>
                <Percent className="size-8 font-bold " />
              </div>
              <span>Total contributed this year</span>
            </div>

            {/* Dividend Payout */}
            <div className="w-70 h-80 border-0 rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5">
                <h2 className="capitalize text-xl font-bold">dividend payout</h2>
                <WalletMinimal className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize">rwf 5000</span>
              <span className="capitalize p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                dec 28
              </span>
              <span>Next expected Payout</span>
            </div>

            {/* Total Loan */}
            <div className="w-70 h-80 border-0 rounded-lg p-5 grid gap-10 shadow-[2px_2px_2px_2px_#F9A825]">
              <div className="flex space-x-5 justify-between">
                <h2 className="capitalize text-xl font-bold">total loan</h2>
                <CreditCard className="bg-[#005159] size-10 p-2 text-[#F9A825] rounded-full" />
              </div>
              <span className="font-bold text-4xl text-center capitalize">
                rwf {totalLoan.toLocaleString()}
              </span>
              <span className="capitalize p-2 bg-[#F9A825] text-black text-2xl font-bold w-40 place-content-center pl-10 ml-10 rounded-full">
                dec 25
              </span>
              <span>pay your debt properly</span>
            </div>
          </div>
        </div>

        {/* Other Components */}
        <div className="w-230 font-poppins">
          <RecentTransactions />
        </div>

        <div className="font-poppins text-[#b2b2b2] mt-15 border border-b-0 overflow-y-scroll scroll-smooth scrollbar-hide shadow-lg w-180 h-120 rounded-2xl p-4">
          <h2 className="text-left ml-10 text-3xl capitalize p-2 text-[#F9A825] font-bold">
            community feeds
          </h2>
          <CommunityFeed />
        </div>
      </div>

      {/* Footer */}
      <div className="place-items-center">
        <hr className="w-300 text-[#D4D4D4] p-5" />
        <div className="text-sm text-center pt-15 capitalize text-[#D4D4D4] p-4 ">
          <span>
            &copy; 2025 Aguka. All rights reserved. Building wealth through community.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
