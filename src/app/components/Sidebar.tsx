import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Monitor, Package, Settings, PanelLeftClose, PanelLeft } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: "monitoring",
    label: "BIS 단말 모니터링",
    icon: <Monitor className="w-[18px] h-[18px] shrink-0" />,
    path: "/monitoring",
  },
  {
    id: "ota",
    label: "OTA 배포",
    icon: <Package className="w-[18px] h-[18px] shrink-0" />,
    path: "/ota",
  },
  {
    id: "remote-control",
    label: "원격 제어",
    icon: <Settings className="w-[18px] h-[18px] shrink-0" />,
    path: "/remote-control",
  },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-[#0f172a] h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-[60px]" : "w-[220px]"
      }`}
    >
      {/* Logo/Header */}
      <div className="h-[56px] flex items-center justify-between px-4 border-b border-[#1e293b]">
        {!collapsed && (
          <p className="text-[15px] text-white font-bold whitespace-nowrap">BIMS Admin</p>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`text-[#94a3b8] hover:text-white transition-colors p-1 rounded hover:bg-[#1e293b] ${
            collapsed ? "mx-auto" : ""
          }`}
        >
          {collapsed ? (
            <PanelLeft className="w-[18px] h-[18px]" />
          ) : (
            <PanelLeftClose className="w-[18px] h-[18px]" />
          )}
        </button>
      </div>

      {/* Menu Category */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-[11px] text-[#485669] font-semibold">원격 관리</p>
        </div>
      )}
      {collapsed && <div className="pt-3" />}

      {/* Menu Items */}
      <nav className="flex-1">
        <div className="space-y-0.5 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div key={item.id} className="relative group">
                <Link
                  to={item.path}
                  className={`h-[36px] flex items-center rounded-md transition-colors text-[13px] ${
                    collapsed ? "justify-center px-0" : "px-3 gap-2.5"
                  } ${
                    isActive
                      ? "bg-[#1e3a5f] text-[#38bef8]"
                      : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#cbd5e1]"
                  }`}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                  )}
                </Link>
                {collapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-[#1e293b] text-white text-[12px] rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}