// ✅ pages/dashboard/TreasurerDashboard.tsx
import CommunityFeed from "@components/dashboard/member/CommunityFeed";
import StatCard from "@components/dashboard/TreasurerComponents/StatCard";
import TransactionList from "@components/dashboard/TreasurerComponents/TransactionList";
import { useGetAllContributionsByUserQuery } from "@services/api/ContributionApi";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import type { RootState } from "@services/store/store";
import type { Loan } from "types/Loan";

type Contribution = {
  id: string;
  amount: number;
  date?: string;
  userId?: string;
  groupId?: string;
};

const TreasurerDashboard: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;
  const {
    data: contributionsData,
    error: contributionsError,
    isLoading: loadingContributions,
  } = useGetAllContributionsByUserQuery(currentGroupId || "", {
    skip: !currentGroupId,
  });

  if (contributionsError)
    console.error("Failed to fetch contributions:", contributionsError);

  const contributions: Contribution[] = useMemo(() => {
    if (!contributionsData) return [];
    return Array.isArray(contributionsData)
      ? contributionsData
      : Array.isArray((contributionsData as any)?.data)
      ? (contributionsData as any).data
      : [];
  }, [contributionsData]);

  const totalContribution = useMemo(
    () => contributions.reduce((sum, c) => sum + (c.amount || 0), 0),
    [contributions]
  );

  const formattedTotalContribution = useMemo(
    () =>
      new Intl.NumberFormat("rw-RW", {
        style: "currency",
        currency: "RWF",
        minimumFractionDigits: 0,
      }).format(totalContribution),
    [totalContribution]
  );

  // ------------------- Approved Loans -------------------
  const { data: approvedLoansData, isLoading: loadingApprovedLoans } =
    useGetLoansByStatusQuery("approved");

  const approvedLoans: Loan[] = useMemo(() => {
    if (!approvedLoansData || !currentGroupId) return [];
    const allLoans = Array.isArray(approvedLoansData)
      ? approvedLoansData
      : Array.isArray((approvedLoansData as any)?.data)
      ? (approvedLoansData as any).data
      : [];
    return allLoans.filter((loan: Loan) => loan.groupId === currentGroupId);
  }, [approvedLoansData, currentGroupId]);

  const totalApprovedLoan = useMemo(
    () => approvedLoans.reduce((sum, loan) => sum + (loan.amount || 0), 0),
    [approvedLoans]
  );

  const formattedTotalLoan = useMemo(
    () =>
      new Intl.NumberFormat("rw-RW", {
        style: "currency",
        currency: "RWF",
        minimumFractionDigits: 0,
      }).format(totalApprovedLoan),
    [totalApprovedLoan]
  );

  return (
    <div className="p-10 bg-[#003B42] min-h-screen text-white font-poppins pt-50">
      {/* Stats */}
      <div className="flex justify-between px-70">
        <StatCard
          title="Total contribution"
          amount={
            loadingContributions ? "Loading..." : formattedTotalContribution
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
          amount="Frw 125,000"
          change="-2.1%"
          isPositive={false}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <TransactionList />
        <div className="font-poppins text-[#b2b2b2] mt-17 border border-b-0 overflow-y-scroll scroll-smooth scrollbar-hide shadow-lg w-180 h-120 rounded-2xl p-4">
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
