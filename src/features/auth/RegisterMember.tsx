import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterForm } from "types/auth";
import { useUser } from "hooks/useUser";
import logo from "assets/logo/agukalogo.png";
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
  const { setUser } = useUser();
  const [form, setForm] = useState<RegisterForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

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
    const response = await fetch("https://aguka.onrender.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
        name: form.fullName,
        email: form.email,
        password: form.password,
      }),
    });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Registered successfully:", data);
      setUser(form.email, form.fullName);
      setSuccess("Your account has been created successfully!");
      setForm({ fullName: "", email: "", password: "" });

      setTimeout(() => navigate("/FillBeforeRegister"), 1000);
    } catch (error: any) {
      console.error("Error registering:", error.message);
      setErrors({ email: error.message });
    }
  };

  return (
    <div className="w-full flex font-poppins h-screen">
      <div className="grid md:grid-cols-2 w-full h-screen">
        {/* Left Section */}
        <div className="w-full relative h-screen">
          <img
            src="/photos/registermember.jpg"
            alt="Register"
            className="w-full h-screen "
          />
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="absolute top-1/4 left-16 w-[600px] grid gap-6 text-center text-white">
            <img
              src={logo}
              alt="Logo"
              className="w-36 h-36 rounded-full mx-auto"
            />
            <h1 className="text-6xl font-bold">Save Together,</h1>
            <h1 className="text-6xl font-bold  text-[#F9A825] ">
              Grow Together
            </h1>
            <p className="text-sm mt-2 w-200">
              Aguka empowers communities to build financial strength through
              collective savings. By pooling resources, members access
              opportunities to grow, achieve their goals, and support one
              another.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col bg-[#003B42] h-screen w-full justify-center px-32 py-10 relative">
          <h2 className="text-5xl text-white font-bold mb-8">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
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
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

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
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-lg font-semibold text-black bg-[#F9A825] hover:bg-secondary-600 transition">
              Sign Up
            </button>

            {success && (
              <div className="mt-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                {success}
              </div>
            )}
          </form>

          <div className="flex items-center my-6 text-gray-400 w-full max-w-md">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-2 text-[#F9A825]">Or continue with</span>
            <hr className="flex-grow border-gray-400" />
          </div>
          <div className=" w-100 justify-center place-items-center">
            <button className="w-25 h-10 border border-gray-300 rounded-lg max-w-md flex items-center justify-center py-3  mb-6">
              <img
                src="/image/gmail.png"
                alt="Google login"
                className="w-10 h-10 "
              />
            </button>
          </div>
          <p className="text-center text-gray-300 w-150">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F9A825] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
