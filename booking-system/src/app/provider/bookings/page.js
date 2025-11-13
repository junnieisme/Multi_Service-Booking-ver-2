"use client";
import MainLayout from "@/components/MainLayout";

export default function BookingManagementPage() {
  // API Call: GET /api/provider/bookings

  return (
    <MainLayout userRole="provider">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Quản lý đặt chỗ</h2>
        <div className="bg-white rounded-lg border overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Khách hàng</th>
                <th className="px-6 py-3 text-left">Dịch vụ</th>
                <th className="px-6 py-3 text-left">Ngày</th>
                <th className="px-6 py-3 text-left">Trạng thái</th>
                <th className="px-6 py-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>{/* Map bookings here */}</tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
