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
    <tr className=" text-white font-poppins">
      <td className="px-4 py-3">{date}</td>
      <td className="px-4 py-3">{member}</td>
      <td className="px-4 py-3">{action}</td>
      <td className="px-4 py-3">{amount}</td>
      <td className="px-4 py-3 text-green-500">{status}</td>
    </tr>
  );
};

export default ReportRow;
