import { Navigate, createBrowserRouter } from "react-router-dom";

import AppLayout from "../layouts";
import Login from "@pages2/auth/Login";
import Register from "@pages2/auth/Register";
import Dashboard from "@pages2/Dashboard";
import CodesList from "@pages2/work-out/codes/List";
import WorkOutList from "@pages2/work-out/List";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-in" />,
  },
  {
    path: "/sign-up",
    element: <Register />,
  },
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/dashboard/",
    element: (
      <AppLayout>
        <Dashboard />
      </AppLayout>
    ),
  },
  {
    path: "/codes/",
    element: (
      <AppLayout>
        <CodesList />
      </AppLayout>
    ),
  },
  {
    path: "/codes/work-out/:id/",
    element: (
      <AppLayout>
        <WorkOutList />
      </AppLayout>
    ),
  },
]);
