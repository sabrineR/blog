import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface PrivateRouteProps {
  element: React.ComponentType<any>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
}) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};
