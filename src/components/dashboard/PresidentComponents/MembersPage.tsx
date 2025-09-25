// MembersPage.tsx
import { useState, useEffect, useRef } from "react";
import { Crown, Pause, Trash2, Plus, Search } from "lucide-react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@services/api/authApi";
import type { User } from "@models/User";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

export default function MembersPage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentGroupId = currentUser?.groupId;
  const roles = ["president", "secretary", "treasurer", "user"];

  const { data: usersFromApi, isLoading } = useGetUsersQuery();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: deleting }] = useDeleteUserMutation();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const roleMenuRef = useRef<HTMLDivElement | null>(null);

  // Extract users array safely from API
  useEffect(() => {
    if (usersFromApi) {
      if (Array.isArray(usersFromApi)) setUsers(usersFromApi);
      else if (Array.isArray((usersFromApi as any).data))
        setUsers((usersFromApi as any).data);
    }
  }, [usersFromApi]);

  // Filter users based on group, search, status, and role
  const filteredUsers = users
    .filter((u) => currentGroupId && u.groupId === currentGroupId)
    .filter((user) => {
      const status = user.isApproved ? "Active" : "Inactive";
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phoneNumber.includes(search) ||
        user.id.includes(search);
      const matchesStatus = statusFilter === "All" || status === statusFilter;
      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });

  // Toggle user status (Active / Inactive)
  const toggleStatus = async (user: User) => {
    try {
      const newStatus = !user.isApproved;
      const res = await updateUser({
        id: user.id,
        isApproved: newStatus,
      }).unwrap();
      console.log("Status updated:", res);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isApproved: newStatus } : u
        )
      );
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  // Change user role
  const changeRole = async (user: User, newRole: string) => {
    try {
      const res = await updateUser({ id: user.id, role: newRole }).unwrap();
      console.log("Role updated:", res);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
      setEditingRoleId(null);
    } catch (err) {
      console.error("Error updating role", err);
    }
  };

  // Remove user
  const removeUser = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      console.log("User deleted:", res);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  if (!currentUser)
    return <div className="p-6 text-white">Loading user data...</div>;

  return (
    <div className="p-15 bg-[#003B42] min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Members</h1>
        <button className="bg-[#F9A825] text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add Member
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Name, ID, phone, email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white placeholder-gray-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white">
          <option value="All">All status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white">
          <option value="All">All roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-auto max-h-[600px] rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="text-gray-300 sticky top-0 ">
            <tr>
              <th className="p-3">Member</th>
              <th className="p-3">Status</th>
              <th className="p-3">Roles</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Joined Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="p-3">
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.id}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      user.isApproved
                        ? "bg-green-800 text-green-200"
                        : "bg-red-800 text-red-200"
                    }`}>
                    {user.isApproved ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3">
                  <span className="bg-gray-700 px-2 py-1 rounded-lg text-sm">
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm">{user.email}</div>
                  <div className="text-sm">{user.phoneNumber}</div>
                </td>
                <td className="p-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 relative flex gap-3">
                  {/* Crown - Role Editor */}
                  <div className="relative" ref={roleMenuRef}>
                    <button
                      onClick={() =>
                        setEditingRoleId(
                          editingRoleId === user.id ? null : user.id
                        )
                      }
                      className="text-yellow-400 hover:text-yellow-500">
                      <Crown size={20} />
                    </button>

                    {editingRoleId === user.id && (
                      <div className="absolute top-8 left-0 bg-[#033535] border border-gray-600 rounded-lg shadow-lg z-10">
                        {roles.map((r) => (
                          <div
                            key={r}
                            onClick={() => changeRole(user, r)}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm">
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pause - Toggle Status */}
                  <button
                    onClick={() => toggleStatus(user)}
                    className="text-blue-400 hover:text-blue-500"
                    disabled={updating}>
                    <Pause size={20} />
                  </button>

                  {/* Trash - Delete */}
                  <button
                    onClick={() => removeUser(user.id)}
                    className="text-red-400 hover:text-red-500"
                    disabled={deleting}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && !isLoading && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-400">
                  No members found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
