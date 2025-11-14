"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function SuccessPage() {
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    // Lấy thông tin từ sessionStorage
    const storedBooking = sessionStorage.getItem("currentBooking");
    if (storedBooking) {
      setBookingInfo(JSON.parse(storedBooking));
    }
  }, []);

  const handleBackToHome = () => {
    // Xóa dữ liệu tạm
    sessionStorage.removeItem("currentBooking");
    router.push("/");
  };

  const handleNewBooking = () => {
    // Xóa dữ liệu tạm và quay lại booking
    sessionStorage.removeItem("currentBooking");
    router.push("/booking");
  };

  if (!bookingInfo) {
    return (
      <MainContent>
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <div style={{ fontSize: "2rem" }}>⏳</div>
          <p>Đang tải thông tin...</p>
        </div>
      </MainContent>
    );
  }

  const {
    service,
    paymentMethod,
    totalAmount,
    bookingId,
    date,
    time,
    fullName,
    phone,
    address,
  } = bookingInfo;

  return (
    <MainContent>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "3rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          {/* Success Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#dcfce7",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              fontSize: "2.5rem",
            }}
          >
            ✅
          </div>

          {/* Success Message */}
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1rem",
            }}
          >
            Đặt lịch thành công!
          </h1>

          <p
            style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "2rem" }}
          >
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
          </p>

          {/* Booking Details */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem",
              }}
            >
              Thông tin đặt lịch
            </h3>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  backgroundColor: "#f1f5f9",
                  borderRadius: "6px",
                  padding: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "40px",
                }}
              >
                {service.image}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  {service.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                  {service.provider} • {service.duration}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                fontSize: "0.875rem",
              }}
            >
              <div>
                <div style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  Mã đơn hàng
                </div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>
                  {bookingId}
                </div>
              </div>
              <div>
                <div style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  Ngày hẹn
                </div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>
                  {date} {time}
                </div>
              </div>
              <div>
                <div style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  Khách hàng
                </div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>
                  {fullName}
                </div>
              </div>
              <div>
                <div style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  Điện thoại
                </div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>
                  {phone}
                </div>
              </div>
              <div>
                <div style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  Phương thức
                </div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>
                  {paymentMethod === "counter"
                    ? "Thanh toán sau"
                    : paymentMethod === "deposit"
                    ? "Đã đặt cọc"
                    : "Đã thanh toán toàn bộ"}
                </div>
              </div>
              <div>
                <div style={{ color: "#6b7280", marginBottom: "0.25rem" }}>
                  Tổng tiền
                </div>
                <div style={{ fontWeight: "600", color: "#1f2937" }}>
                  {totalAmount.toLocaleString()} VND
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div
            style={{
              backgroundColor: "#f0f9ff",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #bae6fd",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "0.75rem",
              }}
            >
              Bước tiếp theo
            </h4>
            <ul
              style={{
                fontSize: "0.875rem",
                color: "#0369a1",
                paddingLeft: "1rem",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              <li>Nhân viên sẽ liên hệ xác nhận trong vòng 30 phút</li>
              <li>Vui lòng có mặt trước 15 phút so với giờ hẹn</li>
              <li>Mang theo CMND/CCCD khi đến sử dụng dịch vụ</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <button
              onClick={handleBackToHome}
              style={{
                padding: "0.75rem 1.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#6b7280",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Về trang chủ
            </button>

            <button
              onClick={handleNewBooking}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#dc2626",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Đặt lịch mới
            </button>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
