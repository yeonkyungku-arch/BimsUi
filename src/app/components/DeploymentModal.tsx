import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ChevronRight, Search } from "lucide-react";

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (deployment: {
    appType: string;
    version: string;
    revision: string;
    target: string;
    targetIds: string[];
    schedule: string;
    includeExisting: boolean;
  }) => void;
}

const mockVersions = [
  { version: "v2.1.0", revision: "r3", status: "DEPLOYED", deployedAt: "2025-02-01" },
  { version: "v2.1.0", revision: "r2", status: "READY", deployedAt: null },
  { version: "v2.1.0", revision: "r1", status: "DEPLOYED", deployedAt: "2025-01-28" },
  { version: "v2.0.8", revision: "r2", status: "READY", deployedAt: null },
  { version: "v2.0.8", revision: "r1", status: "DEPLOYED", deployedAt: "2025-01-25" },
  { version: "v2.0.7", revision: "r1", status: "DEPLOYED", deployedAt: "2025-01-30" },
];

const mockDistricts = [
  { id: "DT-001", name: "강남구", stationCount: 24 },
  { id: "DT-002", name: "서초구", stationCount: 18 },
  { id: "DT-003", name: "종로구", stationCount: 15 },
  { id: "DT-004", name: "중구", stationCount: 12 },
];

const mockStations = [
  { id: "ST-001", name: "강남역 1번 출구", districtId: "DT-001", deviceCount: 12 },
  { id: "ST-002", name: "역삼역 3번 출구", districtId: "DT-001", deviceCount: 8 },
  { id: "ST-003", name: "선릉역 2번 출구", districtId: "DT-001", deviceCount: 15 },
  { id: "ST-004", name: "삼성역 5번 출구", districtId: "DT-001", deviceCount: 10 },
  { id: "ST-005", name: "교대역 2번 출구", districtId: "DT-002", deviceCount: 9 },
  { id: "ST-006", name: "서초역 4번 출구", districtId: "DT-002", deviceCount: 7 },
  { id: "ST-007", name: "강남역 5번 출구", districtId: "DT-001", deviceCount: 11 },
  { id: "ST-008", name: "종로3가역 4번 출구", districtId: "DT-003", deviceCount: 6 },
];

const mockDevices = [
  { id: "DEV-001", stationId: "ST-001", stationName: "강남역 1번 출구", status: "정상", agentVersion: "v2.0.8", updaterVersion: "v1.5.2" },
  { id: "DEV-002", stationId: "ST-001", stationName: "강남역 1번 출구", status: "정상", agentVersion: "v2.0.7", updaterVersion: "v1.5.2" },
  { id: "DEV-003", stationId: "ST-002", stationName: "역삼역 3번 출구", status: "주의", agentVersion: "v2.0.8", updaterVersion: "v1.5.1" },
  { id: "DEV-004", stationId: "ST-002", stationName: "역삼역 3번 출구", status: "정상", agentVersion: "v2.0.8", updaterVersion: "v1.5.2" },
  { id: "DEV-005", stationId: "ST-003", stationName: "선릉역 2번 출구", status: "정상", agentVersion: "v2.1.0", updaterVersion: "v1.5.2" },
  { id: "DEV-006", stationId: "ST-003", stationName: "선릉역 2번 출구", status: "위험", agentVersion: "v2.0.6", updaterVersion: "v1.5.0" },
  { id: "DEV-007", stationId: "ST-004", stationName: "삼성역 5번 출구", status: "정상", agentVersion: "v2.0.8", updaterVersion: "v1.5.2" },
  { id: "DEV-008", stationId: "ST-004", stationName: "삼성역 5번 출구", status: "정상", agentVersion: "v2.0.7", updaterVersion: "v1.5.2" },
  { id: "DEV-009", stationId: "ST-001", stationName: "강남역 1번 출구", status: "정상", agentVersion: "v2.0.8", updaterVersion: "v1.5.2" },
  { id: "DEV-010", stationId: "ST-001", stationName: "강남역 1번 출구", status: "주의", agentVersion: "v2.0.6", updaterVersion: "v1.5.1" },
];

