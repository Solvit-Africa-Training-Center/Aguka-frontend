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

  const contributionTransactions: Transaction[] = contributions.map(
    (c: any) => ({
      id: c.id,
      date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "",
      type: c.type ?? "Contribution",
      amount: c.amount ?? 0,
      status: (c.status as Transaction["status"]) ?? "success",
      balance: c.balance ?? 0,
    })
  );

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
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9A825]">
          Recent Transactions
        </h2>
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {transactions.length === 0 && (
          <div className="p-4 text-center text-gray-400 border rounded">
            No transactions found
          </div>
        )}

        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-primary-400/10 border border-neutral-700 rounded-lg p-3 text-white"
          >
            <div className="flex justify-between items-start">
              <div className="text-sm text-gray-300">{tx.date}</div>
              <div className={`font-semibold ${statusColors[tx.status]}`}>
                {tx.status}
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-200 truncate">
                  ID: <span className="font-mono ml-1">#{tx.id}</span>
                </div>
                <div className="text-sm font-medium">
                  {formatAmount(tx.amount)}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="inline-block bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                  {tx.type}
                </div>
                <div>Balance: Rwf {tx.balance.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet: table */}
      <div className="hidden md:block mt-4">
        <div className="overflow-x-auto border border-[#F9A825] p-4 md:p-6 rounded-lg max-h-[60vh] overflow-y-auto scrollbar-hide">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-300">
                <th className="p-3 text-left">Date</th>
                <th className="p-3">Transaction Id</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-white hover:bg-[#014d54]">
                  <td className="p-3 align-top">{tx.date}</td>
                  <td className="p-3 align-top">#{tx.id}</td>
                  <td className="p-3 align-top">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3 align-top">{formatAmount(tx.amount)}</td>
                  <td
                    className={`p-3 font-semibold align-top ${
                      statusColors[tx.status]
                    }`}
                  >
                    {tx.status}
                  </td>
                  <td className="p-3 align-top">
                    Rwf {tx.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
