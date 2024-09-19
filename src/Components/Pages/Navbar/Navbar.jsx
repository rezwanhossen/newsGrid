import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons for the navbar
import logo from "../../../assets/Logo-r.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  //const [isOpen, setIsOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  // Function to toggle the dropdown menu
  //   const toggleMenu = () => {
  //     setIsOpen(!isOpen);
  //   };

  // Function to toggle the dashboard
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  return (
    <div className=" ">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDashboard}
              className="text-black hover:text-gray-500 focus:outline-none"
            >
              {isDashboardOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="flex-1 flex justify-center">
            <Link to="/">
              <img className=" h-14" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <input type="checkbox" className="toggle" defaultChecked />
            <Link
              to="/login"
              className="text-black border border-black px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Dashboard  */}
      <div
        className={`fixed top-0 left-0 h-full bg-white w-[250px] z-40 shadow-lg transition-transform duration-300 ease-in-out transform ${
          isDashboardOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Menu Icon */}
        <button onClick={toggleDashboard} className="text-black p-4">
          <FiX className="w-6 h-6" />
        </button>

        <ul className="p-4 space-y-4 z-40">
          <li className="flex justify-between items-center">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="flex justify-between items-center">
            <span>News</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Sport</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Business</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Innovation</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Culture</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
