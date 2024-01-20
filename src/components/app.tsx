import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import SignIn from "src/pages/signIn";
import SignUp from "src/pages/signUp";
import Dashboard from "src/pages/dashboard";

import ProtectedRoute from "src/components/protectedRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/sign-in",
      element: <SignIn />
    },
    {
      path: "/sign-up",
      element: <SignUp />
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute component={Dashboard} />
    },
]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
