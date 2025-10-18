import React from "react";
import { useGetContributionsByUserQuery } from "@services/api/ContributionApi";
import { useGetLoansQuery } from "@services/api/loanApi";

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: "success" | "Pending" | "Rejected";
  balance: number;

}

const RecentTransactions: React.FC = () => {
  // Fetch contributions
  const {
    data: contributions = [],
    isLoading: loadingContributions,
    isError: errorContributions,
  } = useGetContributionsByUserQuery();

  // Fetch loans
  const {
    data: loans = [],
    isLoading: loadingLoans,
    isError: errorLoans,
  } = useGetLoansQuery();

  const isLoading = loadingContributions || loadingLoans;
  const isError = errorContributions || errorLoans;

  const contributionTransactions: Transaction[] = contributions.map((c: any) => ({
  id: c.id,
  date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "",
  type: c.type ?? "Contribution",
  amount: c.amount ?? 0,
  status: (c.status as Transaction["status"]) ?? "success",
  balance: c.balance ?? 0,
}));


  const loanTransactions: Transaction[] = loans.map((l) => ({
    id: l.id,
    date: new Date(l.createdAt).toLocaleDateString(),
    type: "Loan",
    amount: l.amount,
    status:
      l.status === "approved"
        ? "success"
        : l.status === "pending"
        ? "Pending"
        : "Rejected",
    balance: 0,
  }));

  const transactions: Transaction[] = [
    ...contributionTransactions,
    ...loanTransactions,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatAmount = (amount: number) =>
    amount > 0
      ? `+Rwf ${amount.toLocaleString()}`
      : `-Rwf ${Math.abs(amount).toLocaleString()}`;

  const statusColors: Record<string, string> = {
    success: "text-green-500",
    Pending: "text-yellow-500",
    Rejected: "text-red-500",
  };

  if (isLoading) {
    return <p className="text-gray-300">Loading transactions...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Failed to load transactions.</p>;
  }

  return (
    <div className="overflow-auto scrollbar-hide">
      <div>
        <h2 className="text-5xl font-bold text-[#F9A825] mb-4">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto border border-[#F9A825] p-10 h-120 rounded-lg">
          <table className="min-w-full border-collapse border border-gray-400">
            <thead>
              <tr className="text-left text-gray-300 border-gray-600">
                <th className="p-3 border border-gray-400 text-left">Date</th>
                <th className="p-3 border border-gray-400">Transaction Id</th>
                <th className="p-3 border border-gray-400">Type</th>
                <th className="p-3 border border-gray-400">Amount</th>
                <th className="p-3 border border-gray-400">Status</th>
                <th className="p-3 border border-gray-400">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-white hover:bg-[#014d54]">
                  <td className="p-3 border-r border-gray-400">{tx.date}</td>
                  <td className="p-3 border-r border-gray-400">#{tx.id}</td>
                  <td className="p-3 border-r border-gray-400">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3 border-r border-gray-400">
                    {formatAmount(tx.amount)}
                  </td>
                  <td
                    className={`p-3 font-semibold border-r border-gray-400 ${
                      statusColors[tx.status]
                    }`}>
                    {tx.status}
                  </td>
                  <td className="p-3 border-r border-gray-400">
                    Rwf {tx.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-3 text-center text-gray-400 border border-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
