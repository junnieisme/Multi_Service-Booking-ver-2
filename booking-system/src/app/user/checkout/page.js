"use client";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function CheckoutPage() {
  const router = useRouter();

  const handlePayment = async () => {
    // API Call: POST /api/payments
    router.push("/user/success");
  };

  return (
    <MainLayout userRole="user">
      <div className="max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold">Xác nhận và thanh toán</h2>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-xl font-semibold mb-4">Bản tóm tắt</h3>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span>Dịch vụ:</span>
              <span className="font-semibold">Làm tóc</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-blue-600">
              <span>Tổng:</span>
              <span>500.000 VNĐ</span>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Thanh toán ngay
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
