import React from "react";

interface ActionPromptCardProps {
  title: string;
  highlightedText: string;
  selectOptions: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  buttonText?: string;
  placeholder?: string;
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
  return (
    <div className="bg-[#043c44] p-10 rounded-xl shadow-md text-center max-w-lg w-full mx-auto">
      <h2 className="text-white text-xl font-semibold mb-1">{title}</h2>
      <h3 className="text-[#f5a623] text-2xl font-bold mb-6">
        {highlightedText}
      </h3>

      <select
        className="w-full p-3 rounded border border-gray-300 text-gray-600 bg-[#043c44] mb-6"
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

      <button
        onClick={onContinue}
        className="bg-[#f5a623] text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-[#d18d1a] transition">
        {buttonText}
      </button>
    </div>
  );
};

export default ActionPromptCard;
