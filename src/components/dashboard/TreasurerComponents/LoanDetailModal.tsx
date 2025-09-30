import React from "react";
import { X } from "lucide-react";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
 

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

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-[#F4F9F9] p-6 rounded-md shadow-xl w-100 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl">
          <X />
        </button>

        <h2 className="text-xl font-extrabold text-[#F9A825] mb-4">
          Loan Detail
        </h2>

        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="font-semibold">Member</span>
            <br />
            {member}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Amount requested</span>
            <br />
            {amountRequested}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Previous Loans</span>
            <br />
            {previousLoans}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Monthly contribution</span>
            <br />
            {monthlyContribution}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Employment status</span>
            <br />
            {employmentStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailModal;
