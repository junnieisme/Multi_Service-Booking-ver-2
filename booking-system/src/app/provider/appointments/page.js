// src/app/provider/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function ProviderAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed, cancelled

  useEffect(() => {
    // Mock data - replace with API call
    setAppointments([
      {
        id: 1,
        customerName: "Nguyễn Văn A",
        serviceName: "Cắt tóc nam cao cấp",
        date: "2024-01-15",
        time: "10:00",
        duration: "45 phút",
        price: "150,000đ",
        status: "pending",
        customerPhone: "0912345678",
        notes: "Khách hàng muốn cắt kiểu Hàn Quốc",
      },
      {
        id: 2,
        customerName: "Trần Thị B",
        serviceName: "Massage thư giãn",
        date: "2024-01-15",
        time: "14:30",
        duration: "60 phút",
        price: "300,000đ",
        status: "confirmed",
        customerPhone: "0923456789",
        notes: "",
      },
      {
        id: 3,
        customerName: "Lê Văn C",
        serviceName: "Spa mặt chuyên sâu",
        date: "2024-01-16",
        time: "09:00",
        duration: "90 phút",
        price: "500,000đ",
        status: "completed",
        customerPhone: "0934567890",
        notes: "Đã hoàn thành, khách hài lòng",
      },
      {
        id: 4,
        customerName: "Phạm Thị D",
        serviceName: "Nail art",
        date: "2024-01-16",
        time: "16:00",
        duration: "75 phút",
        price: "250,000đ",
        status: "cancelled",
        customerPhone: "0945678901",
        notes: "Khách hủy do bận việc đột xuất",
      },
      {
        id: 5,
        customerName: "Hoàng Văn E",
        serviceName: "Cạo mặt & Đắp mặt nạ",
        date: "2024-01-17",
        time: "11:30",
        duration: "50 phút",
        price: "180,000đ",
        status: "pending",
        customerPhone: "0956789012",
        notes: "",
      },
    ]);
  }, []);

  const filteredAppointments = appointments.filter((apt) =>
    filter === "all" ? true : apt.status === filter
  );

  const updateStatus = async (appointmentId, newStatus) => {
    // TODO: Call API to update status
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: "#fef3c7", text: "#92400e", label: "Chờ xác nhận" };
      case "confirmed":
        return { bg: "#d1fae5", text: "#065f46", label: "Đã xác nhận" };
      case "completed":
        return { bg: "#dbeafe", text: "#1e40af", label: "Đã hoàn thành" };
      case "cancelled":
        return { bg: "#fee2e2", text: "#991b1b", label: "Đã hủy" };
      default:
        return { bg: "#f3f4f6", text: "#374151", label: status };
    }
  };

  const getStatusActions = (status) => {
    switch (status) {
      case "pending":
        return [
          { label: "Xác nhận", action: "confirmed", color: "#16a34a" },
          { label: "Từ chối", action: "cancelled", color: "#dc2626" },
        ];
      case "confirmed":
        return [
          { label: "Hoàn thành", action: "completed", color: "#2563eb" },
          { label: "Hủy", action: "cancelled", color: "#dc2626" },
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
              key: "pending",
              label: "Chờ xác nhận",
              count: appointments.filter((a) => a.status === "pending").length,
            },
            {
              key: "confirmed",
              label: "Đã xác nhận",
              count: appointments.filter((a) => a.status === "confirmed")
                .length,
            },
            {
              key: "completed",
              label: "Đã hoàn thành",
              count: appointments.filter((a) => a.status === "completed")
                .length,
            },
            {
              key: "cancelled",
              label: "Đã hủy",
              count: appointments.filter((a) => a.status === "cancelled")
                .length,
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
            const statusInfo = getStatusColor(appointment.status);
            const actions = getStatusActions(appointment.status);

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
                        {appointment.serviceName}
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
                          Khách hàng
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.customerName}
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
                          {appointment.date} • {appointment.time}
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
                          Thời lượng & Giá
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.duration} • {appointment.price}
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
                          Điện thoại
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            color: "#374151",
                            fontSize: "0.875rem",
                          }}
                        >
                          {appointment.customerPhone}
                        </p>
                      </div>
                    </div>

                    {appointment.notes && (
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
                          {appointment.notes}
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
                  : `Không có lịch đặt ở trạng thái ${filter}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </MainContent>
  );
}
