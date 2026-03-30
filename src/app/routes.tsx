import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { MonitoringPage } from "./pages/MonitoringPage";
import { DashboardPage } from "./pages/DashboardPage";
import { OTAPage } from "./pages/OTAPage";
import { RemoteControlPage } from "./pages/RemoteControlPage";
import { Sidebar } from "./components/Sidebar";
import { LoginPage } from "./pages/LoginPage";

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    Component: Layout,
    children: [
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
      {
        path: "/monitoring",
        Component: MonitoringPage,
      },
      {
        path: "/ota",
        Component: OTAPage,
      },
      {
        path: "/remote-control",
        Component: RemoteControlPage,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
