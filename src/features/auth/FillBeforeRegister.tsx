import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/logo/agukalogo.png";
import type { ResetPasswordForm, ResetPasswordErrors } from "types/auth";

export default function ResetPassword() {
  const [form, setForm] = useState<ResetPasswordForm>({
    phone: "",
    groupId: "",
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const navigate = useNavigate();

  // Validate form
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

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle submit
  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center font-poppins bg-[var(--color-primary-300)] p-4">
      {/* Logo */}
      <div className="absolute top-8">
        <img
          src={logo}
          alt="Logo"
          className="w-20 h-20 mb-4 rounded-full object-cover"
        />
      </div>

      <div className="bg-[var(--color-primary-300)] rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-secondary-50)]">
            Save Together,
          </h1>
          <h1 className="text-2xl font-bold text-[var(--color-warning)] mt-2">
            Grow Together
          </h1>
        </div>

        <form onSubmit={handleContinue} className="space-y-6">
          {/* Phone */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Input your Telephone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] focus:border-transparent outline-none transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Group ID */}
          <div>
            <input
              type="text"
              name="groupId"
              placeholder="Input Your Group ID"
              value={form.groupId}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] focus:border-transparent outline-none transition"
            />
            {errors.groupId && (
              <p className="text-red-500 text-sm mt-1">{errors.groupId}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold mt-4 transition"
            style={{
              backgroundColor: "var(--color-warning)",
              color: "var(--color-secondary-50)",
            }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
