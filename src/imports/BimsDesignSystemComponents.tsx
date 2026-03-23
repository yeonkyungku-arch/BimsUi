function BtnPrimary() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[20px] py-[10px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Btn/Primary">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">작업 지시 생성</p>
    </div>
  );
}

function BtnSecondary() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex h-[40px] items-center justify-center overflow-clip px-[20px] py-[10px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Btn/Secondary">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#475569] text-[13px] whitespace-nowrap">임시 저장</p>
    </div>
  );
}

function BtnGhost() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[120px]" data-name="Btn/Ghost">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[20px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[13px] whitespace-nowrap">취소</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function RowButtons() {
  return (
    <div className="bg-white content-stretch flex gap-[12px] items-start overflow-clip p-[10px] relative shrink-0 w-[400px]" data-name="Row/Buttons">
      <BtnPrimary />
      <BtnSecondary />
      <BtnGhost />
    </div>
  );
}

function SectionButton() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-[1120px]" data-name="Section/Button">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">BUTTON</p>
      <RowButtons />
    </div>
  );
}

function BadgeCritical() {
  return (
    <div className="bg-[#fee2e2] content-stretch flex h-[22px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[99px] shrink-0 w-[50px]" data-name="Badge/Critical">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#dc2626] text-[11px] whitespace-nowrap">긴급</p>
    </div>
  );
}

function BadgeWarning() {
  return (
    <div className="bg-[#fef3c7] content-stretch flex h-[22px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[99px] shrink-0 w-[50px]" data-name="Badge/Warning">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#d97706] text-[11px] whitespace-nowrap">경고</p>
    </div>
  );
}

function BadgeNormal() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex h-[22px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[99px] shrink-0 w-[50px]" data-name="Badge/Normal">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#16a34a] text-[11px] whitespace-nowrap">정상</p>
    </div>
  );
}

function BadgeOffline() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex h-[22px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[99px] shrink-0 w-[60px]" data-name="Badge/Offline">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#475569] text-[11px] whitespace-nowrap">오프라인</p>
    </div>
  );
}

function BadgeSystem() {
  return (
    <div className="bg-[#ede9fe] content-stretch flex h-[22px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[99px] shrink-0 w-[60px]" data-name="Badge/System">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#7c3aed] text-[11px] whitespace-nowrap">시스템</p>
    </div>
  );
}

function BadgeManual() {
  return (
    <div className="bg-[#fce7f3] content-stretch flex h-[22px] items-center justify-center overflow-clip px-[8px] py-[2px] relative rounded-[99px] shrink-0 w-[64px]" data-name="Badge/Manual">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#db2877] text-[11px] whitespace-nowrap">외부접수</p>
    </div>
  );
}

function RowBadges() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start overflow-clip p-[10px] relative shrink-0 w-[800px]" data-name="Row/Badges">
      <BadgeCritical />
      <BadgeWarning />
      <BadgeNormal />
      <BadgeOffline />
      <BadgeSystem />
      <BadgeManual />
    </div>
  );
}

function SectionBadge() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-[1120px]" data-name="Section/Badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">BADGE</p>
      <RowBadges />
    </div>
  );
}

function PrioLow() {
  return (
    <div className="bg-[#f0fdf3] h-[36px] relative rounded-[8px] shrink-0 w-[134px]" data-name="Prio/Low">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#16a34a] text-[12px] whitespace-nowrap">낮음</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#16a34a] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function PrioMid() {
  return (
    <div className="bg-[#fffdeb] h-[36px] relative rounded-[8px] shrink-0 w-[134px]" data-name="Prio/Mid">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#d97706] text-[12px] whitespace-nowrap">보통</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#d97706] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function PrioHigh() {
  return (
    <div className="bg-[#fff1f1] h-[36px] relative rounded-[8px] shrink-0 w-[134px]" data-name="Prio/High">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#dc2626] text-[12px] whitespace-nowrap">높음 ✓</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#dc2626] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function PrioUrgent() {
  return (
    <div className="bg-[#faf5ff] h-[36px] relative rounded-[8px] shrink-0 w-[134px]" data-name="Prio/Urgent">
      <div className="content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#7c3aed] text-[12px] whitespace-nowrap">긴급</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#7c3aed] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function RowPriority() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] items-start overflow-clip p-[10px] relative shrink-0 w-[600px]" data-name="Row/Priority">
      <PrioLow />
      <PrioMid />
      <PrioHigh />
      <PrioUrgent />
    </div>
  );
}

function SectionPriority() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-[1120px]" data-name="Section/Priority">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">PRIORITY</p>
      <RowPriority />
    </div>
  );
}

function CircleDone() {
  return (
    <div className="bg-[#dcfce7] content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[16px] shrink-0 size-[32px]" data-name="Circle/Done">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#16a34a] text-[13px] whitespace-nowrap">✓</p>
    </div>
  );
}

function StepDone() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] h-[72px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-[60px]" data-name="Step/Done">
      <CircleDone />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">완료</p>
    </div>
  );
}

