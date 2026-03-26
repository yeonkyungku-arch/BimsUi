import { Home, ChevronRight, Upload, Package, CheckCircle2, Clock, XCircle, PackagePlus, Calendar, X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { DeploymentModal } from "../components/DeploymentModal";
import { UploadAppModal } from "../components/UploadAppModal";

export function OTAPage() {
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);
  const [isUploadAppModalOpen, setIsUploadAppModalOpen] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const [selectedDeviceStatus, setSelectedDeviceStatus] = useState<"전체" | "성공" | "실패" | "대기">("전체");
  const [cancelTargetId, setCancelTargetId] = useState<string | null>(null);
  const [kpiFilter, setKpiFilter] = useState<"전체" | "완료" | "진행중" | "실패" | "예약">("전체");

  const deployments = [
    {
      id: "OTA-001",
      appType: "Agent",
      version: "v2.1.0",
      fileName: "bis-firmware-v2.1.0.bin",
      targetDevices: 45,
      completed: 45,
      status: "완료",
      createdAt: "2025-02-01 14:30",
      completedAt: "2025-02-01 16:45",
      scheduledAt: null,
    },
    {
      id: "OTA-002",
      appType: "Updater",
      version: "v2.0.8",
      fileName: "bis-firmware-v2.0.8.bin",
      targetDevices: 120,
      completed: 87,
      status: "진행중",
      createdAt: "2025-02-02 09:00",
      completedAt: null,
      scheduledAt: null,
    },
    {
      id: "OTA-003",
      appType: "Agent",
      version: "v2.0.7",
      fileName: "bis-firmware-v2.0.7.bin",
      targetDevices: 30,
      completed: 28,
      status: "실패",
      createdAt: "2025-01-30 10:15",
      completedAt: "2025-01-30 12:30",
      scheduledAt: null,
    },
    {
      id: "OTA-004",
      appType: "Agent",
      version: "v2.1.0",
      fileName: "bis-firmware-v2.1.0.bin",
      targetDevices: 85,
      completed: 0,
      status: "예약",
      createdAt: "2025-02-03 11:20",
      completedAt: null,
      scheduledAt: "2025-02-05 02:00",
    },
  ];

  // Mock device deployment status
  const deviceDeploymentStatus: Record<string, Array<{
    stationName: string;
    stationCode: string;
    deviceId: string;
    deployStatus: "성공" | "실패" | "대기";
  }>> = {
    "OTA-001": [
      { stationName: "강남역 1번 출구", stationCode: "ST-001", deviceId: "DEV-001", deployStatus: "성공" },
      { stationName: "강남역 1번 출구", stationCode: "ST-001", deviceId: "DEV-002", deployStatus: "성공" },
      { stationName: "역삼역 3번 출구", stationCode: "ST-002", deviceId: "DEV-003", deployStatus: "성공" },
    ],
    "OTA-002": [
      { stationName: "강남역 1번 출구", stationCode: "ST-001", deviceId: "DEV-001", deployStatus: "성공" },
      { stationName: "강남역 1번 출구", stationCode: "ST-001", deviceId: "DEV-002", deployStatus: "대기" },
      { stationName: "역삼역 3번 출구", stationCode: "ST-002", deviceId: "DEV-003", deployStatus: "성공" },
      { stationName: "역삼역 3번 출구", stationCode: "ST-002", deviceId: "DEV-004", deployStatus: "성공" },
      { stationName: "선릉역 2번 출구", stationCode: "ST-003", deviceId: "DEV-005", deployStatus: "대기" },
      { stationName: "선릉역 2번 출구", stationCode: "ST-003", deviceId: "DEV-006", deployStatus: "실패" },
    ],
    "OTA-003": [
      { stationName: "강남역 1번 출구", stationCode: "ST-001", deviceId: "DEV-001", deployStatus: "성공" },
      { stationName: "강남역 1번 출구", stationCode: "ST-001", deviceId: "DEV-002", deployStatus: "성공" },
      { stationName: "역삼역 3번 출구", stationCode: "ST-002", deviceId: "DEV-003", deployStatus: "실패" },
      { stationName: "역삼역 3번 출구", stationCode: "ST-002", deviceId: "DEV-004", deployStatus: "실패" },
    ],
    "OTA-004": [],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "완료":
        return (
          <Badge className="bg-green-100 text-green-800 gap-1">
            <CheckCircle2 className="w-3 h-3" fill="currentColor" style={{ color: 'inherit', stroke: 'white', strokeWidth: 2 }} />
            완료
          </Badge>
        );
      case "진행중":
        return (
          <Badge className="bg-blue-100 text-blue-800 gap-1">
            <Clock className="w-3 h-3" fill="currentColor" style={{ color: 'inherit', stroke: 'white', strokeWidth: 2 }} />
            진행중
          </Badge>
        );
      case "실패":
        return (
          <Badge className="bg-red-100 text-red-800 gap-1">
            <XCircle className="w-3 h-3" fill="currentColor" style={{ color: 'inherit', stroke: 'white', strokeWidth: 2 }} />
            실패
          </Badge>
        );
      case "예약":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 gap-1">
            <Calendar className="w-3 h-3" fill="currentColor" style={{ color: 'inherit', stroke: 'white', strokeWidth: 2 }} />
            예약
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 bg-[#f1f5f9] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#e2e7ef] h-[56px] flex items-center px-6">
        <p className="text-[13px] text-[#64748b]">원격 관리 › OTA 배포</p>
      </div>

      <div className="p-6">
        {/* Page Title */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-[20px] text-[#0f172a] font-bold mb-2">OTA 배포</h1>
            <p className="text-[13px] text-[#64748b]">펌웨어 무선 배포 관리</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="bg-white border border-[#e2e7ef] text-[#0f172a] rounded-lg px-5 py-2.5 flex items-center gap-2 text-[13px] font-semibold hover:bg-[#f8fafc] transition-colors" 
              onClick={() => setIsUploadAppModalOpen(true)}
            >
              <PackagePlus className="w-4 h-4" />
              앱 업로드
            </button>
            <button 
              className="bg-[#0ea5e9] text-white rounded-lg px-5 py-2.5 flex items-center gap-2 text-[13px] font-semibold hover:bg-[#0284c7] transition-colors" 
              onClick={() => setIsDeploymentModalOpen(true)}
            >
              <Upload className="w-4 h-4" />
              새 배포 시작
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div
            className={`bg-white rounded-[10px] border p-6 cursor-pointer transition-all ${kpiFilter === "전체" ? "border-[#0ea5e9] ring-2 ring-[#0ea5e9]/20" : "border-[#e2e7ef] hover:border-[#0ea5e9]/50"}`}
            onClick={() => setKpiFilter("전체")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" fill="currentColor" style={{ stroke: 'white', strokeWidth: 1.5 }} />
              </div>
              <div>
                <p className="text-[12px] text-[#64748b]">전체 배포</p>
                <p className="text-[20px] text-[#0f172a] font-bold">156</p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-[10px] border p-6 cursor-pointer transition-all ${kpiFilter === "완료" ? "border-green-400 ring-2 ring-green-200" : "border-[#e2e7ef] hover:border-green-300"}`}
            onClick={() => setKpiFilter("완료")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" fill="currentColor" style={{ stroke: 'white', strokeWidth: 2 }} />
              </div>
              <div>
                <p className="text-[12px] text-[#64748b]">완료</p>
                <p className="text-[20px] text-[#16a34a] font-bold">142</p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-[10px] border p-6 cursor-pointer transition-all ${kpiFilter === "진행중" ? "border-blue-400 ring-2 ring-blue-200" : "border-[#e2e7ef] hover:border-blue-300"}`}
            onClick={() => setKpiFilter("진행중")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" fill="currentColor" style={{ stroke: 'white', strokeWidth: 2 }} />
              </div>
              <div>
                <p className="text-[12px] text-[#64748b]">진행중</p>
                <p className="text-[20px] text-[#0ea5e9] font-bold">12</p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-[10px] border p-6 cursor-pointer transition-all ${kpiFilter === "실패" ? "border-red-400 ring-2 ring-red-200" : "border-[#e2e7ef] hover:border-red-300"}`}
            onClick={() => setKpiFilter("실패")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" fill="currentColor" style={{ stroke: 'white', strokeWidth: 2 }} />
              </div>
              <div>
                <p className="text-[12px] text-[#64748b]">실패</p>
                <p className="text-[20px] text-[#dc2626] font-bold">2</p>
              </div>
            </div>
          </div>

          <div
            className={`bg-white rounded-[10px] border p-6 cursor-pointer transition-all ${kpiFilter === "예약" ? "border-yellow-400 ring-2 ring-yellow-200" : "border-[#e2e7ef] hover:border-yellow-300"}`}
            onClick={() => setKpiFilter("예약")}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-yellow-600" fill="currentColor" style={{ stroke: 'white', strokeWidth: 2 }} />
              </div>
              <div>
                <p className="text-[12px] text-[#64748b]">예약</p>
                <p className="text-[20px] text-[#eab308] font-bold">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deployments Table */}
        <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] text-[#0f172a] font-semibold">배포 내역</h2>
              {kpiFilter !== "전체" && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  kpiFilter === "완료" ? "bg-green-100 text-green-700" :
                  kpiFilter === "진행중" ? "bg-blue-100 text-blue-700" :
                  kpiFilter === "실패" ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {kpiFilter} 필터 적용 중
                </span>
              )}
            </div>
            {kpiFilter !== "전체" && (
              <button
                className="text-[11px] text-[#0ea5e9] hover:underline"
                onClick={() => setKpiFilter("전체")}
              >
                전체 보기
              </button>
            )}
          </div>
          <table className="w-full">
            <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">앱 유형</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">버전</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">대상 단말</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">진행률</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">상태</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">배포 시간</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">완료 시간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e7ef]">
              {deployments
                .filter(d => kpiFilter === "전체" || d.status === kpiFilter)
                .map((deployment) => {
                const progress = Math.round((deployment.completed / deployment.targetDevices) * 100);
                
                return (
                  <tr 
                    key={deployment.id} 
                    className="hover:bg-[#f8fafc] cursor-pointer transition-colors"
                    onClick={() => setSelectedDeployment(deployment.id)}
                  >
                    <td className="px-6 py-4">
                      <Badge className={deployment.appType === "Agent" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"}>
                        {deployment.appType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] text-[13px]">{deployment.version}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{deployment.targetDevices}대</td>
                    <td className="px-6 py-4">
                      {deployment.status === "예약" ? (
                        <span className="text-[12px] text-[#64748b]">—</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className={`h-2 rounded-full ${
                                deployment.status === "완료"
                                  ? "bg-green-600"
                                  : deployment.status === "진행중"
                                  ? "bg-blue-600"
                                  : "bg-red-600"
                              }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span className="text-[12px] text-[#64748b]">
                            {deployment.completed}/{deployment.targetDevices}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(deployment.status)}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">
                      {deployment.status === "예약" ? (
                        <span className="text-[#eab308]">{deployment.scheduledAt}</span>
                      ) : (
                        deployment.createdAt
                      )}
                    </td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{deployment.completedAt || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment Modal */}
      <DeploymentModal 
        isOpen={isDeploymentModalOpen} 
        onClose={() => setIsDeploymentModalOpen(false)} 
        onConfirm={(deployment) => {
          console.log("New deployment:", deployment);
          // Here you would typically make an API call to create the deployment
        }}
      />

      {/* Upload App Modal */}
      <UploadAppModal 
        isOpen={isUploadAppModalOpen} 
        onClose={() => setIsUploadAppModalOpen(false)} 
        onConfirm={(app) => {
          console.log("Uploaded app:", app);
          // Here you would typically make an API call to upload the app
        }}
      />

      {/* Deployment Detail Panel */}
      {selectedDeployment && (() => {
        const deployment = deployments.find(d => d.id === selectedDeployment);
        if (!deployment) return null;

        const devices = deviceDeploymentStatus[selectedDeployment] || [];
        const successCount = devices.filter(d => d.deployStatus === "성공").length;
        const failCount = devices.filter(d => d.deployStatus === "실패").length;
        const waitCount = devices.filter(d => d.deployStatus === "대기").length;
        const successRate = deployment.targetDevices > 0 
          ? Math.round((successCount / deployment.targetDevices) * 100) 
          : 0;

        // Filter devices based on selected status
        const filteredDevices = selectedDeviceStatus === "전체" 
          ? devices 
          : devices.filter(d => d.deployStatus === selectedDeviceStatus);

        return (
          <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className={deployment.appType === "Agent" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"}>
                  {deployment.appType}
                </Badge>
                <span className="text-[14px] text-[#0f172a] font-semibold">{deployment.version}</span>
                {getStatusBadge(deployment.status)}
              </div>
              <button 
                onClick={() => {
                  setSelectedDeployment(null);
                  setSelectedDeviceStatus("전체");
                }} 
                className="text-[#64748b] hover:text-[#0f172a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* OTA 기본 정보 */}
              <div className="mb-6">
                <h3 className="text-[13px] text-[#0f172a] font-semibold mb-3">OTA 기본 정보</h3>
                <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#64748b]">파일명</span>
                    <span className="text-[13px] text-[#0f172a] font-medium">{deployment.fileName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#64748b]">배포 대상 수</span>
                    <span className="text-[13px] text-[#0f172a] font-medium">{deployment.targetDevices}대</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#64748b]">배포 시작 시간</span>
                    <span className="text-[13px] text-[#0f172a] font-medium">
                      {deployment.status === "예약" ? deployment.scheduledAt : deployment.createdAt}
                    </span>
                  </div>
                  {deployment.completedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-[#64748b]">배포 종료 시간</span>
                      <span className="text-[13px] text-[#0f172a] font-medium">{deployment.completedAt}</span>
                    </div>
                  )}
                  {deployment.status === "예약" && (
                    <div className="pt-2 border-t border-[#e2e7ef]">
                      <Button 
                        variant="outline" 
                        className="w-full text-[13px] text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => setCancelTargetId(deployment.id)}
                      >
                        배포 취소
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* 배포 결과 현황 - 예약 건은 제공하지 않음 */}
              {deployment.status !== "예약" && (
                <div className="mb-6">
                  <h3 className="text-[13px] text-[#0f172a] font-semibold mb-3">배포 결과 현황</h3>
                  <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-lg p-4 space-y-4">
                    {/* 성공률 */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] text-[#64748b]">성공률</span>
                        <span className="text-[16px] text-[#0f172a] font-bold">{successRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            successRate >= 70 ? "bg-green-600" : successRate >= 30 ? "bg-yellow-600" : "bg-red-600"
                          }`}
                          style={{ width: `${successRate}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 상태별 단말 수 */}
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#e2e7ef]">
                      <button
                        onClick={() => setSelectedDeviceStatus("성공")}
                        className={`text-center p-2 rounded-lg transition-colors ${
                          selectedDeviceStatus === "성공" 
                            ? "bg-green-50 ring-2 ring-green-200" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-[11px] text-[#64748b] mb-1">성공</p>
                        <p className="text-[18px] text-[#16a34a] font-bold">{successCount}</p>
                      </button>
                      <button
                        onClick={() => setSelectedDeviceStatus("실패")}
                        className={`text-center p-2 rounded-lg transition-colors ${
                          selectedDeviceStatus === "실패" 
                            ? "bg-red-50 ring-2 ring-red-200" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-[11px] text-[#64748b] mb-1">실패</p>
                        <p className="text-[18px] text-[#dc2626] font-bold">{failCount}</p>
                      </button>
                      <button
                        onClick={() => setSelectedDeviceStatus("대기")}
                        className={`text-center p-2 rounded-lg transition-colors ${
                          selectedDeviceStatus === "대기" 
                            ? "bg-blue-50 ring-2 ring-blue-200" 
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <p className="text-[11px] text-[#64748b] mb-1">대기</p>
                        <p className="text-[18px] text-[#0ea5e9] font-bold">{waitCount}</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 배포 상태별 단말 리스트 */}
              {deployment.status !== "예약" && devices.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[13px] text-[#0f172a] font-semibold">배포 상태별 단말 리스트</h3>
                    {selectedDeviceStatus !== "전체" && (
                      <button
                        onClick={() => setSelectedDeviceStatus("전체")}
                        className="text-[11px] text-[#0ea5e9] hover:underline"
                      >
                        전체 보기
                      </button>
                    )}
                  </div>
                  {filteredDevices.length > 0 ? (
                    <div className="space-y-2">
                      {filteredDevices.map((device, index) => (
                        <div 
                          key={index}
                          className="border border-[#e2e7ef] rounded-lg p-4 hover:bg-[#f8fafc] transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-[13px] text-[#0f172a] font-semibold">{device.deviceId}</p>
                              <p className="text-[11px] text-[#64748b] mt-0.5">
                                {device.stationName} ({device.stationCode})
                              </p>
                            </div>
                            <Badge 
                              className={
                                device.deployStatus === "성공"
                                  ? "bg-green-100 text-green-800"
                                  : device.deployStatus === "실패"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {device.deployStatus}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-[12px] text-[#64748b]">
                      {selectedDeviceStatus} 상태의 단말이 없습니다.
                    </div>
                  )}
                </div>
              )}

              {/* 예약 건 안내 */}
              {deployment.status === "예약" && (
                <div className="bg-[#fef9c3] border border-[#fde047] rounded-lg p-4">
                  <p className="text-[12px] text-[#854d0e] leading-relaxed">
                    예약된 배포입니다. 배포가 시작되면 진행 상태를 확인할 수 있습니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Cancel Confirmation Modal */}
      {cancelTargetId && (() => {
        const target = deployments.find(d => d.id === cancelTargetId);
        if (!target) return null;
        return (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setCancelTargetId(null)}
            />
            {/* Modal */}
            <div className="relative bg-white rounded-[12px] shadow-2xl w-[400px] p-6 z-10">
              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              </div>
              {/* Title */}
              <h3 className="text-center text-[16px] text-[#0f172a] font-bold mb-2">예약 배포 취소</h3>
              {/* Description */}
              <p className="text-center text-[13px] text-[#64748b] leading-relaxed mb-1">
                아래 예약 배포를 취소하시겠습니까?
              </p>
              <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-lg px-4 py-3 mb-5 mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#64748b]">앱 유형</span>
                  <span className="text-[12px] text-[#0f172a] font-medium">{target.appType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#64748b]">버전</span>
                  <span className="text-[12px] text-[#0f172a] font-medium">{target.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#64748b]">예약 시간</span>
                  <span className="text-[12px] text-[#eab308] font-medium">{target.scheduledAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[12px] text-[#64748b]">대상 단말</span>
                  <span className="text-[12px] text-[#0f172a] font-medium">{target.targetDevices}대</span>
                </div>
              </div>
              <p className="text-center text-[12px] text-red-500 mb-5">
                취소 후에는 복구할 수 없습니다.
              </p>
              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className="flex-1 border border-[#e2e7ef] text-[#64748b] rounded-lg py-2.5 text-[13px] font-semibold hover:bg-[#f8fafc] transition-colors"
                  onClick={() => setCancelTargetId(null)}
                >
                  닫기
                </button>
                <button
                  className="flex-1 bg-red-500 text-white rounded-lg py-2.5 text-[13px] font-semibold hover:bg-red-600 transition-colors"
                  onClick={() => {
                    // TODO: API call to cancel deployment
                    console.log("Cancelled deployment:", cancelTargetId);
                    setCancelTargetId(null);
                    setSelectedDeployment(null);
                    setSelectedDeviceStatus("전체");
                  }}
                >
                  배포 취소 확인
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}