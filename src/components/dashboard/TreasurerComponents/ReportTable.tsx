import React from "react";
import ReportRow from "./ReportRow";

interface Report {
  date: string;
  member: string;
  action: string;
  amount: string;
  status: string;
}

interface Props {
  reports: Report[];
}

const ReportTable: React.FC<Props> = ({ reports }) => {
  return (
    <div className="border border-gray-400 rounded-lg p-6 font-poppins">
      <h2 className="text-2xl font-bold text-white mb-10">Detailed Report</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-white  text-3xl ">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Member</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((r, i) => <ReportRow key={i} {...r} />)
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-300 py-4">
                No reports found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
