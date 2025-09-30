import React, { useState } from "react";
import ApprovalCard from "../PresidentComponents/ApprovalCard";
import LoanDetailModal from "./LoanDetailModal";
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

// Extend Loan type to include optional userName/memberName and modal info
interface LoanWithExtra extends Loan {
  userName?: string;
  memberName?: string;
  previousLoans?: string;
  monthlyContribution?: string;
  employmentStatus?: string;
}

const LoanApprovalList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"loans" | "users">("loans");
  const [selectedLoan, setSelectedLoan] = useState<LoanWithExtra | null>(null);
  const loggedInUser = useSelector((state: RootState) => state.auth.user);

  // Fetch Loans
  const {
    data: loans = [],
    isLoading: loadingLoans,
    isError: errorLoans,
    refetch: refetchLoans,
  } = useGetLoansByStatusQuery("pending");
  const [approveLoan] = useApproveLoanMutation();
  const [rejectLoan] = useRejectLoanMutation();

  // Fetch Users
  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorUsers,
    refetch: refetchUsers,
  } = useGetUsersQuery();
  const [approveUser] = useApproveUserMutation();
  const [rejectUser] = useDeleteUserMutation();

  // Filter loans for Treasurer's group
  const groupLoans: LoanWithExtra[] = loggedInUser
    ? (loans as LoanWithExtra[])
        .map((loan: LoanWithExtra) => ({
          ...loan,
          userName: (loan as any).userName,
          memberName: (loan as any).memberName,
        }))
        .filter((loan: LoanWithExtra) => loan.groupId === loggedInUser.groupId)
    : (loans as LoanWithExtra[]);

  // Filter pending users for logged-in user's group
  const pendingUsers: User[] =
    users?.data?.filter(
      (u: User) => !u.isApproved && u.groupId === loggedInUser?.groupId
    ) || [];

  // Loan Handlers
  const handleApproveLoan = async (loanId: string) => {
    try {
      await approveLoan(loanId).unwrap();
      alert("✅ Loan approved by Treasurer");
      refetchLoans();
    } catch (err) {
      console.error(err);
      alert("Failed to approve loan");
    }
  };
  const handleRejectLoan = async (loanId: string) => {
    try {
      await rejectLoan(loanId).unwrap();
      alert("❌ Loan rejected by Treasurer");
      refetchLoans();
    } catch (err) {
      console.error(err);
      alert("Failed to reject loan");
    }
  };

  // User Handlers
  const handleApproveUser = async (userId: string) => {
    try {
      await approveUser(userId).unwrap();
      alert("✅ User approved successfully");
      refetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to approve user");
    }
  };
  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(userId).unwrap();
      alert("❌ User rejected successfully");
      refetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to reject user");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#002F35] flex justify-center rounded-lg shadow-lg overflow-hidden font-poppins">
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

        {/* Loan Approvals */}
        {activeTab === "loans" && (
          <>
            {loadingLoans ? (
              <p className="text-white">Loading loans...</p>
            ) : errorLoans ? (
              <p className="text-red-500">Error loading loans</p>
            ) : groupLoans.length > 0 ? (
              groupLoans.map((loan) => (
                <ApprovalCard
                  key={loan.id}
                  name={loan.userName ?? loan.memberName ?? "Unknown"}
                  type={`Loan request of ${loan.amount} Frw`}
                  amount={`${loan.amount} Frw`}
                  time={new Date(loan.createdAt).toLocaleDateString()}
                  onApprove={() => handleApproveLoan(loan.id)}
                  onReject={() => handleRejectLoan(loan.id)}
                  onView={() =>
                    setSelectedLoan({
                      ...loan,
                      previousLoans: "N/A",
                      monthlyContribution: "N/A",
                      employmentStatus: "N/A",
                    })
                  }
                />
              ))
            ) : (
              <p className="text-white p-4">No pending loans for your group.</p>
            )}
          </>
        )}

        {/* User Approvals */}
        {activeTab === "users" && (
          <>
            {loadingUsers ? (
              <p className="text-white">Loading users...</p>
            ) : errorUsers ? (
              <p className="text-red-500">Error loading users</p>
            ) : pendingUsers.length > 0 ? (
              pendingUsers.map((user) => (
                <ApprovalCard
                  key={user.id}
                  name={user.name}
                  type={`User registration for role: ${user.role}`}
                  time={new Date(user.createdAt).toLocaleDateString()}
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

      {/* Loan Detail Modal */}
      {selectedLoan && (
        <LoanDetailModal
          isOpen={!!selectedLoan}
          onClose={() => setSelectedLoan(null)}
          member={selectedLoan.userName ?? selectedLoan.memberName ?? "Unknown"}
          amountRequested={`${selectedLoan.amount} Frw`}
          previousLoans={selectedLoan.previousLoans ?? "N/A"}
          monthlyContribution={selectedLoan.monthlyContribution ?? "N/A"}
          employmentStatus={selectedLoan.employmentStatus ?? "N/A"}
        />
      )}
    </div>
  );
};

export default LoanApprovalList;
