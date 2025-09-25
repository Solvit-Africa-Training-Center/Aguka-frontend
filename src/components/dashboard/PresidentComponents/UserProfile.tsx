import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);

  // Initialize state when userData is available
  useEffect(() => {
    if (userData) {
      setPhoneNumber(userData.phoneNumber || "");
      setPassword(userData.password || "");
    }
  }, [userData]);

  if (!userData) {
    return <div className="p-6 text-white">Loading user data...</div>;
  }

  const handleSave = () => {
    console.log({
      phoneNumber,
      email: userData.email, 
      password,
    });
    alert("Profile saved successfully!");
  };

  
  const initials = userData.name
    ? userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="min-h-screen bg-[#00353B] flex flex-col items-center justify-start p-6 space-y-6 pt-40">
      {/* Header */}
      <div className="bg-[#00353B] text-white rounded-xl w-full max-w-md p-6 flex flex-col items-center space-y-2 ">
        <div className="bg-gray-200 text-teal-700 w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold">
          {initials}
        </div>
        <div className="text-lg font-semibold">
          {userData.name || "Unknown"}
        </div>
        <div className="text-yellow-500">{userData.id}</div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            userData.isApproved
              ? "bg-green-200 text-green-800"
              : "bg-gray-300 text-gray-700"
          }`}>
          {userData.isApproved ? "Active" : "Inactive"}
        </span>
        <div className="text-sm mt-1">Role: {userData.role}</div>
      </div>

      {/* Editable Fields */}
      <div className="bg-[#00353B] text-white rounded-xl w-full max-w-md p-6 flex flex-col space-y-4">
        {/* Phone */}
        <div className="flex items-center justify-between border border-[#E09721] rounded px-3 py-2">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-transparent focus:outline-none w-full"
            placeholder="Phone number"
          />
          <Pencil size={16} className="text-yellow-500 cursor-pointer" />
        </div>

        {/* Email (read-only) */}
        <div className="px-3 py-2 border border-[#E09721] rounded text-gray-300">
          <span className="font-semibold">Email: </span>
          {userData.email}
        </div>

        {/* Join Date (read-only) */}
        <div className="px-3 py-2 border border-[#E09721] rounded text-gray-300">
          <span className="font-semibold">Joined: </span>
          {new Date(userData.createdAt).toLocaleDateString()}
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2 border border-[#E09721] rounded px-3 py-2">
          <span className="flex items-center gap-2 font-semibold">
            🔑 Security settings
            <small className="text-xs font-normal">
              Manage your account password
            </small>
          </span>
          {editingPassword ? (
            <input
              type="text"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-[#E09721] rounded px-2 py-1 text-white focus:outline-none"
            />
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-white">
                {password ? "*".repeat(password.length) : ""}
              </span>
              <button
                onClick={() => setEditingPassword(true)}
                className="bg-yellow-500 text-black px-3 py-1 rounded">
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 w-full max-w-md justify-end">
        <button className="flex-1 bg-[#DCDCDC] text-black rounded-lg py-2 hover:bg-gray-700">
          ← Back
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-[#E09721] text-black rounded-lg py-2 hover:bg-yellow-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
