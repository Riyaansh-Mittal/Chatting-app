import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout/>,
      children: [
        {element: <LoginPage />, path: "login"},
        {element: <RegisterPage />, path: "register"},
        {element: <ResetPasswordPage />, path: "reset-password"},
        {element: <NewPasswordPage />, path: "new-password"}
      ]
    },
    {
      path: "/",
      // for this path, '/', DashboardLayout shows us. It won't show without this path.
      element: <DashboardLayout />,
      //all children are wrapped inside DashboardLayout
      children: [
        //here for '/', we navigate to /app by DEFAULT_PATH
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        //if user goes to '/app', then GeneralApp shows up
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        //Here, we have set up fallbacks
        // for '/404'
        { path: "404", element: <Page404 /> },
        //Navigate to /404
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings"))
);
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group"))
);
const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call"))
);
const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login"))
);
const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register"))
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
);
// to show loading... for the time the page takes to load -> Suspense and Lazy
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
