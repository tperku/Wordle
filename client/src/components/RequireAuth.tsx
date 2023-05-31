import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: any) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles?.includes(auth.role) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequireAuth };
