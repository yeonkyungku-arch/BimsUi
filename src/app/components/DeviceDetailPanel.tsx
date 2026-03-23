import { X, Battery, Wifi, Clock, Zap, Radio, RefreshCw, Power, RotateCcw, Tablet, Share2 } from "lucide-react";
import { Sheet, SheetContent } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Device {
  id: string;
  name: string;
  customerCode: string;
  region: string;
  status: string;
  battery: string;
  lastUpdate: string;
}

interface DeviceDetailPanelProps {
  device: Device | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceDetailPanel({ device, isOpen, onClose }: DeviceDetailPanelProps) {
  if (!device) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "정상":
        return "bg-green-100 text-green-800";
      case "지연":
        return "bg-yellow-100 text-yellow-800";
      case "오프라인":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[800px] sm:max-w-[800px] overflow-y-auto p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b bg-white sticky top-0 z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">BIS 단말 정보</p>
                <h2 className="text-2xl">{device.id}</h2>
                <p className="text-gray-600 mt-1">{device.customerCode}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* 단말 기본 정보 */}
            <div className="p-6 border-b">
              <h3 className="text-lg text-gray-700 mb-4">단말 기본 정보</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">단말 ID (BIS)</span>
                  <span className="text-gray-900">{device.id}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">내부 통신 ID</span>
                  <span className="text-gray-900">DEV001</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">모델</span>
                  <span className="text-gray-900">—</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">고객사</span>
                  <span className="text-gray-900">{device.customerCode}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">권역</span>
                  <span className="text-gray-900">서울</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">정류장</span>
                  <span className="text-gray-900">{device.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-gray-600">펌웨어 버전</span>
                  <span className="text-gray-900">—</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">설치 일자</span>
                  <span className="text-gray-900">—</span>
                </div>
              </div>
            </div>

            {/* 단말 상태 */}
            <div className="p-6 border-b">
              <h3 className="text-lg text-gray-700 mb-4">단말 상태</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">디스플레이 상태</p>
                  <Badge className="bg-green-100 text-green-800">정상</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">통신 상태</p>
                  <Badge className="bg-green-100 text-green-800">연결</Badge>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">배터리 잔량</p>
                  <div className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-green-600" />
                    <span className="text-green-600">{device.battery} (정상)</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">마지막 통신</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{device.lastUpdate}</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">신호 강도</p>
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">-65 dBm</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">충전 상태</p>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    <span className="text-green-600">충전 중</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 최근 알림 */}
            <div className="p-6 border-b">
              <h3 className="text-lg text-gray-700 mb-4">최근 알림</h3>
              <div className="flex items-center gap-2 text-green-600">
                <div className="w-6 h-6 rounded-full border-2 border-green-600 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <p>최근 알림이 없습니다</p>
              </div>
            </div>

            {/* 명령 요청 */}
            <div className="p-6 border-b">
              <h3 className="text-lg text-gray-700 mb-4">명령 요청</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">상태 재조회 요청</p>
                      <p className="text-sm text-gray-500">단말 현재 상태를 재조회합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">요청</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Wifi className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">통신 재연결 요청</p>
                      <p className="text-sm text-gray-500">통신 연결을 재시도합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">요청</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <RotateCcw className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">런타임 재시작 요청</p>
                      <p className="text-sm text-gray-500">애플리케이션 런타임을 재시작합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">요청</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Power className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">단말 재부팅 요청</p>
                      <p className="text-sm text-gray-500">단말을 안전하게 재부팅합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">요청</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Tablet className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">디스플레이 새로고침 요청</p>
                      <p className="text-sm text-gray-500">E-paper 화면 전체를 갱신합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">요청</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-900">구성 재등기화 요청</p>
                      <p className="text-sm text-gray-500">정책 및 구성을 재등기화합니다</p>
                    </div>
                  </div>
                  <Button variant="outline">요청</Button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                명령 버튼은 즉시 실행되지 않습니다. 요청 기록이 생성되며 Command Center에서 처리됩니다.
              </p>
            </div>

            {/* 명령 이력 */}
            <div className="p-6">
              <h3 className="text-lg text-gray-700 mb-4">명령 이력</h3>
              <p className="text-gray-600">이 세션에서 요청된 명령이 없습니다</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}