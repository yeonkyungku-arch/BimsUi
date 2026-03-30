import { X, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface UploadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (upload: {
    appType: string;
    version: string;
    file: File | null;
    isNewRevision: boolean;
    releaseNote: string;
  }) => void;
}

// Mock existing versions - in real app, this would come from API
const mockExistingVersions = [
  { version: "v2.1.0", appType: "Agent", latestRevision: "r3" },
  { version: "v2.0.8", appType: "Agent", latestRevision: "r2" },
  { version: "v2.0.7", appType: "Agent", latestRevision: "r1" },
  { version: "v1.5.2", appType: "Updater", latestRevision: "r1" },
  { version: "v1.5.1", appType: "Updater", latestRevision: "r1" },
];

export function UploadAppModal({ isOpen, onClose, onConfirm }: UploadAppModalProps) {
  const [appType, setAppType] = useState<string>("Agent");
  const [version, setVersion] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [releaseNote, setReleaseNote] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Check if version already exists and auto-set revision flag
  useEffect(() => {
    if (version.trim()) {
      const existingVersion = mockExistingVersions.find(
        v => v.version === version.trim() && v.appType === appType
      );
      
      if (!existingVersion) {
        // Reset release note only when switching from existing to new version
      }
    }
  }, [version, appType]);

  // Get existing version info
  const existingVersionInfo = version.trim() 
    ? mockExistingVersions.find(v => v.version === version.trim() && v.appType === appType)
    : null;

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!version.trim()) {
      alert("버전을 입력해주세요.");
      return;
    }

    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    if (!releaseNote.trim()) {
      alert("릴리즈 노트는 필수입니다.");
      return;
    }

    // Check if existing version and show confirmation modal
    if (existingVersionInfo) {
      setShowConfirmModal(true);
    } else {
      // New version - proceed directly
      onConfirm({
        appType,
        version,
        file,
        isNewRevision: false,
        releaseNote,
      });
      onClose();
    }
  };

  const handleConfirmRevision = () => {
    onConfirm({
      appType,
      version,
      file,
      isNewRevision: true,
      releaseNote,
    });
    setShowConfirmModal(false);
    onClose();
  };

  const handleCancelRevision = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[10px] w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-[16px] text-[#0f172a] font-semibold">앱 업로드</h2>
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

          {/* Version Input */}
          <div>
            <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
              버전 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="예: v2.1.0"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full px-4 py-2 border border-[#e2e7ef] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
            />
            {existingVersionInfo ? (
              <div className="mt-2 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg px-3 py-2">
                <p className="text-[11px] text-[#1e40af] leading-relaxed">
                  ✓ 기존 버전 {existingVersionInfo.version} (최신 리비전: {existingVersionInfo.latestRevision})이 감지되었습니다. 
                  새 리비전으로 생성됩니다.
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-[#64748b] mt-1">시맨틱 버저닝 형식을 권장합니다 (예: v2.1.0)</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
              파일 업로드 <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-[#e2e7ef] rounded-lg p-4 text-center hover:border-[#0ea5e9] transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".bin,.hex,.elf"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#f0f9ff] flex items-center justify-center">
                    <Upload className="w-5 h-5 text-[#0ea5e9]" />
                  </div>
                  {file ? (
                    <>
                      <p className="text-[13px] text-[#0f172a] font-medium">{file.name}</p>
                      <p className="text-[11px] text-[#64748b]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[13px] text-[#0f172a] font-medium">
                        클릭하여 파일 선택
                      </p>
                      <p className="text-[11px] text-[#64748b]">
                        .bin, .hex, .elf 파일을 업로드하세요
                      </p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Release Note */}
          <div>
            <label className="block text-[13px] text-[#0f172a] font-semibold mb-2">
              릴리즈 노트 <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="이번 업데이트의 주요 변경 사항을 입력하세요..."
              value={releaseNote}
              onChange={(e) => setReleaseNote(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-[#e2e7ef] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] resize-none"
            />
            <p className="text-[11px] text-[#64748b] mt-1">
              {existingVersionInfo 
                ? "리비전 생성 시 변경 사항을 명확히 기술해주세요."
                : "새 버전의 주요 변경 사항과 개선 사항을 기술해주세요."
              }
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-[#f8fafc] border border-[#e2e7ef] rounded-lg p-4">
            <p className="text-[12px] text-[#64748b] leading-relaxed">
              업로드한 앱은 검증 후 배포 대상 버전 목록에 추가됩니다. 
              업로드 이력은 수정할 수 없으며 감사 로그에 기록됩니다.
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
            업로드
          </Button>
        </div>
      </div>

      {/* Confirmation Modal for Revision */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white rounded-[10px] w-[400px] max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#e2e7ef] flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-[16px] text-[#0f172a] font-semibold">리비전 확인</h2>
              <button onClick={handleCancelRevision} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-[13px] text-[#0f172a] leading-relaxed">
                버전 {version}의 리비전을 생성하시겠습니까? 
                기존 버전 {existingVersionInfo?.version}의 수정 사항으로 등록됩니다.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#e2e7ef] flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleCancelRevision}
                className="px-4 py-2 text-[13px]"
              >
                취소
              </Button>
              <Button
                onClick={handleConfirmRevision}
                className="px-4 py-2 text-[13px] bg-[#0ea5e9] hover:bg-[#0284c7] text-white"
              >
                리비전 생성
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}