import { useSelector } from "react-redux";
import type { RootState } from "services/store/store";
import { DollarSign, HandCoins, Clock, CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";
import type { Loan } from "types/Loan";
import type { Repayment } from "types/Repayment";
import { useGetLoansQuery } from "services/api/loanApi";
import { useGetRepaymentsQuery } from "services/api/repaymentApi";

export default function LoanProfile() {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || "";

  // Fetch loans and repayments
  const { data: loans = [], isLoading: isLoansLoading } = useGetLoansQuery();
  const { data: repayments = [], isLoading: isRepaymentsLoading } =
    useGetRepaymentsQuery();

  const userLoans: Loan[] = loans.filter((loan) => loan.userId === userId);

  // Only approved loans should be considered
  const approvedLoans: Loan[] = userLoans.filter(
    (loan) => loan.status?.toLowerCase() === "approved"
  );

  const totalBorrowed = approvedLoans.reduce(
    (sum, loan) => sum + loan.amount,
    0
  );

  const currentLoanBalance = approvedLoans.reduce((sum, loan) => {
    const DEFAULT_RATE = 0.05;
    const duration = loan.durationMonths ?? 0;
    const totalPayable = loan.amount + loan.amount * DEFAULT_RATE * duration;

    const totalRepayments = repayments
      .filter((r: Repayment) => r.loanId === loan.id)
      .reduce((rSum, r) => rSum + r.amount, 0);

    const remainingBalance = totalPayable - totalRepayments;

    return sum + remainingBalance;
  }, 0);

  // Max loan amount and pending applications
  const maxLoanAmount = 800000;
  const pendingApplications = userLoans.filter(
    (loan) => loan.status.toLowerCase() === "pending"
  ).length;

  if (isLoansLoading || isRepaymentsLoading) {
    return (
      <div className="p-15 text-center text-white">Loading loan profile...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002F35]  font-poppins flex flex-col pt-45">
      <div className="flex-1 p-4 sm:p-8 w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              My loans
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Manage your loan applications and active loans
            </p>
          </div>
          <Link
            to="../loanform"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 text-sm sm:text-base inline-block">
            + Apply for Loan
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Current Loan Balance */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Current Loan Balance</h3>
              <DollarSign className="w-6 h-6 text-[#B7B7B7]" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#F9A825]">
              RWF {currentLoanBalance.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-[#F4F4F4]">
              Total borrowed: RWF {totalBorrowed.toLocaleString()}
            </p>
          </div>

          {/* Repayment */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Repayment</h3>
              <HandCoins className="w-6 h-6 text-[#B7B7B7]" />
            </div>
            <div className="flex">
              <Link
                to="/memberdashboard/payment"
                className="bg-[#F9A825] text-black font-semibold px-4 py-2 rounded-lg w-auto inline-block">
                Pay
              </Link>
            </div>
            <p className="text-xs sm:text-sm mt-3 text-[#F4F4F4]">
              Pay your loan on time
            </p>
          </div>

          {/* Max Loan Amount */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Max Loan Amount</h3>
              <Clock className="w-6 h-6 text-[#B7B7B7]" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#F9A825]">
              RWF {maxLoanAmount.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-[#F4F4F4]">
              Based on Contributions
            </p>
          </div>

          {/* Pending Applications */}
          <div className="bg-[#004147] p-6 rounded-xl text-white w-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base">Pending Applications</h3>
              <CircleCheckBig className="w-6 h-6 text-[#B7B7B7]" />
            </div>
            <p className="text-lg sm:text-xl font-bold text-[#F9A825]">
              {pendingApplications}
            </p>
            <p className="text-xs sm:text-sm mt-2 text-[#F4F4F4]">
              Awaiting Approval
            </p>
          </div>
        </div>

        {/* Tabs */}
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
