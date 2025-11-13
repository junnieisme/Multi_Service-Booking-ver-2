// src/app/user/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser({ name: "Nguyễn Văn A" });
  }, []);

  const weeklySchedule = [
    { day: "Thứ 2", activity: "Cắt tóc - 15:30" },
    { day: "Thứ 3", activity: "Yoga - 18:30" },
    { day: "Thứ 4", activity: "Họp online - 9:00" },
    { day: "Thứ 5", activity: "Massage - 16:00" },
    { day: "Thứ 6", activity: "Chăm sóc da - 14:00" },
  ];

  const calendarDays = [
    [28, 29, 30, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, ""],
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
            Dashboard tổng quan
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1.125rem",
            }}
          ></p>
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
            "Lịch trình của tôi",
            "To-do List",
            "Đặt lịch dịch vụ",
            "Đánh giá & Review",
            "Thanh toán",
            "Lịch sử đặt lịch",
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

        {/* Welcome Section */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Xin chào, {user?.name}!
          </h2>
          <p
            style={{
              color: "#6b7280",
              fontSize: "1rem",
            }}
          >
            Chúc bạn một ngày tốt lành. Bạn có 3 lịch hẹn sắp tới.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Left Column - Weekly Schedule */}
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
                LỊCH TRÌNH TUẦN NÀY
              </h3>

              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                {weeklySchedule.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      padding: "1rem",
                      borderBottom:
                        index < weeklySchedule.length - 1
                          ? "1px solid #e5e7eb"
                          : "none",
                      backgroundColor: index % 2 === 0 ? "#f9fafb" : "white",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        minWidth: "80px",
                        color: "#374151",
                        fontSize: "0.875rem",
                      }}
                    >
                      {item.day}
                    </div>
                    <div
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                      }}
                    >
                      {item.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Calendar */}
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
                LỊCH THÁNG 10
              </h3>

              {/* Calendar Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  color: "#374151",
                  fontSize: "0.875rem",
                }}
              >
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              {/* Calendar Days */}
              {calendarDays.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      style={{
                        padding: "0.5rem",
                        color: day ? "#374151" : "#d1d5db",
                        backgroundColor: day === 1 ? "#e0f2fe" : "transparent",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                        fontWeight: day ? "500" : "400",
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Appointment History */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginTop: "2rem",
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
                LỊCH SỬ HẸN
              </h3>
              <div
                style={{
                  color: "#6b7280",
                  fontStyle: "italic",
                  fontSize: "0.875rem",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                Hiển thị lịch sử các cuộc hẹn đã hoàn thành...
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
