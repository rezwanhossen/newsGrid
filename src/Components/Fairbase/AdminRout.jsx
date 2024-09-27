import React from "react";
import useAuth from "../../Hook/useAuth/useAuth";
import useAdmin from "../../Hook/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRout = ({ children }) => {
  const { user, loding } = useAuth();
  const [isAdmin, isLoading] = useAdmin();
  const location = useLocation();
  if (loding || isLoading)
    return <span className="loading loading-bars loading-lg"></span>;
  if (user && isAdmin) return children;
  return (
    <Navigate to="/login" state={location.pathname} replace="true"></Navigate>
  );
};

export default AdminRout;
