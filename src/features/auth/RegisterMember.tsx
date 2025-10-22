import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import type { RegisterForm } from "types/auth";
import logo from "assets/logo/agukalogo.png";

import { useRegisterUserMutation } from "@services/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@services/api/authSlice";

interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

const validateRegisterForm = (form: RegisterForm): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!form.fullName.trim()) errors.fullName = "Full Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.password.trim()) errors.password = "Password is required";
  else if (form.password.length < 6)
    errors.password = "Password must be at least 6 characters";
  return errors;
};

export default function RegisterMember() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<string>("");

  const navigate = useNavigate();

  const location = useLocation();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const email = queryParams.get("email");
    const name = queryParams.get("name");
    const groupId = queryParams.get("groupId");
    const isApproved = queryParams.get("isApproved");

    if (token && email) {
      localStorage.setItem("token", token);

      const user = {
        email,
        name: name || "",
        groupId: groupId || null,
        isApproved: isApproved === "true",
      };

      if (!user.groupId || !user.isApproved) {
        navigate("/FillBeforeRegister", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [location.search, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateRegisterForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const result = await registerUser({
        name: form.fullName,
        email: form.email,
        password: form.password,
      }).unwrap();

      console.log("Registered successfully:", result);

      // Try to get token and role from result.data or result.token
      const user = result.data || result.user || {};
      const token = result.data?.token || result.token || "";
      const role = user.role || result.data?.role || "";

      if (token) localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(
        setCredentials({
          token: result.data.token,
          role: result.data.role,
          user: result.data.user,
        })
      );

      setSuccess("Your account has been created successfully!");
      setForm({ fullName: "", email: "", password: "" });
      navigate("/login");
    } catch (error: any) {
      const message =
        error?.data?.message || "Failed to register. Please try again.";
      setErrors({ email: message });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="w-full flex font-poppins md:h-screen overflow-x-hidden md:overflow-auto min-h-screen">
      <div className="grid md:grid-cols-2 w-full md:h-screen">
        <div className="md:w-full relative h-screen mx-auto w-full ">
          <img
            src="/photos/registermember.jpg"
            alt="Register"
            className="md:w-full md:h-screen mx-auto"
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="absolute top-30 pr-24 w-130 md:top-1/4 md:left-16 md:w-[600px] grid gap-6 text-center text-white">
            <img
              src={logo}
              alt="Logo"
              className="w-36 h-36 rounded-full mx-auto "
            />
            <h1 className="md:text-6xl text-xl font-bold">Save Together,</h1>
            <h1 className="md:text-6xl text-xl font-bold text-[#F9A825]">
              Grow Together
            </h1>
            <p className="text-sm mt-2 md:mt-0 md:w-180 mx-auto w-100 pr-10 ">
              Aguka empowers communities to build financial strength through
              collective savings. By pooling resources, members access
              opportunities to grow, achieve their goals, and support one
              another.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}

        <div className="flex flex-col bg-[#003B42] h-screen w-100 md:full lg:w-full justify-center md:px-32 md:py-10 lg:px-10 lg:py-10 relative px-2 py-2">
          <div className="rounded-3xl border border-primary-50 md:border-none w-full p-10">
            <h2 className="md:text-5xl md:text-white  font-bold mb-8 text-center text-3xl text-secondary-300 underline md:underline-0">
              Create an Account
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 md:w-full max-w-md  mx-auto  "
            >
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="text-2xl text-white mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-4 rounded-lg border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {errors.fullName && (
                  <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-2xl text-white mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-4 rounded-lg border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="text-2xl text-white mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-4 rounded-lg border border-gray-400 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-lg font-semibold text-black bg-[#F9A825] hover:bg-secondary-600 transition"
              >
                {isLoading ? "Registering..." : "Sign Up"}
              </button>

              {success && (
                <div className="mt-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                  {success}
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="flex items-center my-6 text-gray-400 w-full max-w-md">
              <hr className="flex-grow border-gray-400" />
              <span className="mx-2 text-[#F9A825]">Or continue with</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            {/* Google Login */}
            <div className="w-100 justify-center place-items-center">
              <button
                onClick={handleGoogleLogin}
                className="w-25 h-10 border border-gray-300 rounded-lg max-w-md flex items-center justify-center py-3 mb-6"
              >
                <img
                  src="/image/gmail.png"
                  alt="Google login"
                  className="w-10 h-10"
                />
              </button>
            </div>

            <p className="text-center text-gray-300 md:w-150">
              Already have an account?{" "}
              <Link to="/login" className="text-[#F9A825] hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
