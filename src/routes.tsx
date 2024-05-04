import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/_layouts/app";
import { SignIn } from "./pages/auth/sign-in";
import { Auth } from "./pages/_layouts/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
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
