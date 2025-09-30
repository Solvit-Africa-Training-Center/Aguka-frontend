import { useState, useEffect } from "react";
import { Calendar, CreditCard } from "lucide-react";
import { useGetLoansQuery } from "@services/api/loanApi";
import {
  useGetRepaymentsQuery,
  useCreateRepaymentMutation,
} from "@services/api/repaymentApi";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { Loan } from "types/Loan";

export default function LoanPayment() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: loans = [] } = useGetLoansQuery();
  const { data: repayments = [] } = useGetRepaymentsQuery();

  const approvedLoans = loans.filter(
    (loan: Loan) =>
      loan.userId === user?.id && loan.status.toLowerCase() === "approved"
  );

  const loansWithBalance = approvedLoans.map((loan: Loan) => {
    const DEFAULT_RATE = 0.05;
    const duration = loan.durationMonths ?? 0;
    const totalPayable = loan.amount + loan.amount * DEFAULT_RATE * duration;

    const totalRepayments = repayments
      .filter((r) => r.loanId === loan.id)
      .reduce((sum, r) => sum + r.amount, 0);

    return {
      ...loan,
      remainingBalance: Math.max(totalPayable - totalRepayments, 0),
    };
  });

  const activeLoan = loansWithBalance[0];

  const [amount, setAmount] = useState<number>(
    activeLoan?.remainingBalance || 0
  );
  const [paymentDate, setPaymentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("Bank Transfer");

  const [createRepayment, { isLoading }] = useCreateRepaymentMutation();

  useEffect(() => {
    setAmount(activeLoan?.remainingBalance || 0);
  }, [activeLoan]);

  const handleSubmit = async () => {
    if (!activeLoan) return alert("No approved loan found.");
    if (!amount || amount <= 0) return alert("Please enter a valid amount.");
    if (!paymentDate) return alert("Please select a payment date.");

    try {
      await createRepayment({
        loanId: activeLoan.id,
        amount,
        paymentMethod,
        paymentDate,
      }).unwrap();

      alert("Payment submitted successfully!");
      setAmount(0);
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#00353B] p-4 font-poppins flex justify-center items-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-[#00353B] text-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#F9A825] mb-8 sm:mb-10">
          Loan Payment
        </h2>

        {/* Loan Remaining */}
        <div className="mb-4">
          <label className="block text-lg sm:text-xl font-semibold mb-2">
            Loan Amount Remaining
          </label>
          <input
            type="text"
            value={`Frw ${activeLoan?.remainingBalance.toLocaleString() || 0}`}
            readOnly
            className="w-full px-4 py-2 bg-transparent border border-[#F9A825] rounded-lg font-bold text-lg sm:text-xl text-gray-100"
          />
        </div>

        {/* Payment Amount */}
        <div className="mb-4">
          <label className="block text-lg sm:text-xl font-semibold mb-2">
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

        {/* Payment Date */}
        <div className="mb-4">
          <label className="block text-lg sm:text-xl font-semibold mb-2">
            Payment Date
          </label>
          <div className="flex items-center border border-[#F9A825] rounded-lg px-3 py-2 bg-transparent">
            <Calendar className="w-5 h-5 text-[#F9A825] mr-2" />
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-lg sm:text-xl font-semibold mb-2">
            Payment Method
          </label>
          <div className="flex items-center border border-[#F9A825] rounded-lg px-3 py-2 bg-transparent">
            <CreditCard className="w-5 h-5 text-[#F9A825] mr-2" />
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-transparent text-white focus:outline-none">
              <option className="bg-[#003B42]">Bank Transfer</option>
              <option className="bg-[#003B42]">Mobile Money</option>
              <option className="bg-[#003B42]">Credit Card</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[#7A5212] to-[#E09721] text-white text-lg sm:text-2xl font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50">
          {isLoading ? "Processing..." : "Submit Payment"}
        </button>
      </div>
    </div>
  );
}
