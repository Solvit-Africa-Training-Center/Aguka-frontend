import React, { useState, useEffect } from "react";
import { Pencil, ArrowLeft, Save } from "lucide-react";
import { KeyRound } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@services/store/store";

const UserProfile: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [password, setPassword] = useState("");
  const [editingPassword, setEditingPassword] = useState(false);

  // editing states
  const [editField, setEditField] = useState<string | null>(null);

  useEffect(() => {
    if (userData) {
      setPhoneNumber(userData.phoneNumber || "");
      setEmail(userData.email || "");
      setLocation(userData.location || "");
      setJoinDate(
        userData.createdAt
          ? new Date(userData.createdAt).toISOString().split("T")[0]
          : ""
      );
      setPassword(userData.password || "");
    }
  }, [userData]);

  if (!userData) {
    return <div className="p-6 text-white">Loading user data...</div>;
  }

  const handleSave = () => {
    console.log({
      phoneNumber,
      email,
      location,
      joinDate,
      password,
    });
    alert("Profile saved successfully!");
  };

  const initials =
    userData.email
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="min-h-screen bg-[#003B42] flex flex-col items-center pt-45 space-y-8 font-poppins pb-20">
      {/* Profile Header */}
      <div className="bg-[#002F35] text-white rounded-xl w-full max-w-xl p-8 flex flex-col items-center space-y-3 shadow-md">
        <div className="bg-[#F9A825] text-white w-20 h-20 flex items-center justify-center rounded-full text-4xl font-bold">
          {initials}
        </div>
        <h2 className="text-4xl font-bold">{userData.email || "Unknown"}</h2>
        <p className="text-lg uppercase text-secondary-200">{userData.id}</p>
        <span
          className={`px-7 py-2 rounded-full text-xl font-bold ${
            userData.isApproved
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}>
          {userData.isApproved ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Editable Fields */}
      <div className="bg-[#002F35] text-white rounded-xl w-full max-w-xl p-8 flex flex-col space-y-4 shadow-md">
        {/* Phone */}
        <div>
          <label className="text-xl font-semibold text-gray-200">
            Phone number
          </label>
          <div className="flex items-center border border-[#E09721] rounded px-3 py-3">
            {editField === "phone" ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-white"
              />
            ) : (
              <span className="w-full">{phoneNumber}</span>
            )}
            <Pencil
              size={18}
              className="text-[#E09721] cursor-pointer ml-2"
              onClick={() =>
                setEditField(editField === "phone" ? null : "phone")
              }
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xl font-semibold text-gray-200">Email</label>
          <div className="flex items-center border border-[#E09721] rounded px-3 py-3">
            {editField === "email" ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-white"
              />
            ) : (
              <span className="w-full">{email}</span>
            )}
            <Pencil
              size={18}
              className="text-[#E09721] cursor-pointer ml-2"
              onClick={() =>
                setEditField(editField === "email" ? null : "email")
              }
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-xl font-semibold text-gray-200">
            Location
          </label>
          <div className="flex items-center border border-[#E09721] rounded px-3 py-3">
            {editField === "location" ? (
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-white"
              />
            ) : (
              <span className="w-full">{location || "Not set"}</span>
            )}
            <Pencil
              size={18}
              className="text-[#E09721] cursor-pointer ml-2"
              onClick={() =>
                setEditField(editField === "location" ? null : "location")
              }
            />
          </div>
        </div>

        {/* Join Date */}
        <div>
          <label className="text-xl font-semibold text-gray-200">
            Join date
          </label>
          <div className="flex items-center border border-[#E09721] rounded px-3 py-3">
            {editField === "joinDate" ? (
              <input
                type="date"
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-white"
              />
            ) : (
              <span className="w-full">
                {new Date(joinDate).toLocaleDateString()}
              </span>
            )}
            <Pencil
              size={18}
              className="text-[#E09721] cursor-pointer ml-2"
              onClick={() =>
                setEditField(editField === "joinDate" ? null : "joinDate")
              }
            />
          </div>
        </div>

        {/* Security settings */}
        <div className="pt-4">
          <span className="flex items-center  text-center text-3xl justify-center gap-2 font-semibold text-secondary-500">
            <KeyRound className="size-20" /> Security settings
          </span>
          <p className="text-xl justify-center text-center text-gray-300 -mt-2 mb-2">
            Manage your account PIN
          </p>
          {editingPassword ? (
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-[#E09721] rounded px-2 py-2 text-white focus:outline-none w-full"
            />
          ) : (
            <button
              onClick={() => setEditingPassword(true)}
              className="bg-[#F9A825] text-white px-4 py-3 text-lg rounded font-semibold hover:bg-yellow-600">
              Change Password
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-4 w-full justify-between ">
          <button className="flex items-center text-2xl justify-center border border-secondary-500 font-bold gap-2 flex-1 bg-[#DCDCDC] text-black rounded-lg py-3 hover:bg-gray-400">
            <ArrowLeft /> Back
          </button>
          <button
            onClick={handleSave}
            className="flex items-center font-bold justify-center text-xl gap-2 flex-1 bg-[#F9A825] text-white rounded-lg py-3 hover:bg-yellow-600">
            <Save /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
