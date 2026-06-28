import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api.config";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [validateError, setValidateError] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (validateError) {
      setValidateError("");
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password Validation
    if (registerData.password !== registerData.confirmPassword) {
      setValidateError("Passwords do not match.");
      return;
    }

    setValidateError("");

    console.log("Register Data :", registerData);

    // Payload
    const payload = {
      fullName: registerData.fullname.trim(),
      email: registerData.email.toLowerCase(),
      phone: registerData.phone.trim(),
      gender: registerData.gender,
      dob: registerData.dob,
      password: registerData.password,
    };

    console.log("Payload :", payload);

    try {
      const res = await api.post("/auth/register", payload);

      alert(res.data.message);

      // Optional
      navigate("/login");
    } catch (error) {
      console.log(
        error?.response?.data?.message || error.message
      );

      setValidateError(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-[url('/foodTable.webp')]">
      <div className="min-h-screen bg-linear-to-br from-black/70 via-black/55 to-orange-500/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:grid-cols-2 md:px-8 md:py-12 lg:px-10">
          <div className="rounded-4xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur md:p-8 lg:p-10">
            <div className="text-center">
              <div className="mb-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                Join Cravings
              </div>

              <h2 className="text-3xl font-black text-(--accent)">
                Create Account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={registerData.fullname}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your full name"
              />

              <input
                type="email"
                id="email"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your email"
              />

              <input
                type="tel"
                id="phone"
                name="phone"
                value={registerData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your phone number"
              />

              <input
                type="text"
                id="gender"
                name="gender"
                value={registerData.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your gender"
              />

              <input
                type="date"
                id="dob"
                name="dob"
                value={registerData.dob}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <input
                type="password"
                id="password"
                name="password"
                value={registerData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Enter your password"
              />

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Confirm your password"
              />

              {/* Validation Error */}
              {validateError && (
                <p className="text-sm text-red-500">
                  {validateError}
                </p>
              )}

              <div className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300"
                />

                <label htmlFor="terms" className="ml-2">
                  I agree to the
                  <span className="ml-1 font-semibold text-orange-500 hover:underline">
                    terms and conditions.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Register
              </button>

              <div className="pt-2 text-center text-sm text-gray-600">
                <span>Already registered?</span>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="ml-1 font-semibold text-orange-500 hover:underline"
                >
                  Login here
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;