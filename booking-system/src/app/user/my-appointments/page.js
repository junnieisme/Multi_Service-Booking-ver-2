"use client";
import { useState, useEffect } from "react";
import MainContent from "@/components/Layout/MainContent";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/dat-lich/get-lich-by-kh",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        if (!response.ok) {
          console.warn("Không thể kết nối API");
          router.push("/");
          return;
        }

        const result = await response.json();
        // Kiểm tra trạng thái trả về từ API
        if (result.status === true) {
          console.log("Dữ liệu nhận từ API: ", result.data);
          setAppointments(result.data);
        }
      } catch (err) {
        console.error("Lỗi API:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // setAppointments([
    //   {
    //     id: 1,
    //     serviceName: "Cắt tóc nam cao cấp",
    //     date: "2025-11-20", // Sắp tới
    //     time: "10:00",
    //     status: "confirmed",
    //     provider: "Barber Shop ABC",
    //     price: 150000,
    //     duration: "30 phút",
    //     address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    //     image: "✂️",
    //   },
    //   {
    //     id: 2,
    //     serviceName: "Massage thư giãn toàn thân",
    //     date: "2025-11-22", // Sắp tới (nhưng pending)
    //     time: "14:00",
    //     status: "pending",
    //     provider: "Spa Relax Center",
    //     price: 300000,
    //     duration: "60 phút",
    //     address: "456 Lê Lợi, Q.3, TP.HCM",
    //     image: "💆",
    //   },
    //   {
    //     id: 3,
    //     serviceName: "Chăm sóc da mặt chuyên sâu",
    //     date: "2025-11-10", // Đã qua
    //     time: "09:00",
    //     status: "completed",
    //     provider: "Beauty Spa",
    //     price: 500000,
    //     duration: "90 phút",
    //     address: "789 Hai Bà Trưng, Q.1, TP.HCM",
    //     image: "✨",
    //   },
    //   {
    //     id: 4,
    //     serviceName: "Cắt tỉa lông mày",
    //     date: "2025-11-08", // Đã qua
    //     time: "16:00",
    //     status: "cancelled",
    //     provider: "Nail & Beauty",
    //     price: 80000,
    //     duration: "20 phút",
    //     address: "321 Lý Tự Trọng, Q.1, TP.HCM",
    //     image: "💅",
    //   },
    //   {
    //     id: 5,
    //     serviceName: "Làm móng",
    //     date: "2025-11-12", // Đã qua, nhưng status vẫn là "confirmed"
    //     time: "15:00",
    //     status: "confirmed",
    //     provider: "Nail & Beauty",
    //     price: 100000,
    //     duration: "40 phút",
    //     address: "321 Lý Tự Trọng, Q.1, TP.HCM",
    //     image: "💅",
    //   },
    // ]);
  }, []);

  // Logic lọc "phù hợp" với ngày hiện tại
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Chuẩn hóa về đầu ngày để so sánh

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;

    // if (filter === "confirmed") {
    //   const aptDate = new Date(apt.ngay_dat_lich);
    //   aptDate.setHours(0, 0, 0, 0); // Chuẩn hóa ngày hẹn
    //   // "Sắp tới" (confirmed) NGHĨA LÀ đã xác nhận VÀ chưa diễn ra
    //   return apt.trang_thai === "confirmed" && aptDate >= today;
    // }

    // Các filter còn lại ("pending", "completed", "cancelled") giữ nguyên logic cũ
    return apt.trang_thai === filter;
  });

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã xác nhận";
      case 2:
        return "Đã hủy";
      // case 3:
      //   return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
       case 0:
        return "#f59e0b";
      case 1:
        return "#10b981";
     
      // case 2:
      //   return "#3b82f6";
      case 2:
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (confirm("Bạn có chắc muốn hủy lịch hẹn này?")) {
      const changeStatus = async () => {
        try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/dat-lich/huy-lich/"+appointmentId,
          {
            method: "POST",
          }
        );
        if (!response.ok) {
          console.warn("Không thể kết nối API");

          return;
        }

        const result = await response.json();
        // Kiểm tra trạng thái trả về từ API
        if (result.status === true) {
          alert(result.message);
          window.location.reload();
        }
      } catch (err) {
        console.error("Lỗi API:", err);
      } finally {
        setLoading(false);
      }
      }
      changeStatus();
    }
  };

  const rescheduleAppointment = (appointmentId) => {
    console.log("Reschedule appointment:", appointmentId);
    // TODO: Navigate to booking page with pre-filled data
    alert("Chức năng đặt lịch lại sẽ được thực hiện sau!");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <MainContent>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Lịch hẹn của tôi
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>
            Quản lý và theo dõi các lịch hẹn dịch vụ của bạn
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { key: "all", label: "Tất cả" },
            { key: 0, label: "Chờ xác nhận" },
            { key: 1, label: "Đã xác nhận" },
            { key: 2, label: "Đã hủy" },
            // { key: 3, label: "Đã hủy" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "0.75rem 1.5rem",
                border: "none",
                borderRadius: "8px",
                backgroundColor: filter === tab.key ? "#3b82f6" : "white",
                color: filter === tab.key ? "white" : "#6b7280",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow:
                  filter === tab.key
                    ? "0 2px 4px rgba(59, 130, 246, 0.2)"
                    : "0 1px 2px rgba(0,0,0,0.05)",
                border: filter === tab.key ? "none" : "1px solid #e5e7eb",
              }}
              onMouseOver={(e) => {
                if (filter !== tab.key) {
                  e.target.style.backgroundColor = "#f9fafb";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tab.key) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {filteredAppointments.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📅</div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "0.5rem",
                }}
              >
                Không có lịch hẹn nào
              </h3>
              <p style={{ color: "#6b7280" }}>
                {filter === "all"
                  ? "Bạn chưa có lịch hẹn nào. Hãy đặt lịch dịch vụ ngay!"
                  : `Không có lịch hẹn nào trong mục ${
                      filter === "confirmed"
                        ? "sắp tới"
                        : getStatusText(filter).toLowerCase()
                    }`}
              </p>
            </div>
          ) : (
            // ==========================================================
            // PHẦN CARD ĐÃ ĐƯỢC SỬA LẠI THEO ẢNH
            // ==========================================================
            filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  // Sửa layout chính thành 3 cột: Icon | Thông tin | Nút
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "1.5rem",
                  alignItems: "start",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                {/* CỘT 1: ICON */}
                <div
                  style={{
                    fontSize: "3rem",
                    backgroundColor: "#f8fafc",
                    borderRadius: "12px",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "100px",
                    minHeight: "100px",
                  }}
                >
                  <img
                    src={apt.hinh_anh}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>

                {/* CỘT 2: TOÀN BỘ THÔNG TIN TEXT */}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {apt.ten_san_pham}
                  </h3>

                  {/* Nhóm Status, Price, Duration */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: getStatusColor(apt.trang_thai) + "15",
                        color: getStatusColor(apt.trang_thai),
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        border: `1px solid ${getStatusColor(apt.trang_thai)}30`,
                      }}
                    >
                      {getStatusText(apt.trang_thai)}
                    </span>
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "#1f2937",
                      }}
                    >
                      <strong>
                        {apt.tong_tien_thanh_toan.toLocaleString()} VND
                      </strong>
                    </span>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        color: "#475569",
                        fontWeight: "500",
                      }}
                    >
                      Đã thanh toán: {apt.tong_tien_da_tra.toLocaleString()} VND
                    </span>
                  </div>

                  {/* Nhóm Provider, Address, Date, Time (Grid 2x2) */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    {/* Provider */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>🏢</span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                          }}
                        >
                          Nhà cung cấp
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#374151",
                          }}
                        >
                          {apt.ten_thuong_hieu}
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>📍</span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                          }}
                        >
                          Địa chỉ
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "#374151",
                          }}
                        >
                          {apt.dia_chi_cu_the + ", " + apt.tinh_thanh}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>📅</span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                          }}
                        >
                          Ngày hẹn
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#1f2937",
                          }}
                        >
                          {formatDate(apt.ngay_dat_lich)}
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "1rem" }}>⏰</span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                          }}
                        >
                          Giờ hẹn
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            color: "#1f2937",
                          }}
                        >
                          {apt.thoi_gian}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CỘT 3: NHÓM NÚT BẤM */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    minWidth: "140px",
                  }}
                >
                  {(apt.trang_thai === 0 ||
                    (apt.trang_thai === 1 &&
                      new Date(apt.ngay_dat_lich) >= today)) && ( // Chỉ hiện hủy/đặt lại cho lịch Sắp tới
                    <>
                    
                      <button
                        onClick={() => cancelAppointment(apt.id)}
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1px solid #ef4444",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: "#ef4444",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#fef2f2";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        Hủy lịch & Hoàn tiền
                      </button>
                      <button
                      onClick={() => console.log("View details:", apt.id)}
                      style={{
                        padding: "0.75rem 1rem",
                        border: "1px solid #10b981",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        color: "#10b981",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#ecfdf5";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                      }}
                    >
                      Xem chi tiết
                    </button>
                      {/* <button
                        onClick={() => rescheduleAppointment(apt.id)}
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1px solid #3b82f6",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: "#3b82f6",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#eff6ff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        Đặt lại lịch
                      </button> */}
                    </>
                  )}
                 
                  {apt.trang_thai === 2 && (
                    // <button
                    //   onClick={() => console.log("Book again:", apt.id)}
                    //   style={{
                    //     padding: "0.75rem 1rem",
                    //     border: "1px solid #6b7280",
                    //     borderRadius: "8px",
                    //     backgroundColor: "white",
                    //     color: "#6b7280",
                    //     fontSize: "0.875rem",
                    //     fontWeight: "600",
                    //     cursor: "pointer",
                    //     transition: "all 0.2s",
                    //   }}
                    //   onMouseOver={(e) => {
                    //     e.target.style.backgroundColor = "#f9fafb";
                    //   }}
                    //   onMouseLeave={(e) => {
                    //     e.target.style.backgroundColor = "white";
                    //   }}
                    // >
                    //   Đặt lại
                    // </button>
                     <button
                        onClick={() => rescheduleAppointment(apt.id)}
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1px solid #3b82f6",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: "#3b82f6",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#eff6ff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        Đặt lại lịch
                      </button>
                  )}
                   {apt.trang_thai === 2 && (
                    <button
                      onClick={() => console.log("View details:", apt.id)}
                      style={{
                        padding: "0.75rem 1rem",
                        border: "1px solid #10b981",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        color: "#10b981",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#ecfdf5";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                      }}
                    >
                      Xem chi tiết
                    </button>
                  )}
                  {/* Nút "Xem chi tiết" cho lịch đã qua nhưng vẫn "confirmed" */}
                  {apt.trang_thai ===2&&
                    new Date(apt.date) < today && (
                      <button
                        onClick={() => console.log("View details:", apt.id)}
                        style={{
                          padding: "0.75rem 1rem",
                          border: "1px solid #6b7280",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: "#6b7280",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#f9fafb";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        Xem chi tiết
                      </button>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainContent>
  );
}
