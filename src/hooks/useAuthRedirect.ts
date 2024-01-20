import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "src/services/authService";

const useAuthRedirect = (navigateTo: string) => {
  const navigate = useNavigate();

  const redirectAuthenticatedUser = async () => {
    const loggedIn = isAuthenticated();
    if (!loggedIn) return;
    navigate(navigateTo);
  }

  useEffect(() => {
    redirectAuthenticatedUser();
  }, [navigate]);
}

export default useAuthRedirect;
