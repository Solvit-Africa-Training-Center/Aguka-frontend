// components/dashboard/shared/ReportActionButtons.tsx
import React, { useState } from "react";
import { FileDown, FileSpreadsheet } from "lucide-react";
import PopupMessage from "./PopupMessage";

interface ReportActionButtonsProps {
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const ReportActionButtons: React.FC<ReportActionButtonsProps> = ({
  onExportPDF,
  onExportExcel,
}) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleExportPDF = () => {
    onExportPDF();
    setPopupMessage("PDF File Downloaded Successfully");
  };

  const handleExportExcel = () => {
    onExportExcel(); 
    setPopupMessage("Excel File Downloaded Successfully");
  };

  return (
    <div className="flex gap-7">
      <button
        onClick={handleExportPDF}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
        <FileDown size={20} /> Export PDF
      </button>

      <button
        onClick={handleExportExcel}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
        <FileSpreadsheet size={20} /> Export Excel
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
