import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`p-3 flex justify-between items-center text-lg transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-orange-500 text-white"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-12 w-14" />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 font-medium">
        <Link to="/" className="hover:text-yellow-300">
          Home
        </Link>

        <Link to="/login" className="hover:text-yellow-300">
          Login
        </Link>

        <Link to="/register" className="hover:text-yellow-300">
          Register
        </Link>

        <Link to="/contactUs" className="hover:text-yellow-300">
          Contact Us
        </Link>
      </div>
      <button
        onClick={handleTheme}
        className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
      >
        {darkMode ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Navbar;
