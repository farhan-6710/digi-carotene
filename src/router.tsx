import { createBrowserRouter, Navigate } from "react-router";

import { PublicLayout } from "./layouts/PublicLayout";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { AnalyticsPage } from "./pages/admin/AnalyticsPage";
import { AppointmentBookingPage } from "./pages/admin/AppointmentBookingPage";
import { PlaceholderPage } from "./pages/admin/PlaceholderPage";
import { AboutPage } from "./pages/public/AboutPage";
import { HomePage } from "./pages/public/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
  {
    path: "/admin",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "reports", element: <PlaceholderPage title="Reports" /> },
      { path: "settings", element: <PlaceholderPage title="Settings" /> },
      { path: "appointments-management", element: <AppointmentBookingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
