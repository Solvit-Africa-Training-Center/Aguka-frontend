// ✅ components/dashboard/shared/LoanApprovalCard.tsx
import React from "react";
import { Eye, Check, X } from "lucide-react";

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
  onView,
  onApprove,
  onReject,
}) => {
  return (
    <div className="bg-transparent p-4 rounded-xl shadow-sm border-b border-gray-700 mb-6">
      {/* Header: Name + Amount */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white font-bold">{name}</p>
          <p className="text-gray-400 text-sm">Applied on {date}</p>
        </div>
        <p className="text-white font-semibold">{amount}</p>
      </div>

      {/* Reason */}
      <p className="text-white mt-3">{reason}</p>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onView}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          <Eye size={16} /> View Detail
        </button>
        <button
          onClick={onApprove}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <Check size={16} /> Approve
        </button>
        <button
          onClick={onReject}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          <X size={16} /> Reject
        </button>
      </div>
    </div>
  );
};

export default LoanApprovalCard;