function CircleCurrent() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[16px] shrink-0 size-[32px]" data-name="Circle/Current">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[13px] text-white whitespace-nowrap">4</p>
    </div>
  );
}

function StepCurrent() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] h-[72px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-[60px]" data-name="Step/Current">
      <CircleCurrent />
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0ea5e9] text-[11px] whitespace-nowrap">현재</p>
    </div>
  );
}

function CirclePending() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[16px] shrink-0 size-[32px]" data-name="Circle/Pending">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[13px] whitespace-nowrap">5</p>
    </div>
  );
}

function StepPending() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[6px] h-[72px] items-center justify-center overflow-clip p-[10px] relative shrink-0 w-[60px]" data-name="Step/Pending">
      <CirclePending />
      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">대기</p>
    </div>
  );
}

function RowFlowSteps() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[10px] relative shrink-0 w-[300px]" data-name="Row/FlowSteps">
      <StepDone />
      <StepCurrent />
      <StepPending />
    </div>
  );
}

function SectionFlowStep() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-[1120px]" data-name="Section/FlowStep">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">FLOW STEP</p>
      <RowFlowSteps />
    </div>
  );
}

function InputDefault() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[260px]" data-name="Input/Default">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#1e293c] text-[13px] whitespace-nowrap">입력값</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e7ed] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InputDisabled() {
  return (
    <div className="bg-[#f8fafc] h-[36px] relative rounded-[8px] shrink-0 w-[260px]" data-name="Input/Disabled">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[13px] whitespace-nowrap">비활성화</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e2e7ed] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InputFocus() {
  return (
    <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-[260px]" data-name="Input/Focus">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#1e293c] text-[13px] whitespace-nowrap">포커스 상태</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#0ea5e9] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function RowInputs() {
  return (
    <div className="bg-white content-stretch flex gap-[16px] items-center overflow-clip p-[10px] relative shrink-0 w-[900px]" data-name="Row/Inputs">
      <InputDefault />
      <InputDisabled />
      <InputFocus />
    </div>
  );
}

function SectionFormElements() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-[1120px]" data-name="Section/FormElements">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">FORM ELEMENTS</p>
      <RowInputs />
    </div>
  );
}

function Avatar() {
  return (
    <div className="bg-[#0ea5e9] content-stretch flex items-center justify-center overflow-clip p-[10px] relative rounded-[10px] shrink-0 size-[20px]" data-name="Avatar">
      <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[10px] text-white whitespace-nowrap">김</p>
    </div>
  );
}

function ChipWorker() {
  return (
    <div className="bg-[#f0faff] h-[32px] relative rounded-[99px] shrink-0 w-[110px]" data-name="Chip/Worker">
      <div className="content-stretch flex gap-[6px] items-center overflow-clip px-[10px] py-[5px] relative rounded-[inherit] size-full">
        <Avatar />
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#0384c7] text-[12px] whitespace-nowrap">김현수</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#94a3b8] text-[14px] whitespace-nowrap">×</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bae6fd] border-[1.5px] border-solid inset-0 pointer-events-none rounded-[99px]" />
    </div>
  );
}

function SectionWorkerChip() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-[1120px]" data-name="Section/WorkerChip">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[11px] whitespace-nowrap">WORKER CHIP</p>
      <ChipWorker />
    </div>
  );
}

export default function BimsDesignSystemComponents() {
  return (
    <div className="bg-[#f1f5f9] content-stretch flex flex-col gap-[40px] items-start p-[40px] relative size-full" data-name="BIMS Design System · Components">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[20px] whitespace-nowrap">BIMS Design System · Components</p>
      <SectionButton />
      <SectionBadge />
      <SectionPriority />
      <SectionFlowStep />
      <SectionFormElements />
      <SectionWorkerChip />
    </div>
  );
}