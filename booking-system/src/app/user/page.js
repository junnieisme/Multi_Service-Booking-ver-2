// src/app/user/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Kiểm tra và xử lý an toàn
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser({ name: parsedUser.name || "Người dùng" });
      } else {
        // Nếu không có user data, set giá trị mặc định
        setUser({ name: "Người dùng" });
        console.warn("Không tìm thấy thông tin người dùng trong localStorage");
      }
    } catch (error) {
      console.error("Lỗi khi đọc thông tin người dùng:", error);
      setUser({ name: "Người dùng" });
    } finally {
      setLoading(false);
    }
  }, []);

  const upcomingAppointments = [
    {
      id: 1,
      service: "Cắt tóc nam",
      provider: "Barber Pro",
      date: "Hôm nay, 15:30",
      status: "Sắp tới",
    },
    {
      id: 2,
      service: "Massage thư giãn",
      provider: "Spa Relax",
      date: "Ngày mai, 14:00",
      status: "Đã xác nhận",
    },
    {
      id: 3,
      service: "Chăm sóc da",
      provider: "Beauty Center",
      date: "15/10, 10:00",
      status: "Đã xác nhận",
    },
  ];

  const quickActions = [
    {
      title: "Đặt lịch mới",
      description: "Tìm và đặt dịch vụ mới",
      icon: "📅",
      path: "/user/search",
    },
    {
      title: "Lịch hẹn của tôi",
      description: "Xem và quản lý lịch hẹn",
      icon: "📋",
      path: "/user/my-appointments",
    },
    {
      title: "Dịch vụ đã lưu",
      description: "Dịch vụ yêu thích",
      icon: "❤️",
      path: "/user/services",
    },
    {
      title: "Thanh toán",
      description: "Lịch sử giao dịch",
      icon: "💳",
      path: "/user/payment",
    },
  ];

  const stats = [
    { label: "Lịch hẹn sắp tới", value: "3", color: "#2563eb" },
    { label: "Dịch vụ đã dùng", value: "12", color: "#16a34a" },
    { label: "Đánh giá đã gửi", value: "8", color: "#dc2626" },
    { label: "Điểm tích lũy", value: "450", color: "#eab308" },
  ];

  // Hiển thị loading nếu đang tải dữ liệu
  if (loading) {
    return (
      <MainContent>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⏳</div>
            <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
              Đang tải...
            </p>
          </div>
        </div>
      </MainContent>
    );
  }

  return (
    <MainContent>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Xin chào, {user?.name || "Người dùng"}! 👋
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Chúc bạn một ngày tốt lành. Bạn có {upcomingAppointments.length}{" "}
            lịch hẹn sắp tới.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: stat.color,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "#6b7280",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Left Column - Main Content */}
          <div>
            {/* Upcoming Appointments */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  Lịch hẹn sắp tới
                </h2>
                <button
                  onClick={() => router.push("/user/my-appointments")}
                  style={{
                    color: "#2563eb",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#2563eb";
                  }}
                >
                  Xem tất cả
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "1rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                    onClick={() => router.push("/user/my-appointments")}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <h3
                          style={{
                            fontWeight: "600",
                            color: "#1f2937",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.service}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                            backgroundColor:
                              appointment.status === "Sắp tới"
                                ? "#fef3c7"
                                : "#d1fae5",
                            color:
                              appointment.status === "Sắp tới"
                                ? "#92400e"
                                : "#065f46",
                          }}
                        >
                          {appointment.status}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {appointment.provider}
                      </p>
                      <p
                        style={{
                          color: "#374151",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {appointment.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "1.5rem",
                }}
              >
                Thao tác nhanh
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                }}
              >
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "1.5rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    onClick={() => router.push(action.path)}
                  >
                    <div style={{ fontSize: "2rem", marginRight: "1rem" }}>
                      {action.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          fontSize: "0.875rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {action.title}
                      </h3>
                      <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                        {action.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            {/* Recent Activity */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid #e5e7eb",
                marginBottom: "2rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#1f2937",
                  marginBottom: "1rem",
                }}
              >
                Hoạt động gần đây
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    action: "Đã đặt lịch",
                    service: "Cắt tóc nam",
                    time: "2 giờ trước",
                  },
                  {
                    action: "Đã hủy lịch",
                    service: "Massage",
                    time: "1 ngày trước",
                  },
                  {
                    action: "Đã đánh giá",
                    service: "Spa thư giãn",
                    time: "2 ngày trước",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#2563eb",
                        borderRadius: "50%",
                        marginTop: "0.25rem",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: "#374151",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          marginBottom: "0.125rem",
                        }}
                      >
                        {activity.action}:{" "}
                        <span style={{ color: "#6b7280" }}>
                          {activity.service}
                        </span>
                      </p>
                      <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promotions */}
            <div
              style={{
                backgroundColor: "#f0f9ff",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid #bae6fd",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#0369a1",
                  marginBottom: "0.75rem",
                }}
              >
                Ưu đãi đặc biệt 🎁
              </h3>
              <p
                style={{
                  color: "#0c4a6e",
                  fontSize: "0.875rem",
                  marginBottom: "1rem",
                }}
              >
                Giảm 20% cho lần đặt lịch đầu tiên với đối tác mới
              </p>
              <button
                onClick={() => router.push("/user/search")}
                style={{
                  backgroundColor: "#0284c7",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: "100%",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#0369a1";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#0284c7";
                }}
              >
                Khám phá ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
