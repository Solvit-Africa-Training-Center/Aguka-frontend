// ✅ components/dashboard/reports/ReportRow.tsx
import React from "react";

interface ReportRowProps {
  date: string;
  member: string;
  action: string;
  amount: string;
  status: string;
}

const ReportRow: React.FC<ReportRowProps> = ({ date, member, action, amount, status }) => {
  return (
    <tr className="border-b border-gray-700 text-white">
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2">{member}</td>
      <td className="px-4 py-2">{action}</td>
      <td className="px-4 py-2">{amount}</td>
      <td className="px-4 py-2 text-green-500">{status}</td>
    </tr>
  );
};

export default ReportRow;
