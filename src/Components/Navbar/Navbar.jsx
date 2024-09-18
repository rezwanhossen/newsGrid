import React from "react";
import logo from "../../assets/Logo-r.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border-2 sticky top-0 z-10">
      <div className="navbar-start">
        <div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="navbar-center">
        <img className="h-16" src={logo} alt="logo" />
      </div>
      <div className="navbar-end">
        <Link to="/register">
          <button className="mr-4  bg-gray-800 text-white py-1 px-2 hover:bg-gray-950">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="font-medium text-black hover:bg-gray-950 hover:text-white py-1 px-2">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
