import { useState } from "react";
import { RefreshCw, Power, Monitor, Search, X, Terminal, Wifi } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface Command {
  id: string;
  deviceId: string;
  stationName: string;
  command: string;
  status: string;
  requestedAt: string;
  completedAt: string | null;
  duration?: string;
  log?: string[];
}

const recentCommands: Command[] = [
  {
    id: "CMD-001",
    deviceId: "BISD001",
    stationName: "강남역 1번출구",
    command: "상태 재조회",
    status: "완료",
    requestedAt: "2025-02-02 10:30",
    completedAt: "2025-02-02 10:30",
    duration: "0.8초",
    log: ["연결 확인...", "단말 상태 조회 중...", "배터리: 85%, 네트워크: 정상", "완료"],
  },
  {
    id: "CMD-002",
    deviceId: "BISD003",
    stationName: "서초역 3번출구",
    command: "단말 재부팅",
    status: "진행중",
    requestedAt: "2025-02-02 10:25",
    completedAt: null,
    duration: "—",
    log: ["재부팅 명령 전송...", "단말 응답 대기 중..."],
  },
  {
    id: "CMD-003",
    deviceId: "BISD008",
    stationName: "인천시청역 앞",
    command: "통신 재연결",
    status: "완료",
    requestedAt: "2025-02-02 10:20",
    completedAt: "2025-02-02 10:21",
    duration: "1.2초",
    log: ["통신 재연결 명령 전송...", "네트워크 재초기화...", "연결 복구 완료"],
  },
  {
    id: "CMD-004",
    deviceId: "BISD004",
    stationName: "교대역 앞",
    command: "디스플레이 새로고침",
    status: "실패",
    requestedAt: "2025-02-02 10:15",
    completedAt: "2025-02-02 10:16",
    duration: "—",
    log: ["디스플레이 새로고침 전송...", "단말 응답 없음 (타임아웃)", "오류: 단말 오프라인 상태"],
  },
  {
    id: "CMD-005",
    deviceId: "BISD002",
    stationName: "역삼역 2번출구",
    command: "런타임 재시작",
    status: "완료",
    requestedAt: "2025-02-02 10:10",
    completedAt: "2025-02-02 10:11",
    duration: "2.1초",
    log: ["런타임 재시작 명령 전송...", "프로세스 종료 중...", "서비스 재시작 완료"],
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "완료": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">완료</Badge>;
    case "진행중": return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">진행중</Badge>;
    case "실패": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">실패</Badge>;
    case "대기": return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">대기</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};

const quickActions = [
  { label: "상태 재조회", sub: "선택한 단말", icon: RefreshCw, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  { label: "단말 재부팅", sub: "선택한 단말", icon: Power, iconBg: "bg-orange-50", iconColor: "text-orange-600" },
  { label: "화면 새로고침", sub: "선택한 단말", icon: Monitor, iconBg: "bg-green-50", iconColor: "text-green-600" },
  { label: "전체 동기화", sub: "모든 단말", icon: Wifi, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
];

export function RemoteControlPage() {
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = recentCommands.filter(
    (c) =>
      c.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.stationName.includes(searchQuery)
  );

  return (
    <div className="flex-1 bg-[#f1f5f9] overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-[#e2e7ef] h-[56px] flex items-center px-6">
        <p className="text-[13px] text-[#64748b]">원격 관리 › 원격 제어</p>
      </div>

      <div className="p-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-[20px] text-[#0f172a] font-bold mb-2">원격 제어</h1>
          <p className="text-[13px] text-[#64748b]">단말 원격 명령 실행 및 이력 관리</p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-6 mb-6">
          <h2 className="text-[14px] text-[#0f172a] font-semibold mb-4">빠른 명령</h2>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map(({ label, sub, icon: Icon, iconBg, iconColor }) => (
              <button
                key={label}
                className="border-[1.5px] border-[#e2e7ef] rounded-lg py-6 flex flex-col items-center gap-2 hover:bg-[#f8fafc] hover:border-[#0ea5e9] transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${iconBg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <span className="text-[13px] text-[#0f172a] font-medium">{label}</span>
                <span className="text-[11px] text-[#64748b]">{sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Command History */}
        <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
            <h2 className="text-[14px] text-[#0f172a] font-semibold">명령 이력</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99a1af]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="단말 ID 또는 정류장 검색..."
                className="w-80 h-9 bg-[#f3f3f5] border-0 rounded-lg pl-10 pr-3 text-[13px] placeholder:text-[#717182]"
              />
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">명령 ID</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">단말 ID</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">정류장명</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">명령</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">상태</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">요청 시간</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">완료 시간</th>
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e7ef]">
              {filtered.map((cmd) => (
                <tr key={cmd.id} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[#0ea5e9] text-[13px]">{cmd.id}</span>
                  </td>
                  <td className="px-6 py-4 text-[#0f172a] text-[13px]">{cmd.deviceId}</td>
                  <td className="px-6 py-4 text-[#64748b] text-[13px]">{cmd.stationName}</td>
                  <td className="px-6 py-4 text-[#0f172a] text-[13px]">{cmd.command}</td>
                  <td className="px-6 py-4">{getStatusBadge(cmd.status)}</td>
                  <td className="px-6 py-4 text-[#64748b] text-[13px]">{cmd.requestedAt}</td>
                  <td className="px-6 py-4 text-[#64748b] text-[13px]">{cmd.completedAt || "—"}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedCommand(cmd)}
                      className="text-[#0ea5e9] text-[13px] hover:underline"
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "오늘 실행된 명령", value: "127", color: "text-[#0f172a]" },
            { label: "성공률", value: "98.4%", color: "text-[#16a34a]" },
            { label: "평균 응답 시간", value: "2.3초", color: "text-[#0ea5e9]" },
            { label: "대기중인 명령", value: "3", color: "text-[#d97706]" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-[10px] border border-[#e2e7ef] p-4">
              <p className="text-[12px] text-[#64748b] mb-1">{label}</p>
              <p className={`text-[20px] font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 드릴다운 패널 (03-2) */}
      {selectedCommand && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSelectedCommand(null)}
          />
          <div className="fixed right-0 top-0 h-full w-[440px] bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-[16px] font-bold text-[#0f172a]">{selectedCommand.id}</h2>
                <p className="text-[12px] text-[#64748b] mt-0.5">{selectedCommand.command}</p>
              </div>
              <button
                onClick={() => setSelectedCommand(null)}
                className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 상태 */}
              <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-[8px]">
                <span className="text-[13px] text-[#64748b]">명령 상태</span>
                {getStatusBadge(selectedCommand.status)}
              </div>

              {/* 단말 정보 */}
              <div>
                <p className="text-[13px] font-semibold text-[#0f172a] mb-3">단말 정보</p>
                <div className="space-y-2">
                  {[
                    { label: "단말 ID", value: selectedCommand.deviceId },
                    { label: "정류장명", value: selectedCommand.stationName },
                    { label: "명령", value: selectedCommand.command },
                    { label: "요청 시간", value: selectedCommand.requestedAt },
                    { label: "완료 시간", value: selectedCommand.completedAt ?? "—" },
                    { label: "소요 시간", value: selectedCommand.duration ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2 border-b border-[#f1f5f9]">
                      <span className="text-[12px] text-[#64748b]">{label}</span>
                      <span className="text-[13px] text-[#0f172a]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 실행 로그 */}
              {selectedCommand.log && selectedCommand.log.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-[#64748b]" />
                    <p className="text-[13px] font-semibold text-[#0f172a]">실행 로그</p>
                  </div>
                  <div className="bg-[#0f172a] rounded-[8px] p-4 space-y-1.5">
                    {selectedCommand.log.map((line, i) => (
                      <p key={i} className="text-[12px] font-mono text-[#94a3b8]">
                        <span className="text-[#38bef8] mr-2">$</span>
                        {line}
                      </p>
                    ))}
                    {selectedCommand.status === "진행중" && (
                      <p className="text-[12px] font-mono text-[#38bef8] animate-pulse">_</p>
                    )}
                  </div>
                </div>
              )}

              {/* 재시도 버튼 */}
              {selectedCommand.status === "실패" && (
                <button className="w-full h-9 bg-[#0ea5e9] text-white rounded-lg text-[13px] font-semibold hover:bg-[#0284c7] transition-colors">
                  명령 재실행
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
