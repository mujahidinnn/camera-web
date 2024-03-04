import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import { router } from "./routes";

const App = () => {
  return (
    <Suspense fallback>
      <MantineProvider>
        <Notifications />
        <RouterProvider router={router} fallbackElement />
      </MantineProvider>
    </Suspense>
  );
};

export default App;
