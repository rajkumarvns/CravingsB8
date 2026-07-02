import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from "react-icons/ai";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const { user, setUser, isLogin, setIsLogin } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("UserData");
    setUser(null);
    setIsLogin(false);
    navigate("/");
  };

  return (
    <div
      className="flex justify-between items-center px-8 py-4"
      style={{
        background: "var(--accent)",
        color: "var(--text)",
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Logo" className="h-12" />
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/contact-us" className="hover:underline">
          Contact Us
        </Link>

        {/* Theme Buttons */}

        <div className="flex items-center gap-2 border-l pl-4">
          <button
            onClick={() => setTheme("light")}
            className={`w-6 h-6 rounded-full border-2 ${
              theme === "light" ? "border-white scale-110" : "border-gray-300"
            }`}
            style={{ background: "#F97316" }}
            title="Light Theme"
          ></button>

          <button
            onClick={() => setTheme("dark")}
            className={`w-6 h-6 rounded-full border-2 ${
              theme === "dark" ? "border-white scale-110" : "border-gray-300"
            }`}
            style={{ background: "#111827" }}
            title="Dark Theme"
          ></button>

          <button
            onClick={() => setTheme("coffee")}
            className={`w-6 h-6 rounded-full border-2 ${
              theme === "coffee" ? "border-white scale-110" : "border-gray-300"
            }`}
            style={{ background: "#8B4513" }}
            title="Coffee Theme"
          ></button>
        </div>

        {isLogin ? (
          <div className="flex items-center gap-3 border-l pl-4">
            <img
              src={user?.photo}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            <Link to="/user/dashboard">{user?.fullName}</Link>

            <button
              onClick={handleLogout}
              className="text-2xl hover:text-red-500"
            >
              <AiOutlineLogout />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
