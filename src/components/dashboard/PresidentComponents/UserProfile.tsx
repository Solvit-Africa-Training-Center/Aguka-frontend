import React, { useState, useEffect } from "react";
import { Pencil, Key } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (userData) {
      setPhoneNumber(userData.phoneNumber || "");
      setLocation(userData.location || "");
    }
  }, [userData]);

  if (!userData) {
    return <div className="p-6 text-white">Loading user data...</div>;
  }

  const handleSave = () => {
    console.log({
      phoneNumber,
      email: userData.email,
      location,
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
    <div className="min-h-screen bg-[#003B42] flex flex-col items-center p-6 pt-20 space-y-6 font-poppins">
      {/* Header */}
      <div className="bg-[#002F35] text-white rounded-2xl w-full max-w-md p-6 flex flex-col items-center space-y-3 shadow-lg">
        <div className="bg-gray-200 text-[#003B42] w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold">
          {initials}
        </div>
        <div className="text-lg font-semibold">{userData.name}</div>
        <div className="text-gray-200">{userData.id}</div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            userData.isApproved
              ? "bg-green-200 text-green-800"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {userData.isApproved ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Editable Fields */}
      <div className="bg-[#002F35] text-white rounded-2xl w-full max-w-md p-6 flex flex-col space-y-4 shadow-lg">
        {/* Phone */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-200">Phone number</label>
          <div className="flex items-center justify-between border border-[#E09721] rounded px-3 py-2">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-transparent focus:outline-none w-full"
              placeholder="Phone number"
            />
            <Pencil size={16} className="text-[#E09721]" />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-200">Email</label>
          <div className="flex items-center justify-between border border-[#E09721] rounded px-3 py-2">
            <span>{userData.email}</span>
            <Pencil size={16} className="text-[#E09721]" />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-200">Location</label>
          <div className="flex items-center justify-between border border-[#E09721] rounded px-3 py-2">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent focus:outline-none w-full"
              placeholder="Location"
            />
            <Pencil size={16} className="text-[#E09721]" />
          </div>
        </div>

        {/* Join Date */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm text-gray-200">Join date</label>
          <div className="flex items-center justify-between border border-[#E09721] rounded px-3 py-2">
            <span>
              {new Date(userData.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <Pencil size={16} className="text-[#E09721]" />
          </div>
        </div>

        {/* Security Settings */}
        <div className="flex flex-col space-y-2 pt-4">
          <div className="flex items-center gap-2 text-base font-semibold">
            <Key className="text-[#E09721]" size={18} />
            <span>Security settings</span>
          </div>
          <small className="text-gray-300 -mt-1">
            Manage your account PIN
          </small>
          <button className="bg-[#E09721] text-white py-2 rounded-lg hover:bg-yellow-600">
            Change Password
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4 w-full max-w-md">
        <button className="flex-1 bg-[#DCDCDC] text-black rounded-lg py-2 hover:bg-gray-400">
          ← Back
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-[#E09721] text-white rounded-lg py-2 hover:bg-yellow-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
