import { CircleCheck, AlertTriangle, AlertCircle, HardDrive, Activity, LayoutGrid, WifiOff } from "lucide-react";

interface StatusCardProps {
  type: "전체" | "정상" | "지연" | "위험" | "오프라인" | "재배터리" | "활성 알람";
  count: number;
  isActive?: boolean;
  isChecked?: boolean;
  onClick?: () => void;
}

export function StatusCard({ type, count, isActive, isChecked, onClick }: StatusCardProps) {
  const configs = {
    전체: {
      icon: LayoutGrid,
      iconColor: "#155dfc",
      bgColor: "bg-blue-50",
    },
    정상: {
      icon: CircleCheck,
      iconColor: "#008236",
      bgColor: "bg-green-50",
    },
    지연: {
      icon: AlertTriangle,
      iconColor: "#a65f00",
      bgColor: "bg-amber-50",
    },
    위험: {
      icon: AlertCircle,
      iconColor: "#c10007",
      bgColor: "bg-red-50",
    },
    오프라인: {
      icon: WifiOff,
      iconColor: "#364153",
      bgColor: "bg-gray-100",
    },
    재배터리: {
      icon: HardDrive,
      iconColor: "#ea580c",
      bgColor: "bg-orange-50",
    },
    "활성 알람": {
      icon: Activity,
      iconColor: "#9333ea",
      bgColor: "bg-purple-50",
    },
  };

  const config = configs[type];
  const Icon = config.icon;
  const highlighted = isActive || isChecked;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[10px] border p-5 min-w-[160px] flex items-center gap-3 transition-all ${
        highlighted ? "border-2" : "border border-[#e2e7ef]"
      } ${onClick ? "cursor-pointer hover:shadow-sm" : ""}`}
      style={{
        borderColor: highlighted ? config.iconColor : "#e2e7ef",
      }}
    >
      <div
        className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center shrink-0`}
      >
        <Icon className="w-5 h-5" style={{ stroke: config.iconColor }} />
      </div>
      <div>
        <p className="text-[12px] text-[#64748b]">{type}</p>
        <p className="text-[20px] font-bold" style={{ color: config.iconColor }}>
          {count}
        </p>
      </div>
    </div>
  );
}