// DashboardStats.tsx
import React from "react";
import { Users, DollarSign, ArrowUpCircle, Clock } from "lucide-react"; 
import type { LucideIcon } from "lucide-react"; 
import { useGetUsersQuery } from "@services/api/authApi";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import { useGetGroupContributionsQuery } from "@services/api/ContributionApi";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { User } from "@models/User";
import type { Loan } from "types/Loan";

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
  const users: User[] = usersData && Array.isArray(usersData)
    ? usersData
    : Array.isArray((usersData as any)?.data)
    ? (usersData as any).data
    : [];

  // Fetch contributions for this group
  const { data: contributionsData, isLoading: loadingContributions } =
    useGetGroupContributionsQuery(currentGroupId || "");
  const contributions: any[] = contributionsData && Array.isArray(contributionsData)
    ? contributionsData
    : Array.isArray((contributionsData as any)?.data)
    ? (contributionsData as any).data
    : [];

  // Fetch approved loans for total loan disbursed
  const { data: approvedLoansData, isLoading: loadingApprovedLoans } =
    useGetLoansByStatusQuery("approved");
  const approvedLoans: Loan[] = approvedLoansData && Array.isArray(approvedLoansData)
    ? approvedLoansData
    : Array.isArray((approvedLoansData as any)?.data)
    ? (approvedLoansData as any).data
    : [];

  // Fetch pending loans for pending requests
  const { data: pendingLoansData, isLoading: loadingPendingLoans } =
    useGetLoansByStatusQuery("pending");
  const pendingLoans: Loan[] = pendingLoansData && Array.isArray(pendingLoansData)
    ? pendingLoansData
    : Array.isArray((pendingLoansData as any)?.data)
    ? (pendingLoansData as any).data
    : [];

  // Total members in this group
  const totalUsersInGroup = users.filter(u => u.groupId === currentGroupId).length;

  // Total savings of members in this group
  const totalSavings = contributions.reduce((sum, c) => sum + c.amount, 0);

  // Total approved loans disbursed for this group including interest
  const totalLoanDisbursed = approvedLoans
    .filter(loan => users.find(u => u.id === loan.userId)?.groupId === currentGroupId)
    .reduce((sum, loan) => {
      const DEFAULT_RATE = 0.05; // fallback if interestRate is missing
      const rate = (loan as any).interestRate ?? DEFAULT_RATE;
      const duration = loan.durationMonths ?? 0;
      const totalPayable = loan.amount + loan.amount * rate * duration;
      return sum + Math.floor(totalPayable);
    }, 0);

  // Pending users (not approved)
  const pendingUsers = users.filter(u => !u.isApproved && u.groupId === currentGroupId);

  // Pending loans in this group
  const pendingGroupLoans = pendingLoans
    .filter(loan => users.find(u => u.id === loan.userId)?.groupId === currentGroupId);

  // Total pending requests = pending users + pending loans
  const pendingRequestsCount = pendingUsers.length + pendingGroupLoans.length;

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
