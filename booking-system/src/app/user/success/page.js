"use client";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import { CheckCircle } from "lucide-react";

export default function BookingSuccessPage() {
  const router = useRouter();

  return (
    <MainLayout userRole="user">
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center space-y-4">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold">Đặt chỗ thành công!</h2>
          <p className="text-gray-600">Cuộc hẹn của bạn đã được xác nhận</p>
          <button
            onClick={() => router.push("/user/appointments")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Xem các cuộc hẹn của tôi
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
