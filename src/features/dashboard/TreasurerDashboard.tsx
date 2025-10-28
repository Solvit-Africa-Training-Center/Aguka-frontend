import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import StatCard from "@components/dashboard/TreasurerComponents/StatCard";
import TransactionList from "@components/dashboard/TreasurerComponents/TransactionList";
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetGroupContributionsTodayQuery } from "@services/api/ContributionApi";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import { useGetGroupDividendsQuery } from "@services/api/dividendApi";
import { useGetUsersQuery } from "@services/api/authApi";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

import type { Contribution } from "@models/Contribution";
import type { Loan } from "types/Loan";
import type { Dividend } from "types/Dividend";
import type { User } from "@models/User";

const TreasurerDashboard: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  // ------------------- Users -------------------
  const { data: usersData } = useGetUsersQuery();
  const users: User[] = useMemo(() => {
    if (!usersData) return [];
    const arr = Array.isArray(usersData)
      ? usersData
      : Array.isArray((usersData as any)?.data)
      ? (usersData as any).data
      : [];
    return arr.filter((u: User) => u.groupId === currentGroupId);
  }, [usersData, currentGroupId]);

  // ------------------- Contributions -------------------
  const { data, isLoading: loadingContributions } =
    useGetGroupContributionsTodayQuery(
      currentGroupId ? { id: currentGroupId, isCode: false } : skipToken
    );
  const contributions: Contribution[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data)
      ? data
      : Array.isArray((data as any)?.data)
      ? (data as any).data
      : [];
  }, [data]);

  const totalContributionToday = useMemo(
    () => contributions.reduce((sum, c) => sum + Number(c.amount ?? 0), 0),
    [contributions]
  );

  const formattedTotalContributionToday = `Frw ${totalContributionToday.toLocaleString()}`;
  // ------------------- Loans -------------------
  const { data: approvedLoansData, isLoading: loadingApprovedLoans } =
    useGetLoansByStatusQuery("approved");

  const approvedLoans: Loan[] = useMemo(() => {
    if (!approvedLoansData) return [];
    const arr = Array.isArray(approvedLoansData)
      ? approvedLoansData
      : Array.isArray((approvedLoansData as any)?.data)
      ? (approvedLoansData as any).data
      : [];
    // Filter loans by group members
    return arr.filter((loan: Loan) => users.some((u) => u.id === loan.userId));
  }, [approvedLoansData, users]);

  const totalLoan = useMemo(
    () =>
      approvedLoans.reduce((sum, loan) => sum + Number(loan.amount ?? 0), 0),
    [approvedLoans]
  );
  const formattedTotalLoan = `Frw ${totalLoan.toLocaleString()}`;

  // ------------------- Dividends -------------------
  const { data: dividendsData, isLoading: loadingDividends } =
    useGetGroupDividendsQuery();

  const dividends: Dividend[] = useMemo(() => {
    if (!dividendsData) return [];
    return Array.isArray(dividendsData)
      ? dividendsData
      : Array.isArray((dividendsData as any)?.data)
      ? (dividendsData as any).data
      : [];
  }, [dividendsData]);

  const totalDividend = useMemo(
    () => dividends.reduce((sum, d) => sum + Number(d.amount ?? 0), 0),
    [dividends]
  );
  const formattedTotalDividend = `Frw ${totalDividend.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#003B42] text-white font-poppins">
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#002f32] rounded-xl p-4 shadow-md">
            <StatCard
              title="Total contribution"
              amount={
                loadingContributions
                  ? "Loading..."
                  : formattedTotalContributionToday
              }
              change="+12.5%"
              isPositive
            />
          </div>

          <div className="bg-[#002f32] rounded-xl p-4 shadow-md">
            <StatCard
              title="Total loan"
              amount={loadingApprovedLoans ? "Loading..." : formattedTotalLoan}
              change="+5.2%"
              isPositive
            />
          </div>

          <div className="bg-[#002f32] rounded-xl p-4 shadow-md sm:col-span-2 lg:col-span-1">
            <StatCard
              title="Total Dividend"
              amount={loadingDividends ? "Loading..." : formattedTotalDividend}
              change="-2.1%"
              isPositive={totalDividend >= 0}
            />
          </div>
        </div>

        {/* Transactions and Community Feed - responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#002f32] rounded-2xl p-4 shadow-md h-[32rem] overflow-auto">
            <TransactionList />
          </div>

          <div className="bg-[#002f32] rounded-2xl p-4 shadow-md h-[32rem] overflow-auto">
            <h2 className="text-2xl sm:text-3xl capitalize mb-4 text-[#F9A825] font-bold">
              Community feeds
            </h2>
            <CommunityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasurerDashboard;
