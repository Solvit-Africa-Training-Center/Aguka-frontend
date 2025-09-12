import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Upload, ImagePlus } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import type { GroupCreation } from "types/auth";
import { useCreateGroupMutation } from "@services/api/groupApi";

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
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

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Group name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.minContribution || formData.minContribution <= 0)
      newErrors.minContribution = "Min contribution must be greater than 0";
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        data.append(
          key,
          typeof value === "number" ? value.toString() : (value as any)
        );
      }
    });

    try {
      const result = await createGroup(data).unwrap();
      alert(`Group created successfully! Group ID: ${result.id}`);
      setFormData({
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
    } catch (err: any) {
      console.error("Error creating group:", err);
      alert(err?.data?.message || "Failed to create group.");
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

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-4 ">
          {/* Name */}
          <div>
            <label className="block mb-2 text-xl">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Aguka Developers"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md p-3 placeholder:text-neutral-400  text-white text-xl border-2 border-gray-400 outline-none"
            />
            {errors.name && <p className="text-red-400">{errors.name}</p>}
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
              className="w-full rounded-md p-3 placeholder:text-neutral-400 not-visited:text-white text-xl border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Other fields remain unchanged */}
          {/* ...Copy all fields from your original form here... */}
          {/* Email */}
          <div>
            <label className="block mb-2 text-xl">Email</label>
            <input
              type="email"
              name="email"
              placeholder="group@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md p-3 placeholder:text-neutral-400 text-white text-xl border-2 border-gray-400 outline-none"
            />
            {errors.email && <p className="text-red-400">{errors.email}</p>}
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
                className="w-full rounded-md p-3  text-neutral-200 border-2 border-gray-400 outline-none pr-10 placeholder:text-neutral-400"
              />
              <ImagePlus className="absolute right-3 top-3 text-secondary-600" />
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
              className="w-full rounded-md p-3 placeholder:text-neutral-400 text-white text-xl border-2 border-gray-400 outline-none"
            />
            {errors.minContribution && (
              <p className="text-red-400">{errors.minContribution}</p>
            )}
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
              className="w-full rounded-md p-3 placeholder:text-neutral-400 text-white text-xl border-2 border-gray-400 outline-none"
            />
          </div>

          {/* Agreement Terms */}
          <div>
            <label className="block mb-2 text-xl">Agreement Terms</label>
            <div className="relative">
              <input
                type="file"
                name="agreementTerms"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full rounded-md p-3   text-neutral-400 text-xl border-2 border-gray-400 outline-none pr-10"
              />
              <Upload className="absolute right-3 top-3 text-secondary-600  " />
            </div>
          </div>

          <div className="flex justify-center pt-2 pb-4 w-full relative">
            <button
              type="submit"
              disabled={isLoading}
              className="px-25 py-4 text-xl capitalize bg-[#F9A825] text-black  font-bold rounded-md border-none absolute -right-40 ">
              {isLoading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterGroup;
