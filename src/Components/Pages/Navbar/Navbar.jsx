import React from "react";
import logo from "../../../assets/Logo-r.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar px-3 lg:px-10 shadow-md shadow-emerald-500 fixed bg-base-100 border-2  top-0 z-20">
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
      <Link to="/" className="navbar-center">
        <img className="h-16" src={logo} alt="logo" />
      </Link>
      <div className="navbar-end">
        
        <Link to="/login">
          <button className="font-medium  bg-gray-800 text-white py-1 px-2 hover:bg-gray-950">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
