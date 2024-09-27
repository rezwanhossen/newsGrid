import React from "react";
import { Link } from "react-router-dom";
import error from "../../../assets/404.gif";
const Erroe = () => {
  return (
    <div className=" w-full md:w-2/4 mx-auto">
      <img src={error} alt="" />
      <div className=" flex justify-center mt-4">
        <Link to="/" className=" btn  btn-outline btn-primary">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default Erroe;
