import { useState, Fragment } from "react";
import { Search, ChevronDown, ChevronUp, Tablet, MapPin, Map } from "lucide-react";
import { StatusCard } from "../components/StatusCard";
import { DeviceDetailPanel } from "../components/DeviceDetailPanel";

interface Device {
  id: string;
  name: string;
  customerCode: string;
  region: string;
  status: string;
  battery: string;
  lastUpdate: string;
}

const mockDevices: Device[] = [
  {
    id: "BISD001",
    name: "강남역 1번출구",
    customerCode: "CUS001",
    region: "강남구",
    status: "정상",
    battery: "85%",
    lastUpdate: "2025-02-02 10:30",
  },
  {
    id: "BISD002",
    name: "역삼역 2번출구",
    customerCode: "CUS001",
    region: "강남구",
    status: "정상",
    battery: "92%",
    lastUpdate: "2025-02-02 10:28",
  },
  {
    id: "BISD003",
    name: "서초역 3번출구",
    customerCode: "CUS001",
    region: "서초구",
    status: "지연",
    battery: "23%",
    lastUpdate: "2025-02-02 10:15",
  },
  {
    id: "BISD004",
    name: "교대역 앞",
    customerCode: "CUS001",
    region: "서초구",
    status: "오프라인",
    battery: "5%",
    lastUpdate: "2025-02-01 22:45",
  },
  {
    id: "BISD005",
    name: "판교역 5번출구",
    customerCode: "CUS002",
    region: "성남시",
    status: "정상",
    battery: "67%",
    lastUpdate: "2025-02-02 09:00",
  },
  {
    id: "BISD006",
    name: "야탑역 1번출구",
    customerCode: "CUS002",
    region: "성남시",
    status: "정상",
    battery: "78%",
    lastUpdate: "2025-02-02 10:29",
  },
  {
    id: "BISD007",
    name: "송도역 2번출구",
    customerCode: "CUS003",
    region: "연수구",
    status: "정상",
    battery: "95%",
    lastUpdate: "2025-02-02 10:25",
  },
  {
    id: "BISD008",
    name: "인천시청역 앞",
    customerCode: "CUS003",
    region: "남동구",
    status: "지연",
    battery: "31%",
    lastUpdate: "2025-02-02 10:20",
  },
  {
    id: "BISD009",
    name: "광교중앙 정류장",
    customerCode: "CUS002",
    region: "성남시",
    status: "지연",
    battery: "31%",
    lastUpdate: "2025-02-02 09:35",
  },
  {
    id: "BISD010",
    name: "동탄역 1번",
    customerCode: "CUS002",
    region: "성남시",
    status: "오프라인",
    battery: "0%",
    lastUpdate: "2025-02-01 11:00",
  },
  {
    id: "BISD011",
    name: "영통역 3번",
    customerCode: "CUS001",
    region: "서초구",
    status: "지연",
    battery: "39%",
    lastUpdate: "2025-02-02 10:40",
  },
  {
    id: "BISD013",
    name: "논현역 앞",
    customerCode: "CUS001",
    region: "강남구",
    status: "오프라인",
    battery: "2%",
    lastUpdate: "2025-02-01 18:30",
  },
  {
    id: "BISD014",
    name: "신논현역 앞",
    customerCode: "CUS001",
    region: "서초구",
    status: "지연",
    battery: "18%",
    lastUpdate: "2025-02-02 08:45",
  },
];

