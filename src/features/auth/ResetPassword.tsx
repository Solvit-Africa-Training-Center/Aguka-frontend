import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LockKeyhole, Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@services/api/authApi";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [form, setForm] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const token = location.search.split("token=")[1]; // get token from query params

  const [resetPassword] = useResetPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({ token, newPassword: form.password }).unwrap();
      alert("Password reset successful!");
      navigate("/login");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center font-poppins bg-[var(--color-primary-300)] px-4 py-8 sm:py-12 md:py-20">
      <div className="bg-[var(--color-primary-300)] rounded-xl border border-[#F9A825] w-full max-w-md sm:max-w-lg md:max-w-xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-[#F9A825]">
          Reset Password
        </h2>

        <div className="flex justify-center">
          <LockKeyhole className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F9A825]" />
        </div>

        <p className="text-center text-lg sm:text-xl md:text-2xl text-white font-bold">
          Enter your new password below
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
            <p className="text-red-400 text-center text-sm sm:text-base font-semibold">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="New Password"
                required
                className="w-full pl-4 pr-10 py-3 text-sm sm:text-base border-2 border-[#948E8E] 
                       text-white bg-transparent rounded-lg outline-none transition-all duration-200
                       focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/50
                       placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]
                         hover:text-[#E09721] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                required
                className="w-full pl-4 pr-10 py-3 text-sm sm:text-base border-2 border-[#948E8E] 
                       text-white bg-transparent rounded-lg outline-none transition-all duration-200
                       focus:border-[#F9A825] focus:ring-2 focus:ring-[#F9A825]/50
                       placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]
                         hover:text-[#E09721] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 text-lg sm:text-xl md:text-2xl text-black font-bold 
                   bg-[#F9A825] rounded-lg transition-all duration-200
                   hover:bg-[#E09721] disabled:opacity-70 disabled:cursor-not-allowed
                   focus:ring-4 focus:ring-[#F9A825]/50"
          >
            {isLoading ? "Saving..." : "Submit"}
          </button>
        </form>

        <div className="text-center pt-4">
          <p className="text-white text-sm sm:text-base md:text-lg">
            Remember Password?{" "}
            <Link
              to="/login"
              className="text-[#F9A825] hover:text-[#E09721] font-semibold transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
