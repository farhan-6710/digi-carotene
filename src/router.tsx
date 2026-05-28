import { createBrowserRouter, Navigate } from "react-router";

import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { ProjectPage } from "./pages/ProjectPage";
import { PostsManagementPage } from "./pages/PostsManagementPage";
import { PostsManagementPage2 } from "./pages/PostsManagementPage2";
import { TasksManagementPage } from "./pages/TasksManagementPage";
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
      { path: "posts-management", element: <PostsManagementPage /> },
      { path: "tasks-management", element: <TasksManagementPage /> },
      { path: "appointment-booking", element: <AppointmentBookingPage /> },
      { path: "posts-management-2", element: <PostsManagementPage2 /> },
      { path: "projects/:projectId", element: <ProjectPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
