// DashboardStats.tsx
import React, { useMemo } from "react";
import { Users, DollarSign, ArrowUpCircle, Clock } from "lucide-react"; 
import type { LucideIcon } from "lucide-react"; 
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import { useGetUsersQuery } from "@services/api/authApi";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import { useGetAllContributionsByUserQuery } from "@services/api/ContributionApi";
import { useGetRepaymentsQuery } from "@services/api/repaymentApi";

import type { User } from "@models/User";
import type { Loan } from "types/Loan";
import type { Contribution } from "@models/Contribution";
import type { Repayment } from "types/Repayment";

interface StatsCardProps {
  title: string;
  value: string;
  icon?: LucideIcon; 
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon }) => (
  <div
    className="bg-[#00353B] text-white rounded-2xl border-4 border-[#F9A825] p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col font-poppins"
    style={{
      border: "4px solid #F9A825",
      boxShadow: "0 0 10px rgba(249, 168, 37, 0.6)", 
    }}
  >
    <div className="flex justify-end">{Icon && <Icon className="w-8 h-8 opacity-80 text-[#F9A825]" />}</div>
    <div className="flex flex-col items-center mt-4">
      <p className="text-xl font-medium opacity-90">{title}</p>
      <p className="font-bold text-2xl mt-3">{value}</p>
    </div>
  </div>
);

const DashboardStats: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  // Fetch all users
  const { data: usersData, isLoading: loadingUsers } = useGetUsersQuery();
  const users: User[] = useMemo(() => {
    if (!usersData) return [];
    const arr = Array.isArray(usersData)
      ? usersData
      : Array.isArray((usersData as any)?.data)
      ? (usersData as any).data
      : [];
    return arr.filter((u: User) => u.groupId === currentGroupId);
  }, [usersData, currentGroupId]);

  // Fetch contributions
  const { data: contributionsData, isLoading: loadingContributions } = useGetAllContributionsByUserQuery(currentGroupId || "");
  const contributions: Contribution[] = useMemo(() => {
    if (!contributionsData) return [];
    return Array.isArray(contributionsData)
      ? contributionsData
      : Array.isArray((contributionsData as any)?.data)
      ? (contributionsData as any).data
      : [];
  }, [contributionsData]);

  // Fetch approved loans
  const { data: approvedLoansData, isLoading: loadingApprovedLoans } = useGetLoansByStatusQuery("approved");
  const approvedLoans: Loan[] = useMemo(() => {
    if (!approvedLoansData) return [];
    const allLoans = Array.isArray(approvedLoansData)
      ? approvedLoansData
      : Array.isArray((approvedLoansData as any)?.data)
      ? (approvedLoansData as any).data
      : [];
    return allLoans.filter((loan: Loan) => users.some(u => u.id === loan.userId));
  }, [approvedLoansData, users]);

  // Fetch pending loans
  const { data: pendingLoansData, isLoading: loadingPendingLoans } = useGetLoansByStatusQuery("pending");
  const pendingLoans: Loan[] = useMemo(() => {
    if (!pendingLoansData) return [];
    const allLoans = Array.isArray(pendingLoansData)
      ? pendingLoansData
      : Array.isArray((pendingLoansData as any)?.data)
      ? (pendingLoansData as any).data
      : [];
    return allLoans.filter((loan: Loan) => users.some(u => u.id === loan.userId));
  }, [pendingLoansData, users]);

  // Fetch all repayments
  const { data: repaymentsData } = useGetRepaymentsQuery();
  const repayments: Repayment[] = useMemo(() => {
    if (!repaymentsData) return [];
    return Array.isArray(repaymentsData)
      ? repaymentsData
      : Array.isArray((repaymentsData as any)?.data)
      ? (repaymentsData as any).data
      : [];
  }, [repaymentsData]);

  // Total savings
  const totalSavings = useMemo(() => {
    return contributions.reduce((sum: number, c: Contribution) => sum + Number(c.amount), 0);
  }, [contributions]);

  // Total loan disbursed after repayments
  const totalLoanDisbursed = useMemo(() => {
    return approvedLoans.reduce((sum: number, loan: Loan) => {
      const rate = (loan as any).interestRate ?? 0.05;
      const duration = loan.durationMonths ?? 0;
      const totalPayable = loan.amount + loan.amount * rate * duration;

      const totalRepaid = repayments
        .filter(r => r.loanId === loan.id)
        .reduce((repSum, r) => repSum + Number(r.amount), 0);

      const remainingBalance = Math.max(totalPayable - totalRepaid, 0);
      return sum + remainingBalance;
    }, 0);
  }, [approvedLoans, repayments]);

  
  const pendingRequestsCount = useMemo(() => {
    const pendingUsers = users.filter(u => !u.isApproved);
    const pendingGroupLoans = pendingLoans.filter(loan => users.some(u => u.id === loan.userId));
    return pendingUsers.length + pendingGroupLoans.length;
  }, [users, pendingLoans]);

  const totalUsersInGroup = users.length;

  return (
    <div className="w-full font-poppins pt-6 px-4 md:px-0">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value={loadingUsers ? "..." : totalUsersInGroup.toString()}
          icon={Users}
        />
        <StatsCard
          title="Total Savings"
          value={loadingContributions ? "..." : `Frw ${totalSavings.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard
          title="Total Loan Disbursed"
          value={loadingApprovedLoans ? "..." : `Frw ${totalLoanDisbursed.toLocaleString()}`}
          icon={ArrowUpCircle}
        />
        
        <StatsCard
          title="Pending Requests"
          value={loadingUsers || loadingPendingLoans ? "..." : pendingRequestsCount.toString()}
          icon={Clock}
        />
      </div>
    </div>
  );
};

export default DashboardStats;
