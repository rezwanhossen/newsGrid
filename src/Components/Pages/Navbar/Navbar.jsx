// import React, { useState } from "react";

// import logo from "../../../assets/Logo-r.png";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="navbar fixed bg-base-100 border-2  top-0 z-10">
//       <div className="navbar-start">
//         <div>
//           <button>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//       <div className="navbar-center">
//         <img className="h-16" src={logo} alt="logo" />
//       </div>
//       <div className="navbar-end">
//         <Link to="/singup">
//           <button className="mr-4  bg-gray-800 text-white py-1 px-2 hover:bg-gray-950">
//             Register
//           </button>
//         </Link>
//         <Link to="/login">
//           <button className="font-medium text-black hover:bg-gray-950 hover:text-white py-1 px-2">
//             Sign In
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/logo-r.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hook/useAuth/useAuth";
const Navbar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  const { user, logout } = useAuth();

  return (
    <div className=" ">
      <nav className=" shadow-md p-4  bg-base-100 border-2  top-0 z-10">
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
              <img className="h-14" src={logo} alt="logo" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <input type="checkbox" className="toggle" defaultChecked />
            {user ? (
              <div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">
                    <img
                      className=" w-12 h-12 rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>{user.displayName}</a>
                    </li>

                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-black border border-black px-4 py-2 rounded hover:bg-gray-100"
              >
                Login
              </Link>
            )}
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
            <NavLink className="border border-1 w-full px-3 py-1" to="/">
              Home
            </NavLink>
          </li>
          <li className="flex justify-between items-center">
            <NavLink className="border border-1 w-full px-3 py-1">News</NavLink>
          </li>
          <li className="flex justify-between items-center">
            <NavLink className="border border-1 w-full px-3 py-1">
              Sport
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
