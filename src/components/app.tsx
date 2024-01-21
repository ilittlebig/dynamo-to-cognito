import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { routesConfig } from "src/configs/routesConfig";

import ProtectedRoute from "src/components/protectedRoute";
import FormLayout from "src/layouts/formLayout";

const App = () => {
  const router = createBrowserRouter(
    routesConfig.map((route) => {
      const element = route.protected ? (
        <ProtectedRoute component={route.element} />
      ) : (
	route.formType && (
	  <FormLayout formType={route.formType}>
	    {route.element}
	  </FormLayout>
	)
      )

      return {
	path: route.path,
	element: element
      }
    })
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
