// src/app/provider/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function ProviderAppointments() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed, cancelled
    const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  useEffect(() => {
    const fetchDataBooking = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/all-booking",
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
          setAppointments(data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    };
    // Mock data - replace with API call
    // setAppointments([
    //   {
    //     id: 1,
    //     customerName: "Nguyễn Văn A",
    //     serviceName: "Cắt tóc nam cao cấp",
    //     date: "2024-01-15",
    //     time: "10:00",
    //     duration: "45 phút",
    //     price: "150,000đ",
    //     status: "pending",
    //     customerPhone: "0912345678",
    //     notes: "Khách hàng muốn cắt kiểu Hàn Quốc",
    //   },
    //   {
    //     id: 2,
    //     customerName: "Trần Thị B",
    //     serviceName: "Massage thư giãn",
    //     date: "2024-01-15",
    //     time: "14:30",
    //     duration: "60 phút",
    //     price: "300,000đ",
    //     status: "confirmed",
    //     customerPhone: "0923456789",
    //     notes: "",
    //   },
    //   {
    //     id: 3,
    //     customerName: "Lê Văn C",
    //     serviceName: "Spa mặt chuyên sâu",
    //     date: "2024-01-16",
    //     time: "09:00",
    //     duration: "90 phút",
    //     price: "500,000đ",
    //     status: "completed",
    //     customerPhone: "0934567890",
    //     notes: "Đã hoàn thành, khách hài lòng",
    //   },
    //   {
    //     id: 4,
    //     customerName: "Phạm Thị D",
    //     serviceName: "Nail art",
    //     date: "2024-01-16",
    //     time: "16:00",
    //     duration: "75 phút",
    //     price: "250,000đ",
    //     status: "cancelled",
    //     customerPhone: "0945678901",
    //     notes: "Khách hủy do bận việc đột xuất",
    //   },
    //   {
    //     id: 5,
    //     customerName: "Hoàng Văn E",
    //     serviceName: "Cạo mặt & Đắp mặt nạ",
    //     date: "2024-01-17",
    //     time: "11:30",
    //     duration: "50 phút",
    //     price: "180,000đ",
    //     status: "pending",
    //     customerPhone: "0956789012",
    //     notes: "",
    //   },
    // ]);
    fetchDataBooking();
  }, []);

  const filteredAppointments = appointments.filter((apt) =>
    filter === "all" ? true : apt.trang_thai === filter
  );

  const updateStatus = async (appointmentId, newStatus) => {
    // TODO: Call API to update status
    // setAppointments((prev) =>
    //   prev.map((apt) =>
    //     apt.id === appointmentId ? { ...apt, trang_thai: newStatus } : apt
    //   )
    // );
    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/api/dat-lich/change-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            id: appointmentId,
            trang_thai: newStatus,
          }),
        }
      );
      if (!response.ok) {
        console.warn("Không thể kết nối API");
        return;
      }
      const result = await response.json();
      // Kiểm tra trạng thái trả về từ API
      if (result.status === true) {
        // alert(result.message);
        setAppointments((prev) =>
          prev.map((apt) =>
            apt.id === appointmentId ? { ...apt, trang_thai: newStatus } : apt
          )
        );
      }
    } catch (err) {
      console.error("Lỗi API:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return { bg: "#fef3c7", text: "#92400e", label: "Chờ xác nhận" };
      case 1:
        return { bg: "#d1fae5", text: "#065f46", label: "Đã xác nhận" };
      case 3:
        return { bg: "#dbeafe", text: "#1e40af", label: "Đã hoàn thành" };
      case 2:
        return { bg: "#fee2e2", text: "#991b1b", label: "Đã hủy" };
      default:
        return { bg: "#f3f4f6", text: "#374151", label: status };
    }
  };

  const getStatusActions = (status) => {
    switch (status) {
      case 0:
        return [
          { label: "Xác nhận", action: 1, color: "#16a34a" },
          { label: "Từ chối", action: 2, color: "#dc2626" },
        ];
      case 1:
        return [
          { label: "Hoàn thành", action: 3, color: "#2563eb" },
          { label: "Hủy", action: 2, color: "#dc2626" },
        ];
      default:
        return [];
    }
  };

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
            Quản lý lịch đặt 📅
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Theo dõi và quản lý tất cả lịch hẹn từ khách hàng
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "all", label: "Tất cả", count: appointments.length },
            {
              key: 0,
              label: "Chờ xác nhận",
              count: appointments.filter((a) => a.trang_thai === 0).length,
            },
            {
              key: 1,
              label: "Đã xác nhận",
              count: appointments.filter((a) => a.trang_thai === 1).length,
            },
            {
              key: 3,
              label: "Đã hoàn thành",
              count: appointments.filter((a) => a.trang_thai === 3).length,
            },
            {
              key: 2,
              label: "Đã hủy",
              count: appointments.filter((a) => a.trang_thai === 2).length,
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: filter === tab.key ? "#2563eb" : "white",
                color: filter === tab.key ? "white" : "#374151",
                border: `1px solid ${
                  filter === tab.key ? "#2563eb" : "#d1d5db"
                }`,
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "0.875rem",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                if (filter !== tab.key) {
                  e.target.style.backgroundColor = "#f9fafb";
                  e.target.style.borderColor = "#9ca3af";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tab.key) {
                  e.target.style.backgroundColor = "white";
                  e.target.style.borderColor = "#d1d5db";
                }
              }}
            >
              {tab.label}
              <span
                style={{
                  backgroundColor:
                    filter === tab.key ? "rgba(255,255,255,0.2)" : "#e5e7eb",
                  color: filter === tab.key ? "white" : "#374151",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filteredAppointments.map((appointment) => {
            const statusInfo = getStatusColor(appointment.trang_thai);
            const actions = getStatusActions(appointment.trang_thai);

            return (
              <div
                key={appointment.id}
                style={{
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {appointment.ten_san_pham}
                      </h3>
                      <span
                        style={{
                          backgroundColor: statusInfo.bg,
                          color: statusInfo.text,
                          padding: "0.25rem 0.75rem",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          fontWeight: "600",
                        }}
                      >
                        {statusInfo.label}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Tên khách hàng
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.ten_khach_hang}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Thời gian
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.thoi_gian} •{" "}
                          {formatDate(appointment.ngay_dat_lich)}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Tổng tiền & Đã trả
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {formatVND(appointment.tong_tien_thanh_toan)} •{" "}
                          {formatVND(appointment.tong_tien_da_tra)}
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Số điện thoại
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.so_dien_thoai}
                        </p>
                      </div>
                    </div>

                    {appointment.ghi_chu && (
                      <div style={{ marginTop: "0.75rem" }}>
                        <p
                          style={{
                            color: "#6b7280",
                            fontSize: "0.875rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          Ghi chú
                        </p>
                        <p
                          style={{
                            color: "#374151",
                            fontSize: "0.875rem",
                            fontStyle: "italic",
                          }}
                        >
                          {appointment.ghi_chu}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {actions.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexDirection: "column",
                        minWidth: "120px",
                      }}
                    >
                      {actions.map((action) => (
                        <button
                          key={action.action}
                          onClick={() =>
                            updateStatus(appointment.id, action.action)
                          }
                          style={{
                            backgroundColor: action.color,
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
                            e.target.style.backgroundColor =
                              action.color === "#16a34a"
                                ? "#15803d"
                                : action.color === "#dc2626"
                                ? "#b91c1c"
                                : action.color === "#2563eb"
                                ? "#1d4ed8"
                                : action.color;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = action.color;
                          }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {filteredAppointments.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
              }}
            >
              <p style={{ color: "#6b7280", fontSize: "1rem" }}>
                {filter === "all"
                  ? "Chưa có lịch đặt nào"
                  : "Không có lịch đặt ở trạng thái " + 
                  (filter==0?"chưa xác nhận"
                  :filter===1?"đã xác nhận"
                  :filter===2?"đã hủy"
                  :"đã hoàn thành")
                  }
              </p>
            </div>
          )}
        </div>
      </div>
    </MainContent>
  );
}
