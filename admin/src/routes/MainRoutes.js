import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AuthGuard from "utils/route-guard/AuthGuard";

//Admin Profile and Password
const ChangePassword = Loadable(lazy(() => import("views/application/account-profile/changeAdminPassword.js")));
const UpdateProfile = Loadable(lazy(() => import("views/application/account-profile/updateProfile.js")));
const Records = Loadable(lazy(() => import("views/forms/Records/index")));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/update-profile",
      element: <UpdateProfile />,
    },
    {
      path: "/records",
      element: <Records />,
    },
  ],
};

export default MainRoutes;
