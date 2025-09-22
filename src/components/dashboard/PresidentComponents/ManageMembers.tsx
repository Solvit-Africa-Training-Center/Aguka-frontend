import { useState } from "react";
import { Crown, Pause, Trash2, Plus, Search } from "lucide-react";

interface Member {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Inactive";
  role: string;
  email: string;
  phone: string;
  joinedDate: string;
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    code: "MEM001",
    status: "Active",
    role: "Treasurer",
    email: "sarah.johnson@gmail.com",
    phone: "0783447776",
    joinedDate: "10/05/2025",
  },
  {
    id: "2",
    name: "Michel Chen",
    code: "MEM002",
    status: "Inactive",
    role: "Member",
    email: "michelchen@gmail.com",
    phone: "0793446798",
    joinedDate: "11/02/2025",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    code: "MEM003",
    status: "Active",
    role: "Secretary",
    email: "emily.rodriguez@gmail.com",
    phone: "0793328670",
    joinedDate: "02/04/2025",
  },
];

const roles = ["Member", "Treasurer", "Secretary", "President"];

export default function ManageMembers() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const toggleStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" }
          : m
      )
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const changeRole = (id: string, newRole: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
    setEditingRoleId(null); // close dropdown
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.code.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || m.status === statusFilter;

    const matchesRole = roleFilter === "All" || m.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="p-6 bg-[#002D2D] min-h-screen text-white">
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
          className="px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white"
        >
          <option value="All">All status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-transparent border border-gray-400 text-white"
        >
          <option value="All">All roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#033535] text-gray-300">
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
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-b border-gray-700">
                <td className="p-3">
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-sm text-gray-400">{member.code}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      member.status === "Active"
                        ? "bg-green-800 text-green-200"
                        : "bg-red-800 text-red-200"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className="bg-gray-700 px-2 py-1 rounded-lg text-sm">
                    {member.role}
                  </span>
                </td>
                <td className="p-3">
                  <div className="text-sm">{member.email}</div>
                  <div className="text-sm">{member.phone}</div>
                </td>
                <td className="p-3">{member.joinedDate}</td>
                <td className="p-3 relative flex gap-3">
                  {/* Crown - Role Editor */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setEditingRoleId(
                          editingRoleId === member.id ? null : member.id
                        )
                      }
                      className="text-yellow-400 hover:text-yellow-500"
                    >
                      <Crown size={20} />
                    </button>

                    {editingRoleId === member.id && (
                      <div className="absolute top-8 left-0 bg-[#033535] border border-gray-600 rounded-lg shadow-lg z-10">
                        {roles.map((r) => (
                          <div
                            key={r}
                            onClick={() => changeRole(member.id, r)}
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pause - Toggle Status */}
                  <button
                    onClick={() => toggleStatus(member.id)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    <Pause size={20} />
                  </button>

                  {/* Trash - Delete */}
                  <button
                    onClick={() => deleteMember(member.id)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
