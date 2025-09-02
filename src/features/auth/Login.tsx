import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import loginImg from '@photos/login.jpg'; 
import logoImg from '@photos/logo.png';
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-poppins overflow-y-auto" 
      style={{ backgroundColor: "var(--color-primary-300)" }}>
      <div className="text-[var(--color-secondary-50)] rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden max-w-4xl w-full">

        
        {/* Left Section */}
         <div className="hidden md:flex flex-col items-center justify-center p-6 relative">
<div className="relative w-full h-full">
  <img 
    src={loginImg} 
    alt="Login" 
    className="rounded-lg object-cover w-full h-full"
  />
  
  <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
</div>
          <div className="absolute top-10 left-8">
            <img src={logoImg} alt="Logo" className="w-20 h-20 mb-4 rounded-full object-cover"/>
             <div className="absolute top-10 left-40">
            <h1 className="text-2xl  font-bold text-[var(--color-secondary-50)] "> Save Together,</h1>
            <h1 className="text-2xl font-bold text-[var(--color-warning)] mt-2"> GrowTogether</h1>
          </div>
        </div>
        </div>

        {/* Right Section */}
        <div className="p-8 flex flex-col justify-center rounded-lg w-full">
          <h2 className="text-3xl font-normal mb-6 text-[var(--color-secondary-50)] text-center ">Join Aguka!</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="flex flex-col">
              <label htmlFor="emailOrPhone" className="mb-1 text-sm text-[var(--color-secondary-50)]">Email/Phone number</label>
              <input type="text" id="emailOrPhone" name="emailOrPhone" value={form.emailOrPhone} onChange={handleChange} placeholder=""
                className="w-full p-3 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
            </div>

           
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm text-[var(--color-secondary-50)]">Password</label>
              <input type="password" id="password" name="password" value={form.password} onChange={handleChange} placeholder=""
                className="w-full p-3 rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
            </div>

          
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" name="rememberMe" checked={form.rememberMe} onChange={handleChange}
                  className="h-4 w-4 text-[var(--color-warning)] focus:ring-[var(--color-warning)] border-[var(--color-border)] rounded"/>
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-[var(--color-secondary-50)]">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-[var(--color-warning)] hover:underline">
                Forgot Password
              </a>
            </div>

           
            <button type="submit"
              className="w-full py-3 rounded-lg font-semibold transition mt-4"
              style={{ backgroundColor: "var(--color-warning)", color: "var(--color-secondary-50)" }}>
              Sign in
            </button>
          </form>

         
          <div className="flex items-center my-6 text-gray-400">
            <hr className="flex-grow border-[var(--color-border)]" />
            <span className="mx-2 text-sm text-[var(--color-warning)]">Or continue with</span>
            <hr className="flex-grow border-[var(--color-border)]" />
          </div>

        
          <button className="w-full flex items-center justify-center gap-2  rounded-lg py-3 hover:bg-[#012B36] transition text-[var(--color-secondary-50)]">
            <FcGoogle size={24} />
            <span></span>
          </button>
          
          <p className="text-center mt-6 text-gray-400 text-sm">
            Don't have an account?{" "}
           <Link to="/registermember" className="text-[var(--color-warning)] hover:underline">Sign Up </Link>
          </p>
        </div>
      </div>
    </div>
  );
}