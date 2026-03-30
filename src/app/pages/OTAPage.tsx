import { useState } from "react";
import {
  Upload, CheckCircle2, Clock, XCircle, X, ChevronDown,
  Calendar, Package2, AlertCircle,
} from "lucide-react";

// ── 타입 ─────────────────────────────────────────────────────────────────
type AppType = "Agent" | "Updater";
type DeployStatus = "성공" | "진행중" | "실패" | "예약";

interface Deployment {
  id: string;
  appType: AppType;
  version: string;
  targetCount: number;
  completedCount: number;
  startedAt: string;
  completedAt: string | null;
  status: DeployStatus;
  releaseNote?: string;
}

// ── 목 데이터 ─────────────────────────────────────────────────────────────
const deployments: Deployment[] = [
  {
    id: "OTA-001",
    appType: "Agent",
    version: "v2.1.0",
    targetCount: 45,
    completedCount: 45,
    startedAt: "2025-02-01 14:30",
    completedAt: "2025-02-01 16:45",
    status: "성공",
    releaseNote: "보안 패치 및 통신 모듈 안정화",
  },
  {
    id: "OTA-002",
    appType: "Updater",
    version: "v1.3.2",
    targetCount: 45,
    completedCount: 12,
    startedAt: "2025-02-02 09:00",
    completedAt: null,
    status: "진행중",
    releaseNote: "디스플레이 렌더링 개선",
  },
  {
    id: "OTA-003",
    appType: "Agent",
    version: "v2.0.8",
    targetCount: 45,
    completedCount: 12,
    startedAt: "2025-01-30 10:15",
    completedAt: "2025-01-30 12:30",
    status: "실패",
    releaseNote: "네트워크 드라이버 업데이트",
  },
  {
    id: "OTA-004",
    appType: "Agent",
    version: "v2.2.0",
    targetCount: 45,
    completedCount: 0,
    startedAt: "2025-02-05 09:00",
    completedAt: null,
    status: "예약",
    releaseNote: "신규 기능: 자동 복구 루틴 추가",
  },
];

// ── 배지 헬퍼 ─────────────────────────────────────────────────────────────
function AppTypeBadge({ type }: { type: AppType }) {
  if (type === "Agent") {
    return (
      <span className="inline-block bg-[#f3e8ff] text-[#6e11b0] text-[12px] font-medium px-[8px] py-[3px] rounded-[8px]">
        Agent
      </span>
    );
  }
  return (
    <span className="inline-block bg-[#ffedd4] text-[#9f2d00] text-[12px] font-medium px-[8px] py-[3px] rounded-[8px]">
      Updater
    </span>
  );
}

