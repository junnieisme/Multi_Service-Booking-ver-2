// src/app/provider/page.js
"use client";
import { useState } from "react";
import MainContent from "@/components/Layout/MainContent";

export default function ProviderDashboard() {
  const workSchedule = [
    { day: "Thứ 2: 9h–17h", slots: "Còn 2 slot" },
    { day: "Thứ 3: 10h–18h", slots: "Full" },
    { day: "Thứ 4: 9h–16h", slots: "1 slot" },
    { day: "Thứ 5: 8h–17h", slots: "Còn 3 slot" },
    { day: "Thứ 6: 10h–19h", slots: "2 slot" },
  ];

  const recentBookings = [
    { id: "#1256", customer: "Mai Anh", service: "Spa 14h" },
    { id: "#1257", customer: "Tuấn", service: "Cắt tóc 18h30" },
    { id: "#1258", customer: "Hương", service: "Massage 9h" },
    { id: "#1259", customer: "Minh", service: "Nail 16h" },
  ];

  return (
    <MainContent>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Hệ thống dịch vụ của tôi
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.125rem",
            }}
          >
            Dashboard tổng quan
          </p>
        </div>

        {/* Navigation Menu */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e5e7eb",
            flexWrap: "wrap",
          }}
        >
          {[
            "Lịch làm việc / Ca trực",
            "Đơn đặt lịch (Bookings)",
            "Dịch vụ của tôi",
            "Khách hàng của tôi",
            "Đánh giá & Phản hồi",
            "Doanh thu & Báo cáo",
            "Cài đặt cửa hàng",
          ].map((item) => (
            <button
              key={item}
              style={{
                background: "none",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: "0.875rem",
                padding: "0.5rem 0",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#6b7280";
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left Column - Work Schedule */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                }}
              >
                LỊCH LÀM VIỆC TRONG TUẦN
              </h3>

              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {workSchedule.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem",
                      borderBottom:
                        index < workSchedule.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      backgroundColor: index % 2 === 0 ? "#f9fafb" : "white",
                    }}
                  >
                    <div
                      style={{
                        color: "#374151",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                      }}
                    >
                      {item.day}
                    </div>
                    <div
                      style={{
                        color: item.slots === "Full" ? "#dc2626" : "#16a34a",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                      }}
                    >
                      {item.slots}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Bookings */}
          <div>
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                }}
              >
                ĐƠN ĐẶT LỊCH GẦN NHẤT
              </h3>

              {recentBookings.map((booking, index) => (
                <div
                  key={booking.id}
                  style={{
                    padding: "1rem",
                    borderBottom:
                      index < recentBookings.length - 1
                        ? "1px solid #f3f4f6"
                        : "none",
                    backgroundColor: index % 2 === 0 ? "#f9fafb" : "white",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "0.25rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {booking.id}
                  </div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "0.125rem",
                    }}
                  >
                    Khách: {booking.customer}
                  </div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    {booking.service}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
