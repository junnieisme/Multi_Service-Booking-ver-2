"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MainContent from "@/components/Layout/MainContent";

export default function BookingSuccessPage() {
  const [bookingInfo, setBookingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Checking localStorage for bookingInfo...");

    const info = localStorage.getItem("bookingInfo");
    console.log("Found bookingInfo:", info);

    if (info) {
      try {
        const parsedInfo = JSON.parse(info);
        setBookingInfo(parsedInfo);
        setTimeout(() => {
          localStorage.removeItem("bookingInfo");
          localStorage.removeItem("paymentInfo");
        }, 1000);
      } catch (error) {
        console.error("Error parsing bookingInfo:", error);
        setBookingInfo({
          fullName: "Nguyễn Văn A",
          phone: "0123456789",
          date: "06/02/2025",
          time: "14:00",
          service: { name: "Cắt tóc nam", price: 150000 },
          totalAmount: 165000,
          bookingId: "BK123456",
        });
      }
    }
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <MainContent>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "4px solid #e5e7eb",
                borderTop: "4px solid #3b82f6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            ></div>
            <p style={{ color: "#6b7280" }}>Đang tải thông tin...</p>
          </div>
        </div>

        {/* Thêm CSS inline cho animation */}
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </MainContent>
    );
  }

  // Hiển thị khi không có bookingInfo
  if (!bookingInfo) {
    return (
      <MainContent>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9fafb",
            padding: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "16px",
              }}
            >
              Đặt Lịch Thành Công!
            </h1>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "24px",
              }}
            >
              Cảm ơn bạn đã đặt lịch. Vui lòng kiểm tra email để xem chi tiết
              lịch hẹn.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Link
                href="/user/my-appointments"
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  textDecoration: "none",
                  textAlign: "center",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1d4ed8")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
              >
                Xem Lịch Hẹn Của Tôi
              </Link>
              <Link
                href="/"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  textDecoration: "none",
                  textAlign: "center",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#e5e7eb")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
              >
                Về Trang Chủ
              </Link>
            </div>
          </div>
        </div>
      </MainContent>
    );
  }

  // Hiển thị khi có bookingInfo - DÙNG INLINE STYLES
  return (
    <MainContent>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            maxWidth: "672px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#10b981",
              color: "white",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Đặt Lịch Thành Công!
            </h1>
            <p style={{ opacity: 0.9 }}>
              Cảm ơn bạn đã đặt lịch tại dịch vụ của chúng tôi
            </p>
          </div>

          {/* Content */}
          <div style={{ padding: "24px" }}>
            <div
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "16px",
                }}
              >
                Thông Tin Đặt Lịch
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Mã đặt lịch:</span>
                  <span style={{ fontWeight: "500" }}>
                    {bookingInfo.bookingId || `BK${Date.now()}`}
                  </span>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Dịch vụ:</span>
                  <span style={{ fontWeight: "500" }}>
                    {bookingInfo.service?.name || "N/A"}
                  </span>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Thời gian:</span>
                  <span style={{ fontWeight: "500" }}>
                    {bookingInfo.date} - {bookingInfo.time}
                  </span>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Khách hàng:</span>
                  <span style={{ fontWeight: "500" }}>
                    {bookingInfo.fullName || "N/A"}
                  </span>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ color: "#6b7280" }}>Số điện thoại:</span>
                  <span style={{ fontWeight: "500" }}>
                    {bookingInfo.phone || "N/A"}
                  </span>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "12px",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                    }}
                  >
                    <span style={{ fontWeight: "600", color: "#1f2937" }}>
                      Tổng cộng:
                    </span>
                    <span style={{ fontWeight: "bold", color: "#059669" }}>
                      {bookingInfo.totalAmount?.toLocaleString() || "0"} VND
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <Link
                href="/user/my-appointments"
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  textDecoration: "none",
                  textAlign: "center",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1d4ed8")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
              >
                Xem Lịch Hẹn Của Tôi
              </Link>
              <Link
                href="/"
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  textDecoration: "none",
                  textAlign: "center",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#e5e7eb")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
              >
                Về Trang Chủ
              </Link>
            </div>

            {/* Note */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              <p>Một email xác nhận đã được gửi đến địa chỉ email của bạn.</p>
              <p>Vui lòng đến đúng giờ hẹn.</p>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
