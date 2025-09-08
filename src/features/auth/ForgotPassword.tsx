import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { Mail } from "lucide-react";
import type { ForgotPasswordForm } from "types/auth";

export default function ForgotPassword() {
  const [form, setForm] = useState<ForgotPasswordForm>({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ email: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkemail", { state: { email: form.email } });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex  justify-center font-poppins bg-[#003B42] p-4">
      <div className="W-200 h-150 mt-30 border border-[#F9A825]  p-10  rounded-lg">
        <h2 className="text-4xl font-bold text-center text-[var(--color-warning)] mb-6">
          Forgot Password?
        </h2>
        <div className="place-items-center p-5">
          <LockKeyhole className="size-10  text-secondary-300 " />
        </div>
        <div className="place-items-center ">
          <p className="text-left text-2xl text-white w-100 pl-10 mb-6">
            We will send you an Email to Reset Your Password
          </p>

          <div className="mt-20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative w-full">
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 border-2 border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#948E8E]">
                  <Mail />
                </div>g
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--color-warning)] text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50 text-2xl">
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-[var(--color-secondary-50)]">
            Remember Password?{" "}
            <Link
              to="/login"
              className="text-sm text-[var(--color-warning)] hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
