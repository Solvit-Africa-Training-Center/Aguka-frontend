import React, { useState } from "react";
import ApprovalCard from "./ApprovalCard";
import { useGetLoansByStatusQuery } from "@services/api/loanApi";
import { useGetUsersQuery, useApproveUserMutation } from "@services/api/authApi";
import { useGetGroupContributionsQuery, useApproveContributionMutation } from "@services/api/ContributionApi";
import type { Loan } from "types/Loan";
import type { User } from "types/User";
import type { Contribution } from "types/Contribution";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

const ApprovalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"loans" | "users" | "contributions">("loans");
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  // Loans
  const { data: loans, isLoading: loadingLoans, isError: errorLoans } =
    useGetLoansByStatusQuery("pending");

  // Users
  const { data: users, isLoading: loadingUsers, isError: errorUsers } =
    useGetUsersQuery();
  const [approveUser] = useApproveUserMutation();
  const pendingUsers =
    users?.data?.filter(
      (u: User) => !u.isApproved && u.groupId === loggedInUser?.groupId
    ) || [];

  // Contributions
const { data: contributions, isLoading, isError } = useGetGroupContributionsQuery(loggedInUser?.groupId || "");
console.log("token:", localStorage.getItem("token"));
const loadingContributions = isLoading;
const errorContributions = isError;
const [approveContribution] = useApproveContributionMutation();

const pendingContributions = contributions || [];

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

  // Approve / Reject handlers
  const handleApproveContribution = async (contribution: Contribution) => {
  try {
    await approveContribution(contribution.id).unwrap();
    console.log("Contribution approved:", contribution.id);
  } catch (err) {
    console.error("Failed to approve contribution:", contribution.id, err);
  }
};

const handleRejectContribution = (contribution: Contribution) => {
  console.log("Reject contribution:", contribution.id);
  // Optional: implement a backend reject if your API supports it
};

  return (
    <div className="min-h-screen p-6 bg-[#002F35] flex justify-center rounded-lg shadow-lg overflow-hidden font-poppins">
      <div className="w-full max-w-6xl space-y-4">
        <h3 className="text-2xl font-bold text-white p-4 border-b border-gray-600">
          Approval & Decisions
        </h3>

        {/* Tabs */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "loans" ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}
            onClick={() => setActiveTab("loans")}
          >
            Loan Approvals
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}
            onClick={() => setActiveTab("users")}
          >
            User Approvals
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "contributions" ? "bg-yellow-500 text-black" : "bg-gray-700 text-white"}`}
            onClick={() => setActiveTab("contributions")}
          >
            Contribution Approvals
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
                const loanUser = users?.data.find((u: User) => u.id === loan.userId);
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
                  onApprove={() => approveUser(user.id)}
                  onReject={() => console.log("Reject user", user.id)}
                />
              ))
            ) : (
              <p className="text-white p-4">No pending user approvals in your group.</p>
            )}
          </>
        )}

      {/* Contribution approvals */}
{activeTab === "contributions" && (
  <>
    {loadingContributions ? (
      <p className="text-white">Loading contributions...</p>
    ) : errorContributions ? (
      <p className="text-red-500">Error loading contributions.</p>
    ) : pendingContributions.length > 0 ? (
      pendingContributions.map((contribution: Contribution) => {
        const contributionUser = users?.data.find((u: User) => u.id === contribution.userId);
        return (
          <ApprovalCard
            key={contribution.id}
            name={contributionUser?.name || "Unknown"}
            type={`Contribution of ${contribution.amount.toLocaleString()} Rwf`}
            amount={contribution.amount.toLocaleString()}
            time={new Date(contribution.contributionDate).toLocaleString()}
            onApprove={() => handleApproveContribution(contribution)}
            onReject={() => handleRejectContribution(contribution)}
          />
        );
      })
    ) : (
      <p className="text-white p-4">No contributions in your group.</p>
    )}
  </>
)}
      </div>
    </div>
  );
};

export default ApprovalPage;
