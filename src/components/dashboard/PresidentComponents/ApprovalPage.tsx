import React, { useState } from "react";
import ApprovalCard from "./ApprovalCard";
import {
  useGetLoansByStatusQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} from "@services/api/loanApi";
import {
  useGetUsersQuery,
  useApproveUserMutation,
  useDeleteUserMutation,
} from "@services/api/authApi";
import type { Loan } from "types/Loan";
import type { User } from "types/User";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

const ApprovalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"loans" | "users">("loans");
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  // Loans
  const {
    data: loans,
    isLoading: loadingLoans,
    isError: errorLoans,
    refetch: refetchLoans,
  } = useGetLoansByStatusQuery("pending");
  const [approveLoan] = useApproveLoanMutation();
  const [rejectLoan] = useRejectLoanMutation();

  // Users
  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorUsers,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useDeleteUserMutation();

  const loanList = Array.isArray(loans)
    ? loans
    : loans && typeof loans === "object" && "data" in loans
    ? (loans as { data: Loan[] }).data
    : [];

  const groupLoans =
    loggedInUser && users?.data
      ? loanList.filter((loan: Loan) => {
          const loanUser = users.data.find((u: User) => u.id === loan.userId);
          return (
            loanUser?.groupId === loggedInUser.groupId && loanUser?.isApproved
          );
        })
      : [];

  // Filter users for logged-in user's group
  const pendingUsers =
    users?.data?.filter(
      (u: User) => !u.isApproved && u.groupId === loggedInUser?.groupId
    ) || [];

  // Handlers for Loans
  const handleApproveLoan = async (loanId: string) => {
    try {
      await approveLoan(loanId).unwrap();
      alert("Loan approved successfully!");
      refetchLoans();
    } catch (err) {
      console.error("Failed to approve loan:", err);
      alert("Failed to approve loan.");
    }
  };

  const handleRejectLoan = async (loanId: string) => {
    try {
      await rejectLoan(loanId).unwrap();
      alert("Loan rejected successfully!");
      refetchLoans();
    } catch (err) {
      console.error("Failed to reject loan:", err);
      alert("Failed to reject loan.");
    }
  };

  // Handlers for Users
  const handleApproveUser = async (userId: string) => {
    try {
      await approveUser(userId).unwrap();
      alert("User approved successfully!");
      refetchUsers();
    } catch (err) {
      console.error("Failed to approve user:", err);
      alert("Failed to approve user.");
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(userId).unwrap();
      alert("User rejected successfully!");
      refetchUsers();
    } catch (err) {
      console.error("Failed to reject user:", err);
      alert("Failed to reject user.");
    }
  };

  return (
    <div className="min-h-screen p-15 bg-[#002F35] flex justify-center rounded-lg shadow-lg overflow-hidden font-poppins">
      <div className="w-full max-w-6xl space-y-4">
        <h3 className="text-2xl font-bold text-[#F9A825] p-4 border-b border-gray-600">
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
            onClick={() => setActiveTab("loans")}>
            Loan Approvals
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "users"
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => setActiveTab("users")}>
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
                    type={`Loan request of ${loan.amount.toLocaleString()} Rwf for ${
                      loan.durationMonths
                    } months`}
                    amount={loan.amount.toLocaleString()}
                    time={new Date(loan.createdAt).toLocaleString()}
                    onApprove={() => handleApproveLoan(loan.id)}
                    onReject={() => handleRejectLoan(loan.id)}
                  />
                );
              })
            ) : (
              <p className="text-white p-4">
                No pending loan approvals in your group.
              </p>
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
                  onApprove={() => handleApproveUser(user.id)}
                  onReject={() => handleRejectUser(user.id)}
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
