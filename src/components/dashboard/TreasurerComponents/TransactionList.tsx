// ✅ components/dashboard/shared/TransactionList.tsx
import React from "react";
import TransactionItem from "./TransationItem";

const transactions = [
  {
    name: "Bob Smith",
    type: "Loan repayment",
    date: "2025-01-14",
    amount: "15,000 Frw",
  },
  {
    name: "Patrick Ineza",
    type: "Contribution",
    date: "2025-01-13",
    amount: "30,000 Frw",
  },
  {
    name: "Irera Aaron",
    type: "Loan",
    date: "2025-01-13",
    amount: "100,000 Frw",
  },
  {
    name: "Eva Devis",
    type: "Contribution",
    date: "2025-01-13",
    amount: "10,000 Frw",
  },
];

const TransactionList: React.FC = () => {
  return (
    <div className="font-poppins ">
      {" "}
      <h2 className="text-4xl  font-bold text-white mb-8">
        Recent Transaction
      </h2>
      <div className="relative  border border-[#FEFEFE] p-10 rounded-xl shadow-md h-120 overflow-auto scrollbar-hide">
        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-0"></div>

        {/* 🔹 Content goes here */}
        <div className="relative z-10">
          {transactions.map((tx, idx) => (
            <TransactionItem key={idx} {...tx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
