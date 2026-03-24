import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setError(false);
      navigate("/monitoring");
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-[#f1f5f9] min-h-screen flex flex-col items-center justify-center">
      {/* Card */}
      <div className="bg-white rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] w-[400px] px-6 pt-6 pb-8">
        {/* Title */}
        <div className="flex flex-col items-center gap-[2px] mb-0">
          <p className="text-[28px] text-[#0f172a] font-bold">BIMS</p>
          <p className="text-[13px] text-[#64748b]">BIS단말 원격 관리 시스템</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e2e7ef] my-5" />

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* 아이디 */}
          <div className="flex flex-col gap-[3px]">
            <label className="text-[13px] text-[#0f172a] font-medium">아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="h-[44px] rounded-[8px] border border-[#d1d5db] px-4 text-[13px] text-[#0f172a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0ea5e9] transition-colors"
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[13px] text-[#0f172a] font-medium">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="h-[44px] rounded-[8px] border border-[#d1d5db] px-4 text-[13px] text-[#0f172a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0ea5e9] transition-colors"
            />
          </div>

          {/* 아이디 저장 */}
          <div className="flex items-center gap-[4px]">
            <input
              type="checkbox"
              checked={saveId}
              onChange={(e) => setSaveId(e.target.checked)}
              className="w-4 h-4 rounded-[3px] border border-[#d1d5db] accent-[#0ea5e9] cursor-pointer"
            />
            <span className="text-[13px] text-[#64748b]">아이디 저장</span>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="h-[48px] bg-[#0ea5e9] rounded-[8px] text-white text-[15px] font-semibold hover:bg-[#0284c7] transition-colors cursor-pointer"
          >
            로그인
          </button>

          {/* 에러 메시지 */}
          {error && (
            <div className="h-[48px] bg-[rgba(243,0,9,0.1)] rounded-[8px] flex items-center px-4">
              <p className="text-[15px] text-[#f30009]">아이디와 비밀번호가 일치하지 않습니다.</p>
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <p className="text-[11px] text-[#9ca3af] mt-8">© 2026 BIMS All rights reserved.</p>
    </div>
  );
}
