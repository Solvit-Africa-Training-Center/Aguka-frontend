import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ActionPromptCardProps {
  title: string;
  highlightedText: string;
  selectOptions: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  onContinue: (userId: string, amount: number) => void;
  buttonText?: string;
  placeholder?: string;
  amount: string;
  setAmount: (value: string) => void;
}

const ActionPromptCard: React.FC<ActionPromptCardProps> = ({
  title,
  highlightedText,
  selectOptions,
  selectedValue,
  onChange,
  onContinue,
  buttonText = "Continue",
  placeholder = "Choose an option",
}) => {
  const [amount, setAmount] = useState<string>("");

  const handleContinue = () => {
    if (!selectedValue) {
      toast.error("Please select a user");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    onContinue(selectedValue, Number(amount));
    setAmount("");
  };

  return (
    <div className="relative font-poppins p-10 rounded-xl shadow-md h-auto w-170 overflow-auto scrollbar-hide bg-[#003f46]">
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-0 rounded-xl"></div>
      <div className="relative z-10">
        {/* Title and Highlight */}
        <h2 className="text-white text-2xl pt-6 ml-48 text-center w-50 font-bold mb-1">
          {title}
        </h2>
        <h3 className="text-[#F9A825] text-center text-4xl font-bold mb-6">
          {highlightedText}
        </h3>

        {/* Select Dropdown */}
        <select
          className="w-full p-4 mt-10 rounded border border-gray-300 text-white bg-[#043c44] mb-6 focus:outline-none"
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>
            {placeholder}
          </option>
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Amount Input */}
        <div className="w-full  mt-4">
          <input
            type="number"
            min={500}
            step={100}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount (Frw)"
            className="w-full p-3 rounded-lg border border-secondary-300 outline focus:outline-none placeholder:text-xl text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="grid pl-10 pr-10 pt-5 place-contents-center">
          <button
            onClick={handleContinue}
            className="bg-[#E09721] text-white text-2xl font-semibold px-20 py-3 items-center rounded-lg hover:bg-[#d18d1a] transition">
            {buttonText}
          </button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default ActionPromptCard;
