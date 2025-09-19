import { Calendar, CreditCard } from "lucide-react";
import logo from "assets/logo/agukalogo.png";

export default function LoanPayment() {
  return (
    <div className="min-h-screen bg-[#00353B] p-4 font-poppins relative">
      {/* Top-left logo */}
      <div className="absolute top-20 left-20">
        <img
          src={logo}
          alt="aguka logo"
          className="w-50 h-50 rounded-full object-cover"/>
        
      </div>

      {/* Centered card */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl bg-[#00353B] text-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#F9A825] mb-10">
            Loan Payment
          </h2>
          <p className="font-semibold text-[#FFFFFF] mb-6 text-2xl sm:text-base">
            Make payment toward your loan balance
          </p>

          {/* Loan Amount Remaining */}
          <div className="mb-4">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Loan Amount Remaining
            </label>
            <input
              type="text"
              value="Frw 157,750.00"
              readOnly
              className="w-full px-4 py-2 bg-transparent border border-[#F9A825] rounded-lg font-bold text-lg text-gray-100"
            />
          </div>

          {/* Amount to Pay */}
          <div className="mb-4">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Amount to Pay <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Frw 0"
              className="w-full px-4 py-2 bg-transparent border border-[#F9A825] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
            />
          </div>

          {/* Payment Date */}
          <div className="mb-4">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-[#F9A825] rounded-lg px-3 py-2 bg-transparent">
              <Calendar className="w-5 h-5 text-[#F9A825] mr-2" />
              <input
                type="date"
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-xl font-semibold text-[#FFFFFF] mb-4">
              Payment Method{" "}
              <span className="bg-gradient-to-r from-[#545D5E] to-[#B0C2C4] bg-clip-text text-transparent">
                (Optional)
              </span>
            </label>
            <div className="flex items-center border border-[#F9A825] rounded-lg px-3 py-2 bg-transparent">
              <CreditCard className="w-5 h-5 text-[#F9A825] mr-2" />
              <select className="w-full bg-transparent text-[#FFFFFF] focus:outline-none">
                <option className="bg-[#003B42]">Bank Transfer</option>
                <option className="bg-[#003B42]">Mobile Money</option>
                <option className="bg-[#003B42]">Credit Card</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-gradient-to-r from-[#7A5212] to-[#E09721] text-white text-2xl font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition">
            Submit Payment
          </button>
        </div>
      </div>
    </div>
  );
}
