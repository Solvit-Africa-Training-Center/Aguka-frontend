import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "assets/logo/agukalogo.png";
import type { ResetPasswordForm, ResetPasswordErrors } from "types/auth";
import { Phone, Users } from "lucide-react"; // icons for phone + group ID

export default function FillBeforeRegister() {
  const [form, setForm] = useState<ResetPasswordForm>({
    phone: "",
    groupId: "",
  });
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/memberdashboard");
      }, 1500);
    }
  };

  return (
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
                name="phone"
                placeholder="Input your Telephone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Group ID */}
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]"
                size={20}
              />
              <input
                type="text"
                name="groupId"
                placeholder="Input Your Group ID"
                value={form.groupId}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
              />
              {errors.groupId && (
                <p className="text-red-500 text-sm mt-1">{errors.groupId}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-2xl text-white py-3 rounded-lg font-bold bg-[#F9A825] border-2 border-[#948E8E] transition">
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
