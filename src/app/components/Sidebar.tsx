import { Link, useLocation } from "react-router";

interface MenuItem {
  id: string;
  label: string;
  emoji: string;
  path: string;
  category?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "monitoring",
    label: "BIS단말 모니터링",
    emoji: "🗺",
    path: "/monitoring",
    category: "원격 관리",
  },
  {
    id: "ota",
    label: "OTA 배포",
    emoji: "📦",
    path: "/ota",
    category: "원격 관리",
  },
  {
    id: "remote-control",
    label: "원격 제어",
    emoji: "🔧",
    path: "/remote-control",
    category: "원격 관리",
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-[220px] bg-[#0f172a] h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="h-[64px] flex items-center px-5 border-b border-[#1e293b]">
        <p className="text-[16px] text-white font-bold">BIMS Admin</p>
      </div>

      {/* Menu Category */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] text-[#485669] font-semibold">원격 관리</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <div className="space-y-0">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`h-[33px] flex items-center px-5 transition-colors text-[13px] ${
                  isActive
                    ? "bg-[#1e3a5f] text-[#38bef8]"
                    : "text-[#94a3b8] hover:bg-[#1e293b]"
                }`}
              >
                <span>{item.emoji}  {item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}