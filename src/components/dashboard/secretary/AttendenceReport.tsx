// src/pages/AttendanceReport.tsx
import React from "react";
import AttendanceRow from "./AttendenceRow";
import { useGetGroupMembersQuery } from "@services/api/groupApi"; // Fetch members
import { useGetGroupContributionsTodayQuery } from "@services/api/ContributionApi"; // Fetch contributions

const AttendanceReport: React.FC = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // Fetch members
  const { data: members, isLoading: membersLoading } =
    useGetGroupMembersQuery();

  // Fetch contributions for current month
  const { data: contributions, isLoading: contributionsLoading } =
    useGetGroupContributionsTodayQuery("current"); // adjust param according to your API

  if (membersLoading || contributionsLoading) {
    return (
      <div className="text-white text-center pt-20 font-poppins">
        Loading contribution data...
      </div>
    );
  }

  // Map member attendance dynamically
  const data =
    members?.map((member) => {
      const contributed = contributions?.some(
        (c: any) => c.userId === member.id
      );
      return {
        name: member.name,
        status: contributed ? "Present" : "Absent",
        total: contributed ? "1/1" : "0/1", // update if counting multiple contributions
      };
    }) || [];

  return (
    <section className="bg-[#003B42] text-white pt-30 h-screen font-poppins">
      <div className="p-20">
        <div className="border p-10 rounded-3xl">
          <h2 className="text-2xl font-semibold mb-4">
            Member Contribution Report ({currentMonth})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-teal-900 text-white font-semibold">
                <tr className="text-left">
                  <th className="p-3">Member Name</th>
                  <th className="p-3">{currentMonth}</th>
                  <th className="p-3">Total Contributions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((member, idx) => (
                  <AttendanceRow
                    key={idx}
                    name={member.name}
                    november={member.status} // just reuse the prop for current month
                    december={member.status} // keep as placeholder, can rename prop later
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
