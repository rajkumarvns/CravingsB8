import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-(--accent) text-lg text-(--primary-text) p-3 flex justify-between">
        <div>Cravings</div>

        <div className="flex gap-4">
          <Link to={"/"} className="hover:underline hover:text-(--secondary)">
            Home
          </Link>
          <Link
            to={"/login"}
            className="hover:underline hover:text-(--secondary)"
          >
            Login
          </Link>
          <Link
            to={"/register"}
            className="hover:underline hover:text-(--secondary)"
          >
            Register
          </Link>
          <Link
            to={"/contactUs"}
            className="hover:underline hover:text-(--secondary)"
          >
            ContactUs
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
