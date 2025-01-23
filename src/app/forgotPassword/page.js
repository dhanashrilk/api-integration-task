// pages/forgot-password.js
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Banner from "../leftBanner/page";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // Pre-fill email for demonstration
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  const sendResetLink = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);
    setCanResend(false);

    try {
      const response = await axios.post(
        "https://api-tm.labsquire.com/v1.0/auth/forgot-password",
        {
          email,
        }
      );

      if (response.status === 200) {
        setMessage(
          "An email to reset your password is sent to the email provided. Please check your email"
        );
        setCanResend(true); // Reset resend option since the link was sent successfully
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(
          "Login Details provided do not meet the required validation criteria."
        );
        setCanResend(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); // Clear the error after 5 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or error change
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendResetLink();
  };

  const handleResend = () => {
    sendResetLink();
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-7 left-7">
        <Image
          src={"/lab-logo.svg"}
          width={250}
          height={90}
          alt="Logo"
          className="w-[200px] mx-auto"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center h-[100%]">
        <div className="flex items-center justify-center h-full w-full my-auto">
          <Banner />
        </div>{" "}
        <div className="flex items-center justify-center h-full">
          <div className="w-full flex justify-center my-auto">
            <div className="w-[420px] shadow-2xl border p-6 rounded-xl">
              <div className="top mb-7">
                <h1 className="text-xl font-bold mb-2 text-[#343434] tracking-tight opacity-[0.9]">
                  Forgot Password
                </h1>
                <p className="leading-tight text-md font-poppins text-[#343434] opacity-[0.9] font-normal">
                  Enter your email address and we'll send you a recovery link.
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

                {error && (
                  <div className="fixed top-8 right-4 z-50 flex items-center max-w-sm p-2 mb-4 text-red-500 bg-[#fff] rounded-sm shadow-lg bg-red-100">
                    <div className="relative">
                      {" "}
                      <div className="bg-red-200 absolute top-[-30px] left-[-16px] h-[18px] w-[16px] z-50 rounded-sm">
                        <button className="ml-auto -mx-2 -my-2 bg-transparent hover:text-white text-red-500 hover:bg-red-500 inline-flex h-[25px] w-[25px]">
                          <span className="sr-only text-red-500">Close</span>
                          <svg
                            aria-hidden="true"
                            className="w-4 h-[18px]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <Image
                      src={"/red-alert.png"}
                      alt="Red Alert"
                      height={22}
                      width={22}
                      className=""
                    />
                    {/* <div className="flex items-center justify-center w-[25px] h-[25px] text-red-600 bg-white rounded-full"></div> */}

                    <div className="ml-4 text-sm font-medium">
                      <p>{error}</p>
                    </div>
                  </div>
                )}

                <button
                  className="bg-[linear-gradient(95.1deg,_#3357aa_0.6%,_#bf1b39_101.33%)] inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 mt-10 text-center bg-custom-gradient text-white w-full font-semibold text-md font-poppins"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send recovery email"}
                </button>
                {message && <p style={{ color: "green" }}>{message}</p>}
                <div className="mt-4 text-center">
                  {canResend && (
                    <div className="mt-4 text-center font-poppins">
                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={handleResend}
                      >
                        {loading
                          ? "Resending..."
                          : " Didn't receive email? Click here to resend."}
                      </button>
                    </div>
                  )}
                </div>
              </form>
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => router.push("/signin")}
              >
                <span
                  className="text-[#000] font-semibold font-poppins opacity-[0.9]"
                  style={{ fontSize: "1.2rem" }}
                >
                  <sub>Back to Login</sub>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
