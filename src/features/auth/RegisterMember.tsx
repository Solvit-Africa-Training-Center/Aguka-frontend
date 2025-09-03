import { useState } from "react";
import registerImg from '@photos/registermember.jpg';
import logoImg from '@photos/logo.png';
import { Link, useNavigate  } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";


export default function RegisterMember() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    groupId: ""
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
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number (10-15 digits)";
    }

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

    if (!form.groupId.trim()) newErrors.groupId = "Group Id is required";

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
      phone: "",
      email: "",
      password: "",
      groupId: ""
    });
        navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-poppins overflow-y-auto"
      style={{ backgroundColor: "var(--color-primary-300)" }}>
    
      <div className="text-[var(--color-secondary-50)] rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden max-w-4xl w-full">

        {/* Left Section */}
        <div className="hidden md:flex items-center justify-center p-6 relative">
          <div className=" relative w-full h-full">
          <img src={registerImg} alt="Register" className="rounded-lg object-cover w-full h-full"/>
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
          <h2 className="text-3xl font-normal mb-6 text-[var(--color-secondary-50)]">Create an account</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="fullName" className="mb-1 text-sm text-[var(--color-secondary-50)]">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
            </div>

            {/* Phone */}
            {/* <div className="flex flex-col">
              <label htmlFor="phone" className="mb-1 text-sm text-[var(--color-secondary-50)]">Phone</label>
              <input type="text" id="phone" name="phone" value={form.phone} onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
            </div> */}

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-sm text-[var(--color-secondary-50)]">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-sm text-[var(--color-secondary-50)]">Password</label>
              <input type="password" id="password" name="password" value={form.password} onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>

            {/* Group Id */}
            {/* <div className="flex flex-col">
              <label htmlFor="groupId" className="mb-1 text-sm text-[var(--color-secondary-50)]">Group Id</label>
              <input type="text" id="groupId" name="groupId" value={form.groupId} onChange={handleChange}
                className="w-full p-2 rounded-md border border-[var(--color-border)] text-[var(--color-secondary-50)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-warning)]"/>
              {errors.groupId && <p className="text-red-400 text-sm">{errors.groupId}</p>}
            </div> */}

            {/* Submit */}
            <button type="submit"
              className="w-full py-3 rounded-lg font-semibold transition mt-4"
              style={{ backgroundColor: "var(--color-warning)", color: "var(--color-secondary-50)" }}>
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
            <span className="mx-2 text-sm text-[var(--color-warning)]">Or continue with</span>
            <hr className="flex-grow border-[var(--color-border)]" />
          </div>

            <button
      className="w-full flex items-center justify-center gap-2 rounded-lg py-3 hover:bg-[#012B36] transition text-[var(--color-secondary-50)]"
    >
      <BiLogoGmail size={24} />
      {/* <span>Continue with Gmail</span> */}
    </button>

          <p className="text-center mt-2 text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[var(--color-warning)] hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
