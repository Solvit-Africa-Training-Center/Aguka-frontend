import React from "react";
import AttendanceRow from "./AttendenceRow";

const AttendanceReport: React.FC = () => {
  const data = [
    {
      name: "Jean baptiste",
      november: "Present",
      december: "Absent",
      total: "11/12",
    },
    {
      name: "Marie Uwimana",
      november: "Present",
      december: "Absent",
      total: "08/12",
    },
    {
      name: "Paul Nkurunziza",
      november: "Present",
      december: "Absent",
      total: "12/12",
    },
  ] as const;

  return (
    <section className="bg-[#003B42]  text-white pt-30 h-screen font-poppins ">
      <div className="p-20 ">
        <div className="border p-10 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-4  ">
            Member Attendance Report
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-teal-900 text-white font-semibold">
                <tr className="text-left">
                  <th className="p-3">Member Name</th>
                  <th className="p-3">November</th>
                  <th className="p-3">December</th>
                  <th className="p-3">Total Attendance</th>
                </tr>
              </thead>
              <tbody>
                {data.map((member, idx) => (
                  <AttendanceRow
                    key={idx}
                    name={member.name}
                    november={member.november}
                    december={member.december}
                    total={member.total}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceReport;