export function DeploymentModal({ isOpen, onClose, onConfirm }: DeploymentModalProps) {
  const [appType, setAppType] = useState<string>("Agent");
  const [version, setVersion] = useState<string>("");
  const [revision, setRevision] = useState<string>("");
  const [deployTarget, setDeployTarget] = useState<string>("all");
  const [scheduleType, setScheduleType] = useState<string>("now");
  const [selectedTargetIds, setSelectedTargetIds] = useState<string[]>([]);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [districtSearchQuery, setDistrictSearchQuery] = useState<string>("");
  const [deviceSearchQuery, setDeviceSearchQuery] = useState<string>("");

  if (!isOpen) return null;

  const handleTargetToggle = (id: string) => {
    setSelectedTargetIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (deployTarget === "group") {
      setSelectedTargetIds(selectedTargetIds.length === mockDistricts.length ? [] : mockDistricts.map(d => d.id));
    } else if (deployTarget === "device") {
      setSelectedTargetIds(selectedTargetIds.length === mockDevices.length ? [] : mockDevices.map(d => d.id));
    }
  };

  const handleTargetChange = (value: string) => {
    setDeployTarget(value);
    setSelectedTargetIds([]);
    setSelectedStationId(null);
    setSelectedDistrictId(null);
  };

  const handleSubmit = () => {
    onConfirm({
      appType,
      version,
      revision,
      target: deployTarget,
      targetIds: selectedTargetIds,
      schedule: scheduleType,
      includeExisting: false,
    });
    onClose();
  };

  const selectedStation = mockStations.find(s => s.id === selectedStationId);
  const stationDevices = selectedStationId ? mockDevices.filter(d => d.stationId === selectedStationId) : [];
  const selectedDistrict = mockDistricts.find(d => d.id === selectedDistrictId);
  const districtStations = selectedDistrictId ? mockStations.filter(s => s.districtId === selectedDistrictId) : [];

  // Filter logic
  const filteredDistricts = mockDistricts.filter(district =>
    district.name.toLowerCase().includes(districtSearchQuery.toLowerCase())
  );

  const filteredDevices = mockDevices.filter(device =>
    device.id.toLowerCase().includes(deviceSearchQuery.toLowerCase()) ||
    device.stationName.toLowerCase().includes(deviceSearchQuery.toLowerCase())
  );

  // Get unique versions
  const uniqueVersions = Array.from(new Set(mockVersions.map(v => v.version)));
  
  // Get revisions for selected version
  const availableRevisions = version 
    ? mockVersions.filter(v => v.version === version)
    : [];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[10px] w-[600px] max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-[16px] text-[#0f172a] font-semibold">새 배포 생성</h2>
            <button onClick={onClose} className="text-[#64748b] hover:text-[#0f172a]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* App Type Selection */}
            <div>
              <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
                앱 유형 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="appType"
                    value="Agent"
                    checked={appType === "Agent"}
                    onChange={(e) => setAppType(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="border-2 border-[#e2e7ef] rounded-lg px-4 py-3 text-center peer-checked:border-[#0ea5e9] peer-checked:bg-[#f0f9ff] transition-all">
                    <span className="text-[13px] font-semibold text-[#0f172a]">Agent</span>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="appType"
                    value="Updater"
                    checked={appType === "Updater"}
                    onChange={(e) => setAppType(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="border-2 border-[#e2e7ef] rounded-lg px-4 py-3 text-center peer-checked:border-[#0ea5e9] peer-checked:bg-[#f0f9ff] transition-all">
                    <span className="text-[13px] font-semibold text-[#0f172a]">Updater</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Version Selection */}
            <div>
              <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
                버전 선택 <span className="text-red-500">*</span>
              </label>
              <select
                value={version}
                onChange={(e) => {
                  setVersion(e.target.value);
                  setRevision(mockVersions.find(v => v.version === e.target.value)?.revision || "");
                }}
                className="w-full px-4 py-2 border border-[#e2e7ef] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              >
                {uniqueVersions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Revision Selection */}
            <div>
              <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
                리비전 선택 <span className="text-red-500">*</span>
              </label>
              <select
                value={revision}
                onChange={(e) => setRevision(e.target.value)}
                className="w-full px-4 py-2 border border-[#e2e7ef] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              >
                {availableRevisions.map((v) => (
                  <option key={v.revision} value={v.revision}>
                    {v.revision} ({v.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Deploy Target */}
            <div>
              <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
                배포 대상 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    value="all"
                    checked={deployTarget === "all"}
                    onChange={(e) => handleTargetChange(e.target.value)}
                    className="w-4 h-4 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                  />
                  <span className="text-[13px] text-[#0f172a]">전체 단말</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    value="group"
                    checked={deployTarget === "group"}
                    onChange={(e) => handleTargetChange(e.target.value)}
                    className="w-4 h-4 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                  />
                  <span className="text-[13px] text-[#0f172a]">그룹별 배포</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    value="device"
                    checked={deployTarget === "device"}
                    onChange={(e) => handleTargetChange(e.target.value)}
                    className="w-4 h-4 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                  />
                  <span className="text-[13px] text-[#0f172a]">단말 선택</span>
                </label>
              </div>

              {deployTarget === "group" && (
                <div className="mt-3 border border-[#e2e7ef] rounded-lg overflow-hidden">
                  {/* Search Bar */}
                  <div className="p-3 bg-[#f8fafc] border-b border-[#e2e7ef]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                      <input
                        type="text"
                        placeholder="그룹명 검색..."
                        value={districtSearchQuery}
                        onChange={(e) => setDistrictSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-[#e2e7ef] rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      />
                    </div>
                  </div>

                  {/* List Container */}
                  <div className="p-4 max-h-[200px] overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] text-[#64748b]">
                        {selectedTargetIds.length}개 지역구 선택됨
                      </span>
                      <button
                        type="button"
                        className="text-[11px] text-[#0ea5e9] hover:underline"
                        onClick={handleSelectAll}
                      >
                        {selectedTargetIds.length === mockDistricts.length ? "전체 해제" : "전체 선택"}
                      </button>
                    </div>
                    {filteredDistricts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredDistricts.map((district) => (
                          <div key={district.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedTargetIds.includes(district.id)}
                              onChange={() => handleTargetToggle(district.id)}
                              className="w-4 h-4 text-[#0ea5e9] rounded focus:ring-[#0ea5e9]"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div 
                              className="flex-1 flex items-center gap-2 cursor-pointer hover:bg-[#f8fafc] p-2 rounded transition-colors"
                              onClick={() => setSelectedDistrictId(district.id)}
                            >
                              <div className="flex-1">
                                <div className="text-[13px] text-[#0f172a]">{district.name}</div>
                                <div className="text-[11px] text-[#64748b]">{district.stationCount}개 정류장</div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#64748b]" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-[12px] text-[#94a3b8]">검색 결과가 없습니다</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {deployTarget === "device" && (
                <div className="mt-3 border border-[#e2e7ef] rounded-lg overflow-hidden">
                  {/* Search Bar */}
                  <div className="p-3 bg-[#f8fafc] border-b border-[#e2e7ef]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                      <input
                        type="text"
                        placeholder="단말 ID 또는 정류장명 검색..."
                        value={deviceSearchQuery}
                        onChange={(e) => setDeviceSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-[#e2e7ef] rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                      />
                    </div>
                  </div>

                  {/* List Container */}
                  <div className="p-4 max-h-[200px] overflow-y-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] text-[#64748b]">
                        {selectedTargetIds.length}개 단말 선택됨
                      </span>
                      <button
                        type="button"
                        className="text-[11px] text-[#0ea5e9] hover:underline"
                        onClick={handleSelectAll}
                      >
                        {selectedTargetIds.length === mockDevices.length ? "전체 해제" : "전체 선택"}
                      </button>
                    </div>
                    {filteredDevices.length > 0 ? (
                      <div className="space-y-2">
                        {filteredDevices.map((device) => (
                          <label key={device.id} className="flex items-center gap-3 cursor-pointer hover:bg-[#f8fafc] p-2 rounded transition-colors">
                            <input
                              type="checkbox"
                              checked={selectedTargetIds.includes(device.id)}
                              onChange={() => handleTargetToggle(device.id)}
                              className="w-4 h-4 text-[#0ea5e9] rounded focus:ring-[#0ea5e9]"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-[13px] text-[#0f172a] font-semibold">{device.id}</div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-[#64748b]">Agent: {device.agentVersion}</span>
                                  <span className="text-[10px] text-[#64748b]">Updater: {device.updaterVersion}</span>
                                </div>
                              </div>
                              <div className="text-[11px] text-[#64748b] mt-0.5">{device.stationName} · {device.status}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-[12px] text-[#94a3b8]">검색 결과가 없습니다</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
                배포 일정 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    value="now"
                    checked={scheduleType === "now"}
                    onChange={(e) => setScheduleType(e.target.value)}
                    className="w-4 h-4 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                  />
                  <span className="text-[13px] text-[#0f172a]">즉시 배포</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    value="scheduled"
                    checked={scheduleType === "scheduled"}
                    onChange={(e) => setScheduleType(e.target.value)}
                    className="w-4 h-4 text-[#0ea5e9] focus:ring-[#0ea5e9]"
                  />
                  <span className="text-[13px] text-[#0f172a]">예약 배포</span>
                </label>
              </div>

              {scheduleType === "scheduled" && (
                <div className="mt-3">
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2 border border-[#e2e7ef] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  />
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-lg p-4">
              <p className="text-[12px] text-[#64748b] leading-relaxed">
                배포를 생성하면 선택한 단말에 펌웨어 업데이트가 시작됩니다. 
                배포 이력은 수정할 수 없으며 감사 로그에 기록됩니다.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#e2e7ef] flex items-center justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 text-[13px]"
            >
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-4 py-2 text-[13px] bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
            >
              배포 생성
            </Button>
          </div>
        </div>
      </div>

      {/* Station Devices Drawer */}
      {selectedStationId && selectedStation && (
        <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-[60] flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
            <div>
              <h3 className="text-[14px] text-[#0f172a] font-semibold">{selectedStation.name}</h3>
              <p className="text-[11px] text-[#64748b] mt-0.5">총 {stationDevices.length}개 단말</p>
            </div>
            <button 
              onClick={() => setSelectedStationId(null)} 
              className="text-[#64748b] hover:text-[#0f172a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {stationDevices.map((device) => (
                <div
                  key={device.id}
                  className="border border-[#e2e7ef] rounded-lg p-4 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[13px] text-[#0f172a] font-semibold">{device.id}</div>
                    <Badge 
                      variant={device.status === "정상" ? "default" : device.status === "주의" ? "secondary" : "destructive"}
                      className="text-[10px] px-2 py-0.5"
                    >
                      {device.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#64748b]">Agent</span>
                      <span className="text-[11px] text-[#0f172a] font-medium">{device.agentVersion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#64748b]">Updater</span>
                      <span className="text-[11px] text-[#0f172a] font-medium">{device.updaterVersion}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* District Stations Drawer */}
      {selectedDistrictId && selectedDistrict && (
        <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl z-[60] flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
            <div>
              <h3 className="text-[14px] text-[#0f172a] font-semibold">{selectedDistrict.name}</h3>
              <p className="text-[11px] text-[#64748b] mt-0.5">총 {districtStations.length}개 정류장</p>
            </div>
            <button 
              onClick={() => setSelectedDistrictId(null)} 
              className="text-[#64748b] hover:text-[#0f172a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {districtStations.map((station) => (
                <div
                  key={station.id}
                  className="border border-[#e2e7ef] rounded-lg p-4 hover:bg-[#f8fafc] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-[13px] text-[#0f172a] font-semibold">{station.name}</div>
                    <Badge 
                      variant="default"
                      className="text-[10px] px-2 py-0.5"
                    >
                      {station.deviceCount}개 단말
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#64748b]">정류장 ID</span>
                      <span className="text-[11px] text-[#0f172a] font-medium">{station.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}