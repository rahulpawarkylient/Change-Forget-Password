import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoutes = () => {
  return localStorage.getItem("token") ? <Navigate to="/" /> : <Outlet />;
}

