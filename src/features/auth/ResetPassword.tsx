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
    <div className="min-h-screen w-full flex pt-20 justify-center font-poppins bg-[var(--color-primary-300)] p-4">
      <div className="bg-[var(--color-primary-300)] pt-15 rounded-xl border border-[#F9A825] w-full max-w-xl h-150 p-8 space-y-8">
        <h2 className="text-5xl text-center font-bold text-[#F9A825] mb-6">
          Reset Password
        </h2>

        <div className="place-items-center">
          <LockKeyhole className="size-12 text-[#F9A825]" />
        </div>

        <p className="text-center text-2xl text-white w-full mb-6 font-bold">
          Enter your new password below
        </p>

        {error && (
          <p className="text-red-400 text-center font-semibold mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
              required
              className="w-full pl-4 pr-10 py-3 border-2 border-[#948E8E] text-white bg-transparent rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]">
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
              className="w-full pl-4 pr-10 py-3 border-2 border-[#948E8E] text-white bg-transparent rounded-lg focus:ring-2 focus:ring-[#003B42] outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#F9A825]">
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-3xl text-white py-3 rounded-lg font-bold bg-[#F9A825] border-2 border-[#948E8E]">
            {isLoading ? "Saving..." : "Submit"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white text-lg">
            Remember Password?{" "}
            <Link
              to="/login"
              className="text-[#F9A825] hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
