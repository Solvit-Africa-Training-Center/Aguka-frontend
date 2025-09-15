import React from "react";

interface ApprovalCardProps {
  name: string;
  type: string;
  amount?: string;
  time: string;
}

const ApprovalCard: React.FC<ApprovalCardProps> = ({ name, type, amount, time }) => {
  return (
    <div className="flex justify-between items-center bg-teal-700 text-white p-4 rounded mb-2 shadow">
      <div>
        <p className="font-bold">{name}</p>
        <p>{type} {amount && `- ${amount}`}</p>
          <p className="text-sm text-gray-200">{time}</p>
      </div>
      <div className="flex space-x-2">
        <button className="bg-green-500 px-3 py-1 rounded">Approve</button>
        <button className="bg-red-500 px-3 py-1 rounded">Reject</button>
      </div>
    </div>
  );
};

export default ApprovalCard;
