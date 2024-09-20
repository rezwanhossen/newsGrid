import React from "react";
import { FaGoogle } from "react-icons/fa";

const Socalmedia = () => {
  return (
    <div>
      <div className=" mt-2 mb-10">
        <div className=" divider"> or </div>
        <div className=" flex justify-center">
          <button className=" w-full  text-black py-3 rounded flex justify-center items-center hover:bg-red-600 hover:text-white transition duration-300">
            <FaGoogle /> Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Socalmedia;
