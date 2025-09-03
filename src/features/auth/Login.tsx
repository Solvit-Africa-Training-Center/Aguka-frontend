import { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import loginImg from '@photos/login.jpg';
import logoImg from '@photos/logo.png';
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false
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
    if (!form.emailOrPhone.trim()) newErrors.emailOrPhone = "Email or phone is required";
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
    <div className="min-h-screen flex items-center justify-center p-4 font-poppins overflow-y-auto"
         style={{ backgroundColor: "var(--color-primary-300)" }}>
      <div className="text-[var(--color-secondary-50)] rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden max-w-4xl w-full">

        {/* Left Section */}
        <div className="hidden md:flex flex-col items-center justify-center p-6 relative">
          <div className="relative w-full h-full">
            <img src={loginImg} alt="Login" className="rounded-lg object-cover w-full h-full"/>
            <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
          </div>
          <div className="absolute justify center ">
            <img src={logoImg} alt="Logo" className="w-20 h-20 mb-4 rounded-full object-cover"/>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[var(--color-secondary-50)]">Save Together,</h1>
              <h1 className="text-2xl font-bold text-[var(--color-warning)] mt-2">Grow Together</h1>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center rounded-lg w-full">
          <h2 className="text-3xl font-normal mb-6 text-[var(--color-secondary-50)] text-center">Join Aguka!</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div className="flex flex-col">
              <label htmlFor="emailOrPhone" className="mb-1 text-sm text-[var(--color-secondary-50)]">Email/Phone</label>
              <input type="text" id="emailOrPhone" name="emailOrPhone" value={form.emailOrPhone} onChange={handleChange}
                     className="w-full p-3 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.emailOrPhone && <p className="text-red-400 text-sm">{errors.emailOrPhone}</p>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm text-[var(--color-secondary-50)]">Password</label>
              <input type="password" id="password" name="password" value={form.password} onChange={handleChange}
                     className="w-full p-3 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" name="rememberMe" checked={form.rememberMe} onChange={handleChange}
                       className="h-4 w-4 text-[var(--color-warning)] focus:ring-[var(--color-warning)] border-[var(--color-border)] rounded"/>
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-[var(--color-secondary-50)]">Remember me</label>
              </div>
             <div className="flex justify-end mt-2">
        <p className="text-[var(--color-secondary-50)]">
  <Link to="/forgotpassword" className="text-sm text-[var(--color-warning)] hover:underline">
    Forgot Password
  </Link>
</p>
      </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg font-semibold transition mt-4"
                    style={{ backgroundColor: "var(--color-warning)", color: "var(--color-secondary-50)" }}>
              Sign in
            </button>

            {success && (
              <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-400">
                {success}
              </div>
            )}
          </form>

          <div className="flex items-center my-6 text-gray-400">
            <hr className="flex-grow border-[var(--color-border)]" />
            <span className="mx-2 text-sm text-[var(--color-warning)]">Or continue with</span>
            <hr className="flex-grow border-[var(--color-border)]" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 rounded-lg py-3 hover:bg-[#012B36] transition text-[var(--color-secondary-50)]">
            <BiLogoGmail size={24} />
          </button>

          <p className="text-center mt-6 text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/registermember" className="text-[var(--color-warning)] hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
