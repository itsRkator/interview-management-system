import React from "react";
import { Route, RouteProps, Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

interface PrivateRouteProps extends Omit<RouteProps, "element"> {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Route path={rest.path} element={element} />
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
