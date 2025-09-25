import React, { useEffect } from "react";

interface LoanDetailProps {
  isOpen: boolean;
  onClose: () => void;
  member: string;
  amountRequested: string;
  previousLoans: string;
  monthlyContribution: string;
  employmentStatus: string;
}

const LoanDetailModal: React.FC<LoanDetailProps> = ({
  isOpen,
  onClose,
  member,
  amountRequested,
  previousLoans,
  monthlyContribution,
  employmentStatus,
}) => {
  if (!isOpen) return null;

  // Close modal when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 font-poppins bg-black/60 bg-opacity-60"
      onClick={onClose} // click outside closes modal
    >
      <div
        className="bg-[#F4F9F9] p-6 w-100 h-160 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        {/* Loan Details */}
        <h2 className="text-3xl font-extrabold text-center text-[#F9A825] mb-4">
          Loan Detail
        </h2>

        <div className="space-y-10 mt-4 ">
          <p className="text-gray-700">
            <span className="font-semibold text-2xl text-[#6E6E6E]">
              Member
            </span>
            <br />
            <span className="text-3xl text-black font-extrabold">{member}</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-2xl text-[#6E6E6E]">
              Amount requested
            </span>
            <br />
            <span className="text-3xl text-black font-extrabold">
              {amountRequested}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-2xl text-[#6E6E6E]">
              Previous Loans
            </span>
            <br />
            <span className="text-3xl text-black font-extrabold">
              {previousLoans}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-2xl text-[#6E6E6E]">
              Monthly contribution
            </span>
            <br />
            <span className="text-3xl text-black font-extrabold">
              {monthlyContribution}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-2xl text-[#6E6E6E]">
              Employment status
            </span>
            <br />
            <span className="text-3xl text-black font-extrabold">
              {employmentStatus}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailModal;
