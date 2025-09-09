import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/logo/agukalogo.png";

interface LoginForm {
  emailOrPhone: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  emailOrPhone?: string;
  password?: string;
}

const validateLoginForm = (form: LoginForm): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!form.emailOrPhone.trim()) {
    errors.emailOrPhone = "Email or phone is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (/^\d+$/.test(form.emailOrPhone)) {
      if (!phoneRegex.test(form.emailOrPhone)) {
        errors.emailOrPhone = "Enter a valid phone number (10-15 digits)";
      }
    } else {
      if (!emailRegex.test(form.emailOrPhone)) {
        errors.emailOrPhone = "Enter a valid email address";
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
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateLoginForm(form);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSuccess("");
      return;
    }

    try {
    const response = await fetch("https://aguka.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.emailOrPhone,
        password: form.password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    console.log("✅ Login success:", data);

    // Save token if backend sends one
    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  } catch (error: any) {
    console.error("❌ Error logging in:", error.message);
    setErrors({ emailOrPhone: error.message });
    setErrors({ emailOrPhone: error.message });
  }
};

  return (
    <div className="min-h-screen w-full flex font-poppins">
      <div className="text-[var(--color-secondary-50)] grid md:grid-cols-2 w-full">
        {/* Left Section */}
        <div className="relative w-full md:flex flex-col">
          <img
            src="photos/login.jpg"
            alt="Login"
            className="relative w-full min-h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute top-[230px] left-[88px] grid gap-[67px] w-[700px] h-[389px]">
            <div className="place-items-center">
              <img
                src={logo}
                alt="Logo"
                className="w-30 h-30 mb-2 rounded-full object-cover ml-25"
              />
            </div>
            <div className="text-center">
              <h1 className="text-7xl font-extrabold text-[var(--color-secondary-50)]">
                Save Together,
              </h1>
              <h1 className="text-7xl font-extrabold text-[var(--color-warning)] mt-2">
                Grow Together
              </h1>
            </div>
            <div className="text-center w-180  text-sm">
              <p>
                Aguka empowers communities to build financial strength through
                collective savings. By pooling resources, members access
                opportunities to grow, achieve their goals, and support one
                another.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center bg-[#003B42] min-h-screen relative">
          <div className="absolute  ml-[126px] w-[590px] ">
            <h2 className="text-6xl font-poppins text-[#FAFEFFFC] text-left  mb-15">
              Join Aguka!
            </h2>

            {/* Form */}
            <div className="w-120">
              <form onSubmit={handleSubmit} className=" space-y-8">
                {/* Email / Phone */}
                <div className="flex flex-col w-full ">
                  <label
                    htmlFor="emailOrPhone"
                    className="text-2xl text-[#FFFCFCFC] py-2">
                    Email/Phone number
                  </label>
                  <input
                    type="text"
                    id="emailOrPhone"
                    name="emailOrPhone"
                    value={form.emailOrPhone}
                    onChange={handleChange}
                    placeholder="Enter Your Email/Phone number"
                    className="w-full p-4 rounded-[15px] border-2 placeholder:text-xl 
                             border-[var(--color-border)] bg-transparent 
                             text-[var(--color-secondary-50)] placeholder-gray-400 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
                  />
                  {errors.emailOrPhone && (
                    <p className="text-red-400 text-sm">
                      {errors.emailOrPhone}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col w-full space-y-2">
                  <label
                    htmlFor="password"
                    className="text-2xl text-[#FFFCFCFC] ">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full p-4 rounded-[15px] border-2 border-[#948E8E] 
                             bg-transparent text-[var(--color-secondary-50)] 
                             placeholder-gray-400 placeholder:text-xl 
                             focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="peer h-6 w-6 rounded-lg border border-[#F4F4F4]  bg-transparent checked:bg-none checked:border-[#F4F4F4] focus:outline-none"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 text-xl text-[#FFF8F8FC]">
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="text-xl text-[#FFF8F8FC] underline hover:underline hover:text-[#F9A825]">
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="py-2 rounded-lg font-semibold w-full h-[60px] mt-2 
                           bg-[#F9A825] text-[24px] text-black">
                  Login
                </button>

                {success && (
                  <div className="mt-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                    {success}
                  </div>
                )}
              </form>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6 text-gray-400 w-120">
              <hr className="flex-grow border-[var(--color-border)]" />
              <span className="mx-2 text-[20px] text-[#F9A825] capitalize">
                Or continue with
              </span>
              <hr className="flex-grow border-[var(--color-border)]" />
            </div>

            {/* Google Button */}
            <div className=" w-120 justify-center place-items-center">
              <button className="w-25 h-10 border border-gray-300 rounded-lg max-w-md flex items-center justify-center py-3  mb-6">
                <img
                  src="/image/gmail.png"
                  alt="Google login"
                  className="w-10 h-10 "
                />
              </button>
            </div>

            {/* Sign up link */}
            <p className="text-center mt-6 text-gray-400 text-[24px]">
              Don&apos;t have an account?{" "}
              <Link
                to="/registermember"
                className="text-[var(--color-warning)] hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
