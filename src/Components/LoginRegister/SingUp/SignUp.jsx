import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Fairbase/AuthProvider";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const { register, handleSubmit } = useForm();

  const { creatuser, updatprofil } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const { name, image, email, password } = data;

    try {
      const result = await creatuser(email, password);
      const loguser = result.user;
      console.log(loguser);

      if (image && image[0]) {
        const imgFile = new FormData();
        imgFile.append("image", image[0]);

        const imgResponse = await axios.post(
          "https://api.imgbb.com/1/upload?key=3b6cd99e0e4ff78e7f4d30e6eeca326f",
          imgFile,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = imgResponse.data.data.display_url;

        await updatprofil(name, imageUrl);
      } else {
        await updatprofil(name, null);
      }

      toast.success("Sign up Successful!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full md:w-[40%] mx-auto p-6  rounded-lg my-10 bg-white shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center text-2xl font-semibold mb-6">Sign Up</h2>

        {/* Name Input */}
        <div className="mb-4">
          <input
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Type Your Name"
            type="text"
            {...register("name")}
            name="name"
          />
        </div>

        {/* Photo Input */}
        <div className="mb-4">
          <label> Your photo: </label>
          <input type="file" {...register("image")} name="photo" />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <input
            required
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Type Your Email"
            type="email"
            {...register("email")}
            name="email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <input
            required
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Your Password"
            {...register("password")}
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
      <div className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 mb-2 underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
