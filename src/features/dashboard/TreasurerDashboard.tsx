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
  const { data, isLoading: loadingContributions } = useGetGroupContributionsTodayQuery(
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
    <div className="p-10 bg-[#003B42] min-h-screen text-white font-poppins pt-50">
      <div className="flex justify-between px-70">
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

        <StatCard
          title="Total loan"
          amount={loadingApprovedLoans ? "Loading..." : formattedTotalLoan}
          change="+5.2%"
          isPositive
        />

        <StatCard
          title="Total Dividend"
          amount={loadingDividends ? "Loading..." : formattedTotalDividend}
          change="-2.1%"
          isPositive={totalDividend >= 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TransactionList />
        <div className="font-poppins border-white text-[#b2b2b2] mt-17 border border-b-0 overflow-y-scroll scroll-smooth scrollbar-hide shadow-lg w-180 h-120 rounded-2xl p-4">
          <h2 className="text-left ml-10 text-3xl capitalize p-2 text-[#F9A825] font-bold">
            community feeds
          </h2>
          <div>
            <CommunityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasurerDashboard;
