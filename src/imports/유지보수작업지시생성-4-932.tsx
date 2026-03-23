function SidebarLogo() {
  return (
    <div className="absolute bg-[#0f172a] h-[64px] left-0 overflow-clip top-0 w-[220px]" data-name="Sidebar/Logo">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[20px] not-italic text-[16px] text-white top-[20px] whitespace-nowrap">BIMS Admin</p>
    </div>
  );
}

function NavActiveItem() {
  return (
    <div className="absolute bg-[#1e3a5f] h-[33px] left-0 overflow-clip top-[230px] w-[220px]" data-name="Nav/ActiveItem">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[20px] not-italic text-[#38bef8] text-[13px] top-[8px] whitespace-pre">{`🔧  유지보수 작업`}</p>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-[#0f172a] h-[1280px] left-0 overflow-clip top-0 w-[220px]" data-name="Sidebar">
      <SidebarLogo />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[20px] not-italic text-[#485669] text-[11px] top-[80px] whitespace-nowrap">모니터링</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#94a3b8] text-[13px] top-[106px] whitespace-pre">{`🗺  대시보드`}</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#94a3b8] text-[13px] top-[139px] whitespace-pre">{`🖥  단말 목록`}</p>
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[20px] not-italic text-[#485669] text-[11px] top-[178px] whitespace-nowrap">운영</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#94a3b8] text-[13px] top-[204px] whitespace-pre">{`⚠️  인시던트`}</p>
      <NavActiveItem />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[20px] not-italic text-[#485669] text-[11px] top-[278px] whitespace-nowrap">설정</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#94a3b8] text-[13px] top-[304px] whitespace-pre">{`🏢  정류장 관리`}</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[20px] not-italic text-[#94a3b8] text-[13px] top-[337px] whitespace-pre">{`👤  사용자 관리`}</p>
    </div>
  );
}

function Topbar() {
  return (
    <div className="absolute bg-white border border-[#e2e7ef] border-solid h-[56px] left-[220px] overflow-clip top-0 w-[1220px]" data-name="Topbar">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[23px] not-italic text-[#64748b] text-[13px] top-[19px] whitespace-pre">{`유지보수 작업  ›  작업 지시 생성`}</p>
    </div>
  );
}

function TabFlow1Active() {
  return (
    <div className="absolute bg-[#f0f9ff] border-[#0ea5e9] border-[1.5px] border-solid h-[36px] left-[24px] overflow-clip rounded-[8px] top-[88px] w-[230px]" data-name="Tab/Flow1-Active">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[12.5px] not-italic text-[#0384c7] text-[13px] top-[8.5px] whitespace-pre">{`Flow 1  인시던트 → 작업 지시`}</p>
    </div>
  );
}

function TabFlow() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[262px] overflow-clip rounded-[8px] top-[88px] w-[210px]" data-name="Tab/Flow2">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[12.5px] not-italic text-[#64748b] text-[13px] top-[8.5px] whitespace-pre">{`Flow 2  작업 지시 직접 생성`}</p>
    </div>
  );
}

function Step1Circle() {
  return (
    <div className="absolute bg-[#dbfce6] left-[100px] overflow-clip rounded-[16px] size-[32px] top-[37px]" data-name="Step1/Circle">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[8px] not-italic text-[#16a34a] text-[13px] top-[8px] whitespace-nowrap">✓</p>
    </div>
  );
}

function Step2Circle() {
  return (
    <div className="absolute bg-[#dbfce6] left-[334px] overflow-clip rounded-[16px] size-[32px] top-[37px]" data-name="Step2/Circle">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[8px] not-italic text-[#16a34a] text-[13px] top-[8px] whitespace-nowrap">✓</p>
    </div>
  );
}

function Step3Circle() {
  return (
    <div className="absolute bg-[#dbfce6] left-[568px] overflow-clip rounded-[16px] size-[32px] top-[37px]" data-name="Step3/Circle">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[8px] not-italic text-[#16a34a] text-[13px] top-[8px] whitespace-nowrap">✓</p>
    </div>
  );
}

function Step4Circle() {
  return (
    <div className="absolute bg-[#0ea5e9] left-[802px] overflow-clip rounded-[16px] size-[32px] top-[37px]" data-name="Step4/Circle">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[10px] not-italic text-[13px] text-white top-[8px] whitespace-nowrap">4</p>
    </div>
  );
}

function Step5Circle() {
  return (
    <div className="absolute bg-[#f1f5f9] left-[1036px] overflow-clip rounded-[16px] size-[32px] top-[37px]" data-name="Step5/Circle">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[normal] left-[10px] not-italic text-[#94a3b8] text-[13px] top-[8px] whitespace-nowrap">5</p>
    </div>
  );
}

function FlowHintCard() {
  return (
    <div className="absolute bg-white border border-[#e2e7ef] border-solid h-[108px] left-[24px] overflow-clip rounded-[10px] top-[144px] w-[1172px]" data-name="FlowHint/Card">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[17px] not-italic text-[#64748b] text-[12px] top-[13px] whitespace-nowrap">현재 플로우</p>
      <Step1Circle />
      <Step2Circle />
      <Step3Circle />
      <Step4Circle />
      <Step5Circle />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[219px] not-italic text-[#cbd5e1] text-[16px] top-[49px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[453px] not-italic text-[#cbd5e1] text-[16px] top-[49px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[687px] not-italic text-[#cbd5e1] text-[16px] top-[49px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[921px] not-italic text-[#cbd5e1] text-[16px] top-[49px] whitespace-nowrap">→</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[84px] not-italic text-[#64748b] text-[11px] top-[75px] whitespace-nowrap">인시던트 자동 감지</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[321px] not-italic text-[#64748b] text-[11px] top-[75px] whitespace-nowrap">자동 조치 시도</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[555px] not-italic text-[#64748b] text-[11px] top-[75px] whitespace-nowrap">원격 제어 시도</p>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[792px] not-italic text-[#0f172a] text-[11px] top-[75px] whitespace-nowrap">작업 지시 생성</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[1034px] not-italic text-[#64748b] text-[11px] top-[75px] whitespace-nowrap">작업 진행</p>
    </div>
  );
}

function InfoBanner() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bfdbfe] border-[1.5px] border-solid h-[60px] left-[24px] overflow-clip rounded-[10px] top-[272px] w-[1172px]" data-name="InfoBanner">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[14.5px] not-italic text-[#1d4ed8] text-[13px] top-[10.5px] whitespace-pre">{`🔗  INC-2024-0387 인시던트에서 작업 지시를 생성합니다. 인시던트 정보는 자동으로 연결되며, 작업 내용과 담당자만 입력하면 됩니다.`}</p>
    </div>
  );
}

function CardIconBlue() {
  return (
    <div className="absolute bg-[#dbecfe] left-[19px] overflow-clip rounded-[8px] size-[32px] top-[11px]" data-name="CardIcon/Blue">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[7px] not-italic text-[16px] text-black top-[6px] whitespace-nowrap">🔗</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute bg-white border border-[#f1f5f9] border-solid h-[56px] left-[-1px] overflow-clip top-[-1px] w-[1172px]" data-name="Card/Header">
      <CardIconBlue />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[61px] not-italic text-[#0f172a] text-[14px] top-[19px] whitespace-nowrap">연결된 인시던트</p>
    </div>
  );
}

function IncidentIcon() {
  return (
    <div className="absolute bg-[#fee2e2] left-[12.5px] overflow-clip rounded-[8px] size-[36px] top-[12.5px]" data-name="IncidentIcon">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[7px] not-italic text-[18px] text-black top-[6px] whitespace-nowrap">🚨</p>
    </div>
  );
}

function BadgeCritical() {
  return (
    <div className="absolute bg-[#fee2e2] h-[20px] left-[190.5px] overflow-clip rounded-[99px] top-[10.5px] w-[40px]" data-name="Badge/Critical">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[8px] not-italic text-[#dc2626] text-[11px] top-[3px] whitespace-nowrap">긴급</p>
    </div>
  );
}

function LinkedIncidentRow() {
  return (
    <div className="absolute bg-[#f8fafc] border-[#e2e7ef] border-[1.5px] border-solid h-[64px] left-[19px] overflow-clip rounded-[10px] top-[71px] w-[1132px]" data-name="LinkedIncident/Row">
      <IncidentIcon />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[60.5px] not-italic text-[#0f172a] text-[13px] top-[12.5px] whitespace-nowrap">INC-2024-0387</p>
      <BadgeCritical />
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[60.5px] not-italic text-[#64748b] text-[12px] top-[32.5px] whitespace-nowrap">강남구 테헤란로 432 정류장 · 단말 #BIS-0042 · 디스플레이 오류 (CRITICAL) · 2024.01.15 09:23</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[988.5px] not-italic text-[#94a3b8] text-[12px] top-[20.5px] whitespace-nowrap">🔒 자동 연결됨</p>
    </div>
  );
}

function InputDisabled() {
  return (
    <div className="absolute bg-[#f8fafc] border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-0 overflow-clip rounded-[8px] top-[20px] w-[354px]" data-name="Input/Disabled">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#94a3b8] text-[13px] top-[8.5px] whitespace-nowrap">강남구 테헤란로 432</p>
    </div>
  );
}

function FieldStop() {
  return (
    <div className="absolute bg-white h-[60px] left-[19px] overflow-clip top-[151px] w-[354px]" data-name="Field/Stop">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[#374151] text-[12px] top-0 whitespace-nowrap">정류장</p>
      <InputDisabled />
    </div>
  );
}

function InputDisabled1() {
  return (
    <div className="absolute bg-[#f8fafc] border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-0 overflow-clip rounded-[8px] top-[20px] w-[354px]" data-name="Input/Disabled">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#94a3b8] text-[13px] top-[8.5px] whitespace-nowrap">BIS-0042</p>
    </div>
  );
}

function FieldDeviceId() {
  return (
    <div className="absolute bg-white h-[60px] left-[389px] overflow-clip top-[151px] w-[354px]" data-name="Field/DeviceID">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[#374151] text-[12px] top-0 whitespace-nowrap">단말 ID</p>
      <InputDisabled1 />
    </div>
  );
}

function InputDisabled2() {
  return (
    <div className="absolute bg-[#f8fafc] border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-0 overflow-clip rounded-[8px] top-[20px] w-[354px]" data-name="Input/Disabled">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#94a3b8] text-[13px] top-[8.5px] whitespace-nowrap">디스플레이 오류</p>
    </div>
  );
}

function FieldFaultType() {
  return (
    <div className="absolute bg-white h-[60px] left-[759px] overflow-clip top-[151px] w-[354px]" data-name="Field/FaultType">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-0 not-italic text-[#374151] text-[12px] top-0 whitespace-nowrap">장애 유형</p>
      <InputDisabled2 />
    </div>
  );
}

function CardIncident() {
  return (
    <div className="absolute bg-white border border-[#e2e7ef] border-solid h-[228px] left-[24px] overflow-clip rounded-[12px] top-[352px] w-[1172px]" data-name="Card/Incident">
      <CardHeader />
      <LinkedIncidentRow />
      <FieldStop />
      <FieldDeviceId />
      <FieldFaultType />
    </div>
  );
}

function CardIconAmber() {
  return (
    <div className="absolute bg-[#fef3c8] left-[19px] overflow-clip rounded-[8px] size-[32px] top-[11px]" data-name="CardIcon/Amber">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[7px] not-italic text-[16px] text-black top-[6px] whitespace-nowrap">📋</p>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="absolute bg-white border border-[#f1f5f9] border-solid h-[56px] left-[-1px] overflow-clip top-[-1px] w-[1172px]" data-name="Card/Header">
      <CardIconAmber />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[61px] not-italic text-[#0f172a] text-[14px] top-[19px] whitespace-nowrap">작업 내용</p>
    </div>
  );
}

function InputTitle() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[19px] overflow-clip rounded-[8px] top-[89px] w-[1132px]" data-name="Input/Title">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#1e2e45] text-[13px] top-[8.5px] whitespace-nowrap">테헤란로 432 디스플레이 패널 점검 및 교체</p>
    </div>
  );
}

function SelectWorkType() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[19px] overflow-clip rounded-[8px] top-[159px] w-[558px]" data-name="Select/WorkType">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#1e2e45] text-[13px] top-[8.5px] whitespace-nowrap">하드웨어 교체</p>
    </div>
  );
}

function PriorityLow() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[593px] overflow-clip rounded-[8px] top-[159px] w-[134px]" data-name="Priority/Low">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[34.5px] not-italic text-[#16a34a] text-[12px] top-[8.5px] whitespace-nowrap">낮음</p>
    </div>
  );
}

function PriorityMid() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[735px] overflow-clip rounded-[8px] top-[159px] w-[134px]" data-name="Priority/Mid">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[34.5px] not-italic text-[#d97706] text-[12px] top-[8.5px] whitespace-nowrap">보통</p>
    </div>
  );
}

function PriorityHighActive() {
  return (
    <div className="absolute bg-[#fff1f2] border-[#dc2626] border-[1.5px] border-solid h-[36px] left-[877px] overflow-clip rounded-[8px] top-[159px] w-[134px]" data-name="Priority/High-Active">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[34.5px] not-italic text-[#dc2626] text-[12px] top-[8.5px] whitespace-nowrap">높음</p>
    </div>
  );
}

function PriorityUrgent() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[1019px] overflow-clip rounded-[8px] top-[159px] w-[134px]" data-name="Priority/Urgent">
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] left-[34.5px] not-italic text-[#7c3aed] text-[12px] top-[8.5px] whitespace-nowrap">긴급</p>
    </div>
  );
}

function TextareaWorkContent() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[80px] left-[19px] overflow-clip rounded-[8px] top-[229px] w-[1132px]" data-name="Textarea/WorkContent">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#1e2e45] text-[13px] top-[8.5px] whitespace-nowrap">디스플레이 패널 물리적 손상 및 CRITICAL 상태 확인. 현장 점검 후 패널 교체 또는 수리 필요.</p>
    </div>
  );
}

function CardWorkOrder() {
  return (
    <div className="absolute bg-white border border-[#e2e7ef] border-solid h-[326px] left-[24px] overflow-clip rounded-[12px] top-[600px] w-[1172px]" data-name="Card/WorkOrder">
      <CardHeader1 />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[19px] not-italic text-[#374151] text-[12px] top-[71px] whitespace-nowrap">작업 제목 *</p>
      <InputTitle />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[19px] not-italic text-[#374151] text-[12px] top-[141px] whitespace-nowrap">작업 유형 *</p>
      <SelectWorkType />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[593px] not-italic text-[#374151] text-[12px] top-[141px] whitespace-nowrap">우선순위 *</p>
      <PriorityLow />
      <PriorityMid />
      <PriorityHighActive />
      <PriorityUrgent />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[19px] not-italic text-[#374151] text-[12px] top-[211px] whitespace-nowrap">작업 지시 내용 *</p>
      <TextareaWorkContent />
    </div>
  );
}

function CardIconGreen() {
  return (
    <div className="absolute bg-[#dbfce6] left-[19px] overflow-clip rounded-[8px] size-[32px] top-[11px]" data-name="CardIcon/Green">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[6px] not-italic text-[16px] text-black top-[6px] whitespace-nowrap">👷</p>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="absolute bg-white border border-[#f1f5f9] border-solid h-[56px] left-[-1px] overflow-clip top-[-1px] w-[1172px]" data-name="Card/Header">
      <CardIconGreen />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[61px] not-italic text-[#0f172a] text-[14px] top-[19px] whitespace-nowrap">일정 및 담당자</p>
    </div>
  );
}

function InputDate() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[19px] overflow-clip rounded-[8px] top-[89px] w-[556px]" data-name="Input/Date1">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#1e2e45] text-[13px] top-[8.5px] whitespace-nowrap">2024-01-16</p>
    </div>
  );
}

function InputDate1() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[36px] left-[595px] overflow-clip rounded-[8px] top-[89px] w-[556px]" data-name="Input/Date2">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[10.5px] not-italic text-[#1e2e45] text-[13px] top-[8.5px] whitespace-nowrap">2024-01-17</p>
    </div>
  );
}

function WorkerAvatar() {
  return (
    <div className="absolute bg-[#0ea5e9] left-[4.5px] overflow-clip rounded-[10px] size-[20px] top-[2.5px]" data-name="Worker/Avatar">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[4px] not-italic text-[10px] text-white top-[3px] whitespace-nowrap">김</p>
    </div>
  );
}

function WorkerChip() {
  return (
    <div className="absolute bg-[#f0f9ff] border-[#bae6fd] border-[1.5px] border-solid h-[28px] left-[19px] overflow-clip rounded-[99px] top-[159px] w-[110px]" data-name="Worker/Chip">
      <WorkerAvatar />
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[28.5px] not-italic text-[#0384c7] text-[12px] top-[4.5px] whitespace-pre">{`김현수  ×`}</p>
    </div>
  );
}

function CardSchedule() {
  return (
    <div className="absolute bg-white border border-[#e2e7ef] border-solid h-[196px] left-[24px] overflow-clip rounded-[12px] top-[942px] w-[1172px]" data-name="Card/Schedule">
      <CardHeader2 />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[19px] not-italic text-[#374151] text-[12px] top-[71px] whitespace-nowrap">작업 예정일 *</p>
      <InputDate />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[595px] not-italic text-[#374151] text-[12px] top-[71px] whitespace-nowrap">완료 기한</p>
      <InputDate1 />
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[19px] not-italic text-[#374151] text-[12px] top-[141px] whitespace-nowrap">담당 기사 *</p>
      <WorkerChip />
    </div>
  );
}

function BtnCancel() {
  return (
    <div className="absolute bg-white border-[#e2e7ef] border-[1.5px] border-solid h-[38px] left-[860px] overflow-clip rounded-[8px] top-[1158px] w-[86px]" data-name="Btn/Cancel">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[20.5px] not-italic text-[#64748b] text-[13px] top-[9.5px] whitespace-nowrap">취소</p>
    </div>
  );
}

function BtnSave() {
  return (
    <div className="absolute bg-[#f1f5f9] h-[38px] left-[956px] overflow-clip rounded-[8px] top-[1158px] w-[100px]" data-name="Btn/Save">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[14px] not-italic text-[#485669] text-[13px] top-[11px] whitespace-nowrap">임시 저장</p>
    </div>
  );
}

function BtnPrimary() {
  return (
    <div className="absolute bg-[#0ea5e9] h-[38px] left-[1066px] overflow-clip rounded-[8px] top-[1158px] w-[130px]" data-name="Btn/Primary">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] left-[14px] not-italic text-[13px] text-white top-[11px] whitespace-nowrap">작업 지시 생성</p>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute bg-[#f1f5f9] h-[1224px] left-[220px] overflow-clip top-[56px] w-[1220px]" data-name="Content">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[24px] not-italic text-[#0f172a] text-[20px] top-[24px] whitespace-nowrap">유지보수 작업 지시 생성</p>
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] left-[24px] not-italic text-[#64748b] text-[13px] top-[52px] whitespace-nowrap">아래 탭을 전환하여 두 가지 생성 플로우를 확인하세요.</p>
      <TabFlow1Active />
      <TabFlow />
      <FlowHintCard />
      <InfoBanner />
      <CardIncident />
      <CardWorkOrder />
      <CardSchedule />
      <BtnCancel />
      <BtnSave />
      <BtnPrimary />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#f1f5f9] relative size-full" data-name="유지보수 작업 지시 생성">
      <Sidebar />
      <Topbar />
      <Content />
    </div>
  );
}