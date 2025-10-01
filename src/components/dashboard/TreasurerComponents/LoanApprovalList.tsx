import React, { useState } from "react";
import LoanDetailModal from "./LoanDetailModal";
import LoanApprovalCard from "./LoanApprovalCard";
import {
  useGetLoansByStatusQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} from "@services/api/loanApi";
import type { Loan, LoanStatus } from "types/Loan";

const LoanApprovalList: React.FC = () => {
  // State
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch pending loans
  const {
    data: loans,
    isLoading,
    isError,
    refetch,
  } = useGetLoansByStatusQuery("pending" as LoanStatus);

  const [approveLoan, { isLoading: isApproving }] = useApproveLoanMutation();
  const [rejectLoan, { isLoading: isRejecting }] = useRejectLoanMutation();

  if (isLoading) return <p>Loading loans...</p>;
  if (isError) return <p>Error loading loans.</p>;

  const handleView = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsOpen(true);
  };

  const handleApprove = async (loanId: string) => {
    try {
      await approveLoan(loanId).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to approve loan:", err);
    }
  };

  const handleReject = async (loanId: string) => {
    try {
      await rejectLoan(loanId).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to reject loan:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        <div>
          <span className="capitalize text-3xl font-bold">approval loans</span>
        </div>
        <div>
          <span className="capitalize text-xl text-secondary-300 font-bold">
            pending Loans
          </span>
        </div>

      </div>
      {loans?.map((loan) => (
        <LoanApprovalCard
          key={loan.id}
          name={loan.member ?? loan.userId}
          date={loan.createdAt}
          amount={loan.amount}
          reason={loan.reason ?? ""}
          onView={() => handleView(loan)}
          onApprove={() => handleApprove(loan.id)}
          onReject={() => handleReject(loan.id)}
        />
      ))}
      {selectedLoan && (
  <LoanDetailModal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    member={selectedLoan.member ?? ""}
    amountRequested={String(selectedLoan.amount)} // convert number → string
    previousLoans={
      selectedLoan.previousLoans
        ? selectedLoan.previousLoans.map(l => l.amount).join(", ")
        : "None"
    } // convert Loan[] → string
    monthlyContribution={String(selectedLoan.monthlyContribution ?? 0)} // number → string
    employmentStatus={selectedLoan.employmentStatus ?? ""}
  />
)}

    </div>
  );
};

export default LoanApprovalList;
