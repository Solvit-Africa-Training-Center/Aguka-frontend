import logo from "assets/logo/agukalogo.png";

const ContributionForm: React.FC = () => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Thank you for your contribution!");
  };

  return (
    <div className="place-items-center min-h-screen bg-[#00353B] pt-20 font-poppins ">
      <div className="items-center mb-4">
        <img src={logo} alt="logo" className="w-35 h-35 rounded-full " />
      </div>
      <div className="text-white rounded-xl shadow-lg w-full max-w-xl h-130 border border-[#E09721]">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <h2 className="text-center text-xl mb-6 ">
            Your contribution today shapes a brighter tomorrow
          </h2>
          {/* Amount Input */}

          <label className="block mb-4">
            <span className="text-xl ">Amount to contribute</span>
            <input
              type="number"
              min={1}
              className="mt-1 w-full px-4 py-4 rounded-lg border border-[#E09721] text-black"
              placeholder="Frw 0"
            />
            <span className="text-xl">pay with code</span>
           
          </label>

          {/* Payment Method */}
          <label className="block mb-4">
            <span className="text-sm">Payment Method (Optional)</span>
            <select
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[#E09721] text-black">
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#E09721] hover:bg-yellow-600 text-white font-semibold rounded-lg text-xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContributionForm;