function StatusBadge({ status }: { status: DeployStatus }) {
  const map: Record<DeployStatus, { bg: string; text: string; icon: React.ReactNode }> = {
    성공: {
      bg: "bg-[#dcfce7]",
      text: "text-[#016630]",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
    진행중: {
      bg: "bg-[#dbeafe]",
      text: "text-[#155dfc]",
      icon: <Clock className="w-3 h-3" />,
    },
    실패: {
      bg: "bg-[#ffe2e2]",
      text: "text-[#e7000b]",
      icon: <XCircle className="w-3 h-3" />,
    },
    예약: {
      bg: "bg-[#fef9c2]",
      text: "text-[#894b00]",
      icon: <Calendar className="w-3 h-3" />,
    },
  };
  const { bg, text, icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-[4px] ${bg} ${text} text-[12px] font-medium px-[9px] py-[3px] rounded-[8px]`}>
      {icon}
      {status}
    </span>
  );
}

// ── 배포 상세 슬라이드 패널 ───────────────────────────────────────────────
function DeploymentDetailPanel({
  deployment,
  onClose,
}: {
  deployment: Deployment;
  onClose: () => void;
}) {
  const progress = Math.round((deployment.completedCount / deployment.targetCount) * 100);
  const progressColor =
    deployment.status === "성공" ? "bg-[#00a63e]"
    : deployment.status === "진행중" ? "bg-[#155dfc]"
    : deployment.status === "실패" ? "bg-[#e7000b]"
    : "bg-[#e5e7eb]";

  const infoRows = [
    { label: "앱 유형", value: <AppTypeBadge type={deployment.appType} /> },
    { label: "앱 버전", value: deployment.version },
    { label: "대상 단말 수", value: `${deployment.targetCount}대` },
    { label: "배포 시작 시간", value: deployment.startedAt },
    { label: "배포 완료 시간", value: deployment.completedAt ?? "—" },
    { label: "릴리즈 노트", value: deployment.releaseNote ?? "—" },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-[440px] bg-white shadow-2xl z-50 flex flex-col">
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[16px] font-bold text-[#0f172a]">{deployment.id}</h2>
            <p className="text-[12px] text-[#64748b] mt-0.5">{deployment.appType} {deployment.version}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 배포 현황 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-semibold text-[#0f172a]">배포 현황</span>
              <StatusBadge status={deployment.status} />
            </div>
            <div className="bg-[#f8fafc] rounded-[10px] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#64748b]">진행률</span>
                <span className="text-[13px] font-semibold text-[#0f172a]">{progress}%</span>
              </div>
              <div className="bg-[#e5e7eb] rounded-full h-[8px]">
                <div className={`h-[8px] rounded-full ${progressColor}`} style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-[12px] text-[#64748b]">
                <span>완료: {deployment.completedCount}대</span>
                <span>전체: {deployment.targetCount}대</span>
              </div>
            </div>
          </div>

          {/* 배포 정보 */}
          <div>
            <p className="text-[12px] font-semibold text-[#64748b] mb-[5px]">배포 정보</p>
            <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] p-px">
              {infoRows.map(({ label, value }, idx, arr) => (
                <div
                  key={label}
                  className={`min-h-[35px] px-[12px] py-[8px] flex items-center justify-between gap-2 ${
                    idx < arr.length - 1 ? "border-b border-[#e2e7ef]" : ""
                  }`}
                >
                  <span className="text-[11px] text-[#94a3b8] shrink-0">{label}</span>
                  <span className="text-[12px] text-[#0f172a] text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 액션 */}
          {deployment.status === "진행중" && (
            <div className="flex gap-2">
              <button className="flex-1 h-9 border border-[#e2e7ef] rounded-[8px] text-[13px] text-[#64748b] hover:bg-[#f8fafc]">
                일시 중지
              </button>
              <button className="flex-1 h-9 border border-red-200 rounded-[8px] text-[13px] text-red-600 hover:bg-red-50">
                배포 취소
              </button>
            </div>
          )}
          {deployment.status === "예약" && (
            <button className="w-full h-9 border border-[#e2e7ef] rounded-[8px] text-[13px] text-[#64748b] hover:bg-[#f8fafc]">
              예약 취소
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// ── 앱 업로드 모달 ────────────────────────────────────────────────────────
function AppUploadModal({ onClose }: { onClose: () => void }) {
  const [appType, setAppType] = useState<AppType>("Agent");
  const [version, setVersion] = useState("");
  const [releaseNote, setReleaseNote] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[10px] w-[600px] shadow-2xl flex flex-col max-h-[90vh]">
        {/* 헤더 */}
        <div className="px-6 py-[14px] border-b border-[#e2e7ef] flex items-center justify-between shrink-0">
          <h2 className="text-[16px] font-semibold text-[#0f172a]">앱 업로드</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#f1f5f9] rounded-md text-[#64748b]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-2 space-y-6">
          {/* 앱 유형 */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#0f172a]">
              앱 유형 <span className="text-[#fb2c36]">*</span>
            </label>
            <div className="flex gap-3">
              {(["Agent", "Updater"] as AppType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setAppType(t)}
                  className={`flex-1 h-[52px] rounded-[10px] border-2 text-[13px] font-semibold transition-colors ${
                    appType === t
                      ? "bg-[#f0f9ff] border-[#0ea5e9] text-[#0f172a]"
                      : "border-[#e2e7ef] text-[#0f172a] hover:bg-[#f8fafc]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 버전 */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#0f172a]">
              버전 <span className="text-[#fb2c36]">*</span>
            </label>
            <input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="예: v2.1.0"
              className="w-full h-[37px] border border-[#e2e7ef] rounded-[10px] px-4 text-[13px] focus:outline-none focus:border-[#0ea5e9]"
            />
            <p className="text-[11px] text-[#64748b]">시맨틱 버저닝 형식을 권장합니다 (예: v2.1.0)</p>
          </div>

          {/* 파일 업로드 */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#0f172a]">
              파일 업로드 <span className="text-[#fb2c36]">*</span>
            </label>
            <label className="block border-2 border-dashed border-[#e2e7ef] rounded-[10px] p-[18px] text-center cursor-pointer hover:border-[#0ea5e9] transition-colors">
              <input
                type="file"
                className="hidden"
                accept=".bin,.hex,.elf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              <div className="w-10 h-10 bg-[#f0f9ff] rounded-full flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5 text-[#0ea5e9]" />
              </div>
              {fileName ? (
                <p className="text-[13px] font-medium text-[#0f172a]">{fileName}</p>
              ) : (
                <>
                  <p className="text-[13px] font-medium text-[#0f172a]">클릭하여 파일 선택</p>
                  <p className="text-[11px] text-[#64748b] mt-1">.bin, .hex, .elf 파일을 업로드하세요</p>
                </>
              )}
            </label>
          </div>

          {/* 릴리즈 노트 */}
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-[#0f172a]">
              릴리즈 노트 <span className="text-[#fb2c36]">*</span>
            </label>
            <textarea
              value={releaseNote}
              onChange={(e) => setReleaseNote(e.target.value)}
              placeholder="이번 업데이트의 주요 변경 사항을 입력하세요..."
              rows={5}
              className="w-full border border-[#e2e7ef] rounded-[10px] px-4 py-2 text-[13px] focus:outline-none focus:border-[#0ea5e9] resize-none"
            />
            <p className="text-[11px] text-[#64748b]">새 버전의 주요 변경 사항과 개선 사항을 기술해주세요.</p>
          </div>

          {/* 안내 */}
          <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] px-[17px] py-[14px]">
            <p className="text-[12px] text-[#64748b] leading-relaxed">
              업로드한 앱은 검증 후 배포 대상 버전 목록에 추가됩니다. 업로드 이력은 수정할 수 없으며 감사 로그에 기록됩니다.
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-[#e2e7ef] flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="h-9 px-[17px] border border-[rgba(0,0,0,0.1)] rounded-[8px] text-[13px] text-[#0a0a0a] hover:bg-[#f8fafc]"
          >
            취소
          </button>
          <button
            onClick={onClose}
            className="h-9 px-4 bg-[#0ea5e9] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#0284c7]"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 새 배포 시작 모달 ─────────────────────────────────────────────────────
function NewDeploymentModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [appType, setAppType] = useState<AppType>("Agent");
  const [version, setVersion] = useState("v2.1.0");
  const [scheduleType, setScheduleType] = useState<"즉시" | "예약">("즉시");
  const [autoRollback, setAutoRollback] = useState(true);
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const mockTargets = [
    { id: "BIS001", station: "강남역 1번출구", org: "서울교통공사", agentVer: "v2.0.8", updaterVer: "v1.3.0" },
    { id: "BIS002", station: "역삼역 2번출구", org: "서울교통공사", agentVer: "v2.0.7", updaterVer: "v1.2.9" },
    { id: "BIS003", station: "선릉역 3번출구", org: "서울교통공사", agentVer: "v2.1.0", updaterVer: "v1.3.2" },
    { id: "BIS004", station: "삼성역 4번출구", org: "강남구청", agentVer: "v2.0.6", updaterVer: "v1.3.0" },
    { id: "BIS005", station: "봉은사역 1번출구", org: "강남구청", agentVer: "v2.0.8", updaterVer: "v1.3.1" },
  ];

  const toggleTarget = (id: string) => {
    setSelectedTargets((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const steps = ["배포 앱 선택", "배포 대상 선택", "배포 일정"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[10px] w-[660px] shadow-2xl flex flex-col max-h-[90vh]">
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-[16px] font-semibold text-[#0f172a]">새 배포 시작</h2>
            <div className="flex items-center gap-2 mt-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step > i + 1 ? "bg-[#0ea5e9] text-white"
                    : step === i + 1 ? "bg-[#0ea5e9] text-white"
                    : "bg-[#e2e7ef] text-[#94a3b8]"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-[12px] ${step === i + 1 ? "text-[#0ea5e9] font-semibold" : "text-[#94a3b8]"}`}>
                    {s}
                  </span>
                  {i < steps.length - 1 && <ChevronDown className="w-3 h-3 text-[#94a3b8] -rotate-90" />}
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f1f5f9] rounded-md text-[#64748b]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Step 1: 배포 앱 선택 */}
          {step === 1 && (
            <>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#0f172a]">
                  앱 유형 <span className="text-[#fb2c36]">*</span>
                </label>
                <div className="flex gap-3">
                  {(["Agent", "Updater"] as AppType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setAppType(t)}
                      className={`flex-1 h-[52px] rounded-[10px] border-2 text-[13px] font-semibold transition-colors ${
                        appType === t
                          ? "bg-[#f0f9ff] border-[#0ea5e9] text-[#0f172a]"
                          : "border-[#e2e7ef] text-[#0f172a] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-[#0f172a]">
                  앱 버전 <span className="text-[#fb2c36]">*</span>
                </label>
                <div className="relative">
                  <select
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full h-[37px] border border-[#e2e7ef] rounded-[10px] px-4 text-[13px] bg-white appearance-none focus:outline-none focus:border-[#0ea5e9]"
                  >
                    <option>v2.1.0</option>
                    <option>v2.0.8</option>
                    <option>v2.0.7</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </>
          )}

          {/* Step 2: 배포 대상 선택 */}
          {step === 2 && (
            <>
              <div className="flex items-center justify-between mb-1">
                <p className="text-[13px] font-semibold text-[#0f172a]">배포 대상 단말</p>
                <span className="text-[12px] text-[#64748b]">
                  {selectedTargets.length}개 선택됨
                </span>
              </div>
              <div className="border border-[#e2e7ef] rounded-[10px] overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e7ef]">
                    <tr>
                      <th className="w-10 px-4 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedTargets.length === mockTargets.length}
                          onChange={(e) =>
                            setSelectedTargets(e.target.checked ? mockTargets.map((t) => t.id) : [])
                          }
                          className="w-4 h-4 rounded"
                        />
                      </th>
                      <th className="px-3 py-2.5 text-left text-[11px] text-[#64748b] font-semibold">단말 ID</th>
                      <th className="px-3 py-2.5 text-left text-[11px] text-[#64748b] font-semibold">정류장</th>
                      <th className="px-3 py-2.5 text-left text-[11px] text-[#64748b] font-semibold">Agent 버전</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e7ef]">
                    {mockTargets.map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => toggleTarget(t.id)}
                        className={`cursor-pointer transition-colors ${
                          selectedTargets.includes(t.id) ? "bg-[#f0f9ff]" : "hover:bg-[#f8fafc]"
                        }`}
                      >
                        <td className="w-10 px-4 py-2.5">
                          <input
                            type="checkbox"
                            checked={selectedTargets.includes(t.id)}
                            onChange={() => toggleTarget(t.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 rounded"
                          />
                        </td>
                        <td className="px-3 py-2.5 text-[12px] text-[#0ea5e9]">{t.id}</td>
                        <td className="px-3 py-2.5 text-[12px] text-[#64748b]">{t.station}</td>
                        <td className="px-3 py-2.5 text-[12px] text-[#64748b]">{t.agentVer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Step 3: 배포 일정 */}
          {step === 3 && (
            <>
              <div className="space-y-3">
                <label className="text-[13px] font-semibold text-[#0f172a]">배포 일정</label>
                {(["즉시", "예약"] as const).map((t) => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={scheduleType === t}
                      onChange={() => setScheduleType(t)}
                      className="w-4 h-4 text-[#0ea5e9]"
                    />
                    <span className="text-[13px] text-[#0f172a]">{t === "즉시" ? "즉시 배포" : "예약 배포"}</span>
                  </label>
                ))}
                {scheduleType === "예약" && (
                  <input
                    type="datetime-local"
                    className="w-full h-[37px] border border-[#e2e7ef] rounded-[10px] px-4 text-[13px] focus:outline-none focus:border-[#0ea5e9]"
                  />
                )}
              </div>

              {/* 자동 롤백 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-semibold text-[#0f172a]">자동 롤백</label>
                  <button
                    onClick={() => setAutoRollback(!autoRollback)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      autoRollback ? "bg-[#0ea5e9]" : "bg-[#e2e7ef]"
                    }`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      autoRollback ? "translate-x-5" : "translate-x-1"
                    }`} />
                  </button>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] px-4 py-3 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#94a3b8] shrink-0 mt-0.5" />
                  <p className="text-[12px] text-[#64748b]">
                    실패율 30% 이상일 경우, 이전 버전으로 자동 롤백됩니다.
                  </p>
                </div>
              </div>

              {/* 요약 */}
              <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-[10px] p-px">
                {[
                  { label: "앱 유형", value: appType },
                  { label: "배포 버전", value: version },
                  { label: "대상 단말", value: `${selectedTargets.length}대` },
                  { label: "배포 일정", value: scheduleType === "즉시" ? "즉시 배포" : "예약 배포" },
                ].map(({ label, value }, idx, arr) => (
                  <div key={label} className={`h-[35px] px-[12px] flex items-center justify-between gap-2 ${idx < arr.length - 1 ? "border-b border-[#e2e7ef]" : ""}`}>
                    <span className="text-[11px] text-[#94a3b8]">{label}</span>
                    <span className="text-[12px] text-[#0f172a]">{value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 푸터 */}
        <div className="px-6 py-4 border-t border-[#e2e7ef] flex justify-between shrink-0">
          <button
            onClick={() => (step === 1 ? onClose() : setStep((s) => (s - 1) as 1 | 2 | 3))}
            className="h-9 px-5 border border-[#e2e7ef] rounded-[8px] text-[13px] text-[#64748b] hover:bg-[#f8fafc]"
          >
            {step === 1 ? "취소" : "이전"}
          </button>
          <button
            onClick={() => (step === 3 ? onClose() : setStep((s) => (s + 1) as 1 | 2 | 3))}
            disabled={step === 2 && selectedTargets.length === 0}
            className="h-9 px-5 bg-[#0ea5e9] text-white rounded-[8px] text-[13px] font-medium hover:bg-[#0284c7] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {step === 3 ? "배포 시작" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 페이지 메인 ───────────────────────────────────────────────────────────
export function OTAPage() {
  const [activeTab, setActiveTab] = useState<"배포 내역" | "단말 별 배포 내역">("배포 내역");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
  const [periodFilter, setPeriodFilter] = useState("최근 1개월");

  const total = deployments.length;
  const inProgress = deployments.filter((d) => d.status === "진행중").length;
  const succeeded = deployments.filter((d) => d.status === "성공").length;
  const failed = deployments.filter((d) => d.status === "실패").length;
  const scheduled = deployments.filter((d) => d.status === "예약").length;

  const statusCards = [
    { label: "전체", value: total, color: "text-[#155dfc]", border: "border-[#155dfc]", icon: <Package2 className="w-[25px] h-[25px] text-[#155dfc]" /> },
    { label: "진행 중", value: inProgress, color: "text-[#364153]", border: "border-[#e2e7ef]", icon: <Clock className="w-[25px] h-[25px] text-[#64748b]" /> },
    { label: "성공", value: succeeded, color: "text-[#00a63e]", border: "border-[#e2e7ef]", icon: <CheckCircle2 className="w-[25px] h-[25px] text-[#00a63e]" /> },
    { label: "실패", value: failed, color: "text-[#dc2626]", border: "border-[#e2e7ef]", icon: <XCircle className="w-[25px] h-[25px] text-[#dc2626]" /> },
    { label: "예약", value: scheduled, color: "text-[#f59e0b]", border: "border-[#e2e7ef]", icon: <Calendar className="w-[25px] h-[25px] text-[#f59e0b]" /> },
  ];

  return (
    <div className="flex-1 bg-[#f1f5f9] overflow-auto">
      {/* 브레드크럼 헤더 */}
      <div className="bg-white border-b border-[#e2e7ef] h-[56px] flex items-center px-6 shrink-0">
        <p className="text-[13px] text-[#64748b]">원격 관리 › OTA 배포</p>
      </div>

      <div className="p-6 space-y-6">
        {/* 타이틀 + 버튼 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-[#0f172a]">OTA 배포</h1>
            <p className="text-[13px] text-[#64748b] mt-1">펌웨어 무선 배포 관리</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="h-[41px] px-5 bg-white border border-[#e2e7ef] rounded-[10px] flex items-center gap-2 text-[13px] font-semibold text-[#0f172a] hover:bg-[#f8fafc] transition-colors"
            >
              <Upload className="w-4 h-4" />
              앱 업로드
            </button>
            <button
              onClick={() => setShowDeployModal(true)}
              className="h-[39px] px-5 bg-[#0ea5e9] rounded-[10px] flex items-center gap-2 text-[13px] font-semibold text-white hover:bg-[#0284c7] transition-colors"
            >
              <Upload className="w-4 h-4" />
              새 배포 시작
            </button>
          </div>
        </div>

        {/* 탭 + 조회 기간 */}
        <div className="flex items-center justify-between border-b border-[#e2e7ef]">
          <div className="flex">
            {(["배포 내역", "단말 별 배포 내역"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 h-[45px] text-[13px] font-semibold relative transition-colors ${
                  activeTab === tab
                    ? "text-[#0ea5e9] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#0ea5e9]"
                    : "text-[#64748b]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pb-1">
            <span className="text-[14px] text-[#94a3b8]">조회 기간</span>
            <div className="relative">
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="h-9 pl-3 pr-8 bg-white border border-[#e6e6e6] rounded-[8px] text-[14px] font-medium text-[#0a0a0a] appearance-none focus:outline-none"
              >
                <option>최근 1개월</option>
                <option>최근 6개월</option>
                <option>최근 1년</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#94a3b8] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {activeTab === "배포 내역" && (
          <>
            {/* 배포 현황 카드 */}
            <div className="bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold text-[#485669]">배포 현황</span>
                <span className="text-[11px] font-semibold text-[#64748b]">(건수 기준)</span>
              </div>
              <div className="grid grid-cols-5 gap-[10px]">
                {statusCards.map(({ label, value, color, border, icon }) => (
                  <div
                    key={label}
                    className={`bg-white border-2 ${border} rounded-[10px] p-[14px] h-[80px] flex flex-col gap-1`}
                  >
                    <p className="text-[12px] font-medium text-[#64748b]">{label}</p>
                    <div className="flex items-center gap-2 flex-1">
                      {icon}
                      <p className={`text-[20px] font-bold ${color}`}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 배포 내역 테이블 */}
            <div className="bg-white rounded-[10px] border border-[#e2e7ef] overflow-hidden">
              <div className="px-6 py-[14px] border-b border-[#e2e7ef]">
                <h2 className="text-[14px] font-semibold text-[#0f172a]">배포 내역</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8fafc] border-b-2 border-[#e2e7ef]">
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">앱 유형</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">앱 버전</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">대상 단말 수</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">배포 시작 시간</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">배포 완료 시간</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">진행률</th>
                    <th className="px-6 py-3 text-left text-[12px] font-semibold text-[#64748b]">상태</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e7ef]">
                  {deployments.map((d) => {
                    const pct = Math.round((d.completedCount / d.targetCount) * 100);
                    const barColor =
                      d.status === "성공" ? "bg-[#00a63e]"
                      : d.status === "진행중" ? "bg-[#155dfc]"
                      : d.status === "실패" ? "bg-[#e7000b]"
                      : "bg-transparent";
                    return (
                      <tr
                        key={d.id}
                        onClick={() => setSelectedDeployment(d)}
                        className="hover:bg-[#f8fafc] cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-[18px]">
                          <AppTypeBadge type={d.appType} />
                        </td>
                        <td className="px-6 py-[18px] text-[13px] text-[#0f172a]">{d.version}</td>
                        <td className="px-6 py-[18px] text-[13px] text-[#64748b]">{d.targetCount}대</td>
                        <td className="px-6 py-[18px] text-[13px] text-[#64748b]">{d.startedAt}</td>
                        <td className="px-6 py-[18px] text-[13px] text-[#64748b]">{d.completedAt ?? "—"}</td>
                        <td className="px-6 py-[18px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 max-w-[120px] bg-[#e5e7eb] rounded-full h-[8px]">
                              <div
                                className={`h-[8px] rounded-full ${barColor}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[12px] text-[#64748b] w-[50px]">
                              {d.completedCount}/{d.targetCount}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-[18px]">
                          <StatusBadge status={d.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* 페이지네이션 */}
              <div className="bg-white border-t border-[#e2e7ef] rounded-b-[10px] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[13px]">
                  <span className="text-[#64748b]">전체 </span>
                  <span className="font-semibold text-[#0f172a]">1,000</span>
                  <span className="text-[#64748b]"> 건</span>
                </div>
                <div className="flex items-center gap-1">
                  {["‹", "1", "2", "3", "4", "5", "…", "20", "›"].map((p, i) => (
                    <button
                      key={i}
                      className={`min-w-[28px] h-7 rounded-[6px] text-[13px] flex items-center justify-center ${
                        p === "1"
                          ? "bg-[#0ea5e9] text-white font-bold"
                          : p === "…"
                          ? "text-[#94a3b8] pointer-events-none"
                          : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e7ef]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#64748b]">
                  <span>페이지당:</span>
                  {[10, 50, 100].map((n) => (
                    <button
                      key={n}
                      className={`min-w-[28px] h-7 rounded-[6px] text-[13px] flex items-center justify-center ${
                        n === 50
                          ? "bg-[#eff6ff] border border-[#0ea5e9] text-[#0ea5e9] font-bold"
                          : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e7ef]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <span>건</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "단말 별 배포 내역" && (
          <div className="bg-white rounded-[10px] border border-[#e2e7ef] p-6">
            <p className="text-[13px] text-[#94a3b8] text-center py-10">
              단말 별 배포 내역 기능은 준비 중입니다.
            </p>
          </div>
        )}
      </div>

      {/* 상세 패널 */}
      {selectedDeployment && (
        <DeploymentDetailPanel
          deployment={selectedDeployment}
          onClose={() => setSelectedDeployment(null)}
        />
      )}

      {/* 앱 업로드 모달 */}
      {showUploadModal && <AppUploadModal onClose={() => setShowUploadModal(false)} />}

      {/* 새 배포 시작 모달 */}
      {showDeployModal && <NewDeploymentModal onClose={() => setShowDeployModal(false)} />}
    </div>
  );
}
