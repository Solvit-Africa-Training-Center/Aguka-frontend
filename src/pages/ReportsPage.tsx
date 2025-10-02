import React, { useMemo, useState } from "react";

import ReportFilters from "@components/dashboard/TreasurerComponents/ReportFilter";
import ReportTable from "@components/dashboard/TreasurerComponents/ReportTable";
import ReportActionButtons from "@components/dashboard/TreasurerComponents/ReportActionButtons";

import { useGetUsersQuery } from "@services/api/UserApi";
import { useGetLoansQuery } from "@services/api/loanApi";
import { useGetRepaymentsQuery } from "@services/api/repaymentApi";
import { useGetContributionsByUserQuery } from "@services/api/ContributionApi";

import type { Report } from "types/report";

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState("Daily Report");
  const [dateRange, setDateRange] = useState("Current Period");

  const { data: users } = useGetUsersQuery();
  const { data: loans } = useGetLoansQuery();
  const { data: repayments } = useGetRepaymentsQuery();
  const { data: contributions } = useGetContributionsByUserQuery();

  // Helper to safely format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "-" : date.toISOString().split("T")[0];
  };

  // Combine all reports
  const allReports: Report[] = useMemo(() => {
    const arr: Report[] = [];

    // Users
    (Array.isArray(users) ? users : []).forEach((u: any) => {
      arr.push({
        date: formatDate(u.createdAt),
        member: u.name ?? "Unknown",
        action: "User Registration",
        amount: "-",
        status: u.isApproved ? "Active" : "Pending",
      });
    });

    // Loans
    (Array.isArray(loans) ? loans : []).forEach((l: any) => {
      arr.push({
        date: formatDate(l.createdAt),
        member: l.user?.name ?? "Unknown",
        action: "Loan Request",
        amount: `Rwf ${l.amount ?? 0}`,
        status: l.status ?? "Pending",
      });
    });

    // Repayments
    (Array.isArray(repayments) ? repayments : []).forEach((r: any) => {
      arr.push({
        date: formatDate(r.paymentDate),
        member: r.user?.name ?? "Unknown",
        action: `Repayment (${r.paymentMethod ?? "-"})`,
        amount: `Rwf ${r.amount ?? 0}`,
        status: "Completed",
      });
    });

    // Contributions
    (Array.isArray(contributions) ? contributions : []).forEach((c: any) => {
      arr.push({
        date: formatDate(c.date),
        member: c.user?.name ?? "Unknown",
        action: "Contribution",
        amount: `Rwf ${c.amount ?? 0}`,
        status: "Completed",
      });
    });

    return arr.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [users, loans, repayments, contributions]);

  // Filter reports by selected type
  const filteredReports = allReports.filter((r) => {
    const today = new Date().toISOString().split("T")[0];
    const month = new Date().toISOString().slice(0, 7);
    const year = new Date().getFullYear().toString();

    if (reportType === "Daily Report") return r.date === today;
    if (reportType === "Monthly Report") return r.date.startsWith(month);
    if (reportType === "Yearly Report") return r.date.startsWith(year);
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

      {/* Filters */}
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
