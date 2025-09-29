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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-0">
      <div className="bg-[#D9E9EB] p-6 sm:p-8 rounded-xl text-center shadow-2xl max-w-sm w-full">
        <FiCheckCircle className="text-[#43A047] w-12 h-12 mx-auto mb-4 sm:mb-6" />
        <p className="text-lg sm:text-xl font-semibold text-gray-800">
          Contribution Successful
        </p>
        <button
          onClick={onClose}
          className="mt-4 sm:mt-6 px-5 py-2 sm:px-6 sm:py-3 bg-[#E09721] text-white rounded-lg text-lg sm:text-xl hover:bg-yellow-600 transition-colors">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessContribution;
