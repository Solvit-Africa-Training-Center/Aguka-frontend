import { useState } from "react";

import logo from "assets/logo/agukalogo.png";
import { Link, useNavigate } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";

export default function RegisterMember() {
  const [form, setForm] = useState({
    fullName: "",

    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // if (!form.groupId.trim()) newErrors.groupId = "Group Id is required";

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSuccess("");
      return;
    }

    // Replace this with API call later
    console.log("Form Submitted ", form);

    setSuccess("Your account has been created successfully!");
    setForm({
      fullName: "",
      // phone: "",
      email: "",
      password: "",
      // groupId: ""
    });
    navigate("/FillBeforeRegister");
  };

  return (
    <div className="min-h-screen w-full flex font-poppins bg-[#003B42]">
      <div className="text-[var(--color-secondary-50)] grid md:grid-cols-2 gap-0.5 w-full ">
        {/* Left Section */}
        <div className=" w-full  md:flex flex-col ">
          <img
            src="photos/registermember.jpg"
            alt="Register"
            className="rounded-lg object-cover   w-[835px] h-full"
          />
          <div className="absolute inset-0 bg-black opacity-60 w-[835px]"></div>
          <div className="absolute top-[140px] left-[88px] gap-[67px] grid w-[700px] h-[389px]">
            <img
              src={logo}
              alt="Logo"
              className="w-40 h-40 mb-2 ml-70 rounded-full object-cover "
            />
            <div className="text-center">
              <h1 className="text-7xl font-extrabold text-[var(--color-secondary-50)]">
                Save Together,
              </h1>
              <h1 className="text-7xl font-extrabold text-[var(--color-warning)] mt-2">
                Grow Together
              </h1>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center rounded-lg w-full">
          <h2 className="text-3xl font-normal mb-6 text-[var(--color-secondary-50)]">
            Create an account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="flex flex-col">
              <label
                htmlFor="fullName"
                className="mb-1 text-sm text-[var(--color-secondary-50)]">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-sm text-[var(--color-secondary-50)]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-1 text-sm text-[var(--color-secondary-50)]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition mt-4"
              style={{
                backgroundColor: "var(--color-warning)",
                color: "var(--color-secondary-50)",
              }}>
              Sign up
            </button>

            {success && (
              <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                {success}
              </div>
            )}
          </form>

          <div className="flex items-center my-4 mt-2 text-gray-400">
            <hr className="flex-grow border-[var(--color-border)]" />
            <span className="mx-2 text-sm text-[var(--color-warning)]">
              Or continue with
            </span>
            <hr className="flex-grow border-[var(--color-border)]" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 rounded-lg py-3 hover:bg-[#012B36] transition text-[var(--color-secondary-50)]">
            <BiLogoGmail size={24} />
            {/* <span>Continue with Gmail</span> */}
          </button>

          <p className="text-center mt-2 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[var(--color-warning)] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
