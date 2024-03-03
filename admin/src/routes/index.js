import { lazy } from "react";
import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./LoginRoutes";
import Loadable from "ui-component/Loadable";

// import MinimalLayout from 'layout/MinimalLayout';
const FirstLoadLogin = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    { path: "/", element: <FirstLoadLogin /> },
    LoginRoutes,
    MainRoutes,
  ]);
}
