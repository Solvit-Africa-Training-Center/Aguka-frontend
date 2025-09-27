import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { User } from "@models/User";
import type { Loan } from "types/Loan";
import { useGetUsersQuery } from "@services/api/authApi";
import { useGetLoansQuery } from "@services/api/loanApi";
import { useGetAllContributionsByUserQuery } from "@services/api/ContributionApi";

const GroupPerformance: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  const { data: usersData } = useGetUsersQuery();
  const { data: allLoansData } = useGetLoansQuery();

  const users: User[] = Array.isArray(usersData)
    ? usersData.filter((u: User) => u.groupId === currentGroupId)
    : Array.isArray((usersData as any)?.data)
    ? (usersData as any).data.filter((u: User) => u.groupId === currentGroupId)
    : [];

  const loans: Loan[] = Array.isArray(allLoansData)
    ? allLoansData
    : Array.isArray((allLoansData as any)?.data)
    ? (allLoansData as any).data
    : [];

  // Store contributions per user
  const [contributionsByUser, setContributionsByUser] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (!users.length) return;

    users.forEach(async (user) => {
      const { data: contributions = [] } = useGetAllContributionsByUserQuery(user.id, {
        skip: !user.id,
      });

      const total = contributions.reduce(
        (sum, c) => sum + Number(c.amount),
        0
      );

      setContributionsByUser((prev) => ({ ...prev, [user.id]: total }));
    });
  }, [users]);

  return (
    <div className="bg-[#003B42] text-white rounded-2xl p-4 shadow-lg max-w-6xl mx-auto mt-6 border-b-4 border-r-4 border-[#F9A825] font-poppins">
      <h3 className="font-bold text-2xl mb-2 text-[#F9A825] text-center">
        Group Performance
      </h3>
      <h5 className="text-lg mb-4 text-center">
        Member contribution and Loan performance
      </h5>

      <div className="overflow-x-auto max-h-[450px]">
        <table className="min-w-[600px] md:min-w-full table-auto border-collapse border border-white">
          <thead>
            <tr>
              {["Name", "Contribution (Total)", "Loan Status", "Attendance"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-4 px-4 border border-white text-left sticky top-0 bg-[#004F57] z-10"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const totalContribution = contributionsByUser[user.id] || 0;

              const userLoans = loans.filter((l) => l.userId === user.id);

              let loanStatus = "No loans";
              if (userLoans.length > 0) {
                if (userLoans.some((l) => l.status.toLowerCase() === "paid")) {
                  loanStatus = "Paid";
                } else if (
                  userLoans.some((l) => l.status.toLowerCase() === "approved")
                ) {
                  loanStatus = "Approved";
                } else if (
                  userLoans.some((l) => l.status.toLowerCase() === "pending")
                ) {
                  loanStatus = "Outstanding";
                } else if (
                  userLoans.some((l) => l.status.toLowerCase() === "denied")
                ) {
                  loanStatus = "Denied";
                }
              }

              const attendanceStatus = user.isApproved ? "Active" : "Inactive";

              return (
                <tr key={user.id} className="hover:bg-[#005A66] transition-colors">
                  <td className="py-3 px-4 border-r border-white">{user.name}</td>
                  <td className="py-3 px-4 border-r border-white">
                    Rwf {totalContribution.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-r border-white">{loanStatus}</td>
                  <td className="py-3 px-4 border-r border-white">
                    {attendanceStatus}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupPerformance;
