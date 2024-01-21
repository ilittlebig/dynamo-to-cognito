import { ReactNode } from "react";
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from "src/services/authService";

interface ProtectedRouteProps {
  component: ReactNode;
}

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const isAuthenticated = getCurrentUser();
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return <>{component}</>
};

export default ProtectedRoute;
