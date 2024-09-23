import React from "react";
import useAuth from "../../Hook/useAuth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();
  const location = useLocation();
  if (loding) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (user) {
    return children;
  }

  return (
    <Navigate to="/login" state={location.pathname} replace="true"></Navigate>
  );
};

export default PrivateRoute;
