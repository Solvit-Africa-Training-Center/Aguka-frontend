import { useLocation, Link, useNavigate } from "react-router-dom";

export default function CheckEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "your email";

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-primary-300)] p-4 font-poppins">
      <div className="bg-[var(--color-primary-300)] rounded-xl shadow-lg w-full max-w-md p-8 text-center">
        <h2 className="text-4xl font-bold text-[var(--color-warning)] mb-6">
          Check Your Email
        </h2>

        <div className="flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <p className="text-2xl text-[var(--color-secondary-50)] mb-2">
            We've sent an Email on the address
          </p>
          <p className="text-sm text-[var(--color-warning)] mb-10">{email}</p>
          <p className="text-sm text-[var(--color-secondary-50)] mb-4">
            Please check your inbox (and your spam folder just in case) for an
            email from Orion.
          </p>

          <button
            type="button"
            className="w-full py-3 rounded-lg font-semibold transition mt-6"
            style={{
              backgroundColor: "var(--color-warning)",
              color: "var(--color-secondary-50)",
            }}
            onClick={() => navigate("/login")}>
            Open Email
          </button>

          <p className="text-[var(--color-secondary-50)] mt-4">
            Remember Password?{" "}
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
