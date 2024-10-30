import React from "react";
import useAuth from "../../Hook/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  console.log("location" , location)
  
  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={{from : location?.pathname}} replace="true"></Navigate>
  );
};

export default PrivateRoute;
