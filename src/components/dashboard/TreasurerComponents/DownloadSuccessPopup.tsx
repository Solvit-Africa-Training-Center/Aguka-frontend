// ✅ components/dashboard/reports/DownloadSuccessPopup.tsx
import React from "react";
import { CheckCircle2 } from "lucide-react";

interface Props {
  visible: boolean;
}

const DownloadSuccessPopup: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-[#e6f8fa] p-6 rounded-xl shadow-xl z-50">
      <div className="flex flex-col items-center">
        <CheckCircle2 size={48} className="text-green-600 mb-3" />
        <h2 className="text-xl font-bold text-black text-center">
          File Downloaded <br /> Successfully
        </h2>
      </div>
    </div>
  );
};

export default DownloadSuccessPopup;
