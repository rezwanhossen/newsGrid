import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Link } from "react-router-dom";
import Socalmedia from "../Socalmedia";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="w-full md:w-[40%] mx-auto p-6 mt-[120px] rounded-lg my-10 bg-white shadow-lg">
      <form className="">
        <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Type Your Email"
            type="email"
            name="email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <input
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Your Password"
            type={showPassword ? "text" : "password"}
            name="password"
          />
          <div
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiFillEyeInvisible size={24} />
            ) : (
              <AiFillEye size={24} />
            )}
          </div>
        </div>

        <input
          type="submit"
          className=" w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300 mb-4"
          value="Login"
        />
      </form>
      <p className=" text-center">
        if you arn't registed ! please <span> </span>
        <Link to="/singup" className=" text-rose-600">
          register
        </Link>
      </p>

      {/* OR Divider */}
      <div className="text-center my-4 text-gray-500">OR</div>

      {/* Google Login Button */}
      {/* <button className="w-full  text-black py-3 rounded flex justify-center items-center hover:bg-red-600 hover:text-white transition duration-300">
        <AiFillGoogleCircle size={24} className="mr-2" />
        Login with Google
      </button> */}
      <Socalmedia></Socalmedia>
    </div>
  );
};

export default Login;
