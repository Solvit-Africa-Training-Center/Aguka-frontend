import React from "react";
import AttendanceStatus from "./AttendenceStatus";
import type { AttendanceStatusType } from "./AttendenceStatus";
export interface AttendanceRowProps {
  name: string;
  november: AttendanceStatusType;
  december: AttendanceStatusType;
  total: string;
}

const AttendanceRow: React.FC<AttendanceRowProps> = ({
  name,
  november,
  december,
  total,
}) => (
  // Responsive row: TDs become block stacked on small screens and table cells on md+
  <tr className="border-t border-white/30">
    <td className="p-3 block md:table-cell">
      <div className="flex items-start justify-between md:block">
        <div className="font-medium text-sm md:text-base">{name}</div>
        <div className="text-xs text-gray-300 md:hidden">
          Total: <span className="font-semibold">{total}</span>
        </div>
      </div>
    </td>

    <td className="p-3 block md:table-cell text-center">
      <div className="flex items-center justify-between md:justify-center gap-3">
        <span className="hidden md:inline mr-2">Nov</span>
        <AttendanceStatus status={november} />
      </div>
    </td>

    <td className="p-3 block md:table-cell text-center">
      <div className="flex items-center justify-between md:justify-center gap-3">
        <span className="hidden md:inline mr-2">Dec</span>
        <AttendanceStatus status={december} />
      </div>
    </td>

    <td className="p-3 block md:table-cell text-right md:text-left">
      <div className="hidden md:block font-semibold">{total}</div>
      <div className="md:hidden text-xs text-gray-300 mt-2">&nbsp;</div>
    </td>
  </tr>
);

export default AttendanceRow;
