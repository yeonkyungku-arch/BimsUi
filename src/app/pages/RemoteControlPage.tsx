import { useState } from "react";
import {
  Search, X, ChevronDown, ChevronRight, RefreshCw, RotateCcw, Monitor, Camera, Zap,
  CheckCircle2, XCircle, Clock, AlertTriangle, Info, ArrowRight,
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
  execStatus: "수행 성공" | "수행 실패" | "응답 없음" | "수행 중" | "전송 대기" | "요청됨" | "승인 대기" | "취소됨";
  failReason?: string;    // 실행 실패 원인 (스펙: 실행 실패 (원인))
  resultValue?: string;   // 단말이 반환한 결과 값 (스펙: 결과 값)
  currentState?: string;
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
  overallStatus: "완료" | "진행중" | "부분 실패" | "실패" | "승인 대기";
  succeededCount: number;
  failedCount: number;
  timeoutCount: number;
  pendingCount: number;
  cancelledCount: number;
  deviceResults: DeviceResult[];
}

// ── 목 데이터 ──────────────────────────────────────────────────────────
const commandLogs: CommandLog[] = [
  {
    id: "CMD-2025-001", command: "상태 재조회",
    targets: ["강남역 1번출구", "역삼역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "완료", succeededCount: 2, failedCount: 0, timeoutCount: 0, pendingCount: 0, cancelledCount: 0,
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
    overallStatus: "진행중", succeededCount: 0, failedCount: 0, timeoutCount: 0, pendingCount: 1, cancelledCount: 0,
    deviceResults: [
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "수행 중", execStartTime: "2026.03.29 12:34:10" },
    ],
  },
  {
    id: "CMD-2025-003", command: "상태 재조회",
    targets: ["인천시청역 앞", "송도역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "부분 실패", succeededCount: 1, failedCount: 1, timeoutCount: 0, pendingCount: 0, cancelledCount: 0,
    deviceResults: [
      { deviceId: "BISD008", stationName: "인천시청역 앞", stationCode: "ST-008", customerName: "인천교통공사", execStatus: "수행 성공", currentState: "지연", execStartTime: "2026.03.29 12:15:03", execEndTime: "2026.03.29 12:15:11", statusResult: { deviceStatus: "주의", signalStrength: 45, cpuUsage: 67, ramUsage: 78, temperature: 52, humidity: 61, uptime: "2일 7시간", appVersion: "v2.2.9", lastSyncTime: "2026.03.29 12:15:10" } },
      { deviceId: "BISD007", stationName: "송도역 2번출구", stationCode: "ST-007", customerName: "인천교통공사", execStatus: "수행 실패", currentState: "정상", failReason: "프로세스 응답 없음", resultValue: "Process not responding: com.bims.app (pid 1234)", execStartTime: "2026.03.29 12:15:03", execEndTime: "2026.03.29 12:15:35" },
    ],
  },
  {
    id: "CMD-2025-004", command: "상태 재조회",
    targets: ["강남역 1번출구", "역삼역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:34",
    overallStatus: "부분 실패", succeededCount: 1, failedCount: 0, timeoutCount: 1, pendingCount: 0, cancelledCount: 0,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 12:36:01", execEndTime: "2026.03.29 12:36:04", statusResult: { deviceStatus: "정상", signalStrength: 88, cpuUsage: 20, ramUsage: 45, temperature: 37, humidity: 50, uptime: "14일 4시간", appVersion: "v2.3.1", lastSyncTime: "2026.03.29 12:36:01" } },
      { deviceId: "BISD004", stationName: "역삼역 2번출구", stationCode: "ST-004", customerName: "서울버스", execStatus: "응답 없음", failReason: "단말 응답 대기 시간 초과 (30초)", execStartTime: "2026.03.29 12:36:01", execEndTime: "2026.03.29 12:36:31" },
    ],
  },
  {
    id: "CMD-2025-005", command: "단말 재부팅",
    targets: ["강남역 1번출구"], targetCount: 1,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 12:38",
    overallStatus: "승인 대기", succeededCount: 0, failedCount: 0, timeoutCount: 0, pendingCount: 1, cancelledCount: 0,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "승인 대기", execStartTime: "2026.03.29 12:38:00" },
    ],
  },
  {
    id: "CMD-2025-006", command: "앱 재시작",
    targets: ["강남역 1번출구", "역삼역 2번출구"], targetCount: 2,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 13:10",
    overallStatus: "완료", succeededCount: 2, failedCount: 0, timeoutCount: 0, pendingCount: 0, cancelledCount: 0,
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
    overallStatus: "완료", succeededCount: 1, failedCount: 0, timeoutCount: 0, pendingCount: 0, cancelledCount: 0,
    deviceResults: [
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 14:00:05", execEndTime: "2026.03.29 14:00:38", rebootResult: { bootCompletedAt: "2026.03.29 14:00:38", newUptime: "0분" } },
    ],
  },
  {
    id: "CMD-2025-008", command: "화면 전체 갱신",
    targets: ["강남역 1번출구", "역삼역 2번출구", "서초역 3번출구"], targetCount: 3,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 15:20",
    overallStatus: "완료", succeededCount: 3, failedCount: 0, timeoutCount: 0, pendingCount: 0, cancelledCount: 0,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 15:20:03", execEndTime: "2026.03.29 15:20:07", screenRefreshResult: { refreshedAreas: ["전체"], refreshedAt: "2026.03.29 15:20:07", rendererStatus: "정상" } },
      { deviceId: "BISD002", stationName: "역삼역 2번출구", stationCode: "ST-002", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 15:20:03", execEndTime: "2026.03.29 15:20:08", screenRefreshResult: { refreshedAreas: ["전체"], refreshedAt: "2026.03.29 15:20:08", rendererStatus: "정상" } },
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "수행 성공", currentState: "정상", execStartTime: "2026.03.29 15:20:03", execEndTime: "2026.03.29 15:20:09", screenRefreshResult: { refreshedAreas: ["전체"], refreshedAt: "2026.03.29 15:20:09", rendererStatus: "정상" } },
    ],
  },
  {
    id: "CMD-2025-009", command: "상태 재조회",
    targets: ["강남역 1번출구", "역삼역 2번출구", "서초역 3번출구"], targetCount: 3,
    requester: "홍길동", requesterOrg: "서울시청",
    requestedAt: "2026.03.29 16:00",
    overallStatus: "진행중", succeededCount: 0, failedCount: 0, timeoutCount: 0, pendingCount: 2, cancelledCount: 1,
    deviceResults: [
      { deviceId: "BISD001", stationName: "강남역 1번출구", stationCode: "ST-001", customerName: "서울버스", execStatus: "전송 대기", execStartTime: "2026.03.29 16:00:01" },
      { deviceId: "BISD002", stationName: "역삼역 2번출구", stationCode: "ST-002", customerName: "서울버스", execStatus: "요청됨", execStartTime: "2026.03.29 16:00:01" },
      { deviceId: "BISD003", stationName: "서초역 3번출구", stationCode: "ST-003", customerName: "서울버스", execStatus: "취소됨", execStartTime: "2026.03.29 16:00:01" },
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
    case "승인 대기": return <span className="inline-flex items-center gap-1 px-[10px] py-[2px] rounded-[4px] bg-amber-100 text-amber-700 text-[12px] font-medium whitespace-nowrap"><Clock className="w-3 h-3 shrink-0" />승인 대기</span>;
    default:          return <span>{status}</span>;
  }
};

