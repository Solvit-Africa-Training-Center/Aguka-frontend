// ✅ components/dashboard/reports/ReportFilters.tsx
import React, { useState, useRef, useEffect } from "react";

interface Props {
  selectedReportType: string;
  onSelectReportType: (type: string) => void;
  selectedDateRange: string;
  onSelectDateRange: (range: string) => void;
}

const ReportFilters: React.FC<Props> = ({
  onSelectReportType,
  onSelectDateRange,
}) => {
  const [isReportTypeOpen, setIsReportTypeOpen] = useState(false);
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("Daily Report");
  const [selectedDateRange, setSelectedDateRange] = useState("Current Period");

  const reportTypeRef = useRef<HTMLDivElement>(null);
  const dateRangeRef = useRef<HTMLDivElement>(null);

  // ✅ Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        reportTypeRef.current &&
        !reportTypeRef.current.contains(event.target as Node)
      ) {
        setIsReportTypeOpen(false);
      }
      if (
        dateRangeRef.current &&
        !dateRangeRef.current.contains(event.target as Node)
      ) {
        setIsDateRangeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between border font-poppins border-gray-400 px-40 py-12 rounded-lg mt-6 mb-6 ">
      {/* Report Type */}
      <div
        className="flex flex-col items-center gap-2 relative"
        ref={reportTypeRef}>
        <span className="text-white mb-3 text-xl font-semibold ">Report Type</span>
        <button
          onClick={() => setIsReportTypeOpen((prev) => !prev)}
          className="bg-[#929292] text-white px-6 py-3 rounded-lg">
          {selectedReportType}
        </button>

        {isReportTypeOpen && (
          <div className="absolute top-full mt-2 bg-[#e6f8fa] shadow-lg rounded-lg p-4 space-y-7 z-10 w-70 h-60">
            {["Daily Report", "Monthly Report", "Yearly Report"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedReportType(type);
                  onSelectReportType(type);
                  setIsReportTypeOpen(false); // ✅ close after selecting
                }}
                className="block w-full border border-yellow-600 px-6 py-3 rounded-full text-black font-semibold hover:bg-yellow-100 ">
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Range */}
      <div
        className="flex flex-col items-center gap-2 relative"
        ref={dateRangeRef}>
        <span className="text-white font-semibold mb-3 text-xl ">Date Range</span>
        <button
          onClick={() => setIsDateRangeOpen((prev) => !prev)}
          className="bg-[#929292] text-white px-6 py-3 rounded-lg">
          {selectedDateRange}
        </button>

        {isDateRangeOpen && (
          <div className="absolute top-full mt-2 bg-[#e6f8fa] shadow-lg rounded-lg p-4 space-y-7 z-10 w-70 h-60 ">
            {["Current Period", "Previous Period", "Custom Range"].map(
              (range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedDateRange(range);
                    onSelectDateRange(range);
                    setIsDateRangeOpen(false); // ✅ close after selecting
                  }}
                  className="block w-full border border-yellow-600 px-6 py-3 rounded-full text-black font-semibold hover:bg-yellow-100">
                  {range}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportFilters;
