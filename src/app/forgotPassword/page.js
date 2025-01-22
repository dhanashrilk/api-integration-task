// pages/forgot-password.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Banner from "../leftBanner/page";

export default function ForgotPassword() {
  const [email, setEmail] = useState("sundar@labsquire.com"); // Pre-fill email for demonstration
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  const sendResetLink = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api-tm.labsquire.com/v1.0/auth/forgot-password",
        {
          email,
        }
      );

      if (response.status === 200) {
        setMessage("Password reset link has been sent to your email.");
        setCanResend(false); // Reset resend option since the link was sent successfully
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
      setCanResend(true); // Enable resend option
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetLink();
  };

  const handleResend = () => {
    sendResetLink();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full my-auto">
      <div className="flex items-center justify-center h-full my-10">
        <Banner />
      </div>{" "}
      <div className="flex items-center justify-center h-full">
        <div className="right-part m-auto">
          <div className="login-card w-[420px] shadow-2xl border p-6 rounded-xl">
            <div className="top mb-7">
              <h1 className="text-xl font-semibold mb-2">Forgot Password</h1>
              <p className="leading-tight text-md">
                Enter your email address and we’ll send you a recovery link.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail absolute left-3 mt-[1px] top-1/2 transform -translate-y-1/2 text-slate-800 w-4"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <input
                    className="w-full border-input px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#E7E7E7] appearance-none block py-1 h-12 pl-9 focus:outline-none focus:border-gray-500 focus-visible:ring-0 focus-visible:shadow-none placeholder:text-sm placeholder:text-slate-600 border rounded-md text-md"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className="bg-[linear-gradient(95.1deg,_#3357aa_0.6%,_#bf1b39_101.33%)] inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 mt-10 text-center bg-custom-gradient text-white w-full font-semibold text-md"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send recovery email"}
              </button>
              {message && <p style={{ color: "green" }}>{message}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="mt-4 text-center">
                {canResend && (
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {loading
                      ? "Resending..."
                      : " Didn't receive email? Click here to resend."}
                  </button>
                )}
              </div>
            </form>
            <div
              className="flex justify-end cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              <span
                className="text-slate-700 font-semibold"
                style={{ fontSize: "1.2rem" }}
              >
                <sub>Back to Login?</sub>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
    //   <h1>Forgot Password</h1>
    //   <form>
    //     <div>
    //       <label htmlFor="email">Email Address</label>
    //       <input
    //         id="email"
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //         style={{ width: "100%", padding: "8px", margin: "8px 0" }}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       disabled={loading}
    //       style={{ padding: "10px", width: "100%" }}
    //       onClick={handleSubmit}
    //     >
    //       {loading ? "Sending..." : "Send Reset Link"}
    //     </button>

    //     {message && (
    //       <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
    //     )}
    //     {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    //   </form>
    //   <button
    //     type="submit"
    //     style={{ padding: "10px", width: "100%", marginTop: "10px" }}
    //     onClick={() => router.push("/signin")}
    //   >
    //     Back to Login
    //   </button>
    // </div>
  );
}
