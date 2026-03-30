import { useState } from "react";
import {
  Search, X, ChevronDown, ChevronRight, RefreshCw, RotateCcw, Monitor, Camera, Zap,
  CheckCircle2, XCircle, Clock, AlertTriangle, Info,
  WifiOff, TrendingDown, LayoutGrid, AlertOctagon,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

// ── 타입 정의 ──────────────────────────────────────────────────────────
interface DeviceStatusResult {
  deviceStatus: "정상" | "주의" | "위험" | "오프라인";
  signalStrength?: number;      // 0–100 (wifi)
  cpuUsage?: number;            // 0–100 %
  ramUsage?: number;            // 0–100 %
  temperature?: number;         // °C
  humidity?: number;            // %
  batteryLevel?: number;        // 0–100 % (배터리형)
  socStage?: "NORMAL" | "LOW_BATTERY" | "CRITICAL" | "OFFLINE";
  uptime?: string;              // "3일 4시간"
  appVersion?: string;          // "v2.3.1"
  lastSyncTime?: string;
}

interface AppRestartResult {
  targetApp: string;            // "Agent" | "Updater"
  prevPid: number;
  newPid: number;
  elapsedMs: number;
  appStatus: "실행 중" | "중지됨";
}

interface DeviceRebootResult {
  bootCompletedAt: string;      // "2026.03.29 12:35:02"
  newUptime: string;            // "0분"
}

interface ScreenRefreshResult {
  refreshedAreas: string[];     // ["상단", "하단"] or ["전체"]
  refreshedAt: string;          // "2026.03.29 12:34:05"
  rendererStatus: string;       // "정상"
}

interface DeviceResult {
  deviceId: string;
  stationName: string;
  stationCode: string;
  customerName: string;
  execStatus: "수행 성공" | "수행 실패" | "요청 실패" | "요청 중";
  deviceStateAtExec?: string;
  failReason?: string;
  currentState?: string;
  resultCode?: string;
  deviceResponse?: string;
  timelineNote?: string;
  execStartTime?: string;
  execEndTime?: string;
  statusResult?: DeviceStatusResult;
  screenshotDataUrl?: string;
  appRestartResult?: AppRestartResult;
  rebootResult?: DeviceRebootResult;
  screenRefreshResult?: ScreenRefreshResult;
}

interface CommandLog {
  id: string;
  command: string;
  targets: string[];
  targetCount: number;
  requester: string;
  requesterOrg: string;
  requestedAt: string;
  overallStatus: "완료" | "진행중" | "부분 실패" | "실패";
  successCount: number;
  failCount: number;
  requestFailCount: number;
  pendingCount: number;
  deviceResults: DeviceResult[];
}

// ── 목 데이터 ──────────────────────────────────────────────────────────
const commandLogs: CommandLog[] = [
  {
    id: "CMD-2025-001", command: "상태 재조회",
    targets: ["강남역 1번출구", "역삼역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "완료", successCount: 2, failCount: 0, requestFailCount: 0, pendingCount: 0,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 12:34:02", execEndTime: "2026.03.29 12:34:05", statusResult: { deviceStatus: "정상", signalStrength: 92, cpuUsage: 18, ramUsage: 43, temperature: 38, humidity: 52, uptime: "14일 3시간", appVersion: "v2.3.1", lastSyncTime: "2026.03.29 12:34:01" } },
      { deviceId: "BISD002", stationName: "역삼역 2번출구", stationCode: "ST-002", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 12:34:02", execEndTime: "2026.03.29 12:34:06", statusResult: { deviceStatus: "정상", signalStrength: 78, cpuUsage: 22, ramUsage: 51, temperature: 40, humidity: 55, uptime: "14일 3시간", appVersion: "v2.3.1", lastSyncTime: "2026.03.29 12:34:02" } },
    ],
  },
  {
    id: "CMD-2025-002", command: "상태 재조회",
    targets: ["서초역 3번출구"], targetCount: 1,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "진행중", successCount: 0, failCount: 0, requestFailCount: 0, pendingCount: 1,
    deviceResults: [
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "요청 중", execStartTime: "2026.03.29 12:34:10" },
    ],
  },
  {
    id: "CMD-2025-003", command: "상태 재조회",
    targets: ["인천시청역 앞", "송도역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "부분 실패", successCount: 1, failCount: 1, requestFailCount: 0, pendingCount: 0,
    deviceResults: [
      { deviceId: "BISD008", stationName: "인천시청역 앞", stationCode: "ST-008", customerName: "인천교통공사", execStatus: "수행 성공", currentState: "지연", execStartTime: "2026.03.29 12:15:03", execEndTime: "2026.03.29 12:15:11", statusResult: { deviceStatus: "주의", signalStrength: 45, cpuUsage: 67, ramUsage: 78, temperature: 52, humidity: 61, uptime: "2일 7시간", appVersion: "v2.2.9", lastSyncTime: "2026.03.29 12:15:10" } },
      { deviceId: "BISD007", stationName: "송도역 2번출구", stationCode: "ST-007", customerName: "인천교통공사", execStatus: "수행 실패", deviceStateAtExec: "정상", currentState: "정상", resultCode: "0xE001", deviceResponse: "Process not responding: com.bims.app (pid 1234)", timelineNote: "앱 프로세스가 응답하지 않아 강제 종료 실패", failReason: "프로세스 응답 없음", execStartTime: "2026.03.29 12:15:03", execEndTime: "2026.03.29 12:15:35" },
    ],
  },
  {
    id: "CMD-2025-004", command: "상태 재조회",
    targets: ["강남역 1번출구"], targetCount: 1,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "진행중", successCount: 0, failCount: 0, requestFailCount: 0, pendingCount: 1,
    deviceResults: [
      { deviceId: "BISD004", stationName: "강남역 1번출구", stationCode: "ST-004", customerName: "서울버스", execStatus: "요청 중" },
    ],
  },
  {
    id: "CMD-2025-005", command: "상태 재조회",
    targets: ["강남역 1번출구", "역삼역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "진행중", successCount: 0, failCount: 0, requestFailCount: 0, pendingCount: 2,
    deviceResults: [
      { deviceId: "BISD005", stationName: "강남역 1번출구", stationCode: "ST-005", customerName: "서울버스", execStatus: "요청 중" },
      { deviceId: "BISD006", stationName: "역삼역 2번출구", stationCode: "ST-006", customerName: "서울버스", execStatus: "요청 중" },
    ],
  },
  {
    id: "CMD-2025-006", command: "앱 재시작",
    targets: ["강남역 1번출구", "역삼역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 13:10",
    overallStatus: "완료", successCount: 2, failCount: 0, requestFailCount: 0, pendingCount: 0,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 13:10:02", execEndTime: "2026.03.29 13:10:05", appRestartResult: { targetApp: "Agent", prevPid: 1234, newPid: 1587, elapsedMs: 2840, appStatus: "실행 중" } },
      { deviceId: "BISD002", stationName: "역삼역 2번출구", stationCode: "ST-002", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 13:10:02", execEndTime: "2026.03.29 13:10:06", appRestartResult: { targetApp: "Agent", prevPid: 2201, newPid: 2356, elapsedMs: 3120, appStatus: "실행 중" } },
    ],
  },
  {
    id: "CMD-2025-007", command: "단말 재부팅",
    targets: ["서초역 3번출구"], targetCount: 1,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 14:00",
    overallStatus: "완료", successCount: 1, failCount: 0, requestFailCount: 0, pendingCount: 0,
    deviceResults: [
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 14:00:05", execEndTime: "2026.03.29 14:00:38", rebootResult: { bootCompletedAt: "2026.03.29 14:00:38", newUptime: "0분" } },
    ],
  },
  {
    id: "CMD-2025-008", command: "화면 전체 갱신",
    targets: ["강남역 1번출구", "역삼역 2번출구", "서초역 3번출구"], targetCount: 3,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 15:20",
    overallStatus: "완료", successCount: 3, failCount: 0, requestFailCount: 0, pendingCount: 0,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 15:20:03", execEndTime: "2026.03.29 15:20:07", screenRefreshResult: { refreshedAreas: ["전체"], refreshedAt: "2026.03.29 15:20:07", rendererStatus: "정상" } },
      { deviceId: "BISD002", stationName: "역삼역 2번출구", stationCode: "ST-002", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 15:20:03", execEndTime: "2026.03.29 15:20:08", screenRefreshResult: { refreshedAreas: ["전체"], refreshedAt: "2026.03.29 15:20:08", rendererStatus: "정상" } },
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 15:20:03", execEndTime: "2026.03.29 15:20:09", screenRefreshResult: { refreshedAreas: ["전체"], refreshedAt: "2026.03.29 15:20:09", rendererStatus: "정상" } },
    ],
  },
];

// ── 제어 명령 목록 ─────────────────────────────────────────────────────
const COMMANDS = [
  { key: "상태 재조회",   icon: RefreshCw, iconBg: "bg-[#eff6ff]", iconColor: "text-[#155dfc]", desc: "단말의 현재 상태를 재조회 합니다." },
  { key: "앱 재시작",     icon: RotateCcw, iconBg: "bg-[#eff6ff]", iconColor: "text-[#155dfc]", desc: "BIS 애플리케이션 프로세스를 재시작합니다." },
  { key: "단말 재부팅",   icon: Zap,       iconBg: "bg-[#fff7ed]", iconColor: "text-[#ea580c]", desc: "단말 OS 레벨 재부팅을 실행합니다. (약 30초 소요)" },
  { key: "화면 전체 갱신",icon: Monitor,   iconBg: "bg-[#f0fdf4]", iconColor: "text-[#16a34a]", desc: "디스플레이 렌더러를 초기화하고 재로드합니다." },
  { key: "스크린샷",      icon: Camera,    iconBg: "bg-[#f0fdf4]", iconColor: "text-[#16a34a]", desc: "현재 화면을 캡처하여 서버에 업로드합니다." },
];

// ── 유틸 함수 ──────────────────────────────────────────────────────────
const getOverallStatusBadge = (status: CommandLog["overallStatus"]) => {
  switch (status) {
    case "완료":      return <span className="inline-flex items-center gap-1 px-[10px] py-[2px] rounded-[4px] bg-[#dcfce7] text-[#16a34a] text-[12px] font-medium whitespace-nowrap"><CheckCircle2 className="w-3 h-3 shrink-0" />완료</span>;
    case "진행중":    return <span className="inline-flex items-center gap-1 px-[10px] py-[2px] rounded-[4px] bg-[rgba(25,60,184,0.1)] text-[#193cb8] text-[12px] font-medium whitespace-nowrap"><Clock className="w-3 h-3 shrink-0" />진행 중</span>;
    case "부분 실패": return <span className="inline-flex items-center gap-1 px-[10px] py-[2px] rounded-[4px] bg-amber-100 text-amber-700 text-[12px] font-medium whitespace-nowrap"><AlertTriangle className="w-3 h-3 shrink-0" />부분 실패</span>;
    case "실패":      return <span className="inline-flex items-center gap-1 px-[10px] py-[2px] rounded-[4px] bg-red-100 text-red-700 text-[12px] font-medium whitespace-nowrap"><XCircle className="w-3 h-3 shrink-0" />실패</span>;
    default:          return <span>{status}</span>;
  }
};

const getExecStatusBadge = (status: DeviceResult["execStatus"]) => {
  switch (status) {
    case "수행 성공": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[11px]">수행 성공</Badge>;
    case "수행 실패": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-[11px]">수행 실패</Badge>;
    case "요청 실패": return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-[11px]">요청 실패</Badge>;
    case "요청 중":   return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-[11px]">요청 중</Badge>;
    default:          return <Badge>{status}</Badge>;
  }
};

// 요청·수행 결과 진행 바
function ResultBar({ log }: { log: CommandLog }) {
  const t = log.targetCount;
  const rFailPct = (log.requestFailCount / t) * 100;
  const eFailPct = (log.failCount / t) * 100;
  const SuccPct  = (log.successCount / t) * 100;
  const pendPct  = (log.pendingCount / t) * 100;
  return (
    <div className="flex h-[8px] w-full rounded-full overflow-hidden bg-[#e2e7ef]">
      <div style={{ width: `${rFailPct}%` }}  className="bg-[#f30009]" />
      <div style={{ width: `${eFailPct}%` }}  className="bg-[#f59e0b]" />
      <div style={{ width: `${SuccPct}%` }}   className="bg-[#00dc52]" />
      <div style={{ width: `${pendPct}%` }}   className="bg-[#cdcdcd]" />
    </div>
  );
}

// ── 목 데이터 (모달용) ─────────────────────────────────────────────────
const MOCK_CUSTOMERS = [
  { id: "CUS001", name: "서울시청",  deviceCount: 6, devices: [
    { id: "DEV-001", station: "강남역 1번출구", status: "정상" },
    { id: "DEV-002", station: "강남역 1번출구", status: "정상" },
    { id: "DEV-003", station: "역삼역 3번출구", status: "주의" },
    { id: "DEV-004", station: "역삼역 3번출구", status: "정상" },
    { id: "DEV-005", station: "선릉역 2번출구", status: "정상" },
    { id: "DEV-006", station: "선릉역 2번출구", status: "위험" },
  ]},
  { id: "CUS002", name: "경기도청",  deviceCount: 3, devices: [
    { id: "DEV-007", station: "판교역 5번출구", status: "정상" },
    { id: "DEV-008", station: "야탑역 1번출구", status: "정상" },
    { id: "DEV-009", station: "광교중앙 정류장", status: "주의" },
  ]},
  { id: "CUS003", name: "인천시청",  deviceCount: 1, devices: [
    { id: "DEV-010", station: "인천시청역 앞", status: "정상" },
  ]},
  { id: "CUS004", name: "부산시청",  deviceCount: 0, devices: [] },
];

const MOCK_DEVICES = MOCK_CUSTOMERS.flatMap((c) =>
  c.devices.map((d) => ({ ...d, customerName: c.name }))
);

const statusBadge = (s: string) => {
  if (s === "정상") return <span className="text-[11px] text-[#16a34a]">● {s}</span>;
  if (s === "주의") return <span className="text-[11px] text-[#f59e0b]">● {s}</span>;
  return <span className="text-[11px] text-[#dc2626]">● {s}</span>;
};

// ── 제어 대상 선택 모달 ────────────────────────────────────────────────
function CommandModal({
  command,
  onClose,
  onChangeCommand,
}: {
  command: typeof COMMANDS[number];
  onClose: () => void;
  onChangeCommand: () => void;
}) {
  const [targetScope, setTargetScope]       = useState<"전체 단말" | "고객사별 배포" | "단말 선택">("전체 단말");
  const [schedule, setSchedule]             = useState<"즉시 실행" | "예약 실행">("즉시 실행");
  const [customerSearch, setCustomerSearch] = useState("");
  const [deviceSearch, setDeviceSearch]     = useState("");
  const [checkedCustomers, setCheckedCustomers] = useState<Set<string>>(new Set());
  const [expandedCustomers, setExpandedCustomers] = useState<Set<string>>(new Set());
  const [checkedDevices, setCheckedDevices] = useState<Set<string>>(new Set());
  const [deviceCustomerFilter, setDeviceCustomerFilter] = useState<string>("전체");
  const Icon = command.icon;

  const filteredCustomers = MOCK_CUSTOMERS.filter((c) =>
    c.name.includes(customerSearch)
  );
  const filteredDevices = MOCK_DEVICES.filter((d) =>
    (deviceCustomerFilter === "전체" || d.customerName === deviceCustomerFilter) &&
    (d.id.toLowerCase().includes(deviceSearch.toLowerCase()) || d.station.includes(deviceSearch))
  );

  const toggleCustomer = (id: string) => {
    setCheckedCustomers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleExpandCustomer = (id: string) => {
    setExpandedCustomers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleDevice = (id: string) => {
    setCheckedDevices((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const selectAllCustomers = () =>
    setCheckedCustomers(new Set(filteredCustomers.map((c) => c.id)));
  const selectAllDevices = () =>
    setCheckedDevices(new Set(filteredDevices.map((d) => d.id)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[10px] w-[600px] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        {/* 헤더 */}
        <div className="h-[57px] px-6 flex items-center justify-between border-b border-[#e2e7ef] shrink-0">
          <span className="text-[16px] font-semibold text-[#0f172a]">제어 대상 선택</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-[#f1f5f9] text-[#64748b]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 바디 (스크롤 가능) */}
        <div className="overflow-y-auto flex-1 px-6 pt-6 pb-2 flex flex-col gap-6">
          {/* 제어 항목 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-semibold text-[#0f172a]">
                제어 항목 <span className="text-[#fb2c36]">*</span>
              </span>
              <button onClick={onChangeCommand} className="text-[13px] font-medium text-[#0ea5e9] hover:underline">
                변경
              </button>
            </div>
            <div className="bg-[#f8fafc] border-2 border-[#0ea5e9] rounded-[10px] h-[60px] px-[14px] flex items-center gap-3">
              <div className={`${command.iconBg} border border-[#e2e7ef] rounded-[10px] w-8 h-8 flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${command.iconColor}`} />
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#0f172a]">{command.key} 요청</p>
                <p className="text-[11px] text-[#94a3b8] mt-0.5">{command.desc}</p>
              </div>
            </div>
          </div>

          {/* 제어 대상 */}
          <div>
            <p className="text-[13px] font-semibold text-[#0f172a] mb-3">
              제어 대상 <span className="text-[#fb2c36]">*</span>
            </p>
            {/* 라디오 */}
            <div className="flex items-center gap-8 mb-4">
              {(["전체 단말", "고객사별 배포", "단말 선택"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="targetScope" checked={targetScope === opt}
                    onChange={() => setTargetScope(opt)} className="w-4 h-4 accent-[#0ea5e9]" />
                  <span className="text-[13px] font-medium text-[#0f172a]">{opt}</span>
                </label>
              ))}
            </div>

            {/* 고객사별 배포 패널 */}
            {targetScope === "고객사별 배포" && (
              <div className="border border-[#e2e7ef] rounded-[10px] overflow-hidden">
                {/* 검색 */}
                <div className="px-[14px] py-[12px] border-b border-[#e2e7ef]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input value={customerSearch} onChange={(e) => setCustomerSearch(e.target.value)}
                      placeholder="고객사명 검색..."
                      className="w-full h-9 pl-9 pr-3 border border-[#e2e7ef] rounded-[8px] text-[13px] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0ea5e9]" />
                  </div>
                </div>
                {/* 선택 카운트 */}
                <div className="px-[14px] py-[10px] flex items-center justify-between border-b border-[#e2e7ef] bg-[#f8fafc]">
                  <span className="text-[12px] text-[#64748b]">{checkedCustomers.size}개 고객사 선택됨</span>
                  <button onClick={selectAllCustomers} className="text-[12px] text-[#0ea5e9] font-medium hover:underline">전체 선택</button>
                </div>
                {/* 고객사 리스트 */}
                <div className="max-h-[280px] overflow-y-auto divide-y divide-[#e2e7ef]">
                  {filteredCustomers.map((c) => (
                    <div key={c.id}>
                      <div className="h-[62px] px-[14px] flex items-center gap-3">
                        <input type="checkbox" checked={checkedCustomers.has(c.id)}
                          onChange={() => toggleCustomer(c.id)}
                          className="w-4 h-4 accent-[#0ea5e9] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#0f172a]">{c.name}</p>
                          <p className="text-[11px] text-[#94a3b8]">{c.deviceCount}개 단말</p>
                        </div>
                        {c.deviceCount > 0 && (
                          <button onClick={() => toggleExpandCustomer(c.id)}
                            className="p-1 text-[#94a3b8] hover:text-[#0ea5e9]">
                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedCustomers.has(c.id) ? "rotate-180" : ""}`} />
                          </button>
                        )}
                      </div>
                      {/* 단말 하위 목록 */}
                      {expandedCustomers.has(c.id) && (
                        <div className="bg-[#f8fafc] divide-y divide-[#e2e7ef]">
                          {c.devices.map((d) => (
                            <div key={d.id} className="h-[48px] px-[14px] pl-10 flex items-center gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-medium text-[#0f172a]">{d.id}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-[11px] text-[#94a3b8]">{d.station}</p>
                                  <span>·</span>
                                  {statusBadge(d.status)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 단말 선택 패널 */}
            {targetScope === "단말 선택" && (
              <div className="border border-[#e2e7ef] rounded-[10px] overflow-hidden">
                {/* 검색 */}
                <div className="px-[14px] py-[12px] border-b border-[#e2e7ef] space-y-2">
                  {/* 고객사 필터 드롭다운 */}
                  <select
                    value={deviceCustomerFilter}
                    onChange={(e) => setDeviceCustomerFilter(e.target.value)}
                    className="w-full h-9 px-3 border border-[#e2e7ef] rounded-[8px] text-[13px] text-[#0f172a] bg-white focus:outline-none focus:border-[#0ea5e9] cursor-pointer"
                  >
                    <option value="전체">전체 고객사</option>
                    {MOCK_CUSTOMERS.map((c) => (
                      <option key={c.id} value={c.name}>{c.name} ({c.deviceCount}개 단말)</option>
                    ))}
                  </select>
                  {/* 단말/정류장 검색 */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input value={deviceSearch} onChange={(e) => setDeviceSearch(e.target.value)}
                      placeholder="단말 ID 또는 정류장명 검색..."
                      className="w-full h-9 pl-9 pr-3 border border-[#e2e7ef] rounded-[8px] text-[13px] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0ea5e9]" />
                  </div>
                </div>
                {/* 선택 카운트 */}
                <div className="px-[14px] py-[10px] flex items-center justify-between border-b border-[#e2e7ef] bg-[#f8fafc]">
                  <span className="text-[12px] text-[#64748b]">전체 {filteredDevices.length}개 중 {checkedDevices.size}개 단말 선택됨</span>
                  <button onClick={selectAllDevices} className="text-[12px] text-[#0ea5e9] font-medium hover:underline">전체 선택</button>
                </div>
                {/* 단말 리스트 — 고객사 그룹핑 */}
                <div className="max-h-[280px] overflow-y-auto">
                  {MOCK_CUSTOMERS
                    .filter((c) => deviceCustomerFilter === "전체" || c.name === deviceCustomerFilter)
                    .map((c) => {
                      const devices = c.devices.filter((d) =>
                        d.id.toLowerCase().includes(deviceSearch.toLowerCase()) ||
                        d.station.includes(deviceSearch)
                      );
                      if (devices.length === 0) return null;
                      const allChecked = devices.every((d) => checkedDevices.has(d.id));
                      const someChecked = devices.some((d) => checkedDevices.has(d.id));
                      const toggleGroup = () => {
                        setCheckedDevices((prev) => {
                          const next = new Set(prev);
                          allChecked
                            ? devices.forEach((d) => next.delete(d.id))
                            : devices.forEach((d) => next.add(d.id));
                          return next;
                        });
                      };
                      return (
                        <div key={c.id}>
                          {/* 고객사 그룹 헤더 */}
                          <div className="h-[36px] px-[14px] flex items-center gap-3 bg-[#f8fafc] border-b border-[#e2e7ef] sticky top-0">
                            <input
                              type="checkbox"
                              checked={allChecked}
                              ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
                              onChange={toggleGroup}
                              className="w-4 h-4 accent-[#0ea5e9] shrink-0"
                            />
                            <span className="text-[12px] font-semibold text-[#0f172a]">{c.name}</span>
                            <span className="text-[11px] text-[#94a3b8] ml-1">{devices.length}개 단말</span>
                          </div>
                          {/* 단말 목록 */}
                          <div className="divide-y divide-[#e2e7ef]">
                            {devices.map((d) => (
                              <div key={d.id} className="h-[48px] px-[14px] pl-10 flex items-center gap-3">
                                <input type="checkbox" checked={checkedDevices.has(d.id)}
                                  onChange={() => toggleDevice(d.id)}
                                  className="w-4 h-4 accent-[#0ea5e9] shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] font-medium text-[#0f172a]">{d.id}</p>
                                  <div className="flex items-center gap-1.5">
                                    <p className="text-[11px] text-[#94a3b8] truncate">{d.station}</p>
                                    <span className="text-[11px] text-[#94a3b8]">·</span>
                                    {statusBadge(d.status)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* 제어 일정 */}
          <div>
            <p className="text-[13px] font-semibold text-[#0f172a] mb-3">
              제어 일정 <span className="text-[#fb2c36]">*</span>
            </p>
            <div className="flex items-center gap-8">
              {(["즉시 실행", "예약 실행"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="schedule" checked={schedule === opt}
                    onChange={() => setSchedule(opt)} className="w-4 h-4 accent-[#0ea5e9]" />
                  <span className="text-[13px] font-medium text-[#0f172a]">{opt}</span>
                </label>
              ))}
              {schedule === "예약 실행" && (
                <div className="flex items-center gap-2 ml-2">
                  <input type="date" className="h-8 px-3 border border-[#e2e7ef] rounded-[8px] text-[12px] focus:outline-none focus:border-[#0ea5e9]" />
                  <input type="time" className="h-8 px-3 border border-[#e2e7ef] rounded-[8px] text-[12px] focus:outline-none focus:border-[#0ea5e9]" />
                </div>
              )}
            </div>
          </div>

          {/* 오프라인 안내 */}
          <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] px-4 py-[14px]">
            <p className="text-[12px] text-[#64748b]">오프라인 상태의 단말에는 명령 요청이 되지 않습니다.</p>
          </div>
        </div>

        {/* 푸터 */}
        <div className="h-[69px] px-6 flex items-center justify-end gap-3 border-t border-[#e2e7ef] shrink-0">
          <button onClick={onClose}
            className="h-9 px-5 bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[13px] font-medium text-[#0a0a0a] hover:bg-[#f8fafc]">
            취소
          </button>
          <button className="h-9 px-5 bg-[#0ea5e9] rounded-[8px] text-[13px] font-medium text-white hover:bg-[#0284c7]">
            업로드
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 단말 상세 패널 (오버레이) ──────────────────────────────────────────
function SignalBar({ value }: { value: number }) {
  const color = value >= 70 ? "#16a34a" : value >= 40 ? "#f59e0b" : "#dc2626";
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-[2px] h-4">
        {[25, 50, 75, 100].map((threshold, i) => (
          <div key={i} style={{ height: `${(i + 1) * 4}px`, width: "4px", borderRadius: "1px", background: value >= threshold ? color : "#e2e7ef" }} />
        ))}
      </div>
      <span className="text-[12px]" style={{ color }}>{value}%</span>
    </div>
  );
}

function DeviceDetailOverlay({ device, commandType, onClose }: { device: DeviceResult; commandType: string; onClose: () => void }) {
  const isFail    = device.execStatus === "수행 실패";
  const isReqFail = device.execStatus === "요청 실패";

  const infoRows = [
    { label: "단말 ID",            value: device.deviceId },
    { label: "정류장명 (코드)",     value: `${device.stationName} (${device.stationCode})` },
    { label: "고객사명",            value: device.customerName },
    { label: "결과 코드",           value: device.resultCode ?? "—",           hidden: !isFail },
    { label: "장치 응답",           value: device.deviceResponse ?? "—",        hidden: !(isFail && device.deviceResponse) },
    { label: "타임라인 최종 이벤트",value: device.timelineNote ?? "—",          hidden: !(isFail && device.timelineNote) },
    { label: "실행 당시 단말 상태", value: device.deviceStateAtExec ?? "—",     hidden: !isFail },
    { label: "현재 단말 상태",      value: device.currentState ?? "—",          hidden: isReqFail },
    { label: "수행 시작",           value: device.execStartTime ?? "—",         hidden: isReqFail },
    { label: "수행 종료",           value: device.execEndTime ?? "—",           hidden: isReqFail },
  ].filter((r) => !r.hidden);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-[60]" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[520px] bg-white shadow-2xl z-[70] flex flex-col">
        <div className="px-5 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#0f172a]">{device.deviceId}</h3>
            <p className="text-[12px] text-[#64748b] mt-0.5">{device.stationName}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          <div className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-[8px]">
            <span className="text-[12px] text-[#64748b]">수행 상태</span>
            {getExecStatusBadge(device.execStatus)}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#0f172a] mb-2">단말 정보</p>
            <div className="space-y-0">
              {infoRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b] shrink-0">{label}</span>
                  <span className="text-[12px] text-[#0f172a] text-right ml-4 break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#0f172a] mb-2">수행 내역</p>
            <div className="bg-[#f8fafc] rounded-[8px] px-4 py-3 text-[12px] text-[#64748b]">
              {device.execStatus === "수행 성공" ? "명령이 성공적으로 수행되었습니다."
                : device.execStatus === "요청 중" ? "단말에 명령 전달 대기 중입니다."
                : device.execStatus === "요청 실패" ? `단말이 명령을 수신하지 못했습니다. ${device.failReason ? `(${device.failReason})` : ""}`
                : `명령 전달 후 실행에 실패했습니다. ${device.failReason ? `사유: ${device.failReason}` : ""}`}
            </div>
          </div>

          {/* ── 수행 결과 상세 (명령별) ── */}
          {device.execStatus === "수행 성공" && commandType === "상태 재조회" && device.statusResult && (
            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-3">수행 결과 상세</p>
              {/* 상태 카드 */}
              <div className={`rounded-[8px] px-4 py-3 mb-3 flex items-center justify-between ${
                device.statusResult.deviceStatus === "정상" ? "bg-[#f0fdf4] border border-[#bbf7d0]"
                : device.statusResult.deviceStatus === "주의" ? "bg-[#fffbeb] border border-[#fde68a]"
                : "bg-[#fef2f2] border border-[#fecaca]"}`}>
                <span className="text-[12px] font-medium text-[#374151]">현재 단말 상태</span>
                <span className={`text-[13px] font-bold ${
                  device.statusResult.deviceStatus === "정상" ? "text-[#16a34a]"
                  : device.statusResult.deviceStatus === "주의" ? "text-[#d97706]"
                  : "text-[#dc2626]"}`}>
                  ● {device.statusResult.deviceStatus}
                </span>
              </div>
              {/* 상세 지표 */}
              <div className="space-y-0">
                {device.statusResult.signalStrength !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">신호 강도 (WiFi)</span>
                    <SignalBar value={device.statusResult.signalStrength} />
                  </div>
                )}
                {device.statusResult.cpuUsage !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">CPU 사용량</span>
                    <span className="text-[12px] text-[#0f172a]">{device.statusResult.cpuUsage}%</span>
                  </div>
                )}
                {device.statusResult.ramUsage !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">RAM 사용량</span>
                    <span className="text-[12px] text-[#0f172a]">{device.statusResult.ramUsage}%</span>
                  </div>
                )}
                {device.statusResult.temperature !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">온도</span>
                    <span className="text-[12px] text-[#0f172a]">{device.statusResult.temperature}°C</span>
                  </div>
                )}
                {device.statusResult.humidity !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">습도</span>
                    <span className="text-[12px] text-[#0f172a]">{device.statusResult.humidity}%</span>
                  </div>
                )}
                {device.statusResult.batteryLevel !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">배터리 잔량</span>
                    <span className={`text-[12px] font-medium ${device.statusResult.batteryLevel >= 50 ? "text-[#16a34a]" : device.statusResult.batteryLevel >= 20 ? "text-[#d97706]" : "text-[#dc2626]"}`}>{device.statusResult.batteryLevel}%</span>
                  </div>
                )}
                {device.statusResult.socStage && (
                  <div className="flex justify-between items-center py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">SOC 단계</span>
                    <span className={`text-[12px] font-medium ${device.statusResult.socStage === "NORMAL" ? "text-[#16a34a]" : device.statusResult.socStage === "LOW_BATTERY" ? "text-[#d97706]" : "text-[#dc2626]"}`}>{device.statusResult.socStage}</span>
                  </div>
                )}
                {device.statusResult.uptime && (
                  <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">가동 시간</span>
                    <span className="text-[12px] text-[#0f172a]">{device.statusResult.uptime}</span>
                  </div>
                )}
                {device.statusResult.appVersion && (
                  <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">앱 버전</span>
                    <span className="text-[12px] text-[#0f172a] font-mono">{device.statusResult.appVersion}</span>
                  </div>
                )}
                {device.statusResult.lastSyncTime && (
                  <div className="flex justify-between py-2">
                    <span className="text-[12px] text-[#64748b]">마지막 동기화</span>
                    <span className="text-[12px] text-[#0f172a]">{device.statusResult.lastSyncTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {device.execStatus === "수행 성공" && commandType === "스크린샷" && (
            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-3">캡처 화면</p>
              {device.screenshotDataUrl ? (
                <img src={device.screenshotDataUrl} alt="캡처 화면" className="w-full rounded-[8px] border border-[#e2e7ef]" />
              ) : (
                <div className="w-full aspect-video bg-[#f8fafc] border border-[#e2e7ef] rounded-[8px] flex flex-col items-center justify-center gap-2">
                  <Camera className="w-8 h-8 text-[#cbd5e1]" />
                  <span className="text-[12px] text-[#94a3b8]">캡처 이미지 없음</span>
                </div>
              )}
              {device.execEndTime && (
                <p className="text-[11px] text-[#94a3b8] mt-2 text-right">캡처 일시: {device.execEndTime}</p>
              )}
            </div>
          )}

          {device.execStatus === "수행 성공" && commandType === "앱 재시작" && device.appRestartResult && (
            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-3">수행 결과 상세</p>
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px] px-4 py-3 mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#374151]">앱 상태</span>
                <span className="text-[13px] font-bold text-[#16a34a]">● {device.appRestartResult.appStatus}</span>
              </div>
              <div className="space-y-0">
                <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b]">재시작 대상 앱</span>
                  <span className="text-[12px] text-[#0f172a] font-mono">{device.appRestartResult.targetApp}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b]">이전 PID</span>
                  <span className="text-[12px] text-[#0f172a] font-mono">{device.appRestartResult.prevPid}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b]">새 PID</span>
                  <span className="text-[12px] text-[#0f172a] font-mono">{device.appRestartResult.newPid}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] text-[#64748b]">재시작 소요 시간</span>
                  <span className="text-[12px] text-[#0f172a]">{(device.appRestartResult.elapsedMs / 1000).toFixed(1)}초</span>
                </div>
              </div>
            </div>
          )}

          {device.execStatus === "수행 성공" && commandType === "단말 재부팅" && device.rebootResult && (
            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-3">수행 결과 상세</p>
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px] px-4 py-3 mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#374151]">재부팅 완료</span>
                <span className="text-[13px] font-bold text-[#16a34a]">● 정상 완료</span>
              </div>
              <div className="space-y-0">
                <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b]">재부팅 완료 시각</span>
                  <span className="text-[12px] text-[#0f172a]">{device.rebootResult.bootCompletedAt}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] text-[#64748b]">새 가동 시간</span>
                  <span className="text-[12px] text-[#0f172a]">{device.rebootResult.newUptime}</span>
                </div>
              </div>
            </div>
          )}

          {device.execStatus === "수행 성공" && commandType === "화면 전체 갱신" && device.screenRefreshResult && (
            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-3">수행 결과 상세</p>
              <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px] px-4 py-3 mb-3 flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#374151]">렌더러 상태</span>
                <span className="text-[13px] font-bold text-[#16a34a]">● {device.screenRefreshResult.rendererStatus}</span>
              </div>
              <div className="space-y-0">
                <div className="flex justify-between py-2 border-b border-[#f1f5f9]">
                  <span className="text-[12px] text-[#64748b]">갱신 영역</span>
                  <span className="text-[12px] text-[#0f172a]">{device.screenRefreshResult.refreshedAreas.join(", ")}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] text-[#64748b]">갱신 완료 시각</span>
                  <span className="text-[12px] text-[#0f172a]">{device.screenRefreshResult.refreshedAt}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────
export function RemoteControlPage() {
  const [selectedLog, setSelectedLog]           = useState<CommandLog | null>(null);
  const [selectedDevice, setSelectedDevice]     = useState<DeviceResult | null>(null);
  const [modalCommand, setModalCommand]         = useState<typeof COMMANDS[number] | null>(null);
  const [searchQuery, setSearchQuery]           = useState("");
  const [statusFilter, setStatusFilter]         = useState("전체");
  const [cmdFilter, setCmdFilter]               = useState("전체");

  // 요약 통계
  const total   = commandLogs.reduce((s, l) => s + l.targetCount, 0);
  const pending = commandLogs.reduce((s, l) => s + l.pendingCount, 0);
  const reqFail = commandLogs.reduce((s, l) => s + l.requestFailCount, 0);
  const success = commandLogs.reduce((s, l) => s + l.successCount, 0);
  const fail    = commandLogs.reduce((s, l) => s + l.failCount, 0);

  const filteredLogs = commandLogs.filter((log) => {
    const matchSearch =
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.command.includes(searchQuery) ||
      log.requester.includes(searchQuery) ||
      log.targets.some((t) => t.includes(searchQuery));
    const matchStatus = statusFilter === "전체" || log.overallStatus === statusFilter;
    const matchCmd    = cmdFilter === "전체" || log.command === cmdFilter;
    return matchSearch && matchStatus && matchCmd;
  });

  return (
    <div className="flex-1 bg-[#f8fafc] overflow-auto">
      {/* 브레드크럼 */}
      <div className="bg-white border-b border-[#e2e7ef] h-[56px] flex items-center px-6">
        <p className="text-[13px] text-[#64748b]">원격 관리 › 원격 제어</p>
      </div>

      <div className="p-6 space-y-5">
        {/* 페이지 제목 */}
        <div>
          <h1 className="text-[20px] font-bold text-[#0f172a] mb-1">원격 제어</h1>
          <p className="text-[13px] text-[#64748b]">단말 원격 명령 실행 및 이력 관리</p>
        </div>

        {/* ── 현황 카드 ─────────────────────────────────────────────── */}
        <div className="flex gap-4">
          {/* 단말별 요청 현황 */}
          <div className="bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] pt-4 px-4 pb-5 flex-1">
            <p className="text-[11px] font-semibold text-[#485669] mb-3">단말별 요청 현황</p>
            <div className="flex flex-wrap gap-[10px]">
              {[
                { label: "전체 요청 건", value: total,   icon: LayoutGrid,   valueColor: "text-[#155dfc]", active: true },
                { label: "요청 중",     value: pending,  icon: WifiOff,      valueColor: "text-[#364153]" },
                { label: "요청 실패",   value: reqFail,  icon: AlertOctagon, valueColor: "text-[#dc2626]" },
                { label: "수행 성공",   value: success,  icon: CheckCircle2, valueColor: "text-[#16a34a]" },
                { label: "수행 실패",   value: fail,     icon: TrendingDown, valueColor: "text-[#f59e0b]" },
              ].map(({ label, value, icon: Icon, valueColor, active }) => (
                <div
                  key={label}
                  className={`min-w-[100px] flex-1 h-[80px] border-2 rounded-[10px] pl-[14px] py-[14px] flex flex-col justify-between ${active ? "border-[#155dfc]" : "border-[#e2e7ef]"}`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#155dfc]" : "text-[#94a3b8]"}`} />
                  <div>
                    <p className={`text-[20px] font-bold leading-none ${valueColor}`}>{String(value).padStart(2, "0")}</p>
                    <p className="text-[12px] text-[#64748b] mt-0.5 whitespace-nowrap">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 위험 명령 현황 */}
          <div className="bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] pt-4 px-4 pb-5 w-[160px]">
            <p className="text-[11px] font-semibold text-[#485669] mb-3">위험 명령 현황</p>
            <div className="w-full h-[80px] border-2 border-[#155dfc] rounded-[10px] pl-[14px] py-[14px] flex flex-col justify-between">
              <LayoutGrid className="w-4 h-4 text-[#155dfc]" />
              <div>
                <p className="text-[20px] font-bold leading-none text-[#155dfc]">00</p>
                <p className="text-[12px] text-[#64748b] mt-0.5">위험 명령</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 원격 제어 실행 ─────────────────────────────────────────── */}
        <div className="bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] p-5">
          <h2 className="text-[14px] font-semibold text-[#0f172a] mb-4">원격 제어 실행</h2>
          <div className="grid grid-cols-5 gap-3">
            {COMMANDS.map(({ key, icon: Icon, iconBg, iconColor, desc }) => (
              <button
                key={key}
                onClick={() => setModalCommand(COMMANDS.find((c) => c.key === key)!)}
                title={desc}
                className="border border-[#e2e7ef] rounded-[10px] px-3 py-4 flex flex-col items-center gap-2.5 hover:border-[#0ea5e9] hover:bg-[#f0f9ff] transition-colors group"
              >
                <div className={`${iconBg} rounded-[10px] w-10 h-10 flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span className="text-[12px] font-medium text-[#0f172a] group-hover:text-[#0ea5e9] text-center leading-tight break-keep">{key}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── 제어 로그 ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* 필터 바 */}
          <div className="px-5 py-3 border-b border-[#e2e7ef] flex items-center gap-2 flex-wrap">
            <button className="h-8 px-3 bg-white border border-[#e2e7ef] rounded-lg text-[12px] text-[#64748b] flex items-center gap-1 hover:border-[#0ea5e9] whitespace-nowrap">
              명령 유형 <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button className="h-8 px-3 bg-white border border-[#e2e7ef] rounded-lg text-[12px] text-[#64748b] flex items-center gap-1 hover:border-[#0ea5e9] whitespace-nowrap">
              수행 상태 <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button className="h-8 px-3 bg-white border border-[#e2e7ef] rounded-lg text-[12px] text-[#64748b] flex items-center gap-1 hover:border-[#0ea5e9] whitespace-nowrap">
              요청자 <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <label className="flex items-center gap-1.5 text-[12px] text-[#64748b] cursor-pointer whitespace-nowrap">
              <input type="checkbox" className="rounded w-3.5 h-3.5" />
              조직 내 요청만 보기
            </label>
            <div className="flex items-center gap-2 ml-auto min-w-0">
              <div className="relative min-w-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#99a1af]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="단말 ID 또는 정류장명 검색"
                  className="w-[220px] h-8 bg-[#f3f3f5] border-0 rounded-lg pl-9 pr-3 text-[12px] placeholder:text-[#717182]"
                />
              </div>
              <button
                onClick={() => { setCmdFilter("전체"); setStatusFilter("전체"); setSearchQuery(""); }}
                className="h-8 px-3 bg-white border border-[#e2e7ef] rounded-lg text-[12px] text-[#64748b] hover:border-[#0ea5e9] whitespace-nowrap shrink-0"
              >
                초기화
              </button>
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#f8fafc] border-b-2 border-[#e2e7ef]">
              <tr>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#64748b] w-[120px] whitespace-nowrap">명령 유형</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#64748b]">제어 대상</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#64748b] w-[160px] whitespace-nowrap">요청자(조직)</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#64748b] w-[140px] whitespace-nowrap">요청 일시</th>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#64748b] w-[160px] whitespace-nowrap">요청·수행 결과</th>
                <th className="px-4 py-3 text-center text-[12px] font-semibold text-[#64748b] w-[100px] whitespace-nowrap">진행 단계</th>
                <th className="px-3 py-3 w-6" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e7ef]">
              {filteredLogs.map((log) => {
                const targetLabel =
                  log.targets.length === 1
                    ? `${log.targets[0]} (${log.deviceResults[0]?.deviceId ?? ""})`
                    : `${log.targets[0]} 외 ${log.targets.length - 1}개소`;
                return (
                  <tr
                    key={log.id}
                    className={`h-[43px] hover:bg-[#f8fafc] cursor-pointer transition-colors ${selectedLog?.id === log.id ? "bg-[#f0f9ff]" : ""}`}
                    onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                  >
                    <td className="px-4 py-2.5 text-[12px] font-medium text-[#212326] whitespace-nowrap">{log.command}</td>
                    <td className="px-4 py-2.5 text-[12px] text-[#212326]">{targetLabel}</td>
                    <td className="px-4 py-2.5 text-[12px] text-[#212326] whitespace-nowrap">
                      {log.requester} <span className="text-[#94a3b8]">({log.requesterOrg})</span>
                    </td>
                    <td className="px-4 py-2.5 text-[12px] text-[#212326] whitespace-nowrap">{log.requestedAt}</td>
                    <td className="px-4 py-2.5"><ResultBar log={log} /></td>
                    <td className="px-4 py-2.5 text-center">{getOverallStatusBadge(log.overallStatus)}</td>
                    <td className="px-3 py-2.5">
                      <ChevronRight className={`w-4 h-4 text-[#94a3b8] transition-transform ${selectedLog?.id === log.id ? "rotate-90" : ""}`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          </div>
          {/* 페이지네이션 */}
          <div className="px-6 py-3 border-t border-[#e2e7ef] flex items-center justify-between">
            <span className="text-[12px] text-[#64748b]">전체 {commandLogs.length}건</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <button key={p} className={`w-7 h-7 rounded-md text-[12px] transition-colors ${p === 1 ? "bg-[#0ea5e9] text-white" : "text-[#64748b] hover:bg-[#f1f5f9]"}`}>{p}</button>
              ))}
              <span className="text-[12px] text-[#64748b] mx-1">...</span>
              <button className="w-7 h-7 rounded-md text-[12px] text-[#64748b] hover:bg-[#f1f5f9]">20</button>
              <button className="w-7 h-7 rounded-md text-[12px] text-[#64748b] hover:bg-[#f1f5f9]">›</button>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-[#64748b]">페이지당</span>
              {[10, 50, 100].map((n) => (
                <button key={n} className={`w-8 h-7 rounded-md text-[12px] transition-colors ${n === 50 ? "bg-[#0ea5e9] text-white" : "text-[#64748b] hover:bg-[#f1f5f9]"}`}>{n}</button>
              ))}
              <span className="text-[12px] text-[#64748b]">건</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 제어 상세 정보 패널 ────────────────────────────────────────── */}
      {selectedLog && (
        <>
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => { setSelectedLog(null); setSelectedDevice(null); }} />
          <div className="fixed right-0 top-0 h-full w-[520px] bg-white shadow-2xl z-50 flex flex-col">
            <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-bold text-[#0f172a]">{selectedLog.id}</h2>
                <p className="text-[12px] text-[#64748b] mt-0.5">{selectedLog.command}</p>
              </div>
              <button onClick={() => { setSelectedLog(null); setSelectedDevice(null); }} className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              <div className="flex items-center justify-between p-3 bg-[#f8fafc] rounded-[8px]">
                <span className="text-[13px] text-[#64748b]">전체 수행 상태</span>
                {getOverallStatusBadge(selectedLog.overallStatus)}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#0f172a] mb-3">제어 기본 정보</p>
                {[
                  { label: "제어 항목",   value: selectedLog.command },
                  { label: "요청자 (조직)", value: `${selectedLog.requester} (${selectedLog.requesterOrg})` },
                  { label: "요청 일시",   value: selectedLog.requestedAt },
                  { label: "대상 단말 수", value: `${selectedLog.targetCount}대` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-[#f1f5f9]">
                    <span className="text-[12px] text-[#64748b]">{label}</span>
                    <span className="text-[13px] text-[#0f172a]">{value}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#0f172a] mb-3">수행 결과 요약</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: "수행 성공", value: selectedLog.successCount,    color: "text-green-700",  bg: "bg-green-50"  },
                    { label: "수행 실패", value: selectedLog.failCount,        color: "text-red-700",    bg: "bg-red-50"    },
                    { label: "요청 실패", value: selectedLog.requestFailCount, color: "text-orange-700", bg: "bg-orange-50" },
                    { label: "요청 중",   value: selectedLog.pendingCount,     color: "text-blue-700",   bg: "bg-blue-50"   },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} className={`${bg} rounded-[8px] p-3 text-center`}>
                      <p className="text-[11px] text-[#64748b] mb-1">{label}</p>
                      <p className={`text-[18px] font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#0f172a] mb-1">단말별 결과</p>
                <p className="text-[11px] text-[#94a3b8] mb-2">단말을 클릭하면 상세 정보를 확인할 수 있습니다.</p>
                <div className="border border-[#e2e7ef] rounded-[8px] overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#f8fafc]">
                      <tr>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#64748b]">단말 ID</th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#64748b]">정류장명</th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#64748b]">고객사</th>
                        <th className="px-4 py-2.5 text-left text-[11px] font-semibold text-[#64748b]">수행 상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2e7ef]">
                      {selectedLog.deviceResults.map((r) => (
                        <tr key={r.deviceId} className="hover:bg-[#f8fafc] cursor-pointer transition-colors" onClick={() => setSelectedDevice(r)}>
                          <td className="px-4 py-3 text-[12px] text-[#0ea5e9] font-medium">{r.deviceId}</td>
                          <td className="px-4 py-3">
                            <p className="text-[12px] text-[#0f172a]">{r.stationName}</p>
                            {r.execStatus === "수행 실패" && r.failReason && (
                              <p className="text-[11px] text-[#ef4444] mt-0.5">{r.failReason}</p>
                            )}
                            {r.execStatus === "수행 실패" && r.deviceStateAtExec && (
                              <p className="text-[11px] text-[#94a3b8] mt-0.5">실행 당시: {r.deviceStateAtExec}</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-[12px] text-[#64748b]">{r.customerName}</td>
                          <td className="px-4 py-3">{getExecStatusBadge(r.execStatus)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {selectedDevice && (
            <DeviceDetailOverlay device={selectedDevice} commandType={selectedLog.command} onClose={() => setSelectedDevice(null)} />
          )}
        </>
      )}

      {/* ── 제어 대상 선택 모달 ────────────────────────────────────────── */}
      {modalCommand && (
        <CommandModal
          command={modalCommand}
          onClose={() => setModalCommand(null)}
          onChangeCommand={() => setModalCommand(null)}
        />
      )}
    </div>
  );
}
