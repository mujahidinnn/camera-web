import ForgotPassword from "../../pages/auth/ForgotPassword";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

export const authRoutes = [
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/forgot-password/",
    element: <ForgotPassword />,
  },
];
