// src/components/dashboard/PresidentComponents/GroupPerformance.tsx
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";
import type { User } from "@models/User";
import type { Loan } from "types/Loan";
import { useGetUsersQuery } from "@services/api/authApi";
import { useGetGroupContributionsQuery } from "@services/api/ContributionApi";
import { useGetLoansQuery } from "@services/api/loanApi"; // Fetch all loans

const GroupPerformance: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;

  // Fetch users
  const { data: usersData } = useGetUsersQuery();
  const users: User[] = useMemo(() => {
    if (!usersData) return [];
    const arr = Array.isArray(usersData)
      ? usersData
      : Array.isArray((usersData as any).data)
      ? (usersData as any).data
      : [];
    return arr.filter((u: User) => u.groupId === currentGroupId);
  }, [usersData, currentGroupId]);

  // Fetch contributions
  const { data: contributionsData } = useGetGroupContributionsQuery(
    currentGroupId || ""
  );
  const contributions = useMemo(() => {
    if (!contributionsData) return [];
    return Array.isArray(contributionsData)
      ? contributionsData
      : Array.isArray((contributionsData as any).data)
      ? (contributionsData as any).data
      : [];
  }, [contributionsData]);

  // Fetch all loans
  const { data: allLoansData } = useGetLoansQuery();
  const loans: Loan[] = useMemo(() => {
    if (!allLoansData) return [];
    return Array.isArray(allLoansData)
      ? allLoansData
      : Array.isArray((allLoansData as any)?.data)
      ? (allLoansData as any).data
      : [];
  }, [allLoansData]);

  return (
    <div className="bg-[#003B42] text-white rounded-2xl p-4 sm:p-6 md:p-6 shadow-lg max-w-6xl mx-auto mt-6 border-b-4 border-r-4 border-[#F9A825]">
      <h3 className="font-bold text-2xl mb-2 sm:mb-4 text-[#F9A825] text-center">
        Group Performance
      </h3>
      <h5 className="text-lg sm:text-xl mb-4 sm:mb-6 text-center">
        Member contribution and Loan performance
      </h5>

      <div className="overflow-x-auto overflow-y-auto max-h-[450px]">
        <table className="min-w-[600px] md:min-w-full table-auto border-collapse border border-white">
          <thead>
            <tr>
              {["Name", "Contribution", "Loan Status", "Attendance"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-2 px-3 sm:px-4 border border-white text-left sticky top-0 bg-[#004F57] z-10 text-sm sm:text-base"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              // Contributions total
              const userContributions = contributions
                .filter((c: any) => c.userId === user.id)
                .reduce((sum: number, c: any) => sum + Number(c.amount), 0);

              // User loans
              const userLoans = loans.filter((l) => l.userId === user.id);

              // Determine loan status
             // Determine loan status
let loanStatus = "No loans";

if (userLoans.length > 0) {
  if (userLoans.some((l: Loan) => l.status.toLowerCase() === "paid")) {
    loanStatus = "Paid";
  } else if (userLoans.some((l: Loan) => l.status.toLowerCase() === "approved")) {
    loanStatus = "Approved";
  } else if (userLoans.some((l: Loan) => l.status.toLowerCase() === "pending")) {
    loanStatus = "Outstanding";
  } else if (userLoans.some((l: Loan) => l.status.toLowerCase() === "denied")) {
    loanStatus = "Denied";
  }
}

              // Attendance
              const attendanceStatus = user.isApproved ? "Active" : "Inactive";

              return (
                <tr
                  key={user.id}
                  className="hover:bg-[#005A66] transition-colors"
                >
                  <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">
                    {user.name}
                  </td>
                  <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">
                    Rwf {userContributions.toLocaleString()}
                  </td>
                  <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">
                    {loanStatus}
                  </td>
                  <td className="py-1 sm:py-2 px-2 sm:px-4 border-r border-white text-sm sm:text-base">
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
