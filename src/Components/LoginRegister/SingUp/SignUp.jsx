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

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // AuthContext functions
  const { createuser, updateprofile } = useContext(AuthContext);

  // Handle form submission
  const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imgFile = new FormData();
    imgFile.append("image", image[0]);

    try {
      // Uploading image to imgbb
      const { data: imgData } = await axios.post(
        "https://api.imgbb.com/1/upload?key=087bee3d0e630a5c74abd26b0f4decb1",
        imgFile,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Create user with Firebase
      const result = await createuser(email, password);
      console.log(result);

      // Update profile with name and image URL
      await updateprofile(name, imgData.data.display_url);

      // Navigate to homepage
      navigate("/");
      toast.success("Sign up Successful!");
    } catch (error) {
      // Show error toast if something fails
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3BAFDA]">
      <div className="w-full md:w-8/12 lg:w-5/12 p-10 bg-[#007E7E] backdrop-blur-md rounded-xl my-32 shadow-lg mx-auto">
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create an Account
        </h2>

        {/* Form Start */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-white font-semibold">
              Your Name
            </label>
            <input
              className={`w-full bg-white backdrop-blur-md  py-3 px-4 rounded-lg focus:outline-none border focus:border-[#3BAFDA] ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Your Name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label htmlFor="image" className="block text-white font-semibold">
              Profile Picture
            </label>
            <input
              className="w-full bg-white backdrop-blur-md py-3 px-4 rounded-lg"
              type="file"
              {...register("image", {
                required: "Profile picture is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-white font-semibold">
              Email Address
            </label>
            <input
              className={`w-full bg-white backdrop-blur-md  py-3 px-4 rounded-lg focus:outline-none border focus:border-[#3BAFDA] ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Your Email"
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="block text-white font-semibold"
            >
              Password
            </label>
            <input
              className={`w-full bg-white backdrop-blur-md  py-3 px-4 rounded-lg focus:outline-none border focus:border-[#3BAFDA] ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Your Password"
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
            />
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
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <input
              type="submit"
              className="w-full bg-[#3BAFDA] text-white py-3 rounded-lg hover:bg-[#47bee9] transition duration-300 cursor-pointer"
              value="Sign Up"
            />
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-black mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
