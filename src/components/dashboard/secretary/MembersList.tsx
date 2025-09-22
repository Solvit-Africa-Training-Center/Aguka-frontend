import React from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useApproveUserMutation,
} from "@services/api/UserApi";
import { Loader2, Trash2, CheckCircle } from "lucide-react";

const MembersList: React.FC = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [approveUser] = useApproveUserMutation();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin" size={24} />
        <span className="ml-2">Loading ...</span>
      </div>
    );

  if (error) {
    console.error("Failed to load users:", error);
    return (
      <div className="text-center text-red-500 mt-6">
        Error loading members.
      </div>
    );
  }

  if (!users || users.length === 0) {
    return <div className="text-center mt-6">No members found.</div>;
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        alert("User deleted successfully");
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveUser(id).unwrap();
      alert("User approved successfully");
    } catch (err) {
      console.error("Failed to approve user:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Members</h2>

      <table className="w-full border-collapse border border-gray-200 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                {user.isApproved ? (
                  <span className="text-green-600 font-medium">Approved</span>
                ) : (
                  <span className="text-yellow-600 font-medium">Pending</span>
                )}
              </td>
              <td className="p-2 border flex gap-2">
                {!user.isApproved && (
                  <button
                    onClick={() => handleApprove(user.id)}
                    className="flex items-center bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                    <CheckCircle size={16} className="mr-1" />
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MembersList;
