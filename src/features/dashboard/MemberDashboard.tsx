import React, { useMemo } from "react";
import type { RootState } from "@services/store/store";
import { useSelector } from "react-redux";
import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import LineChartDashboard from "@components/dashboard/member/LineChartDashboard";
import RecentTransactions from "@components/dashboard/member/RecentTransaction";
import {
  Wallet,
  TrendingUp,
  WalletMinimal,
  CreditCard,
} from "lucide-react";
import { useGetContributionsByUserQuery } from "@services/api/ContributionApi";
import type { Loan } from "types/Loan";
import { useGetLoansQuery } from "@services/api/loanApi";
import type { Contribution } from "@models/Contribution";
import { useGetRepaymentsQuery } from "@services/api/repaymentApi";
import type { Repayment } from "types/Repayment";
import { useGetUserDividendsQuery } from "@services/api/dividendApi";
const MemberDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "";

  // Fetch contributions
  const { data: rawData = [] } = useGetContributionsByUserQuery();

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

  // Fetch repayments
  const { data: repaymentsData = [] } = useGetRepaymentsQuery();
  const userRepayments = useMemo(
    () =>
      (repaymentsData as Repayment[]).filter((r) =>
        userLoans.some((l) => l.id === r.loanId)
      ),
    [repaymentsData, userLoans]
  );

  const currentYear = new Date().getFullYear();

  // Total contributions this year
  const totalContribution = useMemo(
    () =>
      contributions
        .filter((c) => c.contributionDate.getFullYear() === currentYear)
        .reduce((sum, c) => sum + c.amount, 0),
    [contributions]
  );

  // Total loan remaining after repayments
  const totalLoan = useMemo(() => {
    const DEFAULT_RATE = 0.05;
    return userLoans
      .filter((loan) => loan.status.toLowerCase() === "approved")
      .reduce((sum, loan) => {
        const duration = loan.durationMonths ?? 0;
        const totalPayable =
          loan.amount + loan.amount * DEFAULT_RATE * duration;

        const totalRepaid = userRepayments
          .filter((r) => r.loanId === loan.id)
          .reduce((acc, r) => acc + Number(r.amount), 0);

        const remaining = Math.max(totalPayable - totalRepaid, 0);
        return sum + remaining;
      }, 0);
  }, [userLoans, userRepayments]);
  //fetch dividend
  const { data } = useGetUserDividendsQuery();

  const totalDividend = data?.userDividend ?? 0;

  //find current balance
  const currentBalance = useMemo(() => {
    return totalContribution + totalDividend - totalLoan;
  }, [totalContribution, totalDividend, totalLoan]);

  // cards data for stats display
  const cards = [
    {
      title: "Current Balance",
      icon: (
        <Wallet className="bg-[#005159] p-2 rounded-full text-[#F9A825] w-10 h-10" />
      ),
      value: `rwf ${currentBalance.toLocaleString()}`,
      subtitle: "Available for withdrawal",
    },
    {
      title: "My Contribution",
      icon: (
        <TrendingUp className="bg-[#005159] p-2 rounded-full text-[#F9A825] w-10 h-10" />
      ),
      value: `rwf ${totalContribution.toLocaleString()}`,
      subtitle: "Total contributed this year",
    },
    {
      title: "Dividend Payout",
      icon: (
        <WalletMinimal className="bg-[#005159] p-2 rounded-full text-[#F9A825] w-10 h-10" />
      ),
      value: `rwf ${totalDividend.toLocaleString()}`,
      subtitle: "Next expected payout",
    },
    {
      title: "Total Loan",
      icon: (
        <CreditCard className="bg-[#005159] p-2 rounded-full text-[#F9A825] w-10 h-10" />
      ),
      value: `rwf ${totalLoan.toLocaleString()}`,
      subtitle: "Outstanding loan",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#00353B] font-poppins">
      <div className="px-4 py-6 lg:px-10 lg:py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart - spans 2 columns on large screens */}
          <div className="lg:col-span-2 bg-transparent">
            <LineChartDashboard />
          </div>

          {/* Stats Cards - responsive grid */}
          <div>
            <div className="text-white grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/** map cards into responsive card items **/}
              {cards.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#002f32] rounded-lg p-4 min-h-[14rem] flex flex-col justify-between border border-secondary-300 shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="capitalize text-sm md:text-base font-medium text-gray-100">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xl md:text-2xl font-bold text-white">
                        {item.value}
                      </p>
                    </div>
                    <div className="shrink-0">{item.icon}</div>
                  </div>
                  <div className="mt-4 text-sm text-stone-400">
                    {item.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions and Community feeds */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <RecentTransactions />
          </div>
          <div className="w-full text-[#b2b2b2] border border-accent-50 overflow-auto scrollbar-hide shadow-lg rounded-2xl p-4">
            <h2 className="text-left text-xl sm:text-2xl md:text-3xl capitalize p-2 text-[#F9A825] font-bold">
              community feeds
            </h2>
            <CommunityFeed />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <hr className="border-t border-primary-white/20 mb-4" />
          <div className="text-sm text-center capitalize text-[#D4D4D4] p-4">
            <span>
              &copy; 2025 Aguka. All rights reserved. Building wealth through
              community.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
