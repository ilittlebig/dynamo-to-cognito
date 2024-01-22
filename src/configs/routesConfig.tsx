import { ReactNode } from "react";

import SignIn from "src/pages/signIn";
import SignUp from "src/pages/signUp";
import ConfirmAccount from "src/pages/confirmAccount";
import ConfirmedAccount from "src/pages/confirmedAccount";
import Dashboard from "src/pages/dashboard";

interface RouteConfigItem {
  path: string;
  element: ReactNode;
  formType?: string;
  protected?: boolean;
}

export const routesConfig: RouteConfigItem[] = [
  {
    path: "/sign-in",
    formType: "signIn",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    formType: "signUp",
    element: <SignUp />
  },
  {
    path: "/confirm-account",
    formType: "confirmAccount",
    element: <ConfirmAccount />
  },
  {
    path: "/confirmed-account",
    element: <ConfirmedAccount />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true
  },
];
