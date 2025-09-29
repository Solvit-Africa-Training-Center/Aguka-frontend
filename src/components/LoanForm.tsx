import logo from "assets/logo/agukalogo.png";
import { useState } from "react";
import { differenceInMonths } from "date-fns";
import { useRequestLoanMutation } from "@services/api/loanApi";

const DEFAULT_RATE = 0.05;

export default function LoanForm() {
  const [amount, setAmount] = useState<number | "">("");
  const [totalPayable, setTotalPayable] = useState<number | "">("");
  const [endDate, setEndDate] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<number | null>(null);

  const [requestLoan, { isLoading }] = useRequestLoanMutation();

  const calculateTotal = (amt: number, months: number) => {
    return Math.floor(amt + amt * DEFAULT_RATE * months);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      value = Math.floor(value);
      setAmount(value);
      if (durationMonths) {
        setTotalPayable(calculateTotal(value, durationMonths));
      }
    } else {
      setAmount("");
      setTotalPayable("");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedDate = new Date(e.target.value);
    const today = new Date();
    if (pickedDate > today) {
      const months = differenceInMonths(pickedDate, today);
      setDurationMonths(months);
      setEndDate(e.target.value);
      if (amount) {
        setTotalPayable(calculateTotal(Number(amount), months));
      }
    } else {
      setDurationMonths(null);
      setEndDate("");
      setTotalPayable("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !durationMonths) {
      return alert("Please fill all fields");
    }
    try {
      await requestLoan({ amount: Number(amount), durationMonths }).unwrap();
      alert("Loan submitted successfully!");
      setAmount("");
      setTotalPayable("");
      setEndDate("");
      setDurationMonths(null);
    } catch (err) {
      console.error(err);
      alert("Loan submission failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#003B42] p-4 sm:p-6 md:p-10 font-poppins">
      <div className="mb-6">
        <img
          src={logo}
          alt="aguka logo"
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover"
        />
      </div>

      <form
        className="bg-[#003B42] text-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl"
        onSubmit={handleSubmit}>
        <h2 className="text-center text-lg sm:text-2xl md:text-3xl font-semibold mb-6">
          Apply for the <br />
          <span className="text-[#F9A825] font-bold">Loan</span>
        </h2>

        {/* Loan Amount */}
        <div className="mb-4">
          <label className="block text-base sm:text-lg md:text-xl mb-1">
            Loan Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter loan amount"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 border-[#948E8E] bg-transparent placeholder-gray-400 text-white focus:outline-none text-sm sm:text-base"
          />
        </div>

        {/* Total Payable */}
        <div className="mb-4">
          <label className="block text-base sm:text-lg md:text-xl mb-1">
            Total Payable
          </label>
          <input
            type="number"
            value={totalPayable}
            readOnly
            placeholder="Calculated automatically"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 border-[#948E8E] bg-transparent placeholder-gray-400 text-white focus:outline-none text-sm sm:text-base"
          />
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label className="block text-base sm:text-lg md:text-xl mb-1">
            Duration / End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={handleDateChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-lg border-2 border-[#948E8E] bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
          />
          {durationMonths !== null && (
            <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-300">
              Duration:{" "}
              <span className="font-semibold">
                {durationMonths} Month{durationMonths > 1 ? "s" : ""}
              </span>
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-[#F9A825] text-white text-base sm:text-lg md:text-xl font-bold py-2 sm:py-3 rounded-lg shadow-md hover:opacity-90 transition"
          disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
