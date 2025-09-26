import { useState, useEffect } from "react";
import { Calendar, CreditCard } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import { useGetLoansQuery } from "@services/api/loanApi";
import { useCreateRepaymentMutation, useGetLoanBalanceQuery } from "@services/api/repaymentApi";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

export default function LoanPayment() {
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  const { data: loans = [], isLoading: loadingLoans } = useGetLoansQuery();
  const userApprovedLoans = loans.filter(
    (loan) => loan.userId === loggedInUser?.id && loan.status === "approved"
  );
  const activeLoan = userApprovedLoans[0];
  const { data: balanceData, isLoading: loadingBalance } = useGetLoanBalanceQuery(activeLoan?.id!, {
    skip: !activeLoan,
  });
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  });
  const [method, setMethod] = useState<string>("Bank Transfer");

  const [totalRemaining, setTotalRemaining] = useState<number>(0);

  useEffect(() => {
    if (balanceData?.balance !== undefined) {
      setTotalRemaining(balanceData.balance);
    } else {
      setTotalRemaining(0);
    }
  }, [balanceData]);

  const [createRepayment, { isLoading }] = useCreateRepaymentMutation();

  const handleSubmit = async () => {
    if (!activeLoan) {
      alert("No approved loan found.");
      return;
    }

    if (!amount || !date) {
      alert("Please enter amount and date.");
      return;
    }

    try {
      await createRepayment({
        loanId: activeLoan.id,
        amount,
        date,
      }).unwrap();

      alert("Payment submitted successfully!");
      setAmount(0);

      const today = new Date();
      setDate(today.toISOString().split("T")[0]);
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#00353B] p-4 font-poppins relative">
      <div className="absolute top-20 left-20">
        <img src={logo} alt="aguka logo" className="w-50 h-50 rounded-full object-cover" />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl bg-[#00353B] text-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#F9A825] mb-10">
            Loan Payment
          </h2>
          <p className="font-semibold text-[#FFFFFF] mb-6 text-2xl sm:text-base">
            Make payment toward your loan balance
          </p>

          <div className="mb-4">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Loan Amount Remaining
            </label>
            <input
              type="text"
              value={
                loadingLoans || loadingBalance
                  ? "Loading..."
                  : `Frw ${totalRemaining.toLocaleString()}`
              }
              readOnly
              className="w-full px-4 py-2 bg-transparent border border-[#F9A825] rounded-lg font-bold text-lg text-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Amount to Pay <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Frw 0"
              className="w-full px-4 py-2 bg-transparent border border-[#F9A825] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-[#F9A825] rounded-lg px-3 py-2 bg-transparent">
              <Calendar className="w-5 h-5 text-[#F9A825] mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Payment Method{" "}
              <span className="bg-gradient-to-r from-[#545D5E] to-[#B0C2C4] bg-clip-text text-transparent">
                (Optional)
              </span>
            </label>
            <div className="flex items-center border border-[#F9A825] rounded-lg px-3 py-2 bg-transparent">
              <CreditCard className="w-5 h-5 text-[#F9A825] mr-2" />
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-transparent text-[#FFFFFF] focus:outline-none"
              >
                <option className="bg-[#003B42]">Bank Transfer</option>
                <option className="bg-[#003B42]">Mobile Money</option>
                <option className="bg-[#003B42]">Credit Card</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#7A5212] to-[#E09721] text-white text-2xl font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Submit Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}
