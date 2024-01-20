import { ComponentType } from "react";
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from "src/services/authService";

interface ProtectedRouteProps {
  component: ComponentType<any>;
  path?: string;
}

const ProtectedRoute = ({ component: Component, ...rest }: ProtectedRouteProps) => {
  const isAuthenticated = getCurrentUser();
  console.log(getCurrentUser());
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return <Component {...rest} />;
};

export default ProtectedRoute;
