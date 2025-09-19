import React, { useState } from "react";
import logo from "assets/logo/agukalogo.png";
type PaymentMethod = "Bank Transfer" | "Mobile Money" | "Credit Card" | "";

const ContributionForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // This is where you will integrate payment API
    alert("Thank you for your contribution!");
  };

  return (
    <div className="place-items-center min-h-screen bg-[#00353B] pt-20 font-poppins ">
      <div className="items-center mb-4">
        <img src={logo} alt="logo" className="w-35 h-35 rounded-full "/>
      </div>
          <div  className="text-white rounded-xl shadow-lg w-full max-w-xl h-130 border border-[#E09721]">
      <form
        onSubmit={handleSubmit}
      >
        {/* Title */}
        <h2 className="text-center text-xl mb-6 ">
          Your contribution today shapes a brighter tomorrow
        </h2>
        {/* Amount Input */}
        < div className="p-10">
        <label className="block mb-4">
          <span className="text-xl ">Amount to contribute</span>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 w-full px-4 py-4 rounded-lg border border-[#E09721] text-black"
            placeholder="Frw 0"
          />
           <span className="text-xl">pay with code</span>
          <input
            type="number"
         
            value="123456"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-[#E09721] text-black"
            placeholder="Frw 0"
          />
        </label>

        {/* Payment Method */}
        <label className="block mb-4">
          <span className="text-sm">Payment Method (Optional)</span>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-[#E09721] text-black"
          >
            <option value="">Select Payment Method</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg"
        >
          Submit
        </button>
      </form>
      </div>
     </div>
    </div>
  );
};

export default ContributionForm;
