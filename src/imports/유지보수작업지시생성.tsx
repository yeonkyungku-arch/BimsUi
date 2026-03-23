import svgPaths from "./svg-fma0y75lro";

function Topbar() {
  return (
    <div className="absolute bg-white border border-[#e2e7ef] border-solid h-[56px] left-[220px] overflow-clip top-0 w-[1220px]" data-name="Topbar">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[23px] not-italic text-[#64748b] text-[13px] top-[19px] whitespace-pre">{`원격 관리 ›  BIS 단말 모니터링`}</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start leading-[normal] not-italic relative shrink-0 w-[587px] whitespace-nowrap">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold relative shrink-0 text-[#0f172a] text-[20px]">BIS 단말 모니터링</p>
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal relative shrink-0 text-[#64748b] text-[13px]">실시간 단말 상태 및 제어</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap">조회 기간</p>
      <Icon />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[8px] relative rounded-[8px] shrink-0 w-[91px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Frame12 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-start flex flex-wrap items-start justify-between relative shrink-0 w-full">
      <Frame15 />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_722)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_722">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">전체</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Text />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[36px] min-h-px min-w-px not-italic relative text-[#155dfc] text-[26px] tracking-[0.3955px]">00000</p>
    </div>
  );
}

function StatusCard() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] h-[100px] items-start min-w-[140px] pb-[2px] pt-[18px] px-[18px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#155dfc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container1 />
      <Container2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_712)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_712">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[48.445px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">오프라인</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Text1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[36px] min-h-px min-w-px not-italic relative text-[#364153] text-[26px] tracking-[0.3955px]">3</p>
    </div>
  );
}

function StatusCard1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] h-[100px] items-start min-w-[140px] pb-[2px] pt-[18px] px-[18px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_707)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V8" id="Vector_2" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667H8.00667" id="Vector_3" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_707">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">위험</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <Text2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[36px] min-h-px min-w-px not-italic relative text-[#c10007] text-[26px] tracking-[0.3955px]">0</p>
    </div>
  );
}

function StatusCard2() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] h-[100px] items-start min-w-[140px] pb-[2px] pt-[18px] px-[18px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19bc7f80} id="Vector" stroke="var(--stroke-0, #A65F00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #A65F00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #A65F00)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">저하</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <Text3 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[36px] min-h-px min-w-px not-italic relative text-[#a65f00] text-[26px] tracking-[0.3955px]">5</p>
    </div>
  );
}

function StatusCard3() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] h-[100px] items-start min-w-[140px] pb-[2px] pt-[18px] px-[18px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_699)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_699">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">정상</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon5 />
      <Text4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Pretendard:SemiBold',sans-serif] leading-[36px] min-h-px min-w-px not-italic relative text-[#008236] text-[26px] tracking-[0.3955px]">5</p>
    </div>
  );
}

function StatusCard4() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] h-[100px] items-start min-w-[140px] pb-[2px] pt-[18px] px-[18px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full">
      <StatusCard />
      <StatusCard1 />
      <StatusCard2 />
      <StatusCard3 />
      <StatusCard4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0">
      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#485669] text-[11px] w-[64px]">운영 상태</p>
      <Frame4 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] shrink-0" data-name="Container">
      <Frame5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-start justify-between leading-[normal] not-italic relative shrink-0 text-[11px] w-full whitespace-nowrap">
      <p className="font-['Pretendard:SemiBold',sans-serif] relative shrink-0 text-[#485669]">{` SOC 상태`}</p>
      <p className="font-['Pretendard:Medium',sans-serif] relative shrink-0 text-[#616f82]">전체 00000대</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_707)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V8" id="Vector_2" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667H8.00667" id="Vector_3" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_707">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">저하</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="Container">
      <Icon6 />
      <Text5 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#c10007] text-[26px] tracking-[0.3955px] w-[124px]">0</p>
    </div>
  );
}

