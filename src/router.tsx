import { createBrowserRouter, Navigate } from "react-router";

import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { ProjectPage } from "./pages/ProjectPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { AppointmentBookingPage } from "./pages/AppointmentBookingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <HomePage /> },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "reports",
        element: <PlaceholderPage title="Reports" />,
      },
      {
        path: "settings",
        element: <PlaceholderPage title="Settings" />,
      },
      { path: "appointment-booking", element: <AppointmentBookingPage /> },
      { path: "projects/:projectId", element: <ProjectPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
