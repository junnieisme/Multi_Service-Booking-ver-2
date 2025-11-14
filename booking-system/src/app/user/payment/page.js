// src/app/user/booking/success/page.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    // Lấy thông tin từ localStorage hoặc API
    const details = {
      bookingId: "BK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      service: "Tư vấn Sức khỏe Tâm thần",
      provider: "BS. Nguyễn Văn A",
      date: "15/12/2024",
      time: "14:30 - 15:30",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      total: 525000,
    };
    setBookingDetails(details);
  }, []);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Đặt Lịch Thành Công!
          </h1>

          <p className="text-gray-600 mb-2">
            Cảm ơn bạn đã đặt lịch. Thông tin chi tiết đã được gửi đến email của
            bạn.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-medium">
              Mã đặt lịch:{" "}
              <span className="font-bold">{bookingDetails.bookingId}</span>
            </p>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Chi Tiết Đặt Lịch
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Dịch vụ:</span>
                <span className="font-medium">{bookingDetails.service}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Chuyên gia:</span>
                <span className="font-medium">{bookingDetails.provider}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Ngày:</span>
                <span className="font-medium">{bookingDetails.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-medium">{bookingDetails.time}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Địa điểm:</span>
                <span className="font-medium text-right">
                  {bookingDetails.address}
                </span>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng thanh toán:</span>
                  <span>{bookingDetails.total.toLocaleString()} VNĐ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/user/my-appointments"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Xem Lịch Hẹn Của Tôi
            </Link>

            <Link
              href="/search"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition duration-200 font-medium"
            >
              Đặt Lịch Mới
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Mọi thắc mắc xin liên hệ hotline: <strong>1900 1234</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
