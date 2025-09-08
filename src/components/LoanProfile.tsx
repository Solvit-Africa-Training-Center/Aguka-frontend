import { useState, useEffect } from "react";
import LoanNavbar from "@components/LoanNavbar";

type LoanData = {
  currentLoanBalance: number;
  totalBorrowed: number;
  creditScore: number;
  creditStatus: string;
  maxLoanAmount: number;
  pendingApplications: number;
};

export default function LoanProfile() {
  const [loanData, setLoanData] = useState<LoanData | null>(null);

  // Simulate fetching loan data (mock backend)
  useEffect(() => {
    const mockData: LoanData = {
      currentLoanBalance: 275000,
      totalBorrowed: 300000,
      creditScore: 85,
      creditStatus: "Excellent Standing",
      maxLoanAmount: 800000,
      pendingApplications: 1,
    };

    // mimic API delay
    setTimeout(() => {
      setLoanData(mockData);
    }, 1000);
  }, []);

  if (!loanData) {
    return <div className="p-6">Loading loan profile...</div>;
  }

  return (
    <div className=" min-h-screen bg-[#E6F0F1] p-6 font-poppins">
      {/* Header */}
     <LoanNavbar />

      {/* Content */}
      <div className="bg-[#E6F0F1] shadow-lg rounded-b-xl p-6">
  {/* Title and Button Row */}
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-4xl font-semibold">My Loans</h2>
    <button className="bg-black text-[#F4F4F4] px-4 py-2 rounded-lg hover:bg-gray-700">
      + Apply for Loan
    </button>
  </div>

  {/* Subtitle */}
  <p className="text-gray-600 mb-6"> Manage your loan applications and active loans</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Current Loan Balance */}
          <div className="bg-[#004147] text-[#FFFFFF] p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-5">Current Loan Balance</h3>
            <p className="text-2xl font-bold text-[#F9A825] mb-5">
              RWF {loanData.currentLoanBalance.toLocaleString()}
            </p>
            <p className="text-sm text-[#F4F4F4]">
              Total borrowed: RWF {loanData.totalBorrowed.toLocaleString()}
            </p>
          </div>

          {/* Credit Score */}
          <div className="bg-[#004147] text-white p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-5">Credit Score</h3>
            <p className="text-2xl font-bold text-[#F9A825] mb-5">
              {loanData.creditScore}/100
            </p>
            <p className="text-sm text-[#F4F4F4]">{loanData.creditStatus}</p>
          </div>

          {/* Max Loan Amount */}
          <div className="bg-[#004147] text-white p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-5">Max Loan Amount</h3>
            <p className="text-2xl font-bold text-[#F9A825] mb-5">
              RWF {loanData.maxLoanAmount.toLocaleString()}
            </p>
            <p className="text-sm text-[#F4F4F4]">Based on Contributions</p>
          </div>

          {/* Pending Applications */}
          <div className="bg-[#004147] text-white p-6 rounded-3xl">
            <h3 className="text-lg font-semibold mb-5">Pending Applications</h3>
            <p className="text-2xl font-bold text-[#F9A825] mb-5">
              {loanData.pendingApplications}
            </p>
            <p className="text-sm text-[#F4F4F4]">Awaiting Approval</p>
          </div>
        </div>
      </div>
    </div>
  );
}
