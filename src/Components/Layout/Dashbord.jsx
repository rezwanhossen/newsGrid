import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";

const Dashbord = () => {
  const [isAdmin] = useAdmin();
  
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white lg:hidden">
          <h1 className="text-lg font-bold">My Dashbord</h1>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button"
          >
            <AiOutlineMenu size={24} />
          </label>
        </div>

        <div className=" p-6">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashbord/users">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/addedNews">Added News</NavLink>
              </li>
              


              <li>
                <a href="/">All News</a>
              </li>

              <li className="pt-2 border-t">
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashbord/userHome">User Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashbord/userProfile">User Profile</NavLink>
              </li>
              <li>
                <a href="bookmark">My Bookmarks</a>
              </li>
              <li>
                <a href="addnews">Add News</a>
              </li>
              <li>
                <a href="myNews">My News</a>
              </li>
              <li>
                <a href="/settings">rating</a>
              </li>


              
              <li className="border-t pt-2"><NavLink to="/">Home</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashbord;
