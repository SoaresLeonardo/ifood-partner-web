import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/_layouts/app";
import { SignIn } from "./pages/auth/sign-in";
import { Auth } from "./pages/_layouts/auth";
import { Dashboard } from "./pages/app/dashboard";
import Evaluations from "./pages/app/evaluations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/comments",
        element: <Evaluations />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);
