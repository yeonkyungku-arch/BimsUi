import { X, Battery, Wifi, Clock, Zap, Radio, RefreshCw, Power, RotateCcw, Tablet, Share2, Bell, Thermometer, Droplets, Cpu, Server } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";

interface Device {
  id: string;
  name: string;
  customerCode: string;
  region: string;
  status: string;
  battery: string;
  lastUpdate: string;
}

interface DeviceDetailPanelProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}

const COMMANDS = [
  { icon: RefreshCw, label: "상태 재조회 요청",       desc: "단말 현재 상태를 재조회합니다" },
  { icon: Wifi,      label: "통신 재연결 요청",         desc: "통신 연결을 재시도합니다" },
  { icon: RotateCcw, label: "런타임 재시작 요청",      desc: "애플리케이션 런타임을 재시작합니다" },
  { icon: Power,     label: "단말 재부팅 요청",        desc: "단말을 안전하게 재부팅합니다" },
  { icon: Tablet,    label: "디스플레이 새로고침 요청", desc: "E-paper 화면 전체를 갱신합니다" },
  { icon: Share2,    label: "구성 재동기화 요청",       desc: "정책 및 구성을 재동기화합니다" },
];

export function DeviceDetailPanel({ device, isOpen, onClose }: DeviceDetailPanelProps) {
  if (!device) return null;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "정상":    return "bg-green-100 text-green-800";
      case "주의":    return "bg-yellow-100 text-yellow-800";
      case "위험":    return "bg-red-100 text-red-800";
      case "오프라인": return "bg-gray-100 text-gray-700";
      default:        return "bg-gray-100 text-gray-700";
    }
  };

  const getBatteryColor = (battery: string) => {
    const p = parseInt(battery);
    if (p >= 60) return "text-green-600";
    if (p >= 20) return "text-yellow-600";
    return "text-red-600";
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[11px] text-[#64748b] font-semibold mb-2">{children}</p>
  );

  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex items-center justify-between px-3 py-2">
      <p className="text-[11px] text-[#94a3b8]">{label}</p>
      <span className="text-[12px] text-[#0f172a]">{value}</span>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] overflow-y-auto p-0 bg-white">
        <SheetTitle className="sr-only">BIS 단말 정보 - {device.id}</SheetTitle>
        <SheetDescription className="sr-only">
          {device.customerCode} - {device.name} 정류장의 단말 상세 정보 및 제어 패널
        </SheetDescription>

        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#e2e7ef] bg-[#f8fafc] flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Tablet className="w-4 h-4 text-[#0ea5e9]" fill="currentColor" />
                <p className="text-[15px] text-[#0f172a] font-bold">{device.id}</p>
              </div>
              <p className="text-[12px] text-[#64748b]">{device.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-[11px] rounded ${getStatusBadgeClass(device.status)}`}>
                {device.status}
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-[#e2e7ef] transition-colors"
              >
                <X className="w-4 h-4 text-[#64748b]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">

            {/* ① 단말 기본 정보 */}
            <div>
              <SectionTitle>단말 기본 정보</SectionTitle>
              <div className="bg-[#f8fafc] rounded-[10px] border border-[#e2e7ef] divide-y divide-[#e2e7ef]">
                <InfoRow label="단말 ID (BIS)"  value={device.id} />
                <InfoRow label="내부 통신 ID"   value="DEV001" />
                <InfoRow label="모델명"          value="—" />
                <InfoRow label="고객사"          value={device.customerCode} />
                <InfoRow label="권역"            value={device.region} />
                <InfoRow label="정류장"          value={device.name} />
                <InfoRow label="펌웨어 버전"     value="—" />
                <InfoRow label="설치 일자"       value="—" />
              </div>
            </div>

            {/* ② 운영 상태 */}
            <div>
              <SectionTitle>운영 상태</SectionTitle>
              <div className="grid grid-cols-2 gap-2">
                {/* 통신 상태 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">통신 상태</p>
                  <span className={`px-2 py-0.5 text-[11px] rounded ${device.status === "오프라인" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-800"}`}>
                    {device.status === "오프라인" ? "미연결" : "연결"}
                  </span>
                </div>
                {/* 배터리 잔량 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">배터리 잔량</p>
                  <div className="flex items-center gap-1.5">
                    <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} fill="currentColor" />
                    <span className={`text-[12px] font-semibold ${getBatteryColor(device.battery)}`}>
                      {device.battery}
                    </span>
                  </div>
                </div>
                {/* 충전 상태 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">충전 상태</p>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-green-600" fill="currentColor" />
                    <span className="text-[12px] text-green-600">충전 중</span>
                  </div>
                </div>
                {/* 신호 강도 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">신호 강도</p>
                  <div className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-[#64748b]" />
                    <span className="text-[11px] text-[#0f172a]">-65 dBm</span>
                  </div>
                </div>
                {/* 마지막 통신 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc] col-span-2">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">마지막 통신</p>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                    <span className="text-[11px] text-[#0f172a]">{device.lastUpdate}</span>
                  </div>
                </div>
                {/* 내부 온도 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">내부 온도</p>
                  <div className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-[12px] text-[#0f172a]">38°C</span>
                  </div>
                </div>
                {/* 내부 습도 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">내부 습도</p>
                  <div className="flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[12px] text-[#0f172a]">52%</span>
                  </div>
                </div>
                {/* RAM 사용량 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">RAM 사용량</p>
                  <div className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#64748b]" />
                    <span className="text-[12px] text-[#0f172a]">68%</span>
                  </div>
                  <div className="mt-1.5 h-1 bg-[#e2e7ef] rounded-full">
                    <div className="h-1 bg-[#0ea5e9] rounded-full" style={{ width: "68%" }} />
                  </div>
                </div>
                {/* CPU 사용량 */}
                <div className="p-3 border border-[#e2e7ef] rounded-[10px] bg-[#f8fafc]">
                  <p className="text-[11px] text-[#94a3b8] mb-1.5">CPU 사용량</p>
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#64748b]" />
                    <span className="text-[12px] text-[#0f172a]">42%</span>
                  </div>
                  <div className="mt-1.5 h-1 bg-[#e2e7ef] rounded-full">
                    <div className="h-1 bg-[#6366f1] rounded-full" style={{ width: "42%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ③ 최근 알림 */}
            <div>
              <SectionTitle>최근 알림</SectionTitle>
              <div className="bg-[#f8fafc] rounded-[10px] border border-[#e2e7ef] p-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                  <Bell className="w-3 h-3 text-green-600" />
                </div>
                <p className="text-[12px] text-[#64748b]">최근 알림이 없습니다</p>
              </div>
            </div>

            {/* ④ 명령 요청 */}
            <div>
              <SectionTitle>명령 요청</SectionTitle>
              <div className="space-y-2">
                {COMMANDS.map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between p-3 bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] hover:bg-[#f1f5f9] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#e2e7ef] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#64748b]" />
                      </div>
                      <div>
                        <p className="text-[12px] text-[#0f172a]">{label}</p>
                        <p className="text-[11px] text-[#94a3b8]">{desc}</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 text-[11px] border border-[#e2e7ef] rounded-lg bg-white hover:border-[#0ea5e9] hover:text-[#0ea5e9] transition-colors shrink-0">
                      요청
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#94a3b8] mt-2 px-1">
                명령 버튼은 즉시 실행되지 않습니다. 요청 기록이 생성되며 Command Center에서 처리됩니다.
              </p>
            </div>

            {/* ⑤ 명령 이력 */}
            <div>
              <SectionTitle>명령 이력</SectionTitle>
              <div className="bg-[#f8fafc] rounded-[10px] border border-[#e2e7ef] p-3">
                <p className="text-[12px] text-[#94a3b8]">이 세션에서 요청된 명령이 없습니다</p>
              </div>
            </div>

          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}