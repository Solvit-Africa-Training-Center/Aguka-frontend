import React from 'react';

export type AttendanceStatusType = "Present" | "Absent";


interface AttendanceStatusProps {
  status: AttendanceStatusType;
}

const AttendanceStatus: React.FC<AttendanceStatusProps> = ({ status }) => {
  const baseStyle = 'px-2 py-1 text-xs rounded-full font-semibold';
  const statusStyle =
    status === 'Present' ? 'text-green-500' : 'text-red-400';

  return <span className={`${baseStyle} ${statusStyle}`}>{status}</span>;
};

export default AttendanceStatus;
