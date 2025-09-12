import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/logo/agukalogo.png";
import type { ResetPasswordForm, ResetPasswordErrors } from "types/auth";
import { Phone, Users } from "lucide-react";
import { useCompleteProfileMutation } from "@services/api/authApi";

export default function FillBeforeRegister() {
  const [form, setForm] = useState<ResetPasswordForm>({
    phone: "",
    groupId: "",
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [completeProfile, { isLoading }] = useCompleteProfileMutation();
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

    if (!validate()) return;

    try {
      const res = await completeProfile(form).unwrap();
      console.log("Profile completed:", res);
      navigate("/memberdashboard"); // navigate after success
    } catch (error: any) {
      console.error("Error completing profile:", error);
      setErrors({ phone: "Failed to complete profile. Try again." });
    }
  };

  return (
    <div className="min-h-screen w-full flex pt-10 justify-center font-poppins bg-white">
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
                name="phone"
                placeholder="Input your Telephone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-[#003B42] outline-none transition bg-transparent"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Group ID */}
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F9A825]"
                size={20}
              />
              <input
                type="text"
                name="groupId"
                placeholder="Input Your Group ID"
                value={form.groupId}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-[#003B42] outline-none transition bg-transparent"
                autoComplete="off"
              />
              {errors.groupId && (
                <p className="text-red-500 text-sm mt-1">{errors.groupId}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-2xl font-bold rounded-lg bg-[#F9A825] border-2 border-[#948E8E] transition hover:bg-yellow-600">
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
