import React, { useState } from "react";

import LoanDetailModal from "./LoanDetailModal";
import LoanApprovalCard from "./LoanApprovalCard";



const LoanApprovalList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <LoanApprovalCard
        name="John Doe"
        date="2025-10-01"
        amount="$5,000"
        reason="Business Expansion"
        onView={() => console.log("View clicked")}
        onApprove={() => console.log("Approved")}
        onReject={() => console.log("Rejected")}
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
