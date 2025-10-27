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

  // NEW: Select messages from redux state
  const { successMessage, errorMessage } = useSelector(
    (state: RootState) => state.group
  );

  // NEW: Clear messages after 4 seconds
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

      // ✅ Reset form
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
    <div className="relative w-full min-h-screen font-poppins flex items-center justify-center">
      {successMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {errorMessage}
        </div>
      )}

      <img
        src="image/ibiceri  aguka.jpg"
        alt="background"
        className="absolute inset-0 w-400 h-full "
      />
      <div className="absolute inset-0 bg-[#CED6D8] opacity-90 ml-300"></div>

      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        className="absolute w-25 h-25 rounded-full left-6 top-2 z-20"
      />

      {/* Form container */}
      <div className="relative z-10 w-300 mx-auto bg-[#003B42] rounded-2xl p-8 shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Register your Group
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-white"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg p-3 text-white placeholder:text-gray-400 
                     border-2 border-[#948E8E] bg-transparent outline-none
                     focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825] transition-all
                     text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-medium">
              Interest Rate
            </label>
            <input
              type="number"
              name="interestRate"
              placeholder="5.7"
              value={formData.interestRate ?? ""}
              onChange={handleChange}
              className="w-full rounded-lg p-3 text-white placeholder:text-gray-400 
                     border-2 border-[#948E8E] bg-transparent outline-none
                     focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825] transition-all
                     text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-medium">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter your Description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full rounded-lg p-3 text-white placeholder:text-gray-400 
                     border-2 border-[#948E8E] bg-transparent outline-none
                     focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825] transition-all
                     text-sm sm:text-base resize-none"
            />
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-medium">
              Contact
            </label>
            <input
              type="tel"
              name="contact"
              placeholder="Input Your Telephone Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full rounded-lg p-3 text-white placeholder:text-gray-400 
                     border-2 border-[#948E8E] bg-transparent outline-none
                     focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825] transition-all
                     text-sm sm:text-base"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 text-lg">Location</label>
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
              className="w-full rounded-md p-3 text-white placeholder:text-gray-400 border-1 border-[#948E8E] bg-transparent outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-lg">Email</label>
            <input
              type="email"
              name="email"
              placeholder="group@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md p-3 text-white placeholder:text-gray-400 border-1 border-[#948E8E] bg-transparent outline-none"
            />
            {errors.email && <p className="text-red-400">{errors.email}</p>}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block mb-2 text-lg">Profile Picture</label>
            <div className="relative">
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-md p-3 text-white border-1 border-[#948E8E] bg-transparent outline-none pr-10"
              />
              <ImagePlus className="absolute right-3 top-3 text-gray-300" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Min Contribution</label>
            <input
              type="text"
              name="minContribution"
              placeholder="500"
              value={formData.minContribution}
              onChange={handleChange}
              className="w-full rounded-md p-3 text-white placeholder:text-gray-400 border-1 border-[#948E8E] bg-transparent outline-none"
            />
            {errors.minContribution && (
              <p className="text-red-400">{errors.minContribution}</p>
            )}
          </div>

          {/* Meeting Location */}
          <div>
            <label className="block mb-2 text-lg">Meeting Location</label>
            <input
              type="text"
              name="meetingLocation"
              placeholder="Ndera"
              value={formData.meetingLocation}
              onChange={handleChange}
              className="w-full rounded-md p-3 text-white placeholder:text-gray-400 border-1 border-[#948E8E] bg-transparent outline-none"
            />
          </div>

          {/* Agreement Terms */}
          <div>
            <label className="block mb-2 text-lg">Agreement Terms</label>
            <div className="relative">
              <input
                type="file"
                name="agreementTerms"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full rounded-md p-3 text-white border-1 border-[#948E8E] bg-transparent outline-none pr-10"
              />
              <Upload className="absolute right-3 top-3 text-gray-300" />
            </div>
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="px-10 py-4 text-xl bg-[#F9A825] text-black font-bold rounded-lg hover:bg-yellow-500 transition w-100"
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
