import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Fairbase/AuthProvider";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createuser, updateprofile } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imgFile = new FormData();
    imgFile.append("image", image[0]);

    try {
      const { data: imgData } = await axios.post(
        "https://api.imgbb.com/1/upload?key=087bee3d0e630a5c74abd26b0f4decb1",
        imgFile,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const result = await createuser(email, password);
      console.log(result);

      await updateprofile(name, imgData.data.display_url);

      navigate("/");
      toast.success("Sign up Successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-12 md:pt-12 lg:pt-0 p-4">
      {/* Main container */}
      <div className="w-full max-w-4xl flex flex-col-reverse lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Right side - Welcome message */}
        <div className="w-full lg:w-1/2 bg-gray-600 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-center">
            Welcome to <span className="font-bold">News Grid!</span>
          </h2>
          <p className="text-lg text-center">
            Join us to stay updated with the latest news and trending stories
            from around the world.
          </p>
        </div>

        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                className={`w-full bg-gray-100 border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full bg-gray-100 border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label htmlFor="image" className="block text-lg font-semibold text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                className="w-full bg-gray-100 py-3 px-4 rounded-lg"
                {...register("image", { required: "Profile picture is required" })}
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            {/* Password Input */}
            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-lg font-semibold text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full bg-gray-100 border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              <div
                className="absolute right-4 top-10 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline transition duration-300">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
