import { useState, useEffect } from "react";
import LoanNavbar from "@components/LoanNavbar";
import { DollarSign, HandCoins, Clock,CircleCheckBig} from "lucide-react";
 import { Link } from "react-router-dom";

type LoanData = {
  currentLoanBalance: number;
  totalBorrowed: number;
  maxLoanAmount: number;
  pendingApplications: number;
};

export default function LoanProfile() {
  const [loanData, setLoanData] = useState<LoanData | null>(null);

  useEffect(() => {
    const mockData: LoanData = {
      currentLoanBalance: 275000,
      totalBorrowed: 300000,
      maxLoanAmount: 800000,
      pendingApplications: 1,
    };

    setTimeout(() => {
      setLoanData(mockData);
    }, 1000);
  }, []);

  if (!loanData) {
    return <div className="p-6 text-center text-white">Loading loan profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#002F35] font-poppins flex flex-col">
      {/* Navbar */}
      <LoanNavbar />

      {/* Content */}
      <div className="flex-1 p-4 sm:p-8 w-full max-w-6xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">My loans</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Manage your loan applications and active loans
            </p>
          </div>
        

<Link
  to="/loanform"
  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base inline-block"> + Apply for Loan
</Link>

        </div>

        {/* Loan Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Current Loan Balance */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Current Loan Balance</h3>
              <DollarSign className="w-6 h-6 text-gray-200" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#F9A825]">
              RWF {loanData.currentLoanBalance.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-gray-300">
              Total borrowed: RWF {loanData.totalBorrowed.toLocaleString()}
            </p>
          </div>

          {/* Repayment */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Repayment</h3>
              <HandCoins className="w-6 h-6 text-gray-200" />
            </div>
            <div className="flex">
  <Link to="/loanpayment"
    className="bg-[#F9A825] text-black font-semibold px-4 py-2 rounded-lg w-auto inline-block">
    Pay
  </Link>
</div>

            <p className="text-xs sm:text-sm mt-3 text-gray-300">Pay your loan on time</p>
          </div>

          {/* Max Loan Amount */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Max Loan Amount</h3>
              <Clock className="w-6 h-6 text-gray-200" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#F9A825]">
              RWF {loanData.maxLoanAmount.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-gray-300">Based on Contributions</p>
          </div>

          {/* Pending Applications */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Pending Applications</h3>
              <CircleCheckBig className="w-6 h-6 text-gray-200" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#F9A825]">
              {loanData.pendingApplications}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-gray-300">Awaiting Approval</p>
          </div>
        </div>

        {/* Bottom Tabs */}
        <div className="flex flex-col sm:flex-row bg-[#004147] rounded-lg overflow-hidden text-white">
          <button className="flex-1 px-4 py-3 bg-[#212121] font-medium text-sm sm:text-base">
            Loan Applications
          </button>
          <button className="flex-1 px-4 py-3 hover:bg-[#212121] text-sm sm:text-base">
            Active Loans
          </button>
          <button className="flex-1 px-4 py-3 hover:bg-[#212121] text-sm sm:text-base">
            Loan History
          </button>
        </div>
      </div>
    </div>
  );
}
