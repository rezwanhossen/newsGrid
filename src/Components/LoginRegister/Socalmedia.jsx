// import React from "react";
// import { FaGoogle } from "react-icons/fa";
// import useAuth from "../../Hook/useAuth/useAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Socalmedia = () => {
//   const { googlelogin } = useAuth();
//   const naviget = useNavigate();
//   const handelglogin = async () => {
//     try {
//       await googlelogin();
//       naviget("/");
//       toast.success("google Login successful !");
//     } catch (err) {
//       toast.error(err.message);
//       console.log(err.message);
//     }
//   };
//   return (
//     <div>
//       <div className=" mt-2 mb-10">
//         <div className=" divider"> or </div>
//         <div className=" flex justify-center">
//           <button
//             onClick={handelglogin}
//             className=" w-full  text-black py-3 rounded flex justify-center items-center hover:bg-red-600 hover:text-white transition duration-300"
//           >
//             <FaGoogle /> Login with Google
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Socalmedia;
 
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hook/useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SocialMedia = () => {
  // Destructure the google login function from the custom hook
  const { googlelogin } = useAuth();
  const navigate = useNavigate();

  // Define a properly named function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Attempt Google login
      await googlelogin();
      // On success, navigate to the homepage
      navigate("/");
      // Show a success toast message
      toast.success("Google Login successful!");
    } catch (err) {
      // On error, display the error message in a toast
      toast.error(err.message);
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="mt-2 mb-10">
        <div className="divider">or</div>
        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full text-black py-3 bg-orange-400 rounded flex justify-center items-center  hover:text-white transition duration-300"
          >
            <FaGoogle className="mr-2 " /> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
