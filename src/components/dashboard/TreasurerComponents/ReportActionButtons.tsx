// components/dashboard/shared/ReportActionButtons.tsx
import React, { useState } from "react";
import { FileDown, FileSpreadsheet } from "lucide-react";
import PopupMessage from "./PopupMessage";

const ReportActionButtons: React.FC = () => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleExportPDF = () => {
    setPopupMessage("PDF File Downloaded Successfully");
  };

  const handleExportExcel = () => {
    setPopupMessage("Excel File Downloaded Successfully");
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
        <FileDown size={16} /> Export PDF
      </button>

      <button
        onClick={handleExportExcel}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
        <FileSpreadsheet size={16} /> Export Excel
      </button>

      {/* Popup Message */}
      <PopupMessage
        message={popupMessage || ""}
        isVisible={!!popupMessage}
        onClose={() => setPopupMessage(null)}
      />
    </div>
  );
};

export default ReportActionButtons;
