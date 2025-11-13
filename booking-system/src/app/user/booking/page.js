"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceId = searchParams.get("service");

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = async () => {
    // API Call: POST /api/bookings
    router.push("/user/checkout");
  };

  return (
    <MainLayout userRole="user">
      <div className="max-w-2xl space-y-6">
        <h2 className="text-3xl font-bold">Đặt dịch vụ</h2>
        <div className="bg-white p-6 rounded-lg border space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Ngày</label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({ ...bookingData, date: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Giờ</label>
            <select
              value={bookingData.time}
              onChange={(e) =>
                setBookingData({ ...bookingData, time: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option>09:00</option>
              <option>10:00</option>
              <option>11:00</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
