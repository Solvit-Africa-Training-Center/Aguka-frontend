import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Upload, ImagePlus } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import type { GroupCreation } from "types/auth";
import { useCreateGroupMutation } from "@features/api/groupApi";

const RegisterGroup: React.FC = () => {
  const [formData, setFormData] = useState<GroupCreation>({
    name: "",
    description: "",
    location: "",
    profilePicture: null,
    meetingLocation: "",
    interestRate: undefined,
    contact: "",
    email: "",
    minContribution: 0,
    agreementTerms: null,
  });

  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value as any);
      }
    });

    try {
      await createGroup(data).unwrap();
      alert("Group created!");
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <div className=" w-full min-h-screen font-poppins text-white relative">
      <img
        src="image/ibiceri  aguka.jpg "
        alt="background"
        className="absolute w-400 h-screen "
      />

      <div className="absolute inset-0 bg-[#CED6D8] opacity-90 left-280"></div>

      <img
        src={logo}
        alt="logo"
        className="absolute w-25 h-25 rounded-full left-10 top-10"
      />

      <div className="relative max-w-6xl mx-auto bg-[#003B42] rounded-3xl p-10 shadow-lg top-30">
        <h1 className="text-4xl font-bold text-center ">Register your Group</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-4">
          <div>
            <label className="block mb-2 text-xl">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Aguka Developers"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block mb-2 text-xl">Interest Rate</label>
            <input
              type="number"
              name="interestRate"
              placeholder="5.7"
              value={formData.interestRate ?? ""}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-xl">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Collaboration group for developers."
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-xl">Contact</label>
            <input
              type="text"
              name="contact"
              placeholder="0788800000"
              value={formData.contact}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-xl">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Kigali,Gasabo,Ndera"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-xl">Email</label>
            <input
              type="email"
              name="email"
              placeholder="group@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block mb-2 text-xl">Profile Picture</label>
            <div className="relative">
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none pr-10"
              />
              <ImagePlus className="absolute right-3 top-3 text-gray-600" />
            </div>
          </div>

          {/* Min Contribution */}
          <div>
            <label className="block mb-2 text-xl">Min Contribution</label>
            <input
              type="number"
              name="minContribution"
              placeholder="500"
              value={formData.minContribution}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Meeting Location */}
          <div>
            <label className="block mb-2 text-xl">Meeting Location</label>
            <input
              type="text"
              name="meetingLocation"
              placeholder="Ndera"
              value={formData.meetingLocation}
              onChange={handleChange}
              className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-xl">Agreement Terms</label>
            <div className="relative">
              <input
                type="file"
                name="agreementTerms"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full rounded-md p-3  text-black border-2 border-gray-400 outline-none pr-10"
              />
              <Upload className="absolute right-3 top-3 text-gray-600" />
            </div>
          </div>
        

        <div className="flex justify-center mt-8">
          <button
            type="submit" disabled={isLoading}
            className="px-10 py-4 text-xl capitalize bg-[#F9A825] text-black font-bold rounded-md border-none">
           
             {isLoading ? "Creating..." : "Create Group"}
          </button>
          
        </div>
</form>
      </div>
    </div>
  );
};

export default RegisterGroup;
