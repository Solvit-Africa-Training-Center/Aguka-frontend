import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "assets/logo/agukalogo.png";
import { useLoginMutation } from "@services/api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@services/api/authSlice";
import { jwtDecode } from "jwt-decode";

interface LoginForm {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  identifier?: string;
  password?: string;
}

const validateLoginForm = (form: LoginForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.identifier.trim()) {
    errors.identifier = "Email or phone is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (/^\d+$/.test(form.identifier)) {
      if (!phoneRegex.test(form.identifier)) {
        errors.identifier = "Enter a valid phone number (10-15 digits)";
      }
    } else {
      if (!emailRegex.test(form.identifier)) {
        errors.identifier = "Enter a valid email address";
      }
    }
  }

  if (!form.password.trim()) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<string>("");

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectByRole = (role: string) => {
    switch (role) {
      case "admin":
        navigate("/admindashboard");
        break;
      case "president":
        navigate("/presidentdashboard");
        break;
      case "secretary":
        navigate("/secretarydashboard");
        break;
      case "treasurer":
        navigate("/treasurerdashboard");
        break;
      case "user":
      default:
        navigate("/memberdashboard");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateLoginForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSuccess("");
      return;
    }

    try {
      const result: any = await login({
        identifier: form.identifier,
        password: form.password,
      }).unwrap();

      const accessToken = result.data?.accessToken;
      if (!accessToken) {
        setErrors({ identifier: "Token missing in login response." });
        return;
      }

      localStorage.setItem("token", accessToken);

      const decoded: any = jwtDecode(accessToken);
      const role = decoded.role || "user";
      const groupId = decoded.groupId;

      const user = decoded; // store everything
      dispatch(setCredentials({ token: accessToken, role, user }));

      setSuccess("Login successful!");

      if (!groupId && user.role !== "admin") {
        navigate("/fillbeforeregister");
      } else {
        redirectByRole(role);
      }
    } catch (err: any) {
      setErrors({ identifier: err?.message || "User not found" });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      const decoded: any = jwtDecode(token);
      const role = decoded.role || "user";
      const groupId = decoded.groupId;

      const user = decoded; // instead of partial
      dispatch(setCredentials({ token, role, user }));

      if (!groupId) {
        navigate("/fillbeforeregister");
      } else {
        redirectByRole(role);
      }
    }
  }, [location.search, navigate, dispatch]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen w-full flex font-poppins overflow-x-hidden">
      <div className="text-[var(--color-secondary-50)] grid md:grid-cols-2 grid-cols-1 gap-0 w-full">
        {/* Left Section */}
        <div className="relative hidden md:flex flex-col">
          <img
            src="photos/login.jpg"
            alt="Login"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center px-8">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <img
                src={logo}
                alt="Logo"
                className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
              />
              <div>
                <h1 className="text-4xl lg:text-7xl font-extrabold text-[var(--color-secondary-50)]">
                  Save Together,
                </h1>
                <h1 className="text-4xl lg:text-7xl font-extrabold text-[var(--color-warning)] mt-2">
                  Grow Together
                </h1>
              </div>

              <div className="max-w-xl mx-auto">
                <p className="text-base lg:text-lg text-[var(--color-secondary-50)]">
                  Aguka empowers communities to build financial strength through
                  collective savings. By pooling resources, members access
                  opportunities to grow, achieve their goals, and support one
                  another.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#003B42] min-h-screen relative flex items-center justify-center px-4 py-8 md:px-8">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins text-[#FAFEFFFC] text-center md:text-left mb-8">
              Join Aguka!
            </h2>

            {/* Form */}
            <div className="w-full">
              <div className="bg-transparent border border-primary-200 md:border-none rounded-lg p-6">
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  {/* Email / Phone */}
                  <div className="space-y-2">
                    <label
                      htmlFor="identifier"
                      className="block text-base sm:text-lg md:text-xl text-[#FFFCFCFC]"
                    >
                      Email/Phone number
                    </label>
                    <input
                      type="text"
                      id="identifier"
                      name="identifier"
                      value={form.identifier}
                      onChange={handleChange}
                      placeholder="Enter Your Email/Phone number"
                      className="w-full p-3 rounded-lg border-2 border-[#948E8E] bg-transparent
                             text-[var(--color-secondary-50)] placeholder-gray-400 text-sm sm:text-base
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)] transition-all"
                    />
                    {errors.identifier && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.identifier}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="block text-base sm:text-lg md:text-xl text-[#FFFCFCFC]"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full p-3 rounded-lg border-2 border-[#948E8E] bg-transparent
                             text-[var(--color-secondary-50)] placeholder-gray-400 text-sm sm:text-base
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)] transition-all"
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={form.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-2 border-[#F4F4F4] bg-transparent
                               checked:bg-[#F9A825] checked:border-[#F9A825] 
                               focus:ring-2 focus:ring-[#F9A825] transition-colors"
                      />
                      <label
                        htmlFor="rememberMe"
                        className="text-sm sm:text-base text-[#FFF8F8FC]"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      to="/forgotpassword"
                      className="text-sm sm:text-base text-[#FFF8F8FC] hover:text-[#F9A825] transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3 px-4 rounded-lg font-semibold text-base sm:text-lg
                     bg-[#F9A825] text-black hover:bg-[#E09721] transition-colors
                     disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </button>

                  {success && (
                    <div className="mt-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                      {success}
                    </div>
                  )}
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--color-border)]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-sm sm:text-base text-[#F9A825] bg-[#003B42]">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Button */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center px-6 py-3 border-2 
                             border-gray-300 rounded-lg hover:bg-gray-700/10 transition-colors"
                  >
                    <img
                      src="/image/gmail.png"
                      alt="Google login"
                      className="w-6 h-6"
                    />
                  </button>
                </div>

                {/* Sign up link */}
                <p className="mt-8 text-center text-sm sm:text-base text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/registermember"
                    className="text-[#F9A825] hover:text-[#E09721] transition-colors"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
