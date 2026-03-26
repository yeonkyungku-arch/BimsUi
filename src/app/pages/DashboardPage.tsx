import { useState, useMemo, useEffect, useRef } from "react";
import { MapPin, Building2, ChevronDown, ChevronUp, Tablet, ChevronLeft, AlertTriangle, Battery, Wifi, Clock, Zap, Radio, RefreshCw, Power, RotateCcw, Share2, Bell, Thermometer, Droplets, Cpu, Server } from "lucide-react";
import { DeviceDetailPanel } from "../components/DeviceDetailPanel";
import { StatusCard } from "../components/StatusCard";

interface Device {
  id: string;
  name: string;
  status: "정상" | "주의" | "위험" | "오프라인";
  battery: string;
  lastUpdate: string;
  otaStatus: string;
}

interface Station {
  id: string;
  code: string;
  name: string;
  customerId: string;
  sharedWith: string[];
  devices: Device[];
  latitude: number;
  longitude: number;
}

interface Customer {
  id: string;
  name: string;
}

// Mock 데이터
const mockCustomers: Customer[] = [
  { id: "C001", name: "서울시 교통국" },
  { id: "C002", name: "경기도 버스운송사업조합" },
  { id: "C003", name: "인천광역시청" },
  { id: "C004", name: "성남시청" },
  { id: "C005", name: "수원시 교통정보센터" },
];

const stationNames = [
  "강남역 1번출구", "역삼역 2번출구", "서초역 3번출구", "교대역 앞", "판교역 5번출구",
  "야탑역 1번출구", "송도역 2번출구", "인천시청역 앞", "광교중앙 정류장", "동탄역 1번",
  "영통역 3번", "논현역 앞", "신논현역 앞", "삼성역 5번출구", "선릉역 1번출구",
  "잠실역 2번출구", "건대입구역 앞", "왕십리역 3번출구", "청량리역 앞", "회기역 1번출구",
];

const statuses: Array<"정상" | "주의" | "위험" | "오프라인"> = ["정상", "정상", "정상", "정상", "주의", "위험", "오프라인"];

function generateMockStations(): Station[] {
  const stations: Station[] = [];
  for (let i = 0; i < 50; i++) {
    const customerId = mockCustomers[i % mockCustomers.length].id;
    const sharedWith = i % 7 === 0 ? [mockCustomers[(i + 1) % mockCustomers.length].id] : [];
    const deviceCount = 2 + (i % 3);
    const devices: Device[] = [];
    
    for (let j = 0; j < deviceCount; j++) {
      const deviceStatus = statuses[(i + j) % statuses.length];
      const battery = deviceStatus === "정상" ? 70 + (j * 10) : deviceStatus === "주의" ? 25 + (j * 5) : deviceStatus === "오프라인" ? 5 : 10 + (j * 5);
      devices.push({
        id: `BISD${String(i * 10 + j).padStart(5, "0")}`,
        name: `단말 ${j + 1}`,
        status: deviceStatus,
        battery: `${battery}%`,
        lastUpdate: `2025-02-02 ${String(8 + (i % 12)).padStart(2, "0")}:${String(j * 15).padStart(2, "0")}`,
        otaStatus: i % 3 === 0 ? "업데이트 필요" : "최신",
      });
    }

    stations.push({
      id: `ST${String(i + 1).padStart(4, "0")}`,
      code: `ST${String(i + 1).padStart(4, "0")}`,
      name: stationNames[i % stationNames.length],
      customerId,
      sharedWith,
      devices,
      latitude: 37.5 + (i * 0.01),
      longitude: 127.0 + (i * 0.01),
    });
  }
  return stations;
}

const mockStations = generateMockStations();

type FilterType = "전체" | "정상" | "주의" | "위험" | "오프라인";

