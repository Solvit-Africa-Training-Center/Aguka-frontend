import React, { useState } from "react";
import logo from "assets/logo/agukalogo.png";
import { BsCreditCardFill } from "react-icons/bs";

import { useCreateContributionMeMutation } from "@services/api/ContributionApi";
import type { PaymentMethod } from "types/Contribution";
import SuccessContribution from "./SuccessContribution"; // ✅ Import the popup

const ContributionForm: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [showPopup, setShowPopup] = useState(false); // ✅ Popup state

  const [createContributionMe, { isLoading, error }] =
    useCreateContributionMeMutation();

  const paymentOptions: { label: string; value: PaymentMethod }[] = [
    { label: "Bank Transfer", value: "bank" },
    { label: "Mobile Money", value: "momo" },
    { label: "Cash", value: "cash" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createContributionMe({
        amount: Math.round(parseFloat(amount)),
        paymentMethod,
      }).unwrap();

      setShowPopup(true); // ✅ Show popup

      // Optional: auto-close or navigate after delay
      // setTimeout(() => setShowPopup(false), 3000);
      // or navigate("/memberdashboard");
    } catch (err) {
      console.error("Failed to submit contribution:", err);
    }
  };

  return (
    <div className="place-items-center min-h-screen bg-[#00353B] pt-20 font-poppins px-4">
      {/* ✅ Success Popup */}
      {showPopup && <SuccessContribution onClose={() => setShowPopup(false)} />}

      {/* Logo */}
      <div className="relative w-36 h-36 mb-8 mx-auto rounded-full bg-black">
        <img
          src={logo}
          alt="logo"
          className="w-36 h-36 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-full" />
      </div>

      {/* Form */}
      <div className="text-white rounded-3xl w-full max-w-2xl border border-[#E09721] p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-left text-xl px-4 font-extralight">
            Your contribution today shapes a brighter tomorrow
          </h2>

          <div className="space-y-6 p-10">
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block mb-2 text-xl">Amount to contribute</label>
              <input
                type="number"
                min={500}
                step={100}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-xl text-center font-bold focus:outline-none px-4 py-3 rounded-lg border border-[#E09721] placeholder:text-center text-transparent bg-clip-text bg-gradient-to-b from-[#545D5E] to-[#B0C2C4]"
                placeholder="Frw 0"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <label className="block mb-2 text-xl">
                Payment Method{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#545D5E] to-[#B0C2C4]">
                  (Optional)
                </span>
              </label>
              <div className="relative">
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as PaymentMethod)
                  }
                  aria-label="Select payment method"
                  className="my-custom-select w-full px-3 py-3 border border-[#E09721] rounded-lg appearance-none text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#545D5E] to-[#B0C2C4] focus:outline-none focus:ring-2 focus:ring-[#E09721]/50 focus:border-[#E09721] text-center pl-14 pr-12 transition duration-200 ease-in-out">
                  {paymentOptions.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="text-[#E09721]">
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* Left icon: Credit Card */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#E09721] pointer-events-none">
                  <BsCreditCardFill className="size-6 md:size-7 lg:size-8" />
                </div>

                {/* Right icon: Dropdown arrow */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#E09721] pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#E09721] hover:bg-yellow-600 text-white font-semibold rounded-lg text-2xl transition duration-200">
              {isLoading ? "Submitting..." : "Submit"}
            </button>

            {error && (
              <p className="text-red-500 text-center mt-2">
                Failed to submit contribution
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContributionForm;
