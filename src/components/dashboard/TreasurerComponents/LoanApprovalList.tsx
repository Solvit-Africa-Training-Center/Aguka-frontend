import React from "react";

type LoanApprovalCardProps = {
  loanId: string;
  name: string;
  date: string;
  amount: string;
  reason: string;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
};

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
    <div className="bg-white text-black p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm">{date}</p>
      <p className="font-medium">{amount}</p>
      <p className="text-gray-700">{reason}</p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onView}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          View
        </button>
        <button
          onClick={onApprove}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Approve
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Reject
        </button>
      </div>
    </div>
  );
};

export default LoanApprovalCard;
