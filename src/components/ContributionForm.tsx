import React from "react";
import logo from "assets/logo/agukalogo.png";
import { BsCreditCardFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ContributionForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/memberdashboard/successcontribution"); // 👈 correct path
  };

  return (
    <div className="place-items-center min-h-screen bg-[#00353B] pt-20 font-poppins px-4">
      {/* Logo Section */}
      <div className="relative w-36 h-36 mb-8 mx-auto rounded-full bg-black">
        <img
          src={logo}
          alt="logo"
          className="w-36 h-36 object-contain absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
        <div className="absolute inset-0 bg-black opacity-40 rounded-full" />
      </div>

      {/* Form Container */}
      <div className="text-white rounded-3xl w-full max-w-2xl border border-[#E09721] p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <h2 className="text-left text-xl px-4 font-extralight">
            Your contribution today shapes a brighter tomorrow
          </h2>

          <div className="space-y-6 p-10">
            {/* Amount Input */}
            <div className="mb-6">
              <label className="block mb-2 text-xl">Amount to contribute</label>
              <input
                type="text"
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
                  name="paymentMethod"
                  className="w-full px-3 py-3  border border-[#E09721] rounded-lg text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#545D5E] to-[#B0C2C4] focus:outline-none text-center pl-10">
                  <option value="Bank Transfer" className=" ">
                    Bank Transfer
                  </option>
                  <option value="Mobile Money" className=" ">
                    Mobile Money
                  </option>
                  <option value="Credit Card" className=" ">
                    Credit Card
                  </option>
                </select>

                {/* Icon inside the select */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#E09721]">
                  <BsCreditCardFill className="size-10" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#E09721] hover:bg-yellow-600 text-white font-semibold rounded-lg text-2xl transition duration-200">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContributionForm;
