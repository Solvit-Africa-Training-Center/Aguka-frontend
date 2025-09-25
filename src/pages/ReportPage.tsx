import ReportActionButtons from "@components/dashboard/TreasurerComponents/ReportActionButton";
import ReportFilters from "@components/dashboard/TreasurerComponents/ReportFilter";
import ReportTable from "@components/dashboard/TreasurerComponents/ReportTable";


const ReportsPage: React.FC = () => {
  return (
    <div className="p-10 bg-[#043c44] min-h-screen text-white font-poppins">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">REPORTS</h1>
        <ReportActionButtons
          onExportPDF={() => alert("Exporting PDF...")}
          onExportExcel={() => alert("Exporting Excel...")}
        />
      </div>

      {/* Filters */}
      <ReportFilters />

      {/* Table */}
      <ReportTable />
    </div>
  );
};

export default ReportsPage;
