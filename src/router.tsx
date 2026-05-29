import { createBrowserRouter, Navigate } from "react-router";

import { PublicLayout } from "./layouts/PublicLayout";
import { RootLayout } from "./layouts/RootLayout";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { AnalyticsPage } from "./pages/admin/AnalyticsPage";
import { AppointmentBookingPage } from "./pages/admin/AppointmentBookingPage";
import { ProfilePage } from "./pages/admin/ProfilePage";
import { ReportsPage } from "./pages/admin/ReportsPage";
import { SettingsPage } from "./pages/admin/SettingsPage";
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
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "appointments-management", element: <AppointmentBookingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
