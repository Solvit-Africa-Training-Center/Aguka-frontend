import React from "react";
import { User, DollarSign } from "lucide-react";

interface ApprovalCardProps {
  name: string;
  type: string; // "loan", "member", "contribution", etc.
  amount?: string;
  time: string;
  requestCategory?: string;
  onApprove?: () => void;
  onReject?: () => void;
  onView?: () => void;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({
  name,
  type,
  amount,
  time,
  requestCategory,
  onApprove,
  onReject,
  onView,
}) => {
  const inferredCategory =
    requestCategory ??
    (/loan/i.test(type)
      ? "Loan request"
      : /application|member|saving|join/i.test(type)
      ? "Member request"
      : "Request");

  const isLoan = /loan/i.test(type);

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
      </div>

      {/* Name + Category */}
      <div>
        <p className="font-semibold">{name}</p>
        <span className="mt-1 inline-block text-xs uppercase tracking-wide px-2 py-0.5 text-white rounded">
          {inferredCategory}
        </span>
      </div>

      {/* Details */}
      <div className="text-sm text-gray-300">
        <p>{type}</p>
        {amount && (
          <p className="mt-1">
            Amount: <span className="text-white font-medium">{amount}</span>
          </p>
        )}
        <p className="mt-1">{time}</p>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 justify-end">
        {onView && (
          <button
            onClick={onView}
            className="px-4 py-1 rounded border border-[#F9A825] text-blue-400 hover:bg-[#002F35] hover:text-white transition">
            View
          </button>
        )}
        {onApprove && (
          <button
            onClick={onApprove}
            className="px-4 py-1 rounded border border-[#F9A825] text-green-500 hover:bg-green-700 hover:text-white transition">
            Approve
          </button>
        )}
        {onReject && (
          <button
            onClick={onReject}
            className="px-4 py-1 rounded border border-[#F9A825] text-red-500 hover:bg-red-700 hover:text-white transition">
            Reject
          </button>
        )}
      </div>
    </div>
  );
};

export default ApprovalCard;
