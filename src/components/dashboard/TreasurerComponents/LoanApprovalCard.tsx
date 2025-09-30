import React from "react";
import { Eye, Check, X, DollarSign, User } from "lucide-react";

interface LoanApprovalCardProps {
  name: string;
  date: string;
  amount: string;
  reason: string;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const LoanApprovalCard: React.FC<LoanApprovalCardProps> = ({
  name,
  date,
  amount,
  reason,
  onApprove,
  onReject,
  onView,
}) => {
  const isLoan = true; // ✅ or make this a prop if needed

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 bg-[#003B42] text-white px-4 py-3 font-poppins rounded-md shadow-md">
      {/* Icon */}
      <div className="flex items-center justify-center">
        <div className="w-10 h-10 rounded-md border-2 border-[#F9A825] flex items-center justify-center">
          {isLoan ? (
            <DollarSign className="w-5 h-5 text-[#F9A825]" />
          ) : (
            <User className="w-5 h-5 text-[#F9A825]" />
          )}
        </div>
        <div className="ml-3">
          <p className="text-white text-2xl font-semibold">{amount}</p>
          <p className="text-white text-xl mt-1">{reason}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-2 mb-5">
        <button
          onClick={onView}
          className="flex items-center gap-2 bg-gradient-to-b font-bold from-[#B0C2C4] to-[#545D5E] text-white px-4 py-2 rounded-lg hover:opacity-90">
          <Eye className="text-black size-8" /> View Detail
        </button>

        <button
          onClick={onApprove}
          className="flex items-center gap-2 bg-[#3C9040] font-bold text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <Check size={16} /> Approve
        </button>
        <button
          onClick={onReject}
          className="flex items-center gap-2 bg-[#CE3330] font-bold text-white px-4 py-2 rounded-lg hover:bg-red-700">
          <X size={16} /> Reject
        </button>
      </div>
    </div>
  );
};

export default LoanApprovalCard;
