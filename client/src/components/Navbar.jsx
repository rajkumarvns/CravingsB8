import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const { user, setUser, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("UserData");
    setIsLogin(false);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="bg-(--accent) text-lg text-(--primary-text) p-3 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          <Link to="/contact-us" className="hover:underline">
            Contact Us
          </Link>

          {isLogin ? (
            <div className="border-l-2 pl-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full overflow-hidden">
                <img
                  src={user?.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <Link
                to="/user/dashboard"
                className="hover:underline hover:text-(--error)"
              >
                {user?.fullName}
              </Link>

              <button
                onClick={handleLogout}
                className="text-light-500 hover:text-red-600 text-2xl"
                title="Logout"
              >
                <AiOutlineLogout />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className="hover:underline hover:underline-offset-4"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:underline hover:text-(--light-gray)"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
