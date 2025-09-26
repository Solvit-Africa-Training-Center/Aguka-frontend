// components/dashboard/shared/PopupMessage.tsx
import React from "react";
import { CheckCircle } from "lucide-react";

interface PopupMessageProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className="bg-white text-center rounded-lg p-6 shadow-lg w-80">
        <div className="flex flex-col items-center gap-2">
          <CheckCircle className="text-green-600" size={40} />
          <p className="font-semibold text-gray-800">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          OK
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
