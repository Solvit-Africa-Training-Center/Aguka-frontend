import React, { useState } from "react";
import LoanApprovalCard from "./LoanApprovalCard";
import LoanDetailModal from "./LoanDetailModal";



const LoanApprovalList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <LoanApprovalCard
        name="Paul Ndizihe"
        date="2025-01-05"
        amount="150,000 Frw"
        reason="Business Expansion"
        onView={() => setIsOpen(true)}
        onApprove={() => alert("Approved")}
        onReject={() => alert("Rejected")}
      />

      <LoanDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        member="Paul Ndizihe"
        amountRequested="150,000 Frw"
        previousLoans="2 (all repaid on time)"
        monthlyContribution="250,000 Frw"
        employmentStatus="Self-employed"
      />
    </div>
  );
};

export default LoanApprovalList;
