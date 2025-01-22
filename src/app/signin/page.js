// pages/signin.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


import Banner from "../leftBanner/page";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://api-tm.labsquire.com/v1.0/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Stores token data
        localStorage.setItem("token", response.data.token); // Assuming the API returns a token
        router.push("/dashboard"); // Redirect to the dashboard or another page
      }
    } catch (err) {
      
      if (err.response && err.response.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full mt-10">
      <div className="flex items-center justify-center h-full my-10">
        <Banner />
      </div>{" "}
      <div className="flex items-center justify-center h-full">
        <div className="right-part m-auto">
          <div className="login-card w-[420px] shadow-2xl border p-6 rounded-xl">
            <div className="top mb-7">
              <h1 className="text-xl font-semibold mb-2">Login</h1>
              <p className="leading-tight text-md">
                Your account awaits. Enter your details to get started!
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
              <div>
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
                    className="lucide lucide-lock-keyhole absolute left-3 mt-[1px] top-1/2 transform -translate-y-1/2 text-slate-800 w-4"
                  >
                    <circle cx="12" cy="16" r="1"></circle>
                    <rect x="3" y="10" width="18" height="12" rx="2"></rect>
                    <path d="M7 10V7a5 5 0 0 1 10 0v3"></path>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border-input px-3 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#E7E7E7] appearance-none block py-1 h-12 pl-9 focus:outline-none focus:border-gray-500 focus-visible:ring-0 focus-visible:shadow-none placeholder:text-sm placeholder:text-slate-600 border rounded-md text-md"
                    id="password"
                    placeholder="Password"
                    style={{ fontFamily: "inherit", paddingRight: "2.5rem" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-800"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
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
                        className="lucide lucide-eye"
                      >
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    ) : (
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
                        className="lucide lucide-eye-off"
                      >
                        <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path>
                        <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path>
                        <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path>
                        <path d="m2 2 20 20"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div
                className="flex justify-end cursor-pointer"
                onClick={() => router.push("/forgotPassword")}
              >
                <span
                  className="text-slate-700 font-medium"
                  style={{ fontSize: "1.2rem" }}
                >
                  <sub>Forgot Password?</sub>
                </span>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                className="bg-[linear-gradient(95.1deg,_#3357aa_0.6%,_#bf1b39_101.33%)] inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 mt-10 text-center bg-custom-gradient text-white w-full font-semibold text-md"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
        {/* <div className="login-form relative z-10 max-w-[300px] py-[3em] px-[2em] mx-0 my-auto bg-custom-gradient border-[3px] border-transparent rounded-[10%] backdrop-blur-[18.5px] shadow-[0px_12px_37px_rgba(0,0,0,0.19)]">
          
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Sign In</button>
            <button type="" onClick={() => router.push("/forgotPassword")}>
              Forgot Password?
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
}
