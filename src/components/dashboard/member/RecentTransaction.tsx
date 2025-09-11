import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: "success" | "Pending" | "Rejected";
  balance: number;
}

const RecentTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // ✅ Demo Data (replace with fetch later)
  useEffect(() => {
    setTransactions([
      {
        id: "TXN001",
        date: "2025-09-01",
        type: "Deposit",
        amount: 25000,
        status: "success",
        balance: 75000,
      },
      {
        id: "TXN002",
        date: "2025-09-02",
        type: "Withdrawal",
        amount: -10000,
        status: "Pending",
        balance: 65000,
      },
      {
        id: "TXN003",
        date: "2025-09-04",
        type: "Contribution",
        amount: 15000,
        status: "success",
        balance: 80000,
      },
    ]);
  }, []);

  // ✅ Format amount with +/-
  const formatAmount = (amount: number) => {
    return amount > 0
      ? `+Rwf ${amount.toLocaleString()}`
      : `-Rwf ${Math.abs(amount).toLocaleString()}`;
  };

  // ✅ Status colors
  const statusColors: Record<string, string> = {
    success: "text-green-500",
    Pending: "text-yellow-500",
    Rejected: "text-red-500",
  };

  return (
    <div className="overflow-auto">
      <div className="bg-[#003B42] p-6 rounded-lg border border-[#F9A825] shadow-[0_0_12px_#F9A825] h-150">
        <h2 className="text-4xl font-bold text-white mb-4 ">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-300 border-b border-gray-600">
                <th className="p-3">Date</th>
                <th className="p-3">Transaction Id</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="text-white border-b border-gray-700 hover:bg-[#014d54]">
                  <td className="p-3">{tx.date}</td>
                  <td className="p-3">#{tx.id}</td>
                  <td className="p-3">
                    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3">{formatAmount(tx.amount)}</td>
                  <td
                    className={`p-3 font-semibold ${statusColors[tx.status]}`}>
                    {tx.status}
                  </td>
                  <td className="p-3">Rwf {tx.balance.toLocaleString()}</td>
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
