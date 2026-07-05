import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/api.config";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [validateError, setValidateError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!loginData.email || !loginData.password) {
      setValidateError("Email and Password are required.");
      return;
    }

    setValidateError("");

    const payload = {
      email: loginData.email.trim().toLowerCase(),
      password: loginData.password,
    };

    try {
      const res = await api.post("/auth/login", payload);

      toast.success(res.data.message);

      // Save User in Context
      setUser(res.data.data);
      setIsLogin(true);

      // Save User in Session Storage
      sessionStorage.setItem(
        "cravingUser",
        JSON.stringify(res.data.data)
      );

      navigate("/user/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login Failed";

      setValidateError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/foodTable.webp')]">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 p-10 items-start justify-center">
        <div className="w-full max-w-md bg-white/95 text-(--color-base-content) rounded-3xl shadow p-6 md:p-10 mt-5">

          <h1 className="text-3xl text-center font-bold text-(--color-accent)">
            Welcome Back!
          </h1>

          <p className="text-center mt-2 text-(--color-neutral)">
            Login to your craving account
          </p>

          <form onSubmit={handleSubmit} className="mt-6">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-(--color-neutral)">Email</label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border rounded p-2 text-(--color-base-content) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 mt-4">
              <label>Password</label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border rounded p-2 text-(--color-base-content) focus:outline-none focus:ring-2 focus:ring-(--color-accent)"
              />
            </div>

            {/* Remember */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>

              <span className="cursor-pointer hover:underline hover:text-(--color-accent)">
                Forgot Password?
              </span>
            </div>

            {/* Error */}
            {validateError && (
              <p className="text-red-500 mt-3">
                {validateError}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-(--color-accent) text-(--color-accent-content) py-3 rounded hover:opacity-90"
            >
              Login
            </button>

            {/* Register */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex-1 border-t"></div>

                <span className="px-3 text-gray-500">
                  Don't have an account?
                </span>

                <div className="flex-1 border-t"></div>
              </div>

              <Link to="/register">
                <p className="text-center text-(--color-accent) font-semibold text-lg mt-4 hover:underline">
                  Create an Account
                </p>
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
