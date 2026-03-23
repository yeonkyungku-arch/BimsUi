import { useState } from "react";
import { useNavigate } from "react-router";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/monitoring");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="w-full max-w-[400px] px-4">
        <div className="bg-white rounded-[16px] p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0ea5e9] rounded-[10px] mb-4">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <h1 className="text-[22px] font-bold text-[#0f172a]">BIMS Admin</h1>
            <p className="text-[13px] text-[#64748b] mt-1">BIS 단말 통합 관리 시스템</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-[#0f172a] mb-1.5">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bims.kr"
                className="w-full h-10 border border-[#e2e7ef] rounded-lg px-3 text-[13px] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#0f172a] mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 border border-[#e2e7ef] rounded-lg px-3 text-[13px] focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-[13px] text-[#64748b] cursor-pointer">
                <input type="checkbox" className="rounded border-[#e2e7ef]" />
                로그인 상태 유지
              </label>
              <button
                type="button"
                className="text-[13px] text-[#0ea5e9] hover:underline"
              >
                비밀번호 찾기
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-10 bg-[#0ea5e9] text-white rounded-lg font-semibold text-[14px] hover:bg-[#0284c7] transition-colors"
            >
              로그인
            </button>
          </form>

          <p className="text-center text-[12px] text-[#94a3b8] mt-6">
            © 2025 BIMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
