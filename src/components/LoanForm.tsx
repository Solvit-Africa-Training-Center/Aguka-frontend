import logo from "assets/logo/agukalogo.png";
import { useState } from "react";
import { differenceInMonths } from "date-fns";
import { useRequestLoanMutation } from "@services/api/loanApi";

export default function LoanForm() {
  const [amount, setAmount] = useState<number | "">("");
  const [totalPayable, setTotalPayable] = useState<number | "">("");
  const [endDate, setEndDate] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<number | null>(null);

  const [requestLoan, { isLoading, data, error }] = useRequestLoanMutation();

  // Handle loan amount change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAmount(value);
    if (!isNaN(value) && value > 0) {
      setTotalPayable(value + value * 0.05); // 5% interest
    } else {
      setTotalPayable("");
    }
  };

  // Handle date change and calculate duration in months
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pickedDate = new Date(e.target.value);
    const today = new Date();

    if (pickedDate > today) {
      const months = differenceInMonths(pickedDate, today);
      setDurationMonths(months);
      setEndDate(e.target.value);
    } else {
      setDurationMonths(null);
      setEndDate("");
    }
  };

  // Submit loan
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !durationMonths) return alert("Please fill all fields");

    try {
      await requestLoan({ amount: Number(amount), durationMonths }).unwrap();
      alert("Loan submitted successfully!");
      // Optionally reset form
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#003B42] p-4 font-poppins">
      {/* Logo */}
      <div className="mb-6">
        <img src={logo} alt="aguka logo" className="w-50 h-50 rounded-full object-cover" />
      </div>

      {/* Form Card */}
      <form
        className="bg-[#003B42] text-white p-8 rounded-3xl shadow-lg w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Apply for the <br />
          <span className="text-[#F9A825] font-bold">Loan</span>
        </h2>

        {/* Loan Amount */}
        <div className="mb-4">
          <label className="block text-xl mb-1">Loan Amount</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter loan amount"
            className="w-full px-4 py-2 rounded-lg border-3 border-[#948E8E] bg-transparent placeholder-gray-400 text-white focus:outline-none"
          />
        </div>

        {/* Total Payable */}
        <div className="mb-4">
          <label className="block text-xl mb-1">Total Payable</label>
          <input
            type="number"
            value={totalPayable}
            readOnly
            placeholder="The money you will pay"
            className="w-full px-4 py-2 rounded-lg border-3 border-[#948E8E] bg-transparent placeholder-gray-400 text-white focus:outline-none"
          />
        </div>

        {/* Loan End Date */}
        <div className="mb-6">
          <label className="block text-xl mb-1">Duration Months</label>
          <input
            type="date"
            value={endDate}
            onChange={handleDateChange}
            className="w-full px-4 py-2 rounded-lg border-3 border-[#948E8E] bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
          {durationMonths !== null && (
            <p className="mt-3 text-sm text-[gray-300]">
              Duration: <span className="font-semibold">{durationMonths} Month{durationMonths > 1 ? "s" : ""}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#F9A825] text-white text-xl font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {/* Success / Error messages */}
        {data && <p className="mt-4 text-green-400">Loan Approved! ID: {data.id}</p>}
        {error && <p className="mt-4 text-red-500">Error: {(error as any)?.data?.message || "Something went wrong"}</p>}
      </form>
    </div>
  );
}
