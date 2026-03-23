import { createBrowserRouter, Navigate } from "react-router";
import { MonitoringPage } from "./pages/MonitoringPage";
import { OTAPage } from "./pages/OTAPage";
import { RemoteControlPage } from "./pages/RemoteControlPage";
import { LoginPage } from "./pages/LoginPage";
import { Sidebar } from "./components/Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {children}
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
    element: <LoginPage />,
  },
  {
    path: "/monitoring",
    element: (
      <Layout>
        <MonitoringPage />
      </Layout>
    ),
  },
  {
    path: "/ota",
    element: (
      <Layout>
        <OTAPage />
      </Layout>
    ),
  },
  {
    path: "/remote-control",
    element: (
      <Layout>
        <RemoteControlPage />
      </Layout>
    ),
  },
]);
