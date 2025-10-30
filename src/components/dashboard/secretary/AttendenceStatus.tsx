import React from "react";
import { Check, X } from "lucide-react";

export type AttendanceStatusType = "Present" | "Absent";

interface AttendanceStatusProps {
  status: AttendanceStatusType;
}

const AttendanceStatus: React.FC<AttendanceStatusProps> = ({ status }) => {
  // Mobile-first responsive badge: slightly larger on sm/md breakpoints
  const baseStyle =
    "inline-flex items-center gap-2 px-2 py-1 text-[10px] sm:text-xs md:text-sm rounded-full font-semibold";

  const isPresent = status === "Present";

  const statusClass = isPresent
    ? "bg-green-600 text-white"
    : "bg-red-600 text-white";

  const ariaLabel = isPresent ? "Present" : "Absent";

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={`${baseStyle} ${statusClass}`}
    >
      {isPresent ? (
        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
      ) : (
        <X className="w-3 h-3 sm:w-4 sm:h-4" />
      )}
      <span className="whitespace-nowrap">{status}</span>
    </span>
  );
};

export default AttendanceStatus;
