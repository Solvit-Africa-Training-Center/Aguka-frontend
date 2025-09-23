import React, { useState } from "react";
import ApprovalCard from "./ApprovalCard";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import { useGetUsersQuery, useApproveUserMutation } from "@services/api/authApi";
import type { Loan } from "types/Loan";
import type { User } from "types/User";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

const ApprovalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"loans" | "users">("loans");

  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  const { data: loans, isLoading: loadingLoans, isError: errorLoans } =
    useGetLoansByStatusQuery("pending");

  const { data: users, isLoading: loadingUsers, isError: errorUsers } =
    useGetUsersQuery();

  const [approveUser] = useApproveUserMutation();

  const pendingUsers =
    users?.data?.filter(
      (u: User) => !u.isApproved && u.groupId === loggedInUser?.groupId
    ) || [];

  const loanList =
    Array.isArray(loans)
      ? loans
      : loans && typeof loans === "object" && "data" in loans
      ? (loans as { data: Loan[] }).data
      : [];

  const groupLoans =
    loggedInUser && users?.data
      ? loanList.filter((loan: Loan) => {
          const loanUser = users.data.find((u: User) => u.id === loan.userId);
          return loanUser?.groupId === loggedInUser.groupId && loanUser?.isApproved;
        })
      : [];

  return (
    <div className="min-h-screen p-15 bg-[#002F35] flex justify-center p-6 rounded-lg shadow-lg overflow-hidden font-poppins">
      <div className="w-full max-w-6xl space-y-4">
        <h3 className="text-2xl font-bold text-white p-4 border-b border-gray-600">
          Approval & Decisions
        </h3>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "loans"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => setActiveTab("loans")}
          >
            Loan Approvals
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "users"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => setActiveTab("users")}
          >
            User Approvals
          </button>
        </div>

        {/* Loan approvals */}
        {activeTab === "loans" && (
          <>
            {loadingLoans ? (
              <p className="text-white">Loading loans...</p>
            ) : errorLoans ? (
              <p className="text-red-500">Error loading loans.</p>
            ) : groupLoans.length > 0 ? (
              groupLoans.map((loan: Loan) => {
                const loanUser = users?.data.find(
                  (u: User) => u.id === loan.userId
                );
                return (
                  <ApprovalCard
                    key={loan.id}
                    name={loanUser?.name || "Unknown"}
                    type={`Loan request of ${loan.amount.toLocaleString()} Rwf for ${loan.durationMonths} months`}
                    amount={loan.amount.toLocaleString()}
                    time={new Date(loan.createdAt).toLocaleString()}
                  />
                );
              })
            ) : (
              <p className="text-white p-4">No pending loan approvals in your group.</p>
            )}
          </>
        )}

        {/* User approvals */}
        {activeTab === "users" && (
          <>
            {loadingUsers ? (
              <p className="text-white">Loading user requests...</p>
            ) : errorUsers ? (
              <p className="text-red-500">Error loading users.</p>
            ) : pendingUsers.length > 0 ? (
              pendingUsers.map((user: User) => (
                <ApprovalCard
                  key={user.id}
                  name={user.name}
                  type={`User registration request for role: ${user.role}`}
                  time={new Date(user.createdAt).toLocaleString()}
                  onApprove={() => approveUser(user.id)} // ✅ approve
                  onReject={() => console.log("Reject user", user.id)}
                />
              ))
            ) : (
              <p className="text-white p-4">
                No pending user approvals in your group.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ApprovalPage;
