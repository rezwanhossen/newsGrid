import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../../Hook/useAuth/useAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, singupUser } = useAuth();

  console.log("alhamdulillah user from singup", user);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password === confirmPassword) {
      singupUser(email, password).then((res) => {
        alert("sucessfully Created User");
        console.log("Alhamdulillah Sucessfully Created User", res.user);
      });
    }
    console.log(name);
  };

  return (
    <div className="mb-5 flex justify-center items-center mt-[120px]">
      <form
        required
        onSubmit={handleSignUp}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg"
      >
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

        {/* Confirm Password Input */}
        <div className="mb-4 relative">
          <input
            required
            className="w-full border border-gray-300 py-3 px-4 rounded outline-none focus:border-red-500"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
          />
          <div
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
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
    </div>
  );
};

export default SignUp;
