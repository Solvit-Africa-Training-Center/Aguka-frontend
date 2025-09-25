// ✅ components/dashboard/reports/ReportFilters.tsx
import React from "react";

const ReportFilters: React.FC = () => {
  return (
    <div className="flex justify-between border border-gray-400 p-6 rounded-lg mt-6 mb-6 bg-[#e6f8fa]">
      {/* Report Type */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-gray-700 font-semibold">Report Type</span>
        {["Daily Report", "Monthly Report", "Yearly Report"].map((type) => (
          <button
            key={type}
            className="border border-yellow-600 px-6 py-2 rounded-full text-black font-semibold hover:bg-yellow-100">
            {type}
          </button>
        ))}
      </div>

      {/* Date Range */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-gray-700 font-semibold">Date Range</span>
        {["Current Period", "Previous Period", "Custom Range"].map((range) => (
          <button
            key={range}
            className="border border-yellow-600 px-6 py-2 rounded-full text-black font-semibold hover:bg-yellow-100">
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportFilters;
