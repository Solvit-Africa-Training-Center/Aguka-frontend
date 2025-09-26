// SuccessContribution.tsx
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

interface SuccessContributionProps {
  onClose: () => void;
}

const SuccessContribution: React.FC<SuccessContributionProps> = ({
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#D9E9EB] p-6 rounded-xl text-center shadow-2xl max-w-sm w-full">
        <FiCheckCircle className="text-[#43A047] w-12 h-12 mx-auto mb-2" />
        <p className="text-xl font-semibold text-gray-800">
          Contribution Successful
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 bg-[#E09721] text-white rounded-lg text-lg hover:bg-yellow-600">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessContribution;
