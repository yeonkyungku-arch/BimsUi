import { Home, ChevronRight, Upload, Package, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function OTAPage() {
  const deployments = [
    {
      id: "OTA-001",
      version: "v2.1.0",
      fileName: "bis-firmware-v2.1.0.bin",
      targetDevices: 45,
      completed: 45,
      status: "완료",
      createdAt: "2025-02-01 14:30",
      completedAt: "2025-02-01 16:45",
    },
    {
      id: "OTA-002",
      version: "v2.0.8",
      fileName: "bis-firmware-v2.0.8.bin",
      targetDevices: 120,
      completed: 87,
      status: "진행중",
      createdAt: "2025-02-02 09:00",
      completedAt: null,
    },
    {
      id: "OTA-003",
      version: "v2.0.7",
      fileName: "bis-firmware-v2.0.7.bin",
      targetDevices: 30,
      completed: 28,
      status: "실패",
      createdAt: "2025-01-30 10:15",
      completedAt: "2025-01-30 12:30",
    },
  ];

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
          <button className="bg-[#0ea5e9] text-white rounded-lg px-5 py-2.5 flex items-center gap-2 text-[13px] font-semibold hover:bg-[#0284c7] transition-colors">
            <Upload className="w-4 h-4" />
            새 배포 시작
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-6">
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

          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-6">
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

          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-6">
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

          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-6">
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
        </div>

        {/* Deployments Table */}
        <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e2e7ef]">
            <h2 className="text-[14px] text-[#0f172a] font-semibold">배포 내역</h2>
          </div>
          <table className="w-full">
            <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">배포 ID</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">버전</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">파일명</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">대상 단말</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">진행률</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">상태</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">시작 시간</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">완료 시간</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e7ef]">
              {deployments.map((deployment) => {
                const progress = Math.round((deployment.completed / deployment.targetDevices) * 100);
                
                return (
                  <tr key={deployment.id} className="hover:bg-[#f8fafc] cursor-pointer transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-[#0ea5e9] text-[13px]">{deployment.id}</span>
                    </td>
                    <td className="px-6 py-4 text-[#0f172a] text-[13px]">{deployment.version}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{deployment.fileName}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{deployment.targetDevices}대</td>
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(deployment.status)}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{deployment.createdAt}</td>
                    <td className="px-6 py-4 text-[#64748b] text-[13px]">{deployment.completedAt || "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}