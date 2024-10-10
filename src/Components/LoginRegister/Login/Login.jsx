// import { useState } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { useForm } from "react-hook-form";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Socalmedia from "../Socalmedia";
// import useAuth from "../../../Hook/useAuth/useAuth";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { login } = useAuth();

//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location?.state?.from?.pathname || "/";

//   const onSubmit = async (data) => {
//     const { email, password } = data;
//     try {
//       await login(email, password);
//       navigate(from);
//       toast.success("Login successful!");
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#3BAFDA]">
//       {/* Main container */}

//       <div className="w-full max-w-md mx-auto bg-[#007E7E] backdrop-blur-lg rounded-lg shadow-lg p-8">
//         <h2 className="text-3xl font-extrabold text-white text-center mb-8">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//           {/* Email Input */}
//           <div className="space-y-2">
//             <label htmlFor="email" className="block text-lg font-semibold text-white">Email Address</label>
//             <input
//               type="email"
//               className={`w-full bg-white border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//               placeholder="Enter your email"
//               {...register("email", { required: "Email is required" })}
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Password Input */}
//           <div className="space-y-2 relative">
//             <label htmlFor="password" className="block text-lg font-semibold text-white">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className={`w-full bg-white border py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAFDA] ${errors.password ? '' : 'border-gray-300'}`}
//               placeholder="Enter your password"
//               {...register("password", { required: "Password is required" })}
//             />
//             {errors.password && <p className="text-[#007E7E] text-sm">{errors.password.message}</p>}
//             <div
//               className="absolute right-4 top-10 cursor-pointer text-black"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? (
//                 <AiFillEyeInvisible size={24} />
//               ) : (
//                 <AiFillEye size={24} />
//               )}

// //       <div className="w-10/12 md:w-8/12 lg:w-5/12 mx-auto bg-white/20 backdrop-blur-md rounded-lg p-10 shadow-lg">
// //         {/* Glassmorphism Form */}
// //         <div className="w-full p-8 bg-white/20 backdrop-blur-md rounded-lg">
// //           <h2 className="text-3xl font-bold text-white text-center mb-6">
// //             Login
// //           </h2>
// //           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
// //             {/* Email Input with Label */}
// //             <div className="space-y-2">
// //               <label htmlFor="email" className="block text-white font-semibold">
// //                 Email Address
// //               </label>
// //               <input
// //                 className={`w-full bg-white/30 backdrop-blur-md border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-red-500 ${
// //                   errors.email ? "border-red-500" : ""
// //                 }`}
// //                 placeholder="Type Your Email"
// //                 type="email"
// //                 {...register("email", { required: "Email is required" })}
// //               />
// //               {errors.email && (
// //                 <p className="text-red-500">{errors.email.message}</p>
// //               )}
// //             </div>

// //             {/* Password Input with Label */}
// //             <div className="space-y-2 relative">
// //               <label
// //                 htmlFor="password"
// //                 className="block text-white font-semibold"
// //               >
// //                 Password
// //               </label>
// //               <input
// //                 className={`w-full bg-white/30 backdrop-blur-md border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-red-500 ${
// //                   errors.password ? "border-red-500" : ""
// //                 }`}
// //                 placeholder="Your Password"
// //                 {...register("password", { required: "Password is required" })}
// //                 type={showPassword ? "text" : "password"}
// //               />
// //               {errors.password && (
// //                 <p className="text-red-500">{errors.password.message}</p>
// //               )}
// //               <div
// //                 className="absolute right-4 top-10 cursor-pointer text-gray-300"
// //                 onClick={togglePasswordVisibility}
// //               >
// //                 {showPassword ? (
// //                   <AiFillEyeInvisible size={24} />
// //                 ) : (
// //                   <AiFillEye size={24} />
// //                 )}
// //               </div>

//             </div>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-[#3BAFDA] text-white font-semibold rounded-lg hover:bg-[#47bee9] transition duration-300"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         <p className="text-center text-black mt-6">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-white font-bold hover:underline transition duration-300">
//             Register here
//           </Link>
//         </p>

//         {/* Social Media Login */}
//         <Socalmedia />
//       </div>
//     </div>
//   );
// };

// export default Login;
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r  from-blue-900 via-blue-800 to-blue-700">
      {/* Main container */}
      <div className="w-10/12 md:w-8/12 lg:w-5/12 mx-auto bg-white/20 backdrop-blur-md rounded-lg p-10 shadow-lg">
        {/* Glassmorphism Form */}
        <div className="w-full p-8 bg-white/20 backdrop-blur-md rounded-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input with Label */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white font-semibold">
                Email Address
              </label>
              <input
                className={`w-full bg-white/30 backdrop-blur-md border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-red-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Type Your Email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input with Label */}
            <div className="space-y-2 relative">
              <label
                htmlFor="password"
                className="block text-white font-semibold"
              >
                Password
              </label>
              <input
                className={`w-full bg-white/30 backdrop-blur-md border border-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:border-red-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Your Password"
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div
                className="absolute right-4 top-10 cursor-pointer text-gray-300"
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
            <div className="mt-4">
              <input
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
                value="Login"
              />
            </div>
          </form>

          <p className="text-center text-white mt-4">
            Don’t have an account?{" "}
            <Link to="/singup" className="text-gray-600 underline">
              Register here
            </Link>
          </p>

          {/* Social Media Login */}
          <Socalmedia />
        </div>
      </div>
    </div>
  );
};

export default Login;
