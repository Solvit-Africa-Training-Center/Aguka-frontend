// components/dashboard/shared/TransactionList.tsx
import React, { useMemo } from "react";
import TransactionItem from "./TransationItem";

import { useGetUsersQuery } from "@services/api/UserApi";
import { useGetLoansQuery } from "@services/api/loanApi";
import { useGetRepaymentsQuery } from "@services/api/repaymentApi";
import { useGetContributionsByUserQuery } from "@services/api/ContributionApi";

import type { User, Loan, Repayment, Contribution } from "types/transaction"

const TransactionList: React.FC = () => {
  const { data: users } = useGetUsersQuery(); // User[]
  const { data: loans } = useGetLoansQuery(); // Loan[]
  const { data: repayments } = useGetRepaymentsQuery(); // Repayment[]
  const { data: contributions } = useGetContributionsByUserQuery(); // Contribution[]

  const usersArray = Array.isArray(users) ? users : [];
  const loansArray = Array.isArray(loans) ? loans : [];
  const repaymentsArray = Array.isArray(repayments) ? repayments : [];
  const contributionsArray = Array.isArray(contributions) ? contributions : [];

  const transactions = useMemo(() => {
    const arr: {
      name: string;
      type: string;
      date: string;
      amount: string;
    }[] = [];

    // Users
    usersArray.forEach((u) => {
      arr.push({
        name: u.name ?? "Unknown",
        type: "User Registration",
        date: new Date(u.createdAt).toISOString().split("T")[0],
        amount: "-",
      });
    });

    // Loans
    loansArray.forEach((l) => {
      arr.push({
        name: l.user?.name ?? "Unknown",
        type: "Loan",
        date: new Date(l.createdAt).toISOString().split("T")[0],
        amount: `Rwf ${l.amount}`,
      });
    });

    // Repayments
    repaymentsArray.forEach((r) => {
      arr.push({
        name: r.user?.name ?? "Unknown",
        type: `Loan Repayment (${r.paymentMethod})`,
        date: new Date(r.paymentDate).toISOString().split("T")[0],
        amount: `Rwf ${r.amount}`,
      });
    });

    // Contributions
    contributionsArray.forEach((c) => {
      arr.push({
        name: c.user?.name ?? "Unknown",
        type: "Contribution",
        date: new Date(c.createdAt).toISOString().split("T")[0], // Use createdAt
        amount: `Rwf ${c.amount}`,
      });
    });

    return arr.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [usersArray, loansArray, repaymentsArray, contributionsArray]);

  return (
    <div className="font-poppins">
      <h2 className="text-4xl font-bold text-white mb-8">Recent Transaction</h2>
      <div className="relative border border-[#FEFEFE] p-10 rounded-xl shadow-md h-120 overflow-auto scrollbar-hide">
        <div className="absolute inset-0 bg-black opacity-40 pointer-events-none z-0 h-screen"></div>

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
