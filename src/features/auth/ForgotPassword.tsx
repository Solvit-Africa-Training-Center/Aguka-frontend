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
    <div className="min-h-screen w-full flex pt-20 justify-center font-poppins bg-[var(--color-primary-300)] p-4">
      <div className="bg-[var(--color-primary-300)] pt-15 rounded-xl border border-[#F9A825] w-full max-w-xl h-150 p-8 space-y-8">
        <h2 className="text-5xl text-center font-bold text-[#F9A825] mb-6">
          Forgot Password?
        </h2>
        <div className="place-items-center">
          <LockKeyhole className="size-12 text-[#F9A825]" />
        </div>
        <p className="text-left text-2xl text-white ml-30 mt-20 w-100 mb-6 font-bold">
          We will send you an Email to Reset Your Password
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]"
              size={20}
            />
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
            />
          </div>

          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-3xl text-white py-3 rounded-lg font-bold bg-[#F9A825] border-2 border-[#948E8E]">
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-[var(--color-secondary-50)]">
            Remember Password?{" "}
            <Link
              to="/login"
              className="text-sm text-[#F9A825] hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
