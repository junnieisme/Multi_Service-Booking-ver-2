"use client";
import MainLayout from "@/components/MainLayout";

export default function ReportsPage() {
  // API Call: GET /api/provider/reports

  return (
    <MainLayout userRole="provider">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Báo cáo và Thống kê</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Thu nhập hàng tháng</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              Biểu đồ
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
