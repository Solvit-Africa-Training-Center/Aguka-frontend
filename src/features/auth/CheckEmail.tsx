import { useLocation, Link, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";

export default function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "**********san@gmail.com";

  return (
    <div className="min-h-screen w-full flex pt-20 justify-center font-poppins bg-[var(--color-primary-300)] p-4">
      <div className="bg-[var(--color-primary-300)] pt-15 rounded-xl border border-[#F9A825] w-full max-w-xl h-150 p-8 space-y-8">
        <h2 className="text-5xl text-center font-bold text-[#F9A825] mb-6">
          Check Your Email
        </h2>

        <div className="place-items-center">
          <Send className="size-12 text-[#F9A825]" />
        </div>

        <p className="text-center text-2xl text-white w-full mb-6 font-bold">
          We've sent an Email on the address
        </p>

        <p className="text-center text-xl text-[#F9A825] font-semibold mb-8">
          {email}
        </p>

        <p className="text-center text-lg text-white mb-10">
          Please check your inbox (and your spam folder, just in case) for an
          email from Orion
        </p>

        <button
          type="button"
          className="w-full text-3xl text-white py-3 rounded-lg font-bold bg-[#F9A825] border-2 border-[#948E8E]"
          onClick={() => navigate("/login")}>
          Open Email
        </button>

        <div className="text-center mt-6">
          <p className="text-white text-lg">
            Remember Password?{" "}
            <Link
              to="/login"
              className="text-[#F9A825] hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
