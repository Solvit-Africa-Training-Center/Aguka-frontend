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
  <tr className="border-t border-white/30 text-center">
    <td className="p-3">{name}</td>
    <td>
      <AttendanceStatus status={november} />
    </td>
    <td>
      <AttendanceStatus status={december} />
    </td>
    <td className="font-semibold">{total}</td>
  </tr>
);

export default AttendanceRow;
