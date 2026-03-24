import { Home, ChevronRight, RefreshCw, Power, Tablet, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

export function RemoteControlPage() {
  const recentCommands = [
    {
      id: "CMD-001",
      deviceId: "BISD001",
      stationName: "강남역 1번출구",
      command: "상태 재조회",
      status: "완료",
      requestedAt: "2025-02-02 10:30",
      completedAt: "2025-02-02 10:30",
    },
    {
      id: "CMD-002",
      deviceId: "BISD003",
      stationName: "서초역 3번출구",
      command: "단말 재부팅",
      status: "진행중",
      requestedAt: "2025-02-02 10:25",
      completedAt: null,
    },
    {
      id: "CMD-003",
      deviceId: "BISD008",
      stationName: "인천시청역 앞",
      command: "통신 재연결",
      status: "완료",
      requestedAt: "2025-02-02 10:20",
      completedAt: "2025-02-02 10:21",
    },
    {
      id: "CMD-004",
      deviceId: "BISD004",
      stationName: "교대역 앞",
      command: "디스플레이 새로고침",
      status: "실패",
      requestedAt: "2025-02-02 10:15",
      completedAt: "2025-02-02 10:16",
    },
    {
      id: "CMD-005",
      deviceId: "BISD002",
      stationName: "역삼역 2번출구",
      command: "런타임 재시작",
      status: "완료",
      requestedAt: "2025-02-02 10:10",
      completedAt: "2025-02-02 10:11",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "완료":
        return <Badge className="bg-green-100 text-green-800">완료</Badge>;
      case "진행중":
        return <Badge className="bg-blue-100 text-blue-800">진행중</Badge>;
      case "실패":
        return <Badge className="bg-red-100 text-red-800">실패</Badge>;
      case "대기":
        return <Badge className="bg-gray-100 text-gray-800">대기</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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
            <button className="border-[1.5px] border-[#e2e7ef] rounded-lg h-auto py-6 flex flex-col items-center gap-2 hover:bg-[#f8fafc] hover:border-[#0ea5e9] transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-[13px] text-[#0f172a] font-medium">상태 재조회</span>
              <span className="text-[11px] text-[#64748b]">선택한 단말</span>
            </button>

            <button className="border-[1.5px] border-[#e2e7ef] rounded-lg h-auto py-6 flex flex-col items-center gap-2 hover:bg-[#f8fafc] hover:border-[#0ea5e9] transition-colors">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Power className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-[13px] text-[#0f172a] font-medium">단말 재부팅</span>
              <span className="text-[11px] text-[#64748b]">선택한 단말</span>
            </button>

            <button className="border-[1.5px] border-[#e2e7ef] rounded-lg h-auto py-6 flex flex-col items-center gap-2 hover:bg-[#f8fafc] hover:border-[#0ea5e9] transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Tablet className="w-6 h-6 text-green-600" fill="currentColor" />
              </div>
              <span className="text-[13px] text-[#0f172a] font-medium">화면 새로고침</span>
              <span className="text-[11px] text-[#64748b]">선택한 단말</span>
            </button>

            <button className="border-[1.5px] border-[#e2e7ef] rounded-lg h-auto py-6 flex flex-col items-center gap-2 hover:bg-[#f8fafc] hover:border-[#0ea5e9] transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-[13px] text-[#0f172a] font-medium">전체 동기화</span>
              <span className="text-[11px] text-[#64748b]">모든 단말</span>
            </button>
          </div>
        </div>

        {/* Command History */}
        <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
            <h2 className="text-[14px] text-[#0f172a] font-semibold">명령 이력</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#99a1af]" />
                <input
                  placeholder="단말 ID 또는 정류장 검색..."
                  className="w-80 h-9 bg-[#f3f3f5] border-0 rounded-lg pl-10 pr-3 text-[13px] placeholder:text-[#717182]"
                />
              </div>
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
                <th className="px-6 py-3 text-left text-[12px] text-[#64748b] font-semibold">액션</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e7ef]">
              {recentCommands.map((cmd) => (
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
                    <button className="text-[#0ea5e9] text-[13px] hover:underline">
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
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-4">
            <p className="text-[12px] text-[#64748b] mb-1">오늘 실행된 명령</p>
            <p className="text-[20px] text-[#0f172a] font-bold">127</p>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-4">
            <p className="text-[12px] text-[#64748b] mb-1">성공률</p>
            <p className="text-[20px] text-[#16a34a] font-bold">98.4%</p>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-4">
            <p className="text-[12px] text-[#64748b] mb-1">평균 응답 시간</p>
            <p className="text-[20px] text-[#0ea5e9] font-bold">2.3초</p>
          </div>
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-4">
            <p className="text-[12px] text-[#64748b] mb-1">대기중인 명령</p>
            <p className="text-[20px] text-[#d97706] font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}