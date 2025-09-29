import React, { useState } from "react";
import LoanApprovalCard from "./LoanApprovalCard";
import LoanDetailModal from "./LoanDetailModal";
import {
  useGetLoansByStatusQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} from "@services/api/loanApi";
import type { Loan } from "types/Loan";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

interface LoanWithExtra extends Loan {
  previousLoans?: string;
  monthlyContribution?: string;
  employmentStatus?: string;
}

const LoanApprovalList: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<LoanWithExtra | null>(null);
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  // ✅ Fetch loans with status "pending"
  const {
    data: loans = [],
    isLoading,
    isError,
    refetch,
  } = useGetLoansByStatusQuery("pending");

  const [approveLoan] = useApproveLoanMutation();
  const [rejectLoan] = useRejectLoanMutation();

  // ✅ Filter loans by secretary’s group
  const groupLoans = loggedInUser
    ? loans.filter((loan: Loan) => loan.groupId === loggedInUser.groupId)
    : loans;

  // Approve handler
  const handleApprove = async (loanId: string) => {
    try {
      await approveLoan(loanId).unwrap();
      alert("✅ Loan approved by secretary");
      refetch();
    } catch (error) {
      console.error("Approve failed:", error);
      alert(" Failed to approve loan");
    }
  };

  // Reject handler
  const handleReject = async (loanId: string) => {
    try {
      await rejectLoan(loanId).unwrap();
      alert(" Loan rejected by secretary");
      refetch();
    } catch (error) {
      console.error("Reject failed:", error);
      alert("Failed to reject loan");
    }
  };

  if (isLoading) return <p className="text-white">Loading loans...</p>;
  if (isError) return <p className="text-red-500">Failed to fetch loans</p>;

  return (
    <div className="space-y-6">
      {groupLoans.length > 0 ? (
        groupLoans.map((loan) => (
          <LoanApprovalCard
            key={loan.id}
            loanId={loan.id}
            name={
              (loan as any).userName ?? (loan as any).memberName ?? "Unknown"
            }
            date={new Date(loan.createdAt).toLocaleDateString()}
            amount={`${loan.amount} Frw`}
            reason={
              (loan as any).reason ?? (loan as any).purpose ?? "Not provided"
            }
            onView={() =>
              setSelectedLoan({
                ...loan,
                previousLoans: "N/A",
                monthlyContribution: "N/A",
                employmentStatus: "N/A",
              })
            }
            onApprove={() => handleApprove(loan.id)}
            onReject={() => handleReject(loan.id)}
          />
        ))
      ) : (
        <p className="text-white">No pending loans for your group.</p>
      )}

      {selectedLoan && (
        <LoanDetailModal
          isOpen={!!selectedLoan}
          onClose={() => setSelectedLoan(null)}
          member={
            (selectedLoan as any).userName ??
            (selectedLoan as any).memberName ??
            "Unknown"
          }
          amountRequested={`${selectedLoan.amount} Frw`}
          previousLoans={selectedLoan.previousLoans ?? "N/A"}
          monthlyContribution={selectedLoan.monthlyContribution ?? "N/A"}
          employmentStatus={selectedLoan.employmentStatus ?? "N/A"}
        />
      )}
    </div>
  );
};

export default LoanApprovalList;