const getExecStatusBadge = (status: DeviceResult["execStatus"]) => {
  switch (status) {
    case "수행 성공": return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[11px]">수행 성공</Badge>;
    case "수행 실패": return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-[11px]">수행 실패</Badge>;
    case "응답 없음": return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-[11px]">응답 없음</Badge>;
    case "수행 중":   return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-[11px]">수행 중</Badge>;
    case "전송 대기": return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[11px]">전송 대기</Badge>;
    case "요청됨":    return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[11px]">요청됨</Badge>;
    case "승인 대기": return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-[11px]">승인 대기</Badge>;
    case "취소됨":    return <Badge className="bg-slate-100 text-slate-500 hover:bg-slate-100 text-[11px] line-through">취소됨</Badge>;
    default:          return <Badge>{status}</Badge>;
  }
};

// 요청·수행 결과 진행 바
function ResultBar({ log }: { log: CommandLog }) {
  const t = log.targetCount;
  const failedPct    = (log.failedCount / t) * 100;
  const timeoutPct   = (log.timeoutCount / t) * 100;
  const succeededPct = (log.succeededCount / t) * 100;
  const pendPct      = (log.pendingCount / t) * 100;
  const cancelPct    = (log.cancelledCount / t) * 100;
  return (
    <div className="flex h-[8px] w-full rounded-full overflow-hidden bg-[#e2e7ef]">
      <div style={{ width: `${failedPct}%` }}    className="bg-[#f30009]" />
      <div style={{ width: `${timeoutPct}%` }}   className="bg-[#f59e0b]" />
      <div style={{ width: `${succeededPct}%` }} className="bg-[#00dc52]" />
      <div style={{ width: `${pendPct}%` }}      className="bg-[#93c5fd]" />
      <div style={{ width: `${cancelPct}%` }}    className="bg-[#cdcdcd]" />
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
  const [targetScope, setTargetScope]       = useState<"전체 단말" | "단말 선택">("전체 단말");
  const [schedule, setSchedule]             = useState<"즉시 실행" | "예약 실행">("즉시 실행");
  const [deviceSearch, setDeviceSearch]     = useState("");
  const [checkedDevices, setCheckedDevices] = useState<Set<string>>(new Set());
  const Icon = command.icon;

  const allDevices = MOCK_DEVICES.filter((d) =>
    d.id.toLowerCase().includes(deviceSearch.toLowerCase()) || d.station.includes(deviceSearch)
  );

  const toggleDevice = (id: string) => {
    setCheckedDevices((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const selectAllDevices = () =>
    setCheckedDevices(new Set(allDevices.map((d) => d.id)));

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
              {(["전체 단말", "단말 선택"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="targetScope" checked={targetScope === opt}
                    onChange={() => setTargetScope(opt)} className="w-4 h-4 accent-[#0ea5e9]" />
                  <span className="text-[13px] font-medium text-[#0f172a]">{opt === "단말 선택" ? "고객사 / 단말 선택" : opt}</span>
                </label>
              ))}
            </div>

            {/* 고객사 > 단말 트리 선택 패널 */}
            {targetScope === "단말 선택" && (
              <div className="border border-[#e2e7ef] rounded-[10px] overflow-hidden">
                {/* 검색 */}
                <div className="px-[14px] py-[12px] border-b border-[#e2e7ef]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
                    <input value={deviceSearch} onChange={(e) => setDeviceSearch(e.target.value)}
                      placeholder="단말 ID 또는 정류장명 검색..."
                      className="w-full h-9 pl-9 pr-3 border border-[#e2e7ef] rounded-[8px] text-[13px] placeholder:text-[#94a3b8] focus:outline-none focus:border-[#0ea5e9]" />
                  </div>
                </div>
                {/* 선택 카운트 */}
                <div className="px-[14px] py-[10px] flex items-center justify-between border-b border-[#e2e7ef] bg-[#f8fafc]">
                  <span className="text-[12px] text-[#64748b]">전체 {allDevices.length}개 중 {checkedDevices.size}개 단말 선택됨</span>
                  <button onClick={selectAllDevices} className="text-[12px] text-[#0ea5e9] font-medium hover:underline">전체 선택</button>
                </div>
                {/* 고객사 > 단말 트리 */}
                <div className="max-h-[280px] overflow-y-auto">
                  {MOCK_CUSTOMERS.map((c) => {
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
                        <div className="h-[40px] px-[14px] flex items-center gap-3 bg-[#f8fafc] border-b border-[#e2e7ef] sticky top-0">
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

// ── 단말별 결과 아코디언 ────────────────────────────────────────────────
function DeviceResultAccordion({
  results,
  commandType,
  onOpenDetail,
}: {
  results: DeviceResult[];
  commandType: string;
  onOpenDetail: (r: DeviceResult) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div>
      <p className="text-[13px] font-semibold text-[#0f172a] mb-3">단말별 결과</p>
      <div className="space-y-2">
        {results.map((r) => {
          const isExpanded = expandedId === r.deviceId;
          const isFailed   = r.execStatus === "수행 실패";
          const isTimeout  = r.execStatus === "응답 없음";
          const isPending  = ["수행 중", "전송 대기", "요청됨"].includes(r.execStatus);
          const isApproval = r.execStatus === "승인 대기";
          const isCancelled = r.execStatus === "취소됨";

          // 컴팩트 요약 뱃지 색상
          const borderColor =
            r.execStatus === "수행 성공" ? "border-[#bbf7d0]"
            : isFailed                  ? "border-[#fca5a5]"
            : isTimeout                 ? "border-[#fdba74]"
            : isApproval                ? "border-[#fde68a]"
            : isCancelled               ? "border-[#e2e7ef]"
            : "border-[#bfdbfe]";  // 수행 중, 전송 대기, 요청됨

          return (
            <div key={r.deviceId} className={`border rounded-[8px] overflow-hidden transition-colors ${borderColor}`}>
              {/* 카드 헤더 */}
              <button
                onClick={() => toggle(r.deviceId)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#f8fafc] transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[12px] font-semibold text-[#0ea5e9]">{r.deviceId}</span>
                    <span className="text-[11px] text-[#94a3b8]">·</span>
                    <span className="text-[11px] text-[#64748b] truncate">{r.stationName}</span>
                  </div>
                  <span className="text-[11px] text-[#94a3b8]">{r.customerName}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {getExecStatusBadge(r.execStatus)}
                  <ChevronDown className={`w-4 h-4 text-[#94a3b8] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              </button>

              {/* 펼쳐진 상세 */}
              {isExpanded && (
                <div className="border-t border-[#e2e7ef] px-4 py-3 bg-[#fafbfc] space-y-3">

                  {/* 수행 시간 (성공/실패 공통) */}
                  {(r.execStartTime || r.execEndTime) && (
                    <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{r.execStartTime ?? "—"}</span>
                      {r.execEndTime && (
                        <>
                          <ArrowRight className="w-3 h-3" />
                          <span>{r.execEndTime}</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* 수행 성공 — 명령별 요약 */}
                  {r.execStatus === "수행 성공" && (
                    <>
                      {/* 상태 재조회 */}
                      {commandType === "상태 재조회" && r.statusResult && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {[
                            { label: "단말 상태", value: r.statusResult.deviceStatus, highlight: true },
                            r.statusResult.signalStrength !== undefined && { label: "신호 강도", value: `${r.statusResult.signalStrength}%` },
                            r.statusResult.cpuUsage !== undefined      && { label: "CPU",      value: `${r.statusResult.cpuUsage}%` },
                            r.statusResult.ramUsage !== undefined      && { label: "RAM",      value: `${r.statusResult.ramUsage}%` },
                            r.statusResult.temperature !== undefined   && { label: "온도",     value: `${r.statusResult.temperature}°C` },
                            r.statusResult.humidity !== undefined      && { label: "습도",     value: `${r.statusResult.humidity}%` },
                            r.statusResult.appVersion                  && { label: "앱 버전",  value: r.statusResult.appVersion },
                            r.statusResult.uptime                      && { label: "가동",     value: r.statusResult.uptime },
                          ].filter(Boolean).map((item: any) => (
                            <div key={item.label} className="flex justify-between">
                              <span className="text-[11px] text-[#94a3b8]">{item.label}</span>
                              <span className={`text-[11px] font-medium ${item.highlight
                                ? item.value === "정상" ? "text-[#16a34a]"
                                  : item.value === "주의" ? "text-[#d97706]" : "text-[#dc2626]"
                                : "text-[#0f172a]"}`}>
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 스크린샷 */}
                      {commandType === "스크린샷" && (
                        <p className="text-[11px] text-[#16a34a]">화면 캡처 완료</p>
                      )}

                      {/* 앱 재시작 */}
                      {commandType === "앱 재시작" && r.appRestartResult && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {[
                            { label: "대상 앱",  value: r.appRestartResult.targetApp },
                            { label: "앱 상태",  value: r.appRestartResult.appStatus },
                            { label: "이전 PID", value: String(r.appRestartResult.prevPid) },
                            { label: "새 PID",   value: String(r.appRestartResult.newPid) },
                            { label: "소요 시간",value: `${(r.appRestartResult.elapsedMs / 1000).toFixed(1)}초` },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between">
                              <span className="text-[11px] text-[#94a3b8]">{label}</span>
                              <span className="text-[11px] font-medium text-[#0f172a]">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 단말 재부팅 */}
                      {commandType === "단말 재부팅" && r.rebootResult && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {[
                            { label: "완료 시각", value: r.rebootResult.bootCompletedAt },
                            { label: "가동 시간", value: r.rebootResult.newUptime },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between">
                              <span className="text-[11px] text-[#94a3b8]">{label}</span>
                              <span className="text-[11px] font-medium text-[#0f172a]">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 화면 전체 갱신 */}
                      {commandType === "화면 전체 갱신" && r.screenRefreshResult && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                          {[
                            { label: "갱신 영역",    value: r.screenRefreshResult.refreshedAreas.join(", ") },
                            { label: "렌더러 상태",  value: r.screenRefreshResult.rendererStatus },
                            { label: "완료 시각",    value: r.screenRefreshResult.refreshedAt },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between">
                              <span className="text-[11px] text-[#94a3b8]">{label}</span>
                              <span className="text-[11px] font-medium text-[#0f172a]">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* 수행 실패 */}
                  {isFailed && (
                    <div className="space-y-1.5">
                      {r.failReason && (
                        <div className="flex justify-between">
                          <span className="text-[11px] text-[#94a3b8]">실패 원인</span>
                          <span className="text-[11px] font-medium text-[#dc2626]">{r.failReason}</span>
                        </div>
                      )}
                      {r.resultValue && (
                        <div className="mt-1 p-2 bg-[#fff1f2] rounded-[6px] text-[10px] text-[#b91c1c] font-mono break-all">
                          {r.resultValue}
                        </div>
                      )}
                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 h-7 rounded-[6px] border border-[#fca5a5] text-[11px] font-medium text-[#dc2626] hover:bg-red-50 transition-colors">재시도</button>
                        <button className="flex-1 h-7 rounded-[6px] border border-[#e2e7ef] text-[11px] font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors">현장 작업 전환</button>
                      </div>
                    </div>
                  )}

                  {/* 응답 없음 (TIMEOUT) */}
                  {isTimeout && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-[#ea580c]">단말이 응답하지 않았습니다. (응답 대기 시간 초과)</p>
                      {r.failReason && (
                        <p className="text-[10px] text-[#94a3b8]">{r.failReason}</p>
                      )}
                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 h-7 rounded-[6px] border border-[#fdba74] text-[11px] font-medium text-[#ea580c] hover:bg-orange-50 transition-colors">재시도</button>
                        <button className="flex-1 h-7 rounded-[6px] border border-[#e2e7ef] text-[11px] font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors">현장 작업 전환</button>
                      </div>
                    </div>
                  )}

                  {/* 승인 대기 */}
                  {isApproval && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-[#d97706]">위험 명령 실행을 위해 관리자 승인이 필요합니다.</p>
                      <button className="w-full h-7 rounded-[6px] border border-[#fde68a] text-[11px] font-medium text-[#d97706] hover:bg-amber-50 transition-colors">승인 요청 취소</button>
                    </div>
                  )}

                  {/* 수행 중 / 전송 대기 / 요청됨 */}
                  {isPending && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] text-[#3b82f6]">
                        {r.execStatus === "수행 중" ? "단말에서 명령을 수행 중입니다."
                         : r.execStatus === "전송 대기" ? "단말 전송 큐에 등록되었습니다."
                         : "서버에 명령이 요청되었습니다."}
                      </p>
                      <button className="w-full h-7 rounded-[6px] border border-[#bfdbfe] text-[11px] font-medium text-[#3b82f6] hover:bg-blue-50 transition-colors">취소</button>
                    </div>
                  )}

                  {/* 취소됨 */}
                  {isCancelled && (
                    <p className="text-[11px] text-[#94a3b8]">명령이 취소되었습니다.</p>
                  )}

                  {/* 전체 상세 보기 */}
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onOpenDetail(r)}
                      className="flex items-center gap-1 text-[11px] font-medium text-[#0ea5e9] hover:text-[#0284c7]"
                    >
                      전체 상세 보기 <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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
  const isFailed   = device.execStatus === "수행 실패";
  const isTimeout  = device.execStatus === "응답 없음";
  const isPending  = ["수행 중", "전송 대기", "요청됨"].includes(device.execStatus);
  const isApproval = device.execStatus === "승인 대기";
  const isCancelled = device.execStatus === "취소됨";
  const isActive   = isFailed || isTimeout; // 재시도 가능 상태

  // 단말 기본 정보
  const deviceInfoRows = [
    { label: "단말 ID",         value: device.deviceId },
    { label: "정류장명 (코드)", value: `${device.stationName} (${device.stationCode})` },
    { label: "고객사명",        value: device.customerName },
    { label: "현재 단말 상태",  value: device.currentState ?? "—", hidden: isPending || isApproval || isCancelled },
    { label: "수행 시작",       value: device.execStartTime ?? "—" },
    { label: "수행 종료",       value: device.execEndTime ?? "—",  hidden: isPending || isApproval },
  ].filter((r) => !r.hidden);

  // 수행 결과 관련 상세 — 스펙 기준: 실패 원인 + 결과 값
  const execDetailRows = [
    { label: "실패 원인", value: device.failReason ?? "—",  hidden: !isFailed && !isTimeout },
    { label: "결과 값",   value: device.resultValue ?? "—", hidden: !(isFailed && device.resultValue) },
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
            <p className="text-[12px] font-semibold text-[#64748b] mb-[5px]">단말 정보</p>
            <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] p-px">
              {deviceInfoRows.map(({ label, value }, idx, arr) => (
                <div key={label} className={`h-[35px] px-[12px] flex items-center justify-between gap-2 ${idx < arr.length - 1 ? "border-b border-[#e2e7ef]" : ""}`}>
                  <span className="text-[11px] text-[#94a3b8] shrink-0">{label}</span>
                  <span className="text-[12px] text-[#0f172a] text-right break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#64748b] mb-[5px]">수행 내역</p>
            <div className="bg-[#f8fafc] rounded-[8px] py-[2px]">
              <div className="p-[10px] text-[12px] text-[#64748b]">
                {device.execStatus === "수행 성공"  ? "명령이 성공적으로 수행되었습니다."
                : device.execStatus === "수행 중"   ? "단말에서 명령을 수행 중입니다."
                : device.execStatus === "전송 대기" ? "단말 전송 큐에 등록되어 대기 중입니다."
                : device.execStatus === "요청됨"    ? "서버에 명령이 등록되었습니다."
                : device.execStatus === "승인 대기" ? "위험 명령 실행을 위해 관리자 승인이 필요합니다."
                : device.execStatus === "취소됨"    ? "명령이 취소되었습니다."
                : device.execStatus === "응답 없음" ? "단말이 응답하지 않았습니다. (응답 대기 시간 초과)"
                : `명령 전달 후 실행에 실패했습니다.${device.failReason ? ` 사유: ${device.failReason}` : ""}`}
              </div>
              {execDetailRows.length > 0 && (
                <div className="border-t border-[#e2e7ef] p-px mx-[2px] mb-[2px] rounded-b-[8px]">
                  {execDetailRows.map(({ label, value }, idx, arr) => (
                    <div key={label} className={`min-h-[35px] px-[12px] py-[8px] flex items-start justify-between gap-4 ${idx < arr.length - 1 ? "border-b border-[#e2e7ef]" : ""}`}>
                      <span className="text-[11px] text-[#94a3b8] shrink-0 pt-px">{label}</span>
                      <span className="text-[12px] text-[#0f172a] text-right break-all">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          {isActive && (
            <div className="flex gap-2">
              <button className="flex-1 h-9 rounded-[8px] border border-[#e2e7ef] text-[13px] font-medium text-[#0f172a] hover:bg-[#f8fafc] transition-colors">
                재시도
              </button>
              <button className="flex-1 h-9 rounded-[8px] bg-[#0f172a] text-[13px] font-medium text-white hover:bg-[#1e293b] transition-colors">
                현장 작업 전환 →
              </button>
            </div>
          )}
          {isPending && (
            <div>
              <button className="w-full h-9 rounded-[8px] border border-[#e2e7ef] text-[13px] font-medium text-[#64748b] hover:bg-[#f8fafc] transition-colors">
                취소
              </button>
            </div>
          )}
          {isApproval && (
            <div>
              <button className="w-full h-9 rounded-[8px] border border-[#fde68a] text-[13px] font-medium text-[#d97706] hover:bg-amber-50 transition-colors">
                승인 요청 취소
              </button>
            </div>
          )}

          {/* ── 수행 결과 상세 (명령별) ── */}
          {device.execStatus === "수행 성공" && commandType === "상태 재조회" && device.statusResult && (
            <div>
              <p className="text-[12px] font-semibold text-[#0f172a] mb-3">수행 결과 상세</p>
              <div className={`border rounded-[8px] overflow-hidden ${
                device.statusResult.deviceStatus === "정상" ? "border-[#bbf7d0]"
                : device.statusResult.deviceStatus === "주의" ? "border-[#fde68a]"
                : "border-[#fca5a5]"
              }`}>
                <div className="px-4 py-3 bg-[#fafbfc]">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {[
                      { label: "단말 상태",    value: device.statusResult.deviceStatus, statusColor: true },
                      device.statusResult.signalStrength !== undefined && { label: "신호 강도 (WiFi)", value: `${device.statusResult.signalStrength}%`, signalVal: device.statusResult.signalStrength },
                      device.statusResult.cpuUsage !== undefined       && { label: "CPU 사용량",       value: `${device.statusResult.cpuUsage}%` },
                      device.statusResult.ramUsage !== undefined       && { label: "RAM 사용량",       value: `${device.statusResult.ramUsage}%` },
                      device.statusResult.temperature !== undefined    && { label: "온도",             value: `${device.statusResult.temperature}°C` },
                      device.statusResult.humidity !== undefined       && { label: "습도",             value: `${device.statusResult.humidity}%` },
                      device.statusResult.batteryLevel !== undefined   && { label: "배터리 잔량",      value: `${device.statusResult.batteryLevel}%`, batteryVal: device.statusResult.batteryLevel },
                      device.statusResult.socStage                    && { label: "SOC 단계",         value: device.statusResult.socStage, socVal: device.statusResult.socStage },
                      device.statusResult.uptime                      && { label: "가동 시간",         value: device.statusResult.uptime },
                      device.statusResult.appVersion                  && { label: "앱 버전",           value: device.statusResult.appVersion, mono: true },
                      device.statusResult.lastSyncTime                && { label: "마지막 동기화",     value: device.statusResult.lastSyncTime },
                    ].filter(Boolean).map((item: any) => (
                      <div key={item.label} className="flex justify-between items-center gap-2">
                        <span className="text-[11px] text-[#94a3b8] shrink-0">{item.label}</span>
                        {item.signalVal !== undefined ? (
                          <SignalBar value={item.signalVal} />
                        ) : (
                          <span className={`text-[11px] font-medium text-right ${
                            item.statusColor
                              ? item.value === "정상" ? "text-[#16a34a]" : item.value === "주의" ? "text-[#d97706]" : "text-[#dc2626]"
                            : item.batteryVal !== undefined
                              ? item.batteryVal >= 50 ? "text-[#16a34a]" : item.batteryVal >= 20 ? "text-[#d97706]" : "text-[#dc2626]"
                            : item.socVal
                              ? item.socVal === "NORMAL" ? "text-[#16a34a]" : item.socVal === "LOW_BATTERY" ? "text-[#d97706]" : "text-[#dc2626]"
                            : item.mono ? "text-[#0f172a] font-mono"
                            : "text-[#0f172a]"
                          }`}>{item.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
  const total     = commandLogs.reduce((s, l) => s + l.targetCount, 0);
  const pending   = commandLogs.reduce((s, l) => s + l.pendingCount, 0);
  const timeout   = commandLogs.reduce((s, l) => s + l.timeoutCount, 0);
  const success   = commandLogs.reduce((s, l) => s + l.succeededCount, 0);
  const fail      = commandLogs.reduce((s, l) => s + l.failedCount, 0);

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
                { label: "대기 중",     value: pending,  icon: WifiOff,      valueColor: "text-[#364153]" },
                { label: "응답 없음",   value: timeout,  icon: AlertOctagon, valueColor: "text-[#dc2626]" },
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
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: "수행 성공", value: selectedLog.succeededCount,  color: "text-green-700",  bg: "bg-green-50"  },
                    { label: "수행 실패", value: selectedLog.failedCount,      color: "text-red-700",    bg: "bg-red-50"    },
                    { label: "응답 없음", value: selectedLog.timeoutCount,     color: "text-orange-700", bg: "bg-orange-50" },
                    { label: "대기 중",   value: selectedLog.pendingCount,     color: "text-blue-700",   bg: "bg-blue-50"   },
                    { label: "취소",      value: selectedLog.cancelledCount,   color: "text-slate-500",  bg: "bg-slate-50"  },
                  ].map(({ label, value, color, bg }) => (
                    <div key={label} className={`${bg} rounded-[8px] p-3 text-center`}>
                      <p className="text-[11px] text-[#64748b] mb-1">{label}</p>
                      <p className={`text-[18px] font-bold ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <DeviceResultAccordion
                results={selectedLog.deviceResults}
                commandType={selectedLog.command}
                onOpenDetail={(r) => setSelectedDevice(r)}
              />
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
