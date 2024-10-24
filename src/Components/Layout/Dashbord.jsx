import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import logo from "../../assets/fotlogo.png";
import useAuth from "../../Hook/useAuth/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
const Dashbord = () => {
  const [isAdmin] = useAdmin();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const asioxSecure = useAxiosSecure();
  const {
    data: payment = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await asioxSecure.get("/payment");
      return data;
    },
  });
  if (isLoading) return <Loading></Loading>;
  const handelAddNews = () => {
    const alradyDun = payment.some((pay) => pay?.email === user?.email);
    if (alradyDun) {
      console.log("Payment found. Navigating to add news.");
      navigate("/dashbord/addnews");
    } else {
      console.log("No payment found. Showing modal.");
      setShowModal(true);
    }
  };
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

        <div className="">
          <p className="bg-[#007E7E] w-full z-20 text-center text-white text-xl font-bold py-6 hidden md:block">
            My DashBoard
          </p>

          <div className="flex justify-center items-center bg-[#F5F5F5]">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>

        <ul className="menu bg-[#004E5B] text-white min-h-full w-64 p-4">
          {isAdmin ? (
            <>
              <li className=" border-white rounded-md  font-semibold mb-4 mt-8">
                <Link>
                  <img src={logo} alt="" />
                </Link>
              </li>
              <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4 mt-8">
                <NavLink
                  to="/dashbord/users"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-black" : ""
                  }
                >
                  All Users
                </NavLink>
              </li>

              <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <NavLink
                  to="/dashbord/addedNews"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-black" : ""
                  }
                >
                  Added News
                </NavLink>
              </li>
              <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <NavLink
                  to="/dashbord/pymentHistory"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-black" : ""
                  }
                >
                  Pyment Hestory
                </NavLink>
              </li>

              <p className="border border-white mt-10"></p>

              <li className="pt-2 border-t border border-white rounded-md hover:text-black hover:bg-white font-semibold mt-8">
                <Link to="/">Home</Link>
              </li>
            </>
          ) : (
            <>
              <li className="  mb-4 mt-8">
                <Link>
                  <img src={logo} alt="" />
                </Link>
              </li>
              <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <NavLink
                  to="/dashbord/userProfile"
                  className={({ isActive }) =>
                    isActive ? "bg-white text-black" : ""
                  }
                >
                  User Profile
                </NavLink>
              </li>

              {/* <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <NavLink to="/dashbord/addnews">Add News</NavLink>
              </li> */}
              {/* <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <Link onClick={() => setShowModal(true)}>Added News</Link>
              </li> */}
              <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <p onClick={handelAddNews}>Added News</p>
              </li>
              <li className="border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4">
                <NavLink to={"/dashbord/myNews"}>My News</NavLink>
              </li>

              <li className="border-t  border border-white rounded-md hover:text-black hover:bg-white font-semibold mb-4 ">
                <NavLink to="/dashbord/personalnews">Customized news</NavLink>
              </li>

              <p className="border border-white mt-10"></p>

              <li className="border-t pt-2 border border-white rounded-md hover:text-black hover:bg-white font-semibold mt-8">
                <Link to="/">Home</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      {showModal && (
        <div className="fixed inset-0 w-full flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-[40%] p-6 rounded-lg shadow-lg">
            <div className="my-2 flex justify-end">
              <button
                className=" px-4 py-2 "
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <div className="md:flex gap-2 justify-around">
              {/* Free Section */}
              <div className="p-4 border flex-1 rounded-lg text-center ">
                <h3 className="text-lg font-semibold">Use Free</h3>
                <ul>
                  <li>
                    If you are using free then you should write description
                    between 250 to 300 world
                  </li>
                </ul>

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
                <ul>
                  <li>
                    If you use Prime then you can see as many descriptions as
                    you want without any limit
                  </li>
                  <li>payment one time.</li>
                </ul>

                <button
                  className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded"
                  onClick={handlePrimeClick}
                >
                  pay 120 $
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
