import { useState, useMemo, Fragment, useEffect } from "react";
import { Search, ChevronDown, ChevronUp, Tablet, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { StatusCard } from "../components/StatusCard";
import { DeviceDetailPanel } from "../components/DeviceDetailPanel";
import { Pagination } from "../components/Pagination";
import { AlertModal } from "../components/AlertModal";

interface Device {
  id: string;
  name: string;
  customerCode: string;
  region: string;
  status: string;
  battery: string;
  lastUpdate: string;
}

const stationNames = [
  "강남역 1번출구", "역삼역 2번출구", "서초역 3번출구", "교대역 앞", "판교역 5번출구",
  "야탑역 1번출구", "송도역 2번출구", "인천시청역 앞", "광교중앙 정류장", "동탄역 1번",
  "영통역 3번", "논현역 앞", "신논현역 앞", "삼성역 5번출구", "선릉역 1번출구",
  "잠실역 2번출구", "건대입구역 앞", "왕십리역 3번출구", "청량리역 앞", "회기역 1번출구",
  "노원역 4번출구", "수유역 앞", "미아역 2번출구", "성신여대입구역 앞", "혜화역 1번출구",
  "동대문역 앞", "종로3가역 5번출구", "시청역 1번출구", "서울역 앞", "용산역 2번출구",
  "이태원역 앞", "한남역 1번출구", "합정역 3번출구", "홍대입구역 앞", "신촌역 2번출구",
  "이대역 1번출구", "아현역 앞", "마포역 2번출구", "공덕역 3번출구", "여의도역 1번출구",
  "영등포역 앞", "신도림역 2번출구", "구로디지털단지역 앞", "가산디지털단지역 1번출구",
  "금천구청역 앞", "독산역 2번출구", "석수역 앞", "관악역 1번출구", "사당역 4번출구",
  "이수역 앞", "총신대입구역 2번출구", "동작역 앞", "흑석역 1번출구", "노량진역 앞",
  "대방역 2번출구", "신대방역 앞", "봉천역 1번출구", "신림역 3번출구", "서원역 앞",
  "범계역 1번출구", "평촌역 2번출구", "안양역 앞", "명학역 1번출구", "금정역 앞",
  "산본역 3번출구", "수리산역 앞", "대야미역 1번출구", "반월역 앞", "상록수역 2번출구",
  "한대앞역 1번출구", "중앙역 앞", "고잔역 2번출구", "초지역 앞", "안산역 1번출구",
  "신길온천역 3번출구", "정왕역 앞", "오이도역 1번출구", "월곶역 앞", "소래포구역 2번출구",
  "인천논현역 앞", "호구포역 1번출구", "남동인더스파크역 앞", "원인재역 2번출구",
  "연수역 앞", "송도역 3번출구", "부평역 1번출구", "부평구청역 앞", "부평시장역 2번출구",
  "백운역 앞", "동암역 1번출구", "간석역 앞", "주안역 3번출구", "도화역 앞",
  "제물포역 1번출구", "문학경기장역 앞", "인하대역 2번출구", "숭의역 앞", "신포역 1번출구",
  "동인천역 앞",
];
const customerCodes = ["CUS001", "CUS002", "CUS003", "CUS004", "CUS005", "CUS006", "CUS007", "CUS008"];
const regions = ["강남구", "서초구", "성남시", "연수구", "남동구", "부평구", "마포구", "영등포구", "노원구", "관악구", "안양시", "안산시", "수원시", "용인시", "고양시"];
const statuses = ["정상", "정상", "정상", "정상", "정상", "정상", "지연", "지연", "오프라인", "위험"];

function generateMockDevices(count: number): Device[] {
  const devices: Device[] = [];
  for (let i = 1; i <= count; i++) {
    const statusVal = statuses[i % statuses.length];
    const batteryBase = statusVal === "정상" ? 60 + (i % 40) : statusVal === "지연" ? 15 + (i % 30) : statusVal === "오프라인" ? (i % 10) : 5 + (i % 20);
    const hour = 8 + (i % 15);
    const minute = i % 60;
    const day = statusVal === "오프라인" ? "01" : "02";
    devices.push({
      id: `BISD${String(i).padStart(5, "0")}`,
      name: stationNames[i % stationNames.length],
      customerCode: customerCodes[i % customerCodes.length],
      region: regions[i % regions.length],
      status: statusVal,
      battery: `${batteryBase}%`,
      lastUpdate: `2025-02-${day} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    });
  }
  return devices;
}

const mockDevices = generateMockDevices(10000);

export function MonitoringPage() {
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [statusFilters, setStatusFilters] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(true);
  const [viewMode, setViewMode] = useState<"device" | "station">("device");
  const [expandedStations, setExpandedStations] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [showSessionModal, setShowSessionModal] = useState(false);

  // 세션 타임아웃 시뮬레이션 (60초)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSessionModal(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

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
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedStations(new Set());
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
    setExpandedStations(new Set());
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "정상":
        return "bg-green-100 text-green-800 px-3 py-1 rounded";
      case "지연":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded";
      case "위험":
        return "bg-red-100 text-red-800 px-3 py-1 rounded";
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

  const statusCounts = useMemo(() => ({
    전체: mockDevices.length,
    정상: mockDevices.filter((d) => d.status === "정상").length,
    지연: mockDevices.filter((d) => d.status === "지연").length,
    위험: mockDevices.filter((d) => d.status === "위험").length,
    오프라인: mockDevices.filter((d) => d.status === "오프라인").length,
    재배터리: 7,
    "활성 알람": 14,
  }), []);

  const filteredDevices = useMemo(
    () => mockDevices.filter((device) => statusFilters.has(device.status)),
    [statusFilters]
  );

  const paginatedDevices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDevices.slice(start, start + pageSize);
  }, [filteredDevices, currentPage, pageSize]);

  const stationEntries = useMemo(() => {
    const groups = filteredDevices.reduce((acc, device) => {
      if (!acc[device.name]) {
        acc[device.name] = [];
      }
      acc[device.name].push(device);
      return acc;
    }, {} as Record<string, Device[]>);
    return Object.entries(groups);
  }, [filteredDevices]);

  const paginatedStations = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return stationEntries.slice(start, start + pageSize);
  }, [stationEntries, currentPage, pageSize]);

  const getStationStatus = (devices: Device[]) => {
    if (devices.some((d) => d.status === "위험")) return "위험";
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
        {/* Page Title and View Toggle */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-[20px] text-[#0f172a] font-bold mb-2">BIS 단말 모니터링</h1>
              <p className="text-[13px] text-[#64748b]">실시간 단말 상태 및 제어</p>
            </div>
            <div className="inline-flex rounded-lg border border-[#e2e7ef] bg-white p-1">
              <button
                onClick={() => { setViewMode("device"); setCurrentPage(1); }}
                className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                  viewMode === "device"
                    ? "bg-[#f0f9ff] text-[#0384c7] border-[1.5px] border-[#0ea5e9]"
                    : "text-[#64748b]"
                }`}
                title="단말"
              >
                <Tablet className="w-4 h-4" fill="currentColor" />
              </button>
              <button
                onClick={() => { setViewMode("station"); setCurrentPage(1); }}
                className={`p-2 rounded-md transition-colors flex items-center justify-center ${
                  viewMode === "station"
                    ? "bg-[#f0f9ff] text-[#0384c7] border-[1.5px] border-[#0ea5e9]"
                    : "text-[#64748b]"
                }`}
                title="정류장"
              >
                <MapPin className="w-4 h-4" fill="currentColor" />
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
                {paginatedDevices.map((device) => (
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
            <Pagination
              currentPage={currentPage}
              totalItems={filteredDevices.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}

        {/* Table - Station View */}
        {viewMode === "station" && (
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
                <tr>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold w-12"></th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">정류장명</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">단말 수</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">고객사</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">그룹</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">상태</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">평균 배터리</th>
                  <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">마지막 통신</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e7ef]">
                {paginatedStations.map(([stationName, devices]) => {
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
                        onClick={() => toggleStationExpand(stationName)}
                        className="hover:bg-[#f8fafc] cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-[#64748b]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#64748b]" />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#94a3b8]" fill="currentColor" />
                            <span className="text-[#0f172a] text-[13px]">{stationName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#64748b] text-[13px]">{devices.length}대</td>
                        <td className="px-6 py-4 text-[#64748b] text-[13px]">{devices[0].customerCode}</td>
                        <td className="px-6 py-4 text-[#64748b] text-[13px]">{devices[0].region}</td>
                        <td className="px-6 py-4">
                          <span className={getStatusBadgeClass(stationStatus)}>{stationStatus}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={getBatteryColor(avgBattery)}>{avgBattery}</span>
                        </td>
                        <td className="px-6 py-4 text-[#64748b] text-[13px]">{latestUpdate}</td>
                      </tr>
                      {isExpanded && devices.map((device) => (
                        <tr
                          key={device.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeviceClick(device);
                          }}
                          className="bg-[#f8fafc] hover:bg-[#f1f5f9] cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-3"></td>
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-2 pl-6">
                              <Tablet className="w-4 h-4 text-[#94a3b8]" fill="currentColor" />
                              <span className="text-[#0ea5e9] text-[13px]">{device.id}</span>
                            </div>
                          </td>
                          <td className="px-6 py-3 text-[#64748b] text-[13px]"></td>
                          <td className="px-6 py-3 text-[#64748b] text-[13px]">{device.customerCode}</td>
                          <td className="px-6 py-3 text-[#64748b] text-[13px]">{device.region}</td>
                          <td className="px-6 py-3">
                            <span className={getStatusBadgeClass(device.status)}>{device.status}</span>
                          </td>
                          <td className="px-6 py-3">
                            <span className={getBatteryColor(device.battery)}>{device.battery}</span>
                          </td>
                          <td className="px-6 py-3 text-[#64748b] text-[13px]">{device.lastUpdate}</td>
                        </tr>
                      ))}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalItems={stationEntries.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <DeviceDetailPanel
        device={selectedDevice}
        isOpen={!!selectedDevice}
        onClose={handleClosePanel}
      />

      {/* Session Timeout Modal */}
      <AlertModal
        isOpen={showSessionModal}
        onClose={() => setShowSessionModal(false)}
        onConfirm={() => navigate("/login")}
        type="warning"
        title="세션 만료"
        message={"장시간 활동이 없어 세션이 만료되었습니다.\n보안을 위해 다시 로그인해 주세요."}
        confirmText="로그인 페이지로 이동"
      />
    </div>
  );
}