export function MonitoringPage() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [viewMode, setViewMode] = useState<"device" | "station" | "map">("device");
  const [expandedStations, setExpandedStations] = useState<Set<string>>(new Set());

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
  };

  const handleClosePanel = () => {
    setSelectedDevice(null);
  };

  const toggleStationExpand = (stationName: string) => {
    const newExpanded = new Set(expandedStations);
    if (newExpanded.has(stationName)) {
      newExpanded.delete(stationName);
    } else {
      newExpanded.add(stationName);
    }
    setExpandedStations(newExpanded);
  };

  const handleStatusFilterClick = (status: string) => {
    if (status === "전체") {
      setStatusFilters(new Set(["정상", "지연", "위험", "오프라인"]));
      setIsAllSelected(true);
    } else {
      const newFilters = new Set(statusFilters);
      if (newFilters.has(status)) {
        newFilters.delete(status);
      } else {
        newFilters.add(status);
      }
      if (newFilters.size === 0) {
        setStatusFilters(new Set(["정상", "지연", "위험", "오프라인"]));
        setIsAllSelected(true);
      } else {
        setStatusFilters(newFilters);
        setIsAllSelected(false);
      }
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "정상":
        return "bg-green-100 text-green-800 px-3 py-1 rounded";
      case "지연":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded";
      case "오프라인":
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded";
      default:
        return "bg-gray-100 text-gray-800 px-3 py-1 rounded";
    }
  };

  const getBatteryColor = (battery: string) => {
    const percent = parseInt(battery);
    if (percent >= 60) return "text-green-600";
    if (percent >= 20) return "text-yellow-600";
    return "text-red-600";
  };

  const statusCounts = {
    전체: mockDevices.length,
    정상: mockDevices.filter((d) => d.status === "정상").length,
    지연: mockDevices.filter((d) => d.status === "지연").length,
    위험: mockDevices.filter((d) => d.status === "위험").length,
    오프라인: mockDevices.filter((d) => d.status === "오프라인").length,
    재배터리: 7,
    "활성 알람": 14,
  };

  const filteredDevices = mockDevices.filter((device) => statusFilters.has(device.status));

  const stationGroups = filteredDevices.reduce((acc, device) => {
    if (!acc[device.name]) {
      acc[device.name] = [];
    }
    acc[device.name].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

  const getStationStatus = (devices: Device[]) => {
    if (devices.some((d) => d.status === "오프라인")) return "오프라인";
    if (devices.some((d) => d.status === "지연")) return "지연";
    return "정상";
  };

  const getStationBatteryAvg = (devices: Device[]) => {
    const avg = devices.reduce((sum, d) => sum + parseInt(d.battery), 0) / devices.length;
    return `${Math.round(avg)}%`;
  };

  return (
    <div className="flex-1 bg-[#f1f5f9] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#e2e7ef] h-[56px] flex items-center px-6">
        <p className="text-[13px] text-[#64748b]">원격 관리 › BIS 단말 모니터링</p>
      </div>

      <div className="p-6">
        {/* Page Title and Period Filter */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-[20px] text-[#0f172a] font-bold mb-2">BIS 단말 모니터링</h1>
              <p className="text-[13px] text-[#64748b]">실시간 단말 상태 및 제어</p>
            </div>
            <div className="inline-flex rounded-lg border border-[#e2e7ef] bg-white p-1">
              <button
                onClick={() => setViewMode("device")}
                className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                  viewMode === "device"
                    ? "bg-[#f0f9ff] text-[#0384c7] border-[1.5px] border-[#0ea5e9]"
                    : "text-[#64748b]"
                }`}
                title="단말"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("station")}
                className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                  viewMode === "station"
                    ? "bg-[#f0f9ff] text-[#0384c7] border-[1.5px] border-[#0ea5e9]"
                    : "text-[#64748b]"
                }`}
                title="정류장"
              >
                <MapPin className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                  viewMode === "map"
                    ? "bg-[#f0f9ff] text-[#0384c7] border-[1.5px] border-[#0ea5e9]"
                    : "text-[#64748b]"
                }`}
                title="지도"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Cards Container */}
        <div className="bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] p-4 mb-4">
          <p className="text-[11px] text-[#485669] font-semibold mb-2.5">운영 상태</p>
          <div className="flex gap-2.5">
            <StatusCard 
              type="전체" 
              count={statusCounts.전체} 
              isActive={isAllSelected} 
              onClick={() => handleStatusFilterClick("전체")}
            />
            <StatusCard 
              type="오프라인" 
              count={statusCounts.오프라인} 
              isChecked={statusFilters.has("오프라인")}
              onClick={() => handleStatusFilterClick("오프라인")}
            />
            <StatusCard 
              type="위험" 
              count={statusCounts.위험} 
              isChecked={statusFilters.has("위험")}
              onClick={() => handleStatusFilterClick("위험")}
            />
            <StatusCard 
              type="지연" 
              count={statusCounts.지연} 
              isChecked={statusFilters.has("지연")}
              onClick={() => handleStatusFilterClick("지연")}
            />
            <StatusCard 
              type="정상" 
              count={statusCounts.정상} 
              isChecked={statusFilters.has("정상")}
              onClick={() => handleStatusFilterClick("정상")}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-4 mb-4">
          <div className="flex items-center gap-3">
            <button className="bg-white border-[1.5px] border-[#e2e7ef] rounded-lg px-3 py-2 h-9 flex items-center gap-1 text-[13px] hover:border-[#0ea5e9]">
              <span>전체 고객사</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-white border-[1.5px] border-[#e2e7ef] rounded-lg px-3 py-2 h-9 flex items-center gap-1 text-[13px] hover:border-[#0ea5e9]">
              <span>전체 지역</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-white border-[1.5px] border-[#e2e7ef] rounded-lg px-3 py-2 h-9 flex items-center gap-1 text-[13px] hover:border-[#0ea5e9]">
              <span>전체 그룹</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-white border-[1.5px] border-[#e2e7ef] rounded-lg px-3 py-2 h-9 flex items-center gap-1 text-[13px] hover:border-[#0ea5e9]">
              <span>전체 상태</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-white border-[1.5px] border-[#e2e7ef] rounded-lg px-3 py-2 h-9 flex items-center gap-1 text-[13px] hover:border-[#0ea5e9]">
              <span>SOC 상태</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#99a1af]" />
                <input
                  placeholder="BIS 단말 ID 또는 정류장 검색..."
                  className="w-full h-9 bg-[#f3f3f5] border-0 rounded-lg pl-10 pr-3 text-[13px] placeholder:text-[#717182]"
                />
              </div>
            </div>
            <button className="bg-white border-[1.5px] border-[#e2e7ef] rounded-lg px-4 py-2 h-9 text-[13px] hover:border-[#0ea5e9]">
              초기화
            </button>
          </div>
        </div>

        {/* Table - Device View */}
        {viewMode === "device" && (
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">BIS 단말 ID</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">정류장명</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">고객사</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">그룹</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">상태</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">배터리 %</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">마지막 통신</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">장애</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e7ef]">
                {filteredDevices.map((device) => (
                  <tr
                    key={device.id}
                    onClick={() => handleDeviceClick(device)}
                    className="hover:bg-[#f8fafc] cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-[#0ea5e9] text-[13px]">{device.id}</span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] text-[13px]">{device.name}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{device.customerCode}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{device.region}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadgeClass(device.status)}>{device.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getBatteryColor(device.battery)}>{device.battery}</span>
                    </td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{device.lastUpdate}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table - Station View */}
        {viewMode === "station" && (
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-700 w-12"></th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">정류장명</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">단말 수</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">고객사</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">그룹</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">상태</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">평균 배터리</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-700">마지막 통신</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {Object.entries(stationGroups).map(([stationName, devices]) => {
                  const isExpanded = expandedStations.has(stationName);
                  const stationStatus = getStationStatus(devices);
                  const avgBattery = getStationBatteryAvg(devices);
                  const latestUpdate = devices.reduce((latest, d) => 
                    d.lastUpdate > latest ? d.lastUpdate : latest, 
                    devices[0].lastUpdate
                  );

                  return (
                    <Fragment key={stationName}>
                      <tr
                        key={stationName}
                        onClick={() => toggleStationExpand(stationName)}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{stationName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{devices.length}대</td>
                        <td className="px-6 py-4 text-gray-700">{devices[0].customerCode}</td>
                        <td className="px-6 py-4 text-gray-700">{devices[0].region}</td>
                        <td className="px-6 py-4">
                          <span className={getStatusBadgeClass(stationStatus)}>{stationStatus}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getBatteryColor(avgBattery)}>{avgBattery}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{latestUpdate}</td>
                      </tr>
                      {isExpanded && devices.map((device) => (
                        <tr
                          key={device.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeviceClick(device);
                          }}
                          className="bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-3"></td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2 pl-6">
                              <Tablet className="w-4 h-4 text-gray-400" />
                              <span className="text-blue-600">{device.id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-gray-600"></td>
                          <td className="px-6 py-3 text-gray-600">{device.customerCode}</td>
                          <td className="px-6 py-3 text-gray-600">{device.region}</td>
                          <td className="px-6 py-3">
                            <span className={getStatusBadgeClass(device.status)}>{device.status}</span>
                          </td>
                          <td className="px-6 py-3">
                            <span className={getBatteryColor(device.battery)}>{device.battery}</span>
                          </td>
                          <td className="px-6 py-3 text-gray-600">{device.lastUpdate}</td>
                        </tr>
                      ))}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Map View */}
        {viewMode === "map" && (
          <MapView devices={filteredDevices} onDeviceClick={handleDeviceClick} />
        )}
      </div>

      {/* Detail Panel */}
      <DeviceDetailPanel
        device={selectedDevice}
        isOpen={!!selectedDevice}
        onClose={handleClosePanel}
      />
    </div>
  );
}

// ── 지도 뷰 ────────────────────────────────────────────────────────────
const REGION_DATA = [
  { region: "강남구", x: 3, y: 2 },
  { region: "서초구", x: 2, y: 3 },
  { region: "성남시", x: 4, y: 3 },
  { region: "연수구", x: 0, y: 2 },
  { region: "남동구", x: 0, y: 3 },
];

function MapView({
  devices,
  onDeviceClick,
}: {
  devices: Device[];
  onDeviceClick: (d: Device) => void;
}) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const byRegion = devices.reduce((acc, d) => {
    if (!acc[d.region]) acc[d.region] = [];
    acc[d.region].push(d);
    return acc;
  }, {} as Record<string, Device[]>);

  const regionStatus = (devices: Device[]) => {
    if (devices.some((d) => d.status === "오프라인")) return "오프라인";
    if (devices.some((d) => d.status === "위험")) return "위험";
    if (devices.some((d) => d.status === "지연")) return "지연";
    return "정상";
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "정상": return "bg-green-100 border-green-300 text-green-700";
      case "지연": return "bg-yellow-100 border-yellow-300 text-yellow-700";
      case "위험": return "bg-red-100 border-red-300 text-red-700";
      default:    return "bg-gray-100 border-gray-300 text-gray-600";
    }
  };

  const dotColor = (s: string) => {
    switch (s) {
      case "정상": return "bg-green-500";
      case "지연": return "bg-yellow-500";
      case "위험": return "bg-red-500";
      default:    return "bg-gray-400";
    }
  };

  return (
    <div className="flex gap-4">
      {/* Map */}
      <div className="flex-1 bg-white rounded-[10px] border border-[#e2e7ef] p-6 min-h-[440px] relative overflow-hidden">
        {/* 배경 격자 */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <p className="text-[11px] text-[#64748b] font-semibold mb-4 relative">지역별 단말 현황</p>

        {/* 지역 핀들 */}
        <div className="relative grid grid-cols-6 gap-4 h-[360px] content-center">
          {REGION_DATA.map(({ region, x, y }) => {
            const regionDevices = byRegion[region] ?? [];
            if (regionDevices.length === 0) return null;
            const st = regionStatus(regionDevices);
            const isActive = activeRegion === region;
            return (
              <button
                key={region}
                onClick={() => setActiveRegion(isActive ? null : region)}
                style={{ gridColumn: x + 1, gridRow: y + 1 }}
                className={`border-2 rounded-[10px] p-3 text-left transition-all hover:scale-105 ${statusColor(st)} ${
                  isActive ? "ring-2 ring-[#0ea5e9] ring-offset-1" : ""
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor(st)}`} />
                  <span className="text-[12px] font-semibold">{region}</span>
                </div>
                <span className="text-[11px]">{regionDevices.length}대</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 지역 상세 패널 */}
      {activeRegion && byRegion[activeRegion] && (
        <div className="w-[320px] bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden flex-shrink-0">
          <div className="px-5 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#0ea5e9]" />
              <span className="text-[14px] font-semibold text-[#0f172a]">{activeRegion}</span>
            </div>
            <button
              onClick={() => setActiveRegion(null)}
              className="text-[#94a3b8] hover:text-[#64748b] text-[18px] leading-none"
            >
              ×
            </button>
          </div>
          <div className="divide-y divide-[#e2e7ef]">
            {byRegion[activeRegion].map((device) => (
              <button
                key={device.id}
                onClick={() => onDeviceClick(device)}
                className="w-full px-5 py-3 text-left hover:bg-[#f8fafc] transition-colors"
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[13px] text-[#0ea5e9] font-medium">{device.id}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded ${
                      device.status === "정상"
                        ? "bg-green-100 text-green-700"
                        : device.status === "지연"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {device.status}
                  </span>
                </div>
                <p className="text-[12px] text-[#64748b]">{device.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}