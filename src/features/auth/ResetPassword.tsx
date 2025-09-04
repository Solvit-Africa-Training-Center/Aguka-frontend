import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // token from URL

  // use `token` when calling backend API
  console.log("Reset token:", token);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Password reset successful!");
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary-300)] p-4 font-poppins">
      <div className="bg-[var(--color-primary-300)] rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-4xl font-bold text-center text-[var(--color-warning)] mb-6">
          Reset Password
        </h2>

        <p className="text-center text-2xl text-[var(--color-secondary-50)] mb-6">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#948E8E] text-[var(--color-secondary-50)] rounded-lg focus:ring-2 focus:ring-[#003B42] focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--color-warning)] text-white py-3 px-4 rounded-lg font-medium hover:bg-opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003B42] disabled:opacity-50">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 
                       0 5.373 0 12h4zm2 5.291A7.962 
                       7.962 0 014 12H0c0 3.042 1.135 
                       5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Submit"
            )}
          </button>
          <p className="text-center mt-6 text-gray-400 text-sm">
            Remember password?{" "}
            <Link
              to="/login"
              className="text-[var(--color-warning)] hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
