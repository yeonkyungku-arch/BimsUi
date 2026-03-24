import { useEffect } from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from "lucide-react";

type AlertType = "info" | "warning" | "success" | "error";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  type?: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const iconMap: Record<AlertType, { icon: typeof Info; bg: string; color: string }> = {
  info: { icon: Info, bg: "bg-[#e0f2fe]", color: "text-[#0ea5e9]" },
  warning: { icon: AlertTriangle, bg: "bg-[#fef3c7]", color: "text-[#f59e0b]" },
  success: { icon: CheckCircle2, bg: "bg-[#dcfce7]", color: "text-[#22c55e]" },
  error: { icon: XCircle, bg: "bg-[#fee2e2]", color: "text-[#ef4444]" },
};

export function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  type = "info",
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  showCancel = false,
}: AlertModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { icon: Icon, bg, color } = iconMap[type];
  const isFillIcon = type === "success" || type === "error";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-[12px] shadow-[0px_4px_24px_rgba(0,0,0,0.12)] w-[380px] overflow-hidden animate-[modalIn_0.2s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-0">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-[8px] ${bg} flex items-center justify-center`}>
              {isFillIcon ? (
                <Icon className={`w-[18px] h-[18px] ${color}`} fill="currentColor" style={{ stroke: "white" }} />
              ) : (
                <Icon className={`w-[18px] h-[18px] ${color}`} />
              )}
            </div>
            <p className="text-[15px] text-[#0f172a] font-semibold">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#64748b] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pt-3 pb-5">
          <p className="text-[13px] text-[#64748b] leading-[20px] whitespace-pre-line">{message}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e2e7ef]" />

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3">
          {showCancel && (
            <button
              onClick={onClose}
              className="h-9 px-4 rounded-[8px] border border-[#e2e7ef] text-[13px] text-[#64748b] hover:bg-[#f8fafc] transition-colors cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className="h-9 px-4 rounded-[8px] bg-[#0ea5e9] text-[13px] text-white hover:bg-[#0284c7] transition-colors cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
