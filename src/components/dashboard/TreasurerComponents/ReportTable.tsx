// ✅ components/dashboard/reports/ReportTable.tsx
import React from "react";
import ReportRow from "./ReportRow";

const reports = [
  { date: "2025-01-14", member: "Alice Johnson", action: "Withdrawal", amount: "Rwf 20,000", status: "Active" },
  { date: "2025-01-24", member: "Marie Mukesh", action: "Deposit", amount: "Rwf 20,000", status: "Active" },
  { date: "2025-01-14", member: "Alice Johnson", action: "Deposit", amount: "Rwf 20,000", status: "Active" },
  // ... add more rows
];

const ReportTable: React.FC = () => {
  return (
    <div className="border border-gray-400 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-4">Detailed Daily Report</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-white border-b border-gray-500">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Member</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <ReportRow key={i} {...r} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
