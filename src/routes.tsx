import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/_layouts/app";
import { SignIn } from "./pages/auth/sign-in";
import { Auth } from "./pages/_layouts/auth";
import { Dashboard } from "./pages/app/dashboard";
import Comments from "./pages/app/comments";

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
        element: <Comments />,
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
