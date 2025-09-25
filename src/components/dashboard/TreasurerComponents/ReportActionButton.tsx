import React from "react";
import { FileDown, FileSpreadsheet } from "lucide-react";

interface Props {
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const ReportActionButtons: React.FC<Props> = ({
  onExportPDF,
  onExportExcel,
}) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onExportPDF}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
        <FileDown size={16} /> Export PDF
      </button>
      <button
        onClick={onExportExcel}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
        <FileSpreadsheet size={16} /> Export Excel
      </button>
    </div>
  );
};

export default ReportActionButtons;
