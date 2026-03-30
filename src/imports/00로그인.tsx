function Frame8() {
  return (
    <div className="absolute bg-[rgba(243,0,9,0.1)] content-stretch flex h-[48px] items-center left-[544px] p-[16px] rounded-[8px] top-[613px] w-[352px]">
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#f30009] text-[15px] whitespace-nowrap">아이디와 비밀번호가 일치하지 않습니다.</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] items-center leading-[normal] left-[650px] not-italic top-[244px] w-[139px]">
      <p className="font-['Inter:Bold',sans-serif] font-bold relative shrink-0 text-[#0f172a] text-[28px] text-center w-full">BIMS</p>
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[13px] w-full">BIS단말 원격 관리 시스템</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[13px] whitespace-nowrap">아이디를 입력하세요</p>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3px] items-start left-[544px] top-[334px] w-[352px]">
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[13px] w-full">아이디</p>
      <Frame3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center p-[16px] relative size-full">
          <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9ca3af] text-[13px] whitespace-nowrap">비밀번호를 입력하세요</p>
        </div>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-[544px] top-[414px] w-[352px]">
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[13px] w-full">비밀번호</p>
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="bg-white relative rounded-[3px] shrink-0 size-[16px]" data-name="Checkbox">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[3px]" />
      </div>
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[13px] whitespace-nowrap">아이디 저장</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[544px] top-[499px] w-[352px]">
      <Frame />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[#0ea5e9] content-stretch flex h-[48px] items-center justify-center left-[544px] p-[16px] rounded-[8px] top-[548px] w-[352px]">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">로그인</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f1f5f9] relative size-full" data-name="00 로그인">
      <div className="absolute bg-[#f1f5f9] h-[900px] left-0 top-0 w-[1440px]" data-name="BG" />
      <div className="absolute bg-white h-[460px] left-[520px] rounded-[16px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] top-[220px] w-[400px]" data-name="Card" />
      <Frame8 />
      <Frame4 />
      <div className="absolute bg-[#e2e7ef] h-px left-[544px] top-[312px] w-[352px]" data-name="CardDiv" />
      <Frame5 />
      <Frame6 />
      <Frame1 />
      <Frame7 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[640px] not-italic text-[#9ca3af] text-[11px] top-[704px] whitespace-nowrap">© 2026 BIMS All rights reserved.</p>
    </div>
  );
}