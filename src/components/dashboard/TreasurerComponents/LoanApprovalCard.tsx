// LoanApprovalCard.tsx
import React from "react";
import { Eye, Check, X } from "lucide-react";

import type { LoanApprovalCardProps } from "types/Loan";

const LoanApprovalCard: React.FC<LoanApprovalCardProps> = ({
  name,
  date,
  amount,
  reason,
  onView,
  onApprove,
  onReject,
}) => {
  return (
    <div className="p-4">


      <div className="grid grid-cols-3 text-center">
        <div className="text-left mt-2">
          <p className="text-white text-2xl font-bold">{name}</p>
          <p className="text-white text-sm">Applied on {date}</p>
        </div>
        <p className="text-white mt-2 text-2xl font-semibold">{amount}</p>

        <p className="text-white mt-2 text-xl text-left">{reason}</p>
      </div>

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
