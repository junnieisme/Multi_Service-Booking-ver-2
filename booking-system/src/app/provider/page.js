// src/app/provider/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";
export default function ProviderDashboard() {
  const [user, setUser] = useState(null);
  const [countData, setCountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [todaySchedule,setTodaySchedule] = useState([]);

  const router = useRouter();
  useEffect(() => {
    const fetchTodayBooking = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/today-booking",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setTodaySchedule(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDataBooking = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/booking",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setUpcomingAppointments(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchDataNCC = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/check-login",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchcountData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/count-booking",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setCountData(data);
          console.log("usser", data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchcountData();
    fetchDataNCC();
    fetchDataBooking();
    fetchTodayBooking();

  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  const stats = [
    {
      label: "Lịch sắp tới",
      value: countData?.so_lich_sap_toi,
      color: "#2563eb",
    },
    {
      label: "Doanh thu dự kiến (VNĐ)",
      value: Number(countData?.doanh_thu || 0).toLocaleString("vi-VN"),
      color: "#16a34a",
    },
    { label: "Lượt đánh giá ", value: "100", color: "#eab308" },
    { label: "Lịch bị hủy", value: countData?.lich_bi_huy, color: "#dc2626" },
  ];

  // const upcomingAppointments = [
  //   {
  //     id: "#1256",
  //     customer: "Mai Anh",
  //     service: "Spa mặt",
  //     time: "14:00",
  //     status: "Đã xác nhận",
  //   },
  //   {
  //     id: "#1257",
  //     customer: "Tuấn",
  //     service: "Cắt tóc nam",
  //     time: "18:30",
  //     status: "Chờ xác nhận",
  //   },
  //   {
  //     id: "#1258",
  //     customer: "Hương",
  //     service: "Massage body",
  //     time: "09:00",
  //     status: "Đã xác nhận",
  //   },
  //   {
  //     id: "#1259",
  //     customer: "Minh",
  //     service: "Nail art",
  //     time: "16:00",
  //     status: "Đã xác nhận",
  //   },
  // ];

  // const todaySchedule = [
  //   { time: "09:00", service: "Massage - Hương", status: "Hoàn thành" },
  //   { time: "11:00", service: "Cắt tóc - Nam", status: "Đang thực hiện" },
  //   { time: "14:00", service: "Spa mặt - Mai Anh", status: "Sắp tới" },
  //   { time: "16:00", service: "Nail art - Minh", status: "Sắp tới" },
  // ];

  return (
    <MainContent>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Header Section */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#1f2937",
            }}
          >
            Xin chào {user?.ho_ten} 🏢
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Tổng quan hoạt động và quản lý dịch vụ của bạn
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
                  onClick={() => router.push("/provider/appointments")}
                  style={{
                    color: "#2563eb",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500",
                    fontSize: "0.875rem",
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
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                    }}
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
                          {appointment.ten_dich_vu} • {appointment.ten_san_pham}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "12px",
                            backgroundColor:
                              appointment.trang_thai === 1
                                ? "#d1fae5"
                                : appointment.trang_thai === 0
                                ? "#fef3c7"
                                : "#FDC9D1",
                            color:
                              appointment.trang_thai === 0
                                ? "#92400e"
                                : appointment.trang_thai === 1
                                ? "#065f46"
                                : "#FF0025",
                          }}
                        >
                          {appointment.trang_thai == 0
                            ? "Chưa xác nhận"
                            : appointment.trang_thai == 1
                            ? "Đã xác nhận"
                            : "Đã hủy"}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "1 rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {appointment.ten_khach_hang} • {appointment.thoi_gian} -{" "}
                        {formatDate(appointment.ngay_dat_lich)}
                      </p>
                      <p
                        style={{
                          color: "#374151",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                        }}
                      >
                        {appointment.ma_hoa_don}
                      </p>
                    </div>
                    {/* <button
                      onClick={() =>
                        router.push(
                          `/provider/appointments`
                        )
                      }
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#1d4ed8";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                      }}
                    >
                      Chi tiết
                    </button> */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Today's Schedule */}
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
                Công việc trong ngày
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {todaySchedule.map((schedule, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.75rem",
                      backgroundColor: "#f8fafc",
                      borderRadius: "6px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          fontSize: "0.875rem",
                        }}
                      >
                        {schedule.thoi_gian} • {formatDate(schedule.ngay_dat_lich)}
                      </div>
                      <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                        {schedule.ten_dich_vu} - {schedule.ten_san_pham}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "500",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                          backgroundColor:
                              schedule.trang_thai === 1
                                ? "#d1fae5"
                                : schedule.trang_thai === 0
                                ? "#fef3c7"
                                : "#FDC9D1",
                            color:
                              schedule.trang_thai === 0
                                ? "#92400e"
                                : schedule.trang_thai === 1
                                ? "#065f46"
                                : "#FF0025",
                      }}
                    >
                      {schedule.trang_thai===0?"Chưa xác nhận":"Đã xác nhận"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
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
                  marginBottom: "1rem",
                }}
              >
                Hiệu suất tháng 📈
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {[
                  { metric: "Khách hàng mới", value: "15", change: "+12%" },
                  {
                    metric: "Đánh giá trung bình",
                    value: "4.8",
                    change: "+0.2",
                  },
                  { metric: "Tỷ lệ giữ chỗ", value: "85%", change: "+5%" },
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#0c4a6e", fontSize: "0.875rem" }}>
                      {item.metric}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#0369a1",
                          fontSize: "0.875rem",
                        }}
                      >
                        {item.value}
                      </div>
                      <div style={{ color: "#16a34a", fontSize: "0.75rem" }}>
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
