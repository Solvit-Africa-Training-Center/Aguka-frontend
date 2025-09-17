import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "assets/logo/agukalogo.png";
import type { ResetPasswordForm, ResetPasswordErrors } from "types/auth";
<<<<<<< HEAD
import { Phone, Users } from "lucide-react"; // icons for phone + group ID
=======
import { Phone, Users } from "lucide-react";
import { useCompleteProfileMutation } from "@services/api/authApi";
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb

export default function FillBeforeRegister() {
  const [form, setForm] = useState<ResetPasswordForm>({
    phone: "",
    groupId: "",
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
=======
  const [completeProfile, { isLoading }] = useCompleteProfileMutation();
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
  const navigate = useNavigate();

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: ResetPasswordErrors = {};
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number (10-15 digits)";
    }
    if (!form.groupId.trim()) {
      newErrors.groupId = "Group ID is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (validate()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/memberdashboard");
      }, 1500);
=======

    if (!validate()) return;

    try {
      const res = await completeProfile(form).unwrap();
      console.log("Profile completed:", res);
      navigate("/memberdashboard"); // navigate after success
    } catch (error: any) {
      console.error("Error completing profile:", error);
      setErrors({ phone: "Failed to complete profile. Try again." });
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen w-full flex pt-10 justify-center font-poppins bg-white">
      <div className=" w-full max-w-xl p-8 ">
        {/* Logo */}
        <div className=" place-items-center ">
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-30 mb-4 rounded-full object-cover bg-white ml-15"
          />
        </div>
        <div className="bg-[#003B42] p-10 rounded-4xl space-y-10 w-160">
          {/* Title */}
          <div className="capitalize space-y-3 ">
            <h1 className="text-4xl text-center text-white font-bold font-poppins">
              save together,
            </h1>
            <h1 className="text-4xl text-center  text-[#F9A825] font-bold font-poppins">
              growth together
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleContinue} className="space-y-8">
            {/* Phone */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]"
                size={20}
              />
              <input
                type="text"
=======
    <div className="min-h-screen w-full flex pt-10 justify-center font-poppins bg-primary-500">
      <div className="w-full max-w-xl p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-28 h-28 mb-4 rounded-full object-cover"
          />
        </div>

        {/* Form Container */}
        <div className="bg-[#003B42] p-10 rounded-4xl space-y-10">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl text-white font-bold">Save Together,</h1>
            <h1 className="text-4xl text-[#F9A825] font-bold">Grow Together</h1>
          </div>

          <form onSubmit={handleContinue} className="space-y-6">
            {/* Phone */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F9A825]"
                size={20}
              />
              <input
                type="tel"
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
                name="phone"
                placeholder="Input your Telephone Number"
                value={form.phone}
                onChange={handleChange}
<<<<<<< HEAD
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
=======
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-[#003B42] outline-none transition bg-transparent"
                autoComplete="tel"
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Group ID */}
            <div className="relative">
              <Users
<<<<<<< HEAD
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]"
=======
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F9A825]"
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
                size={20}
              />
              <input
                type="text"
                name="groupId"
                placeholder="Input Your Group ID"
                value={form.groupId}
                onChange={handleChange}
<<<<<<< HEAD
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
=======
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-[#003B42] outline-none transition bg-transparent"
                autoComplete="off"
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
              />
              {errors.groupId && (
                <p className="text-red-500 text-sm mt-1">{errors.groupId}</p>
              )}
            </div>

<<<<<<< HEAD
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-2xl text-white py-3 rounded-lg font-bold bg-[#F9A825] border-2 border-[#948E8E] transition">
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </form>
=======
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-2xl font-bold rounded-lg bg-[#F9A825] border-2 border-[#948E8E] transition hover:bg-yellow-600">
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </form>

          {/* Link to Register Group */}
          <div className="text-center mt-6 text-xl">
            <span className="text-white">Create a Group</span>
            <button
              type="button"
              onClick={() => navigate("/registergroup")}
              className="ml-2 text-[#F9A825] underline hover:text-yellow-600 font-bold ">
              here
            </button>
          </div>
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
        </div>
      </div>
    </div>
  );
}
