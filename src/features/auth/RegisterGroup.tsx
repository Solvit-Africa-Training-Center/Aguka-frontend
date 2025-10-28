import React, { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Upload, ImagePlus } from "lucide-react";
import logo from "assets/logo/agukalogo.png";
import type { GroupCreation } from "types/auth";
import {
  setGroupError,
  setGroupSuccess,
  clearGroupMessages,
} from "@services/api/groupSlice";
import { useCreateGroupMutation } from "@services/api/groupApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "@services/api/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@services/store/store";

const RegisterGroup: React.FC = () => {
  const [formData, setFormData] = useState<GroupCreation>({
    name: "",
    description: "",
    location: [],
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { successMessage, errorMessage } = useSelector(
    (state: RootState) => state.group
  );

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        dispatch(clearGroupMessages());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage, dispatch]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
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
        let appendValue = value;
        if (typeof value === "number") {
          appendValue = value.toString();
        }
        data.append(key, appendValue as any);
      }
    });

    try {
      const result = await createGroup(data).unwrap();

      dispatch(
        setGroupSuccess({
          groupId: result.groupId || "",
          message: "Group created successfully!",
        })
      );

      navigate("/presidentdashboard");

      if (result.token) {
        localStorage.setItem("token", result.token);
        dispatch(
          setCredentials({
            token: result.token,
            role: result.role || "member",
            user: result.user || null,
          })
        );
      }

      setFormData({
        name: "",
        description: "",
        location: [],
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
      dispatch(
        setGroupError({
          message: err?.data?.message || "Failed to create group.",
        })
      );
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-poppins flex items-center justify-center">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 text-sm rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 text-sm rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}

      {/* Backgrounds */}
      <div className="fixed inset-0 bg-[url('/image/ibiceri%20%20aguka.jpg')] bg-cover bg-center bg-no-repeat"></div>
      <div className="fixed inset-0 bg-[#CED6D8]/80"></div>

      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        className="fixed w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full left-3 sm:left-5 top-3 z-20"
      />

      {/* Form Container */}
      <div className="relative z-10 w-[92%] sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 bg-[#003B42] rounded-xl p-3 sm:p-4 shadow-lg max-h-fit">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 text-white sticky top-0 bg-[#003B42] py-2">
          Register your Group
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-white text-sm sm:text-base"
        >
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all text-sm"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Interest Rate</label>
            <input
              type="number"
              name="interestRate"
              placeholder="5.7"
              value={formData.interestRate ?? ""}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Enter your Description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded px-3 py-2 text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all text-sm resize-none"
            />
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Contact</label>
            <input
              type="tel"
              name="contact"
              placeholder="Your Telephone Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
            />
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter your Province"
              value={formData.location[0] ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: [e.target.value],
                }))
              }
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="group@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Profile Picture</label>
            <div className="relative">
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-[#F9A825] file:text-black border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
              />
              <ImagePlus className="absolute right-2 top-2 text-gray-300 pointer-events-none" />
            </div>
          </div>

          {/* Min Contribution */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Min Contribution
            </label>
            <input
              type="number"
              name="minContribution"
              placeholder="500"
              value={formData.minContribution}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
            />
            {errors.minContribution && (
              <p className="text-red-400 text-xs">{errors.minContribution}</p>
            )}
          </div>

          {/* Meeting Location */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Meeting Location
            </label>
            <input
              type="text"
              name="meetingLocation"
              placeholder="Ndera"
              value={formData.meetingLocation}
              onChange={handleChange}
              className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white placeholder:text-gray-400 border border-[#948E8E] bg-transparent outline-none focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
            />
          </div>

          {/* Agreement Terms */}
          <div className="space-y-1">
            <label className="block text-sm font-medium">Agreement Terms</label>
            <div className="relative">
              <input
                type="file"
                name="agreementTerms"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full h-10 sm:h-9 md:h-8 rounded px-3 text-sm text-white file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-[#F9A825] file:text-black border border-[#948E8E] bg-transparent outline-none pr-10 focus:border-[#F9A825] focus:ring-1 focus:ring-[#F9A825] transition-all"
              />
              <Upload className="absolute right-2 top-2 text-gray-300" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm sm:text-base bg-[#F9A825] text-black font-medium rounded hover:bg-yellow-500 transition"
            >
              {isLoading ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterGroup;
