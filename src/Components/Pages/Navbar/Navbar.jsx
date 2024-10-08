import React, { useEffect, useState } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/logo-r.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hook/useAuth/useAuth";
import useAdmin from "../../../Hook/useAdmin";











const Navbar = () => {
  



  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isAdmin, isLoading] = useAdmin();
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  const { user, logout } = useAuth();

  // theme
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("light");
    }
  };







  const categories = ["Home" , "business" , "entertainment" , "general" , "health" , "science" , "sports" , "technology" , "politics"];



    
    
      const [active , setActive] = useState("all-news");
  
    
    const handleActive = (data) => {
        setActive(data)
    }
  

  return (
    <div>
        <div className="fixed top-0 left-0 z-20 w-full heebo">
      {/* <nav className=" shadow-md shadow-emerald-700 p-4"> */}

      <div className="bg-slate-200 ">
        <nav className=" shadow-md p-4    top-0 z-10">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDashboard}
                className="text-black  focus:outline-none"
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
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  onChange={handleToggle}
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-10 fill-current "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-10 fill-current text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

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
                      {user && isAdmin && (
                        <li>
                          <Link to="/dashbord/users">Dashboard</Link>
                        </li>
                      )}
                      {user && !isAdmin && (
                        <li>
                          <Link to="/dashbord/userHome">Dashboard</Link>
                        </li>
                      )}

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
          className={`shadow-lg z-50 bg-white max-w-[300px]  ease-in-out transform fixed top-0 left-0 h-full  w-[250px]   transition-transform duration-300  ${
            isDashboardOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close Menu Icon */}
          <button onClick={toggleDashboard} className="text-black p-4">
            <FiX className="w-6 h-6" />
          </button>

          <ul className="p-4 space-y-4  max-w-[300px] z-auto">
            <li className="flex justify-between items-center">
              <NavLink className="border border-1 w-full px-3 py-1" to="/">
                Home
              </NavLink>
            </li>

            <li className="flex justify-between items-center">
              <NavLink className="border border-1 w-full px-3 py-1">
                Sport
              </NavLink>
            </li>
            <li className="flex justify-between items-center">
              <NavLink to="/news" className="border border-1 w-full px-3 py-1">
                News
              </NavLink>
            </li>
            {user && (
              <li className="flex justify-between items-center">
                <NavLink
                  className="border border-1 w-full px-3 py-1"
                  to="/bookmark"
                >
                  My Bookmarks
                </NavLink>
              </li>
            )}
            <li className="flex justify-between items-center">
                <NavLink
                  className="border border-1 w-full px-3 py-1"
                  to="/downloads"
                >
                  Downloads
                </NavLink>
              </li>
          </ul>
        </div>
      </div>
    </div>


<div className="py-4 mt-[15px] bg-slate-200 border-t fixed top-20 z-[19] w-full  border-b border-current">
        <ul className="flex flex-wrap gap-4 items-center justify-center  font-bold  heebo">
        
            {
              categories?.map(category => {
               return (
                category === 'Home'  ? <li className={`font-bold text-[14px] text-[#232323]    uppercase hover:cursor-pointer ${active === category ? 'text-[#005689] selection: underline': ''}`} onClick={() =>  handleActive(category)}><Link to="/">Home</Link></li> : <li  className={`font-bold text-[14px] text-[#232323] ${active === category ? 'text-[#005689] underline': ''} hover:cursor-pointer`} onClick={() =>  handleActive(category)}> <Link to={`/categoriesNews/${category}`}>{category.toUpperCase()}</Link></li>
               )
              })
            }
        </ul>
      </div>
    </div>
    
  );
};

export default Navbar;
