// src/pages/AttendanceReport.tsx
import React from "react";
// We'll render rows inline to support responsive layouts
import { useGetGroupMembersQuery } from "@services/api/groupApi"; // Fetch members
import { useGetGroupContributionsTodayQuery } from "@services/api/ContributionApi"; // Fetch contributions
import { useParams } from "react-router-dom";
import type { AttendanceStatusType } from "./AttendenceStatus";

const AttendanceReport: React.FC = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const { groupId } = useParams<{ groupId: string }>();
  // Fetch members
  const { data: members, isLoading: membersLoading } = useGetGroupMembersQuery(
    groupId!
  );

  // Fetch contributions for current month
  const { data: contributions, isLoading: contributionsLoading } =
    useGetGroupContributionsTodayQuery({ id: groupId! }); // pass group id to fetch today's contributions for the group

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
        status: contributed
          ? ("Present" as AttendanceStatusType)
          : ("Absent" as AttendanceStatusType),
        total: contributed ? "1/1" : "0/1",
      };
    }) || [];

  return (
    <section className="bg-[#003B42] text-white py-8 min-h-screen font-poppins">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl bg-primary-400/5">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4">
            Member Contribution Report ({currentMonth})
          </h2>

          {/* Mobile: stacked cards */}
          <div className="flex flex-col gap-3 md:hidden">
            {data.length === 0 && (
              <div className="p-4 text-center text-gray-300 border rounded">
                No data available
              </div>
            )}

            {data.map((member, idx) => (
              <div
                key={member.name + idx}
                className="bg-[#002f30]/20 p-3 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium text-sm">{member.name}</div>
                    <div className="text-xs text-gray-300 mt-1">
                      {currentMonth} —{" "}
                      <span
                        className={`font-semibold ${
                          member.status === "Present"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">{member.total}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop / Tablet: table */}
          <div className="hidden md:block mt-4 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm">
              <thead className="bg-teal-900 text-white font-semibold">
                <tr className="text-left">
                  <th className="p-3">Member Name</th>
                  <th className="p-3">{currentMonth}</th>
                  <th className="p-3">Total Contributions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((member, idx) => (
                  <tr
                    key={member.name + idx}
                    className="border-t border-white/10 hover:bg-[#014d54]"
                  >
                    <td className="p-3 align-top">{member.name}</td>
                    <td className="p-3 align-top">
                      <span
                        className={`${
                          member.status === "Present"
                            ? "text-green-400"
                            : "text-red-400"
                        } font-semibold`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="p-3 align-top font-semibold">
                      {member.total}
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-300">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceReport;
