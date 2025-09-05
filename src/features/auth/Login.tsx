import { useState } from "react";
import logo from "assets/logo/agukalogo.png";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.emailOrPhone.trim())
      newErrors.emailOrPhone = "Email or phone is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
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

    console.log("Login Submitted", form);
    setSuccess("Login successful!");
    setForm({ emailOrPhone: "", password: "", rememberMe: false });
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex font-poppins ">
      <div className="text-[var(--color-secondary-50)] grid md:grid-cols-2 gap-0.5 w-full ">
        {/* Left Section */}
        <div className=" w-full  md:flex flex-col ">
          <img
            src="photos/login.jpg"
            alt="Login"
            className=" relative w-full min-h-screen "
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
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

            <div className="text-center w-[681px] text-xl">
              <p>
                Aguka empowers communities to build financial strength through
                collective savings. by pooling resource s,member access
                opportunities to grow,achieve their goals, and support one
                another
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className=" flex flex-col justify-center bg-[#003B42] min-h-screen relative">
          <div className="mt-2 ml-[126px] w-[590px] absolute">
            <h2 className="text-8xl font-poppins  text-[#FAFEFFFC text-center mt-14">
              Join Aguka!
            </h2>
            <div className="mt-10">
              <form onSubmit={handleSubmit} className=" ">
                <div className="flex flex-col w-[589px] h-[153px] ">
                  <label
                    htmlFor="emailOrPhone"
                    className="text-3xl text-[#FFFCFCFC] w-[358px] h-[68px] ">
                    Email/Phone number
                  </label>
                  <input
                    type="text"
                    id="emailOrPhone"
                    placeholder="Enter Your Email/Phone number"
                    name="emailOrPhone"
                    value={form.emailOrPhone}
                    onChange={handleChange}
                    className="w-full p-5 rounded-[15px] border-2 placeholder:text-2xl  border-[var(--color-border)] bg-transparent text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
                  />
                  {errors.emailOrPhone && (
                    <p className="text-red-400 text-sm">
                      {errors.emailOrPhone}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-[589px] h-[153px]">
                  <label
                    htmlFor="password"
                    className="text-[32px] text-[#FFFCFCFC] w-[358px] h-[68px] ">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                    className="w-full p-5 rounded-[15px] border-2 border-[#948E8E] bg-transparent text-[var(--color-secondary-50)] placeholder-gray-400 placeholder:text-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={form.rememberMe}
                      onChange={handleChange}
                      className="h-[24px] w-[21px] text-[var(--color-warning)]  focus:ring-[var(--color-warning)] border-[#948E8E] rounded-[15px] bg-[#003B42]"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="ml-2 block text-xl text-[#FFF8F8FC]">
                      Remember me
                    </label>
                  </div>
                  <div className="flex justify-end mt-2">
                    <p className="text-[var(--color-secondary-50)]">
                      <Link
                        to="/forgotpassword"
                        className="text-xl text-[#FFF8F8FC] underline hover:underline">
                        Forgot Password
                      </Link>
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-2 rounded-lg font-semibold w-[589px] h-[70px] mt-2 bg-[#F9A825] text-[24px] text-black">
                  Sign in
                </button>

                {success && (
                  <div className="mb-2 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                    {success}
                  </div>
                )}
              </form>
            </div>

            <div className="flex items-center my-6 text-gray-400">
              <hr className="flex-grow border-[var(--color-border)]" />
              <span className="mx-2 text-[20px] text-[#F9A825] capitalize">
                Or continue with
              </span>
              <hr className="flex-grow border-[var(--color-border)]" />
            </div>

            <button className="w-full flex items-center justify-center ">
              <img
                src="image/gmail.png"
                className="border border-[#FFFFFF]  rounded-2xl w-20 p-2 h-13"
              />
            </button>

            <p className="text-center mt-6 text-gray-400 text-[24px]">
              Don't have an account?{" "}
              <Link
                to="/registermember"
                className="text-[var(--color-warning)]  hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
