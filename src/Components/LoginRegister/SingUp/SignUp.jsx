import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    console.log(name, email, photo, password);
  };

  return (
    <div className=" w-full md:w-[40%] mx-auto p-6 mt-[120px] rounded-lg my-10 bg-white shadow-lg">
      <form required onSubmit={handleSignUp}>
        <h2 className="text-center text-2xl font-semibold mb-6">Sign Up</h2>

        {/* Name Input */}
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Type Your Name"
            type="text"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label> Your photo : </label>
          <input type="file" required name="photo" id="" />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            required
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Type Your Email"
            type="email"
            name="email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <input
            required
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

        {/* Submit Button */}
        <input
          className="w-full cursor-pointer bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300"
          type="submit"
          value="Sign Up"
        />
      </form>
      <div className=" mt-4 text-center">
        Already have an account ?{" "}
        <Link to="/login" className="text-blue-600 mb-2 underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
