import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Socalmedia from "../Socalmedia";
import useAuth from "../../../Hook/useAuth/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await login(email, password);
      navigate(from);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3BAFDA]">
      {/* Main container */}
      <div className="w-full max-w-md mx-auto bg-[#007E7E] backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg font-semibold text-white">Email Address</label>
            <input
              type="email"
              className={`w-full bg-white border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="space-y-2 relative">
            <label htmlFor="password" className="block text-lg font-semibold text-white">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full bg-white border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] ${errors.password ? '' : 'border-gray-300'}`}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-[#007E7E] text-sm">{errors.password.message}</p>}
            <div
              className="absolute right-4 top-10 cursor-pointer text-black"
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
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-[#3BAFDA] text-white font-semibold rounded-lg hover:bg-[#47bee9] transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-black mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-white font-bold hover:underline transition duration-300">
            Register here
          </Link>
        </p>

        {/* Social Media Login */}
        <Socalmedia />
      </div>
    </div>
  );
};

export default Login;