function StatusCard5() {
  return (
    <div className="bg-white h-full min-w-[140px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] pb-[2px] pt-[18px] px-[18px] relative size-full">
        <Container12 />
        <Container13 />
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex h-[100px] items-start relative shrink-0 w-[140px]">
      <StatusCard5 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4_707)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V8" id="Vector_2" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667H8.00667" id="Vector_3" stroke="var(--stroke-0, #C10007)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4_707">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Pretendard:Regular',sans-serif] leading-[20px] left-0 not-italic text-[#4a5565] text-[14px] top-[0.5px] tracking-[-0.1504px] whitespace-nowrap">저하</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0" data-name="Container">
      <Icon7 />
      <Text6 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[36px] items-start relative shrink-0" data-name="Container">
      <p className="font-['Pretendard:SemiBold',sans-serif] leading-[36px] not-italic relative shrink-0 text-[#c10007] text-[26px] tracking-[0.3955px] w-[124px]">0</p>
    </div>
  );
}

function StatusCard6() {
  return (
    <div className="bg-white h-full min-w-[140px] relative rounded-[10px] shrink-0 w-[140px]" data-name="StatusCard">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start min-w-[inherit] pb-[2px] pt-[18px] px-[18px] relative size-full">
        <Container14 />
        <Container15 />
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex h-[100px] items-start relative shrink-0 w-[140px]">
      <StatusCard6 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0">
      <Frame10 />
      <Frame16 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <Frame9 />
      <Frame11 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[16px] relative rounded-[10px] shrink-0 w-[322px]" data-name="Container">
      <Frame8 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] shrink-0">
      <Container11 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[10px] items-start relative shrink-0 w-full">
      <Container />
      <Frame7 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[85.23px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[114.234px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] left-[45px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">전체 고객사</p>
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[73.13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[102.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">전체 지역</p>
        <Icon9 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[73.13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[102.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">전체 그룹</p>
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[73.13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[102.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">전체 상태</p>
        <Icon11 />
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[73.13px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[102.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] left-[39.5px] not-italic text-[#0a0a0a] text-[14px] text-center top-[8.5px] tracking-[-0.1504px] whitespace-nowrap">{`SOC 상태 `}</p>
        <Icon12 />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[36px] left-0 rounded-[8px] top-0 w-[448px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[40px] pr-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[14px] tracking-[-0.1504px] whitespace-nowrap">BIS 단말 ID 또는 정류장 검색...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[448px]" data-name="Container">
      <Input />
      <Icon13 />
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1086.703_0_0] h-[36px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container19 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[70.336px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[17px] py-[9px] relative size-full">
        <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap">초기화</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[12px] h-[36px] items-center relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Container18 />
      <Button6 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-white h-[70px] relative rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex flex-col gap-[31px] h-[403px] items-center left-[220px] p-[24px] top-[56px] w-[1220px]">
      <Frame13 />
      <Frame6 />
      <Container16 />
    </div>
  );
}

function SidebarLogo() {
  return (
    <div className="bg-[#0f172a] h-[64px] overflow-clip relative shrink-0 w-full" data-name="Sidebar/Logo">
      <p className="absolute font-['Pretendard:Bold',sans-serif] leading-[normal] left-[20px] not-italic text-[16px] text-white top-[20px] whitespace-nowrap">BIMS Admin</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[20px] py-[8px] relative w-full">
          <p className="font-['Pretendard:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#485669] text-[11px] whitespace-nowrap">원격 관리</p>
        </div>
      </div>
    </div>
  );
}

function NavActiveItem() {
  return (
    <div className="bg-[#1e3a5f] relative shrink-0 w-full" data-name="Nav/ActiveItem">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[20px] py-[8px] relative w-full">
          <p className="font-['Pretendard:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#38bef8] text-[13px] whitespace-pre">{`🗺  BIS 단말 모니링`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Pretendard:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#94a3b8] text-[13px] whitespace-pre-wrap">{`🔧  유지보수 작업`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
          <p className="flex-[1_0_0] font-['Pretendard:Regular',sans-serif] leading-[normal] min-h-px min-w-px not-italic relative text-[#94a3b8] text-[13px] whitespace-pre-wrap">{`🕹️  원격 제어`}</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex flex-col h-[1273px] items-start left-0 top-0 w-[220px]">
      <SidebarLogo />
      <Frame1 />
      <NavActiveItem />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f1f5f9] relative size-full" data-name="유지보수 작업 지시 생성">
      <Topbar />
      <Frame14 />
      <Frame />
    </div>
  );
}