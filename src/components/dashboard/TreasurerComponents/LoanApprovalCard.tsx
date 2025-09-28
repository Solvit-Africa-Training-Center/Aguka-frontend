// LoanApprovalCard.tsx
import React from "react";
import { Eye, Check, X } from "lucide-react";
import {
  useApproveLoanMutation,
  useRejectLoanMutation,
} from "@services/api/loanApi";

interface LoanApprovalCardProps {
  loanId: string;
  name: string;
  date: string;
  amount: string;
  reason: string;
  onView: () => void;
}

const LoanApprovalCard: React.FC<LoanApprovalCardProps> = ({
  loanId,
  name,
  date,
  amount,
  reason,
  onView,
}) => {
  const [approveLoan, { isLoading: approving }] = useApproveLoanMutation();
  const [rejectLoan, { isLoading: rejecting }] = useRejectLoanMutation();

  const handleApprove = async () => {
    try {
      await approveLoan(loanId).unwrap();
      alert("Loan approved ");
    } catch (error) {
      console.error("Failed to approve loan:", error);
    }
  };

  const handleReject = async () => {
    try {
      await rejectLoan(loanId).unwrap();
      alert("Loan rejected ");
    } catch (error) {
      console.error("Failed to reject loan:", error);
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="grid grid-cols-3 text-center">
        <div className="text-left mt-2">
          <p className="text-white text-2xl font-bold">{name}</p>
          <p className="text-white text-sm">Applied on {date}</p>
        </div>
        <p className="text-white mt-2 text-2xl font-semibold">{amount}</p>
        <p className="text-white mt-2 text-xl text-left mt-3">{reason}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2 mb-5">
        <button
          onClick={onView}
          className="flex items-center gap-2 bg-gradient-to-b from-[#B0C2C4] to-[#545D5E] 
             text-white px-4 py-2 rounded-lg font-bold
             hover:from-[#C8D6D8] hover:to-[#6B7576] hover:scale-105 
             transition-all duration-200">
          <Eye className="text-black size-8" /> View Detail
        </button>

        <button
          onClick={handleApprove}
          disabled={approving}
          className="flex items-center gap-2 bg-[#3C9040] font-bold text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
          <Check size={16} /> {approving ? "Approving..." : "Approve"}
        </button>

        <button
          onClick={handleReject}
          disabled={rejecting}
          className="flex items-center gap-2 bg-[#CE3330] font-bold text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
          <X size={16} /> {rejecting ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default LoanApprovalCard;
