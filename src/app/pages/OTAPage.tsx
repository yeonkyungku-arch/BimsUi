import { useState } from "react";
import { Upload, Package, CheckCircle2, Clock, XCircle, X, ChevronRight } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface Deployment {
  id: string;
  version: string;
  fileName: string;
  targetDevices: number;
  completed: number;
  status: string;
  createdAt: string;
  completedAt: string | null;
  description?: string;
  targetGroup?: string;
}

const deployments: Deployment[] = [
  {
    id: "OTA-001",
    version: "v2.1.0",
    fileName: "bis-firmware-v2.1.0.bin",
    targetDevices: 45,
    completed: 45,
    status: "완료",
    createdAt: "2025-02-01 14:30",
    completedAt: "2025-02-01 16:45",
    description: "보안 패치 및 통신 모듈 안정화",
    targetGroup: "CUS001 전체",
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
    description: "디스플레이 렌더링 개선",
    targetGroup: "CUS002 전체",
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
    description: "네트워크 드라이버 업데이트",
    targetGroup: "CUS003 강남구",
  },
];

const targetDeviceDetails: Record<string, { id: string; name: string; status: string }[]> = {
  "OTA-001": [
    { id: "BISD001", name: "강남역 1번출구", status: "완료" },
    { id: "BISD002", name: "역삼역 2번출구", status: "완료" },
    { id: "BISD003", name: "서초역 3번출구", status: "완료" },
  ],
  "OTA-002": [
    { id: "BISD005", name: "판교역 5번출구", status: "완료" },
    { id: "BISD006", name: "야탑역 1번출구", status: "진행중" },
    { id: "BISD009", name: "광교중앙 정류장", status: "대기" },
    { id: "BISD010", name: "동탄역 1번", status: "대기" },
  ],
  "OTA-003": [
    { id: "BISD007", name: "송도역 2번출구", status: "완료" },
    { id: "BISD008", name: "인천시청역 앞", status: "실패" },
  ],
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "완료":
      return <Badge className="bg-green-100 text-green-800 gap-1 hover:bg-green-100"><CheckCircle2 className="w-3 h-3" />완료</Badge>;
    case "진행중":
      return <Badge className="bg-blue-100 text-blue-800 gap-1 hover:bg-blue-100"><Clock className="w-3 h-3" />진행중</Badge>;
    case "실패":
      return <Badge className="bg-red-100 text-red-800 gap-1 hover:bg-red-100"><XCircle className="w-3 h-3" />실패</Badge>;
    case "대기":
      return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">대기</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export function OTAPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);

  // Create modal form state
  const [form, setForm] = useState({
    version: "",
    fileName: "",
    targetGroup: "전체",
    concurrent: "10",
    description: "",
  });

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
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#0ea5e9] text-white rounded-lg px-5 py-2.5 flex items-center gap-2 text-[13px] font-semibold hover:bg-[#0284c7] transition-colors"
          >
            <Upload className="w-4 h-4" />
            새 배포 시작
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "전체 배포", value: "156", icon: Package, iconBg: "bg-blue-50", iconColor: "text-blue-600", textColor: "text-[#0f172a]" },
            { label: "완료", value: "142", icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600", textColor: "text-[#16a34a]" },
            { label: "진행중", value: "12", icon: Clock, iconBg: "bg-blue-50", iconColor: "text-blue-600", textColor: "text-[#0ea5e9]" },
            { label: "실패", value: "2", icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-600", textColor: "text-[#dc2626]" },
          ].map(({ label, value, icon: Icon, iconBg, iconColor, textColor }) => (
            <div key={label} className="bg-white rounded-[10px] border border-[#e2e7ef] p-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <p className="text-[12px] text-[#64748b]">{label}</p>
                  <p className={`text-[20px] font-bold ${textColor}`}>{value}</p>
                </div>
              </div>
            </div>
          ))}
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
                  <tr
                    key={deployment.id}
                    onClick={() => setSelectedDeployment(deployment)}
                    className="hover:bg-[#f8fafc] cursor-pointer transition-colors"
                  >
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
                              deployment.status === "완료" ? "bg-green-600"
                                : deployment.status === "진행중" ? "bg-blue-600"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${progress}%` }}
                          />
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

      {/* 배포 세부정보 패널 (02-3) */}
      {selectedDeployment && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSelectedDeployment(null)}
          />
          <div className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-[16px] font-bold text-[#0f172a]">{selectedDeployment.id}</h2>
                <p className="text-[12px] text-[#64748b] mt-0.5">{selectedDeployment.version}</p>
              </div>
              <button
                onClick={() => setSelectedDeployment(null)}
                className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 배포 상태 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-semibold text-[#0f172a]">배포 현황</span>
                  {getStatusBadge(selectedDeployment.status)}
                </div>
                <div className="bg-[#f8fafc] rounded-[8px] p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-[#64748b]">진행률</span>
                    <span className="text-[13px] font-semibold text-[#0f172a]">
                      {Math.round((selectedDeployment.completed / selectedDeployment.targetDevices) * 100)}%
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full ${
                        selectedDeployment.status === "완료" ? "bg-green-600"
                          : selectedDeployment.status === "진행중" ? "bg-blue-600"
                          : "bg-red-600"
                      }`}
                      style={{
                        width: `${Math.round((selectedDeployment.completed / selectedDeployment.targetDevices) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[12px] text-[#64748b]">
                    <span>완료: {selectedDeployment.completed}대</span>
                    <span>전체: {selectedDeployment.targetDevices}대</span>
                  </div>
                </div>
              </div>

              {/* 배포 정보 */}
              <div>
                <p className="text-[13px] font-semibold text-[#0f172a] mb-3">배포 정보</p>
                <div className="space-y-2">
                  {[
                    { label: "파일명", value: selectedDeployment.fileName },
                    { label: "대상 그룹", value: selectedDeployment.targetGroup ?? "—" },
                    { label: "설명", value: selectedDeployment.description ?? "—" },
                    { label: "시작 시간", value: selectedDeployment.createdAt },
                    { label: "완료 시간", value: selectedDeployment.completedAt ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-[#f1f5f9]">
                      <span className="text-[12px] text-[#64748b]">{label}</span>
                      <span className="text-[13px] text-[#0f172a]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 대상 단말 목록 */}
              <div>
                <p className="text-[13px] font-semibold text-[#0f172a] mb-3">대상 단말</p>
                <div className="border border-[#e2e7ef] rounded-[8px] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
                      <tr>
                        <th className="px-4 py-2.5 text-left text-[11px] text-[#64748b] font-semibold">단말 ID</th>
                        <th className="px-4 py-2.5 text-left text-[11px] text-[#64748b] font-semibold">정류장명</th>
                        <th className="px-4 py-2.5 text-left text-[11px] text-[#64748b] font-semibold">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e7ef]">
                      {(targetDeviceDetails[selectedDeployment.id] ?? []).map((d) => (
                        <tr key={d.id}>
                          <td className="px-4 py-2.5 text-[#0ea5e9] text-[12px]">{d.id}</td>
                          <td className="px-4 py-2.5 text-[#64748b] text-[12px]">{d.name}</td>
                          <td className="px-4 py-2.5">{getStatusBadge(d.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 액션 버튼 */}
              {selectedDeployment.status === "진행중" && (
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 h-9 border border-[#e2e7ef] rounded-lg text-[13px] text-[#64748b] hover:bg-[#f8fafc] transition-colors">
                    일시 중지
                  </button>
                  <button className="flex-1 h-9 border border-red-200 rounded-lg text-[13px] text-red-600 hover:bg-red-50 transition-colors">
                    배포 취소
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* 배포 생성 모달 (02-2) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[16px] w-full max-w-[560px] shadow-2xl">
            <div className="px-6 py-5 border-b border-[#e2e7ef] flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-bold text-[#0f172a]">새 OTA 배포 시작</h2>
                <p className="text-[12px] text-[#64748b] mt-0.5">펌웨어 파일을 선택하고 배포 대상을 설정하세요</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* 파일 업로드 */}
              <div>
                <label className="block text-[13px] font-medium text-[#0f172a] mb-2">펌웨어 파일</label>
                <div className="border-2 border-dashed border-[#e2e7ef] rounded-[10px] p-8 text-center hover:border-[#0ea5e9] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-[#94a3b8] mx-auto mb-2" />
                  <p className="text-[13px] text-[#64748b]">파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-[11px] text-[#94a3b8] mt-1">.bin, .hex 파일 지원</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#0f172a] mb-2">버전</label>
                  <input
                    value={form.version}
                    onChange={(e) => setForm({ ...form, version: e.target.value })}
                    placeholder="예: v2.2.0"
                    className="w-full h-9 border border-[#e2e7ef] rounded-lg px-3 text-[13px] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#0f172a] mb-2">동시 배포 수</label>
                  <input
                    value={form.concurrent}
                    onChange={(e) => setForm({ ...form, concurrent: e.target.value })}
                    placeholder="10"
                    type="number"
                    className="w-full h-9 border border-[#e2e7ef] rounded-lg px-3 text-[13px] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#0f172a] mb-2">배포 대상 그룹</label>
                <select
                  value={form.targetGroup}
                  onChange={(e) => setForm({ ...form, targetGroup: e.target.value })}
                  className="w-full h-9 border border-[#e2e7ef] rounded-lg px-3 text-[13px] bg-white focus:outline-none focus:border-[#0ea5e9]"
                >
                  <option>전체</option>
                  <option>CUS001 전체</option>
                  <option>CUS002 전체</option>
                  <option>CUS003 전체</option>
                  <option>강남구</option>
                  <option>서초구</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#0f172a] mb-2">배포 설명</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="변경 사항 및 주요 내용을 입력하세요"
                  rows={3}
                  className="w-full border border-[#e2e7ef] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] resize-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#e2e7ef] flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="h-9 px-5 border border-[#e2e7ef] rounded-lg text-[13px] text-[#64748b] hover:bg-[#f8fafc] transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="h-9 px-5 bg-[#0ea5e9] text-white rounded-lg text-[13px] font-semibold hover:bg-[#0284c7] transition-colors"
              >
                배포 시작
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
