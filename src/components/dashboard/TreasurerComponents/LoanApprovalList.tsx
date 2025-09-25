// ✅ components/dashboard/shared/LoanApprovalList.tsx
import React from "react";
import LoanApprovalCard from "./LoanApprovalCard";
import { Clock } from "lucide-react";

const loanApplications = [
  {
    name: "Paul Ndizihiwe",
    date: "2025-01-12",
    amount: "150,000 Frw",
    reason:
      "Starting small retail business to support my family and create employement in our community",
  },
  {
    name: "Marie Uwimana",
    date: "2025-03-12",
    amount: "75,000 Frw",
    reason:
      "Medical emergency for my mother who need immediate treatment at the hospital",
  },
  {
    name: "Jean Baptiste",
    date: "2025-03-15",
    amount: "200,000 Frw",
    reason:
      "Expanding my agriculture activities to increase crop production and income",
  },
];

const LoanApprovalList: React.FC = () => {
  return (
    <div className="bg-[#043c44] p-6 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">LoanApproval</h2>
        <p className="flex items-center text-yellow-500 font-semibold">
          <Clock className="mr-2" size={18} />
          {loanApplications.length} pending approval
        </p>
      </div>

      {/* List */}
      {loanApplications.map((loan, idx) => (
        <LoanApprovalCard
          key={idx}
          name={loan.name}
          date={loan.date}
          amount={loan.amount}
          reason={loan.reason}
          onView={() => alert(`Viewing ${loan.name}`)}
          onApprove={() => alert(`Approved ${loan.name}`)}
          onReject={() => alert(`Rejected ${loan.name}`)}
        />
      ))}
    </div>
  );
};

export default LoanApprovalList;
