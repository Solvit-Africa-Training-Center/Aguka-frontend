import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { ForgotPasswordForm } from "types/auth";
import { Mail } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { useForgotPasswordMutation } from "@services/api/authApi";

export default function ForgotPassword() {
  const [form, setForm] = useState<ForgotPasswordForm>({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ email: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await forgotPassword({ email: form.email }).unwrap();
      console.log("Forgot password response:", response);
      setIsLoading(false);
      navigate("/checkemail", { state: { email: form.email } });
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.data?.message || "Failed to send reset email. Try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-start sm:items-center justify-center font-poppins bg-[var(--color-primary-300)] px-4 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        <div className="bg-[var(--color-primary-300)] rounded-xl border border-[#F9A825] w-full p-4 sm:p-6 md:p-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-[#F9A825]">
            Forgot Password?
          </h2>

          <div className="flex justify-center">
            <LockKeyhole className="w-8 h-8 sm:w-10 sm:h-10 text-[#F9A825]" />
          </div>

          <p className="text-center text-base sm:text-lg md:text-xl text-white mb-2 font-semibold">
            We will send you an email to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F9A825]"
                size={18}
              />
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 text-sm sm:text-base border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#F9A825]/40 outline-none transition bg-transparent"
              />
            </div>

            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-base sm:text-lg md:text-xl text-black font-semibold rounded-lg bg-[#F9A825] border-2 border-[#948E8E] hover:bg-[#E09721] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Submit"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-[var(--color-secondary-50)] text-sm sm:text-base">
              Remember Password?{" "}
              <Link
                to="/login"
                className="text-[#F9A825] hover:text-[#E09721] font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
