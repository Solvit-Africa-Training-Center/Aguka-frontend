import React, { useState } from "react";

import ReportFilters from "@components/dashboard/TreasurerComponents/ReportFilter";
import ReportTable from "@components/dashboard/TreasurerComponents/ReportTable";
import ReportActionButtons from "@components/dashboard/TreasurerComponents/ReportActionButtons";

// Example reports data (move this later to API if needed)
const allReports = [
  {
    date: "2025-01-14",
    member: "Alice Johnson",
    action: "Withdrawal",
    amount: "Rwf 20,000",
    status: "Active",
  },
  {
    date: "2025-01-24",
    member: "Marie Mukesh",
    action: "Deposit",
    amount: "Rwf 40,000",
    status: "Active",
  },
  {
    date: "2025-01-14",
    member: "Fred Ngoga",
    action: "Deposit",
    amount: "Rwf 120,000",
    status: "Active",
  },
  {
    date: "2025-02-01",
    member: "Divine Ghoza",
    action: "Deposit",
    amount: "Rwf 60,000",
    status: "Inactive",
  },
  {
    date: "2025-02-10",
    member: "Patrick Hakuzimana",
    action: "Withdrawal",
    amount: "Rwf 90,000",
    status: "Active",
  },
];

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState("Daily Report");
  const [dateRange, setDateRange] = useState("Current Period");

  // 🔹 Filtering logic (expand later with real date calculations)
  const filteredReports = allReports.filter((r) => {
    if (reportType === "Daily Report") {
      return r.date === "2025-01-14"; // pretend today
    }
    if (reportType === "Monthly Report") {
      return r.date.startsWith("2025-01");
    }
    if (reportType === "Yearly Report") {
      return r.date.startsWith("2025");
    }
    return true;
  });

  return (
    <div className="p-10 bg-[#043c44] min-h-screen text-white font-poppins pt-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">REPORTS</h1>
        <ReportActionButtons
          onExportPDF={() => alert("Exporting PDF...")}
          onExportExcel={() => alert("Exporting Excel...")}
        />
      </div>

      {/* Filters (now controlled by state) */}
      <ReportFilters
        selectedReportType={reportType}
        onSelectReportType={setReportType}
        selectedDateRange={dateRange}
        onSelectDateRange={setDateRange}
      />

      {/* Table */}
      <ReportTable reports={filteredReports} />
    </div>
  );
};

export default ReportsPage;