export function DashboardPage() {
  const [viewMode, setViewMode] = useState<"customer" | "station">("customer");
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("전체");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [expandedCustomers, setExpandedCustomers] = useState<Set<string>>(new Set());
  const [isListCollapsed, setIsListCollapsed] = useState(false);
  const [previousCustomerId, setPreviousCustomerId] = useState<string | null>(null);

  const selectedStationRef = useRef<HTMLDivElement | null>(null);
  const stationListRef = useRef<HTMLDivElement | null>(null);

  const kpiData = useMemo(() => {
    const getWorstStatus = (s: Station) => {
      if (s.devices.some(d => d.status === "오프라인")) return "오프라인";
      if (s.devices.some(d => d.status === "위험")) return "위험";
      if (s.devices.some(d => d.status === "주의")) return "주의";
      return "정상";
    };
    return {
      전체: mockStations.length,
      오프라인: mockStations.filter(s => getWorstStatus(s) === "오프라인").length,
      위험: mockStations.filter(s => getWorstStatus(s) === "위험").length,
      주의: mockStations.filter(s => getWorstStatus(s) === "주의").length,
      정상: mockStations.filter(s => getWorstStatus(s) === "정상").length,
    };
  }, []);

  const filteredStations = useMemo(() => {
    const statusOrder: Record<string, number> = { "오프라인": 0, "위험": 1, "주의": 2, "정상": 3 };
    const getWorstStatus = (s: Station) => {
      if (s.devices.some(d => d.status === "오프라인")) return "오프라인";
      if (s.devices.some(d => d.status === "위험")) return "위험";
      if (s.devices.some(d => d.status === "주의")) return "주의";
      return "정상";
    };
    const filtered = selectedFilter === "전체"
      ? [...mockStations]
      : mockStations.filter(s => getWorstStatus(s) === selectedFilter);
    return filtered.sort((a, b) => statusOrder[getWorstStatus(a)] - statusOrder[getWorstStatus(b)]);
  }, [selectedFilter]);

  const customerGroups = useMemo(() => {
    const statusOrder: Record<string, number> = { "오프라인": 0, "위험": 1, "주의": 2, "정상": 3 };
    const getWorstStatus = (s: Station) => {
      if (s.devices.some(d => d.status === "오프라인")) return "오프라인";
      if (s.devices.some(d => d.status === "위험")) return "위험";
      if (s.devices.some(d => d.status === "주의")) return "주의";
      return "정상";
    };
    const groups: Record<string, Station[]> = {};
    filteredStations.forEach(station => {
      if (!groups[station.customerId]) {
        groups[station.customerId] = [];
      }
      groups[station.customerId].push(station);
    });
    // 각 고객사 내 정류장: 위험 순 정렬
    Object.keys(groups).forEach(customerId => {
      groups[customerId].sort((a, b) => statusOrder[getWorstStatus(a)] - statusOrder[getWorstStatus(b)]);
    });
    return groups;
  }, [filteredStations]);

  // 고객사 목록: 이슈(비정상) 정류장 수 많은 순 → 가장 심각한 상태 순 정렬
  const sortedCustomerIds = useMemo(() => {
    const statusOrder: Record<string, number> = { "오프라인": 0, "위험": 1, "주의": 2, "정상": 3 };
    const getWorstStatus = (s: Station) => {
      if (s.devices.some(d => d.status === "오프라인")) return "오프라인";
      if (s.devices.some(d => d.status === "위험")) return "위험";
      if (s.devices.some(d => d.status === "주의")) return "주의";
      return "정상";
    };
    return Object.keys(customerGroups).sort((a, b) => {
      const stationsA = customerGroups[a];
      const stationsB = customerGroups[b];
      // 1순위: 이슈(비정상) 정류장 수 내림차순
      const issueA = stationsA.filter(s => getWorstStatus(s) !== "정상").length;
      const issueB = stationsB.filter(s => getWorstStatus(s) !== "정상").length;
      if (issueB !== issueA) return issueB - issueA;
      // 2순위: 고객사 내 가장 심각한 상태
      const worstA = stationsA.reduce((acc, s) => Math.min(acc, statusOrder[getWorstStatus(s)]), 99);
      const worstB = stationsB.reduce((acc, s) => Math.min(acc, statusOrder[getWorstStatus(s)]), 99);
      return worstA - worstB;
    });
  }, [customerGroups]);

  const toggleCustomerExpand = (customerId: string) => {
    const newExpanded = new Set(expandedCustomers);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedCustomers(newExpanded);
  };

  const handleCustomerClick = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setSelectedStationId(null);
  };

  const handleStationClick = (stationId: string) => {
    setPreviousCustomerId(selectedCustomerId); // 이전 고객사 저장
    setSelectedStationId(stationId);
    setSelectedCustomerId(null);
    setIsListCollapsed(true);
  };

  const handleDeviceClick = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
  };

  const handleBack = () => {
    if (previousCustomerId) {
      // 고객사 상세로 돌아가기
      setSelectedCustomerId(previousCustomerId);
      setSelectedStationId(null);
      setPreviousCustomerId(null);
      setIsListCollapsed(false);
    } else {
      // 정류장 뷰에서 왔을 경우 단순 선택 해제
      setSelectedStationId(null);
      setIsListCollapsed(false);
    }
  };

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId);
  const selectedStation = mockStations.find(s => s.id === selectedStationId);
  const selectedDevice = selectedStation?.devices.find(d => d.id === selectedDeviceId);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "정상":
        return "bg-green-100 text-green-800";
      case "주의":
        return "bg-yellow-100 text-yellow-800";
      case "위험":
        return "bg-red-100 text-red-800";
      case "오프라인":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBatteryColor = (battery: string) => {
    const percent = parseInt(battery);
    if (percent >= 60) return "text-green-600";
    if (percent >= 20) return "text-yellow-600";
    return "text-red-600";
  };

  // 이슈 아이콘 색상
  const getIssueIconColor = (status: string) => {
    if (status === "위험") return "text-red-500";
    if (status === "주의") return "text-amber-500";
    if (status === "오프라인") return "text-gray-400";
    return null;
  };

  function getStationStatus(station: Station): "정상" | "주의" | "위험" | "오프라인" {
    // 가장 심각한 상태를 반환
    if (station.devices.some(d => d.status === "오프라인")) return "오프라인";
    if (station.devices.some(d => d.status === "위험")) return "위험";
    if (station.devices.some(d => d.status === "주의")) return "주의";
    return "정상";
  }

  // 정류장 뷰로 전환 후 선택된 항목으로 자동 스크롤
  useEffect(() => {
    if (viewMode === "station" && selectedStationId && !isListCollapsed) {
      // 렌더링 완료 후 스크롤
      const timer = setTimeout(() => {
        selectedStationRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [viewMode, isListCollapsed, selectedStationId]);

  return (
    <div className="flex-1 bg-[#f1f5f9] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#e2e7ef] h-[56px] flex items-center px-6">
        <p className="text-[13px] text-[#64748b]">대시보드 › 운영 현황</p>
      </div>

      <div className="p-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-[20px] text-[#0f172a] font-bold mb-2">운영 현황 대시보드</h1>
          <p className="text-[13px] text-[#64748b]">정류장 및 단말 운영 상태 모니터링</p>
        </div>

        {/* KPI Cards */}
        <div className="flex gap-4 mb-6">
          <StatusCard type="전체"    count={kpiData.전체}    isActive={selectedFilter === "전체"}    onClick={() => setSelectedFilter("전체")} />
          <StatusCard type="오프라인" count={kpiData.오프라인} isChecked={selectedFilter === "오프라인"} onClick={() => setSelectedFilter("오프라인")} />
          <StatusCard type="위험"    count={kpiData.위험}    isChecked={selectedFilter === "위험"}    onClick={() => setSelectedFilter("위험")} />
          <StatusCard type="주의"    count={kpiData.주의}    isChecked={selectedFilter === "주의"}    onClick={() => setSelectedFilter("주의")} />
          <StatusCard type="정상"    count={kpiData.정상}    isChecked={selectedFilter === "정상"}    onClick={() => setSelectedFilter("정상")} />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Map */}
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] h-[calc(100vh-280px)] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#cbd5e1] mx-auto mb-3" />
              <p className="text-[13px] text-[#64748b]">지도 영역 (개발 예정)</p>
              <p className="text-[11px] text-[#94a3b8] mt-1">정류장 위치 및 상태 시각화</p>
            </div>
          </div>

          {/* Right: List + Detail Panel */}
          <div className="space-y-6">
            {/* View Toggle + List */}
            <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
              {/* View Toggle */}
              <div className="border-b border-[#e2e7ef] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <p className="text-[13px] text-[#64748b] font-semibold">탐색 목록</p>
                  <div className="inline-flex rounded-lg border border-[#e2e7ef] bg-[#f8fafc] p-1">
                    <button
                      onClick={() => setViewMode("customer")}
                      className={`px-3 py-1.5 rounded-md text-[12px] transition-colors ${
                        viewMode === "customer" ? "bg-white text-[#0ea5e9] shadow-sm" : "text-[#64748b]"
                      }`}
                    >
                      고객사 뷰
                    </button>
                    <button
                      onClick={() => {
                        setViewMode("station");
                        setIsListCollapsed(false);
                      }}
                      className={`px-3 py-1.5 rounded-md text-[12px] transition-colors ${
                        viewMode === "station" ? "bg-white text-[#0ea5e9] shadow-sm" : "text-[#64748b]"
                      }`}
                    >
                      정류장 뷰
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setIsListCollapsed(!isListCollapsed)}
                  className="p-1.5 rounded-md hover:bg-[#f8fafc] transition-colors"
                  title={isListCollapsed ? "목록 펼치기" : "목록 접기"}
                >
                  {isListCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-[#64748b]" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-[#64748b]" />
                  )}
                </button>
              </div>

              {/* Customer View */}
              {viewMode === "customer" && !isListCollapsed && (
                <div className="max-h-[400px] overflow-y-auto">
                  {sortedCustomerIds.map(customerId => {
                    const customer = mockCustomers.find(c => c.id === customerId);
                    if (!customer) return null;
                    const isExpanded = expandedCustomers.has(customerId);
                    const issueCount = customerGroups[customerId]?.filter(s => getStationStatus(s) !== "정상").length || 0;

                    return (
                      <div key={customerId} className="border-b border-[#e2e7ef] last:border-0">
                        <div
                          onClick={() => {
                            handleCustomerClick(customerId);
                            setIsListCollapsed(true);
                          }}
                          className={`p-4 cursor-pointer hover:bg-[#f8fafc] transition-colors ${
                            selectedCustomerId === customerId ? "bg-[#f0f9ff]" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* 드롭 버튼: 클릭 시 정류장 목록 토글만 담당 */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCustomerExpand(customerId);
                                  handleCustomerClick(customerId);
                                }}
                                className="p-0.5 rounded hover:bg-[#e2e7ef] transition-colors shrink-0"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-[#64748b]" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-[#64748b]" />
                                )}
                              </button>
                              <Building2 className="w-4 h-4 text-[#94a3b8]" />
                              <div>
                                <p className="text-[13px] text-[#0f172a] font-semibold">{customer.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-[11px] text-[#64748b]">정류장 {customerGroups[customerId]?.length || 0}개</p>
                                {issueCount > 0 && (
                                  <p className="text-[11px] text-red-600">이슈 {issueCount}개</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="bg-[#f8fafc]">
                            {customerGroups[customerId]?.map(station => {
                              const stationStatus = getStationStatus(station);
                              const offlineCount = station.devices.filter(d => d.status === "오프라인").length;
                              const dangerCount  = station.devices.filter(d => d.status === "위험").length;
                              const warningCount = station.devices.filter(d => d.status === "주의").length;
                              const normalCount  = station.devices.filter(d => d.status === "정상").length;
                              return (
                                <div
                                  key={station.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStationClick(station.id);
                                  }}
                                  className={`px-4 py-3 pl-12 border-t border-[#e2e7ef] cursor-pointer hover:bg-[#f1f5f9] transition-colors ${
                                    selectedStationId === station.id ? "bg-[#e0f2fe]" : ""
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <MapPin className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
                                      <p className="text-[12px] text-[#0f172a] truncate">
                                        {station.name}<span className="text-[#94a3b8] ml-1">({station.code})</span>
                                      </p>
                                      {stationStatus !== "정상" && (
                                        <AlertTriangle className={`w-3 h-3 shrink-0 ${getIssueIconColor(stationStatus)}`} />
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {offlineCount > 0 && (
                                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 text-gray-700">
                                          오프라인 {offlineCount}대
                                        </span>
                                      )}
                                      {dangerCount > 0 && (
                                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-red-100 text-red-700">
                                          위험 {dangerCount}대
                                        </span>
                                      )}
                                      {warningCount > 0 && (
                                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-yellow-100 text-yellow-700">
                                          주의 {warningCount}대
                                        </span>
                                      )}
                                      {normalCount > 0 && (
                                        <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-700">
                                          정상 {normalCount}대
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Station View */}
              {viewMode === "station" && !isListCollapsed && (
                <div className="max-h-[400px] overflow-y-auto" ref={stationListRef}>
                  {filteredStations.map(station => {
                    const customer = mockCustomers.find(c => c.id === station.customerId);
                    const stationStatus = getStationStatus(station);
                    const isSelected = selectedStationId === station.id;
                    const offlineCount = station.devices.filter(d => d.status === "오프라인").length;
                    const dangerCount  = station.devices.filter(d => d.status === "위험").length;
                    const warningCount = station.devices.filter(d => d.status === "주의").length;
                    const normalCount  = station.devices.filter(d => d.status === "정상").length;
                    return (
                      <div
                        key={station.id}
                        ref={isSelected ? selectedStationRef : null}
                        onClick={() => handleStationClick(station.id)}
                        className={`px-4 py-3 border-b border-[#e2e7ef] last:border-0 cursor-pointer hover:bg-[#f8fafc] transition-colors ${
                          isSelected ? "bg-[#f0f9ff] border-l-2 border-l-[#0ea5e9]" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#0ea5e9]" : "text-[#94a3b8]"}`} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className={`text-[13px] font-semibold truncate ${isSelected ? "text-[#0ea5e9]" : "text-[#0f172a]"}`}>
                                  {station.name}<span className="text-[#94a3b8] ml-1 font-normal text-[11px]">({station.code})</span>
                                </p>
                                {stationStatus !== "정상" && (
                                  <AlertTriangle className={`w-3.5 h-3.5 shrink-0 ${getIssueIconColor(stationStatus)}`} />
                                )}
                              </div>
                              <p className="text-[11px] text-[#64748b] mt-0.5">{customer?.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 ml-3 shrink-0 flex-wrap justify-end">
                            {offlineCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 text-gray-700">
                                오프라인 {offlineCount}대
                              </span>
                            )}
                            {dangerCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] rounded bg-red-100 text-red-700">
                                위험 {dangerCount}대
                              </span>
                            )}
                            {warningCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] rounded bg-yellow-100 text-yellow-700">
                                주의 {warningCount}대
                              </span>
                            )}
                            {normalCount > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-700">
                                정상 {normalCount}대
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Detail Panel */}
            {(selectedCustomerId || selectedStationId) && (
              <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden relative">
                <div className="border-b border-[#e2e7ef] p-4 bg-[#f8fafc] flex items-center gap-2">
                  {selectedStationId && (
                    <button
                      onClick={handleBack}
                      className="p-1 rounded-md hover:bg-[#e2e7ef] transition-colors"
                      title="이전으로"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#64748b]" />
                    </button>
                  )}
                  <p className="text-[13px] text-[#64748b] font-semibold">상세 정보</p>
                </div>

                {/* Customer Detail */}
                {selectedCustomerId && selectedCustomer && (
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-[#0ea5e9]" />
                        <h3 className="text-[15px] text-[#0f172a] font-bold">{selectedCustomer.name}</h3>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="pb-3 border-b border-[#e2e7ef]">
                        <p className="text-[11px] text-[#64748b] mb-1">연결 정류장</p>
                        <p className="text-[15px] text-[#0f172a] font-semibold">
                          {customerGroups[selectedCustomerId]?.length || 0}개
                        </p>
                      </div>
                      <div className="pb-3 border-b border-[#e2e7ef]">
                        <p className="text-[11px] text-[#64748b] mb-1">이슈 정류장</p>
                        <p className="text-[15px] text-red-600 font-semibold">
                          {customerGroups[selectedCustomerId]?.filter(s => getStationStatus(s) !== "정상").length || 0}개
                        </p>
                      </div>
                      <div className="pb-3 border-b border-[#e2e7ef]">
                        <p className="text-[11px] text-[#64748b] mb-1">연결 단말 수</p>
                        <p className="text-[15px] text-[#0f172a] font-semibold">
                          {customerGroups[selectedCustomerId]?.reduce((sum, s) => sum + s.devices.length, 0) || 0}대
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-[11px] text-[#64748b] font-semibold mb-2">정류장 목록</p>
                      <div className="space-y-1 max-h-[300px] overflow-y-auto">
                        {customerGroups[selectedCustomerId]?.map(station => {
                          const offlineCount = station.devices.filter(d => d.status === "오프라인").length;
                          const dangerCount  = station.devices.filter(d => d.status === "위험").length;
                          const warningCount = station.devices.filter(d => d.status === "주의").length;
                          const normalCount  = station.devices.filter(d => d.status === "정상").length;
                          return (
                            <div
                              key={station.id}
                              onClick={() => handleStationClick(station.id)}
                              className="p-2 rounded-lg hover:bg-[#f8fafc] cursor-pointer transition-colors"
                            >
                              <div className="flex items-center gap-1.5">
                                <p className="text-[12px] text-[#0f172a]">
                                  {station.name}<span className="text-[#94a3b8] ml-1">({station.code})</span>
                                </p>
                                {(() => { const st = getStationStatus(station); return st !== "정상" ? <AlertTriangle className={`w-3 h-3 shrink-0 ${getIssueIconColor(st)}`} /> : null; })()}
                              </div>
                              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                {offlineCount > 0 && (
                                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-gray-100 text-gray-700">
                                    오프라인 {offlineCount}대
                                  </span>
                                )}
                                {dangerCount > 0 && (
                                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-red-100 text-red-700">
                                    위험 {dangerCount}대
                                  </span>
                                )}
                                {warningCount > 0 && (
                                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-yellow-100 text-yellow-700">
                                    주의 {warningCount}대
                                  </span>
                                )}
                                {normalCount > 0 && (
                                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-700">
                                    정상 {normalCount}대
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Station Detail */}
                {selectedStationId && selectedStation && (
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#0ea5e9]" />
                          <h3 className="text-[15px] text-[#0f172a] font-bold">
                            {selectedStation.name}<span className="text-[#94a3b8] ml-1.5 font-normal text-[12px]">({selectedStation.code})</span>
                          </h3>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#94a3b8]">
                        {mockCustomers.find(c => c.id === selectedStation.customerId)?.name}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-[11px] text-[#64748b] font-semibold mb-2">단말 리스트</p>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto">
                        {selectedStation.devices.map(device => (
                          <div
                            key={device.id}
                            onClick={() => handleDeviceClick(device.id)}
                            className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e7ef] cursor-pointer hover:bg-[#f1f5f9] transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Tablet className="w-3.5 h-3.5 text-[#94a3b8]" fill="currentColor" />
                              <p className="text-[12px] text-[#0ea5e9] font-semibold">{device.id}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-[10px] text-[#94a3b8]">상태</p>
                                <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] rounded ${getStatusBadgeClass(device.status)}`}>
                                  {device.status}
                                </span>
                              </div>
                              <div>
                                <p className="text-[10px] text-[#94a3b8]">배터리</p>
                                <p className={`text-[11px] mt-1 font-semibold ${getBatteryColor(device.battery)}`}>
                                  {device.battery}
                                </p>
                              </div>
                              <div>
                                <p className="text-[10px] text-[#94a3b8]">통신</p>
                                <p className="text-[11px] text-[#64748b] mt-1">{device.lastUpdate}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-[#94a3b8]">OTA</p>
                                <p className={`text-[11px] mt-1 ${device.otaStatus === "최신" ? "text-green-600" : "text-yellow-600"}`}>
                                  {device.otaStatus}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Device Detail Overlay */}
                {selectedDeviceId && selectedDevice && selectedStation && (
                  <div className="absolute inset-0 bg-white rounded-[10px] flex flex-col overflow-hidden z-10">
                    {/* Overlay Header */}
                    <div className="border-b border-[#e2e7ef] p-4 bg-[#f8fafc] flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedDeviceId(null)}
                        className="p-1 rounded-md hover:bg-[#e2e7ef] transition-colors"
                        title="정류장으로 돌아가기"
                      >
                        <ChevronLeft className="w-4 h-4 text-[#64748b]" />
                      </button>
                      <div>
                        <p className="text-[13px] text-[#0f172a] font-semibold">{selectedDevice.id}</p>
                        <p className="text-[11px] text-[#94a3b8]">{selectedStation.name}</p>
                      </div>
                    </div>
                    {/* Overlay Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {/* 기본 정보 */}
                      <div>
                        <p className="text-[11px] text-[#64748b] font-semibold mb-2">기본 정보</p>
                        <div className="bg-[#f8fafc] rounded-lg border border-[#e2e7ef] divide-y divide-[#e2e7ef]">
                          {[
                            { label: "단말 ID", value: selectedDevice.id },
                            { label: "정류장", value: selectedStation.name },
                            { label: "고객사", value: mockCustomers.find(c => c.id === selectedStation.customerId)?.name || "-" },
                            { label: "마지막 통신", value: selectedDevice.lastUpdate },
                          ].map(row => (
                            <div key={row.label} className="flex items-center justify-between px-3 py-2">
                              <p className="text-[11px] text-[#94a3b8]">{row.label}</p>
                              <p className="text-[12px] text-[#0f172a]">{row.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 운영 상태 */}
                      <div>
                        <p className="text-[11px] text-[#64748b] font-semibold mb-2">운영 상태</p>
                        <div className="grid grid-cols-2 gap-2">
                          {/* 통신 상태 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">통신 상태</p>
                            <span className={`px-2 py-0.5 text-[11px] rounded ${selectedDevice.status === "오프라인" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-800"}`}>
                              {selectedDevice.status === "오프라인" ? "미연결" : "연결"}
                            </span>
                          </div>
                          {/* 배터리 잔량 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">배터리 잔량</p>
                            <div className="flex items-center gap-1.5">
                              <Battery className={`w-4 h-4 ${getBatteryColor(selectedDevice.battery)}`} fill="currentColor" />
                              <span className={`text-[12px] font-semibold ${getBatteryColor(selectedDevice.battery)}`}>
                                {selectedDevice.battery}
                              </span>
                            </div>
                          </div>
                          {/* 충전 상태 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">충전 상태</p>
                            <div className="flex items-center gap-1.5">
                              <Zap className="w-4 h-4 text-green-600" fill="currentColor" />
                              <span className="text-[12px] text-green-600">충전 중</span>
                            </div>
                          </div>
                          {/* 신호 강도 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">신호 강도</p>
                            <div className="flex items-center gap-1.5">
                              <Radio className="w-3.5 h-3.5 text-[#64748b]" />
                              <span className="text-[11px] text-[#0f172a]">-65 dBm</span>
                            </div>
                          </div>
                          {/* 마지막 통신 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc] col-span-2">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">마지막 통신</p>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#64748b]" />
                              <span className="text-[11px] text-[#0f172a]">{selectedDevice.lastUpdate}</span>
                            </div>
                          </div>
                          {/* 내부 온도 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">내부 온도</p>
                            <div className="flex items-center gap-1.5">
                              <Thermometer className="w-3.5 h-3.5 text-orange-500" />
                              <span className="text-[12px] text-[#0f172a]">38°C</span>
                            </div>
                          </div>
                          {/* 내부 습도 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
                            <p className="text-[11px] text-[#94a3b8] mb-1.5">내부 습도</p>
                            <div className="flex items-center gap-1.5">
                              <Droplets className="w-3.5 h-3.5 text-blue-500" />
                              <span className="text-[12px] text-[#0f172a]">52%</span>
                            </div>
                          </div>
                          {/* RAM 사용량 */}
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
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
                          <div className="p-3 border border-[#e2e7ef] rounded-lg bg-[#f8fafc]">
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
                        <p className="text-[11px] text-[#64748b] font-semibold mb-2">최근 알림</p>
                        <div className="bg-[#f8fafc] rounded-[10px] border border-[#e2e7ef] p-3 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                            <Bell className="w-3 h-3 text-green-600" />
                          </div>
                          <p className="text-[12px] text-[#64748b]">최근 알림이 없습니다</p>
                        </div>
                      </div>

                      {/* ④ 명령 요청 */}
                      <div>
                        <p className="text-[11px] text-[#64748b] font-semibold mb-2">명령 요청</p>
                        <div className="space-y-2">
                          {[
                            { Icon: RefreshCw, label: "상태 재조회 요청",        desc: "단말 현재 상태를 재조회합니다" },
                            { Icon: Wifi,      label: "통신 재연결 요청",          desc: "통신 연결을 재시도합니다" },
                            { Icon: RotateCcw, label: "런타임 재시작 요청",       desc: "애플리케이션 런타임을 재시작합니다" },
                            { Icon: Power,     label: "단말 재부팅 요청",         desc: "단말을 안전하게 재부팅합니다" },
                            { Icon: Tablet,    label: "디스플레이 새로고침 요청",  desc: "E-paper 화면 전체를 갱신합니다" },
                            { Icon: Share2,    label: "구성 재동기화 요청",        desc: "정책 및 구성을 재동기화합니다" },
                          ].map(({ Icon, label, desc }) => (
                            <div
                              key={label}
                              className="flex items-center justify-between p-3 bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] hover:bg-[#f1f5f9] transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-lg bg-white border border-[#e2e7ef] flex items-center justify-center shrink-0">
                                  <Icon className="w-4 h-4 text-[#64748b]" />
                                </div>
                                <div>
                                  <p className="text-[12px] text-[#0f172a]">{label}</p>
                                  <p className="text-[10px] text-[#94a3b8]">{desc}</p>
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
                        <p className="text-[11px] text-[#64748b] font-semibold mb-2">명령 이력</p>
                        <div className="bg-[#f8fafc] rounded-[10px] border border-[#e2e7ef] p-3">
                          <p className="text-[12px] text-[#94a3b8]">이 세션에서 요청된 명령이 없습니다</p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Device Detail Panel - 대시보드에서는 overlay 방식 사용으로 불필요 */}
    </div>
  );
}