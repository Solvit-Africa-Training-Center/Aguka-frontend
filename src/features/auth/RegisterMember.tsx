import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import registerImg from '@photos/registermember.jpg';
import { Link } from "react-router-dom";

export default function RegisterMember() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    groupId: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  return (
   <div className="min-h-screen flex items-center justify-center p-4 font-poppins overflow-y-auto" style={{ backgroundColor: "var(--color-primary-300)" }}>
  <div className="text-[var(--color-secondary-50)] rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden max-w-4xl w-full ">
     
     {/* Left Section */}
    <div className="hidden md:flex items-center justify-center p-6">
      <img src={registerImg} alt="Register" className="rounded-lg object-cover w-full h-full"/>
    </div>
   
    {/* Right Section */}
    <div className="p-8 flex flex-col justify-center border border-white  rounded-lg w-full">
      <h2 className="text-3xl font-normal mb-6 text-[var(--color-secondary-50)]">Create an account</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="mb-1 text-sm text-[var(--color-secondary-50)]">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange}
        className="w-full p-3 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 text-sm text-[var(--color-secondary-50)]">Phone</label>
          <input type="text" id="phone" name="phone" value={form.phone} onChange={handleChange}
        className="w-full p-3 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm text-[var(--color-secondary-50)]">Email</label>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange}
            className="w-full p-3 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-sm text-[var(--color-secondary-50)]">Password</label>
          <input type="password" id="password" name="password" value={form.password} onChange={handleChange}
        className="w-full p-3 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
        </div>

        {/* Group Id */}
        <div className="flex flex-col">
          <label htmlFor="groupId" className="mb-1 text-sm text-[var(--color-secondary-50)]">Group Id</label>
          <input type="text" id="groupId" name="groupId" value={form.groupId} onChange={handleChange}
            className="w-full p-3 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full py-3 rounded-lg font-semibold transition"
          style={{ backgroundColor: "var(--color-warning)", color: "var(--color-secondary-50)" }}>
          Sign up
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4 text-gray-400">
        <hr className="flex-grow border-[var(--color-border)]" />
        <span className="mx-2 text-sm text-[var(--color-warning)]">Or continue with</span>
        <hr className="flex-grow border-[var(--color-border)]" />
      </div>

      {/* Google Button */}
      <button className="w-full flex items-center justify-center gap-2 border border-[var(--color-border)] rounded-lg py-3 hover:bg-[#012B36] transition text-[var(--color-secondary-50)]">
        <FcGoogle size={24} />
      </button>

      {/* Login Link */}
      <p className="text-center mt-4 text-gray-400 text-sm">
        Already have an account?{" "}
        <Link to= "/login" className="text-[var(--color-warning)] hover:underline"> Login </Link>
      </p>
    </div>
  </div>
</div>

  );
}
