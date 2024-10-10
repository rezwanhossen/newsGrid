import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";

const Dashbord = () => {
  const [isAdmin] = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleFreeClick = () => {
    navigate("/dashbord/addnews");
    setShowModal(false);
  };
  const handlePrimeClick = () => {
    navigate("/dashbord/payment");
    setShowModal(false);
  };

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
              {/* <li>
                <NavLink to="/dashbord/addnews">Add News</NavLink>
              </li> */}
              <li>
                <Link onClick={() => setShowModal(true)}>Added News</Link>
              </li>
              <li>
                <a href="myNews">My News</a>
              </li>
              <li>
                <a href="/settings">rating</a>
              </li>

              <li className="border-t pt-2">
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-[40%] p-6 rounded-lg shadow-lg">
            <div className="my-2 flex justify-end">
              <button
                className=" px-4 py-2  "
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <div className="md:flex gap-2  justify-around">
              {/* Free Section */}
              <div className="p-4 border flex-1 rounded-lg text-center">
                <h3 className="text-lg font-semibold">Use Free</h3>

                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleFreeClick}
                >
                  Free
                </button>
              </div>

              {/* Prime Section */}
              <div className="p-4 border flex-1 rounded-lg text-center">
                <h3 className="text-lg font-semibold">Use Prime</h3>
                <button
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
                  onClick={handlePrimeClick}
                >
                  Prime
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashbord;
