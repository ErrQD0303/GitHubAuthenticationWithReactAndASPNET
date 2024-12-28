import { createBrowserRouter } from "react-router-dom";
import { AppLayout, Error, Home, LogOut, Repos } from "../LazyComponents";
import appLoader from "../appLoader";
import homeAction from "../pages/homeAction";
import reposLoader from "../pages/reposLoader";

export const routes = [
  {
    element: <AppLayout />,
    errorElement: <Error />,
    loader: appLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <Error />,
        action: homeAction,
      },
      {
        path: "/logout",
        element: <LogOut />,
        errorElement: <Error />,
      },
      {
        path: "/repos",
        element: <Repos />,
        errorElement: <Error />,
        loader: reposLoader,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
