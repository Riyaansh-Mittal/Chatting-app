import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

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
      path: "/",
      // for this path, '/', DashboardLayout shows us. It won't show without this path.
      element: <DashboardLayout />,
      //all children are wrapped inside DashboardLayout
      children: [
        //here for '/', we navigate to /app by DEFAULT_PATH
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        //if user goes to '/app', then GeneralApp shows up
        { path: "app", element: <GeneralApp /> },
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

const GeneralApp = Loadable(
  // to show loading... for the time the page takes to load -> Suspense and Lazy
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
