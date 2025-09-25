import React, { useState } from "react";
import LoanApprovalCard from "./LoanApprovalCard";
import LoanDetailModal from "./LoanDetailModal";

interface Loan {
  name: string;
  date: string;
  amount: string;
  reason: string;
  previousLoans: string;
  monthlyContribution: string;
  employmentStatus: string;
}

const LoanApprovalList: React.FC = () => {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const loans: Loan[] = [
    {
      name: "Paul Ndizihe",
      date: "2025-01-05",
      amount: "150,000 Frw",
      reason: "Business Expansion",
      previousLoans: "2 (all repaid on time)",
      monthlyContribution: "250,000 Frw",
      employmentStatus: "Self-employed",
    },
    {
      name: "Marie Uwimana",
      date: "2025-03-12",
      amount: "75,000 Frw",
      reason: "Medical emergency",
      previousLoans: "1 (still repaying)",
      monthlyContribution: "100,000 Frw",
      employmentStatus: "Unemployed",
    },
  ];

  return (
    <div className="space-y-6">
      {loans.map((loan, idx) => (
        <LoanApprovalCard
          key={idx}
          name={loan.name}
          date={loan.date}
          amount={loan.amount}
          reason={loan.reason}
          onView={() => setSelectedLoan(loan)}
          onApprove={() => alert("Approved")}
          onReject={() => alert("Rejected")}
        />
      ))}

      {/* Modal */}
      {selectedLoan && (
        <LoanDetailModal
          isOpen={!!selectedLoan}
          onClose={() => setSelectedLoan(null)}
          member={selectedLoan.name}
          amountRequested={selectedLoan.amount}
          previousLoans={selectedLoan.previousLoans}
          monthlyContribution={selectedLoan.monthlyContribution}
          employmentStatus={selectedLoan.employmentStatus}
        />
      )}
    </div>
  );
};

export default LoanApprovalList;
