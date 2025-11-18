// src/app/services/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ServiceDetail() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - Cấu trúc mới đồng bộ với Homepage
  const servicesData = {
    1: {
      id: 1,
      loai_dich_vu: "Lưu trú",
      id_nha_cung_cap: 1,
      ten_thuong_hieu: "InterContinental Danang Sun Peninsula Resort",
      ten_dich_vu: "Combo resort cho 3 ngày 2 đêm và nhiều tiện ích khác",
      hinh_anh:
        "https://th.bing.com/th/id/R.ec9929b9c3c3dd8198ca20d246d22bcf?rik=RWQv1vt62sUsrA&pid=ImgRaw&r=0",
      tinh_thanh: "Đà Nẵng",
      dia_chi_cu_the: "Bãi Bắc bán đảo Sơn Trà",
      mo_ta_ngan: "Trải nghiệm nghỉ dưỡng đẳng cấp 5 sao ven biển",
      mo_ta_chi_tiet: `Phòng ở:
Thời gian lưu trú: Thường có combo cho 3 ngày 2 đêm.
Tiện nghi: Phòng nghỉ có thể bao gồm ăn sáng buffet, trà, cafe, nước suối miễn phí hàng ngày, tùy theo gói combo.

Hoạt động & Giải trí:
Tham quan: Vé vào các điểm du lịch lân cận như Grand World, Thị trấn Hoàng Hôn, Chùa Hộ Quốc, Sunset Sanato (tùy địa điểm).
Tour: Bao gồm tour cano khám phá các đảo, lặn ngắm san hô.
Chơi Golf: Gói combo có thể bao gồm 1 vòng chơi golf 18 hố.
Spa: Tái tạo năng lượng với các gói spa, tùy thuộc vào loại combo.

Dịch vụ đi kèm:
Đưa đón sân bay: Xe đón/tiễn tại sân bay (tùy thuộc vào địa điểm và gói combo).
Di chuyển nội bộ: Xe điện di chuyển trong khuôn viên resort.
Tiện ích chung: Sử dụng miễn phí hồ bơi, bãi biển riêng, phòng gym, khu xông hơi jacuzzi, khu vui chơi trẻ em.

Ưu đãi khác:
Giảm giá cho các dịch vụ tại chỗ trong khách sạn.
Ưu tiên nhận phòng sớm, trả phòng muộn (nếu còn phòng).
Ưu tiên nâng hạng phòng (nếu còn phòng).`,
      gia: "5,000,000 VND",
      gia_goc: "6,500,000 VND",
      danh_gia: 4.9,
      luot_danh_gia: 320,
      thoi_gian: "Check-in 14:00",
      trang_thai: "Còn phòng",
    },
    2: {
      id: 2,
      loai_dich_vu: "Ẩm thực",
      id_nha_cung_cap: 2,
      ten_thuong_hieu: "Madame Lan Restaurant",
      ten_dich_vu: "Set menu đặc sản miền Trung",
      hinh_anh:
        "https://dulichkhampha24.com/wp-content/uploads/2020/01/nha-hang-madame-lan-da-nang-1.jpg",
      tinh_thanh: "Đà Nẵng",
      dia_chi_cu_the: "04 Bạch Đằng, Thạch Thang, Hải Châu",
      mo_ta_ngan: "Ẩm thực Việt Nam truyền thống",
      mo_ta_chi_tiet:
        "Không gian ấm cúng bên bờ sông Hàn, phục vụ các món ăn đặc sản ba miền.\n\n• Bánh xèo miền Trung\n• Mì Quảng đặc biệt\n• Không gian sân vườn",
      gia: "300,000 VND",
      gia_goc: "0 VND",
      danh_gia: 4.5,
      luot_danh_gia: 150,
      thoi_gian: "2 giờ",
      trang_thai: "Còn bàn",
    },
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const serviceId = params.id;
      const serviceData = servicesData[serviceId];
      if (serviceData) {
        setService(serviceData);
      } else {
        router.push("/");
      }
      setIsLoading(false);
    }, 500);
  }, [params.id, router]);

  const handleBookAppointment = () => {
    router.push(`/user/booking?id=${service.id}`);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <div style={{ fontSize: "2rem" }}>⏳</div>
        <p>Đang tải thông tin dịch vụ...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <div style={{ fontSize: "3rem" }}>❌</div>
        <h2>Không tìm thấy dịch vụ</h2>
        <button
          onClick={() => router.push("/")}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1rem" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          // ĐÃ SỬA TẠI ĐÂY: Chuyển về trang chủ "/" thay vì back()
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            color: "#6b7280",
            cursor: "pointer",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0",
          }}
        >
          ← Quay lại danh sách dịch vụ
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "2.5rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Service Header */}
        <div
          style={{
            display: "flex",
            alignItems: "start",
            gap: "2rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {/* Service Image */}
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "12px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid #eee",
            }}
          >
            <img
              src={service.hinh_anh}
              alt={service.ten_dich_vu}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Service Info */}
          <div style={{ flex: 1 }}>
            {/* Tên Dịch Vụ (Combo) là Tiêu đề chính */}
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
                lineHeight: "1.2",
              }}
            >
              {service.ten_dich_vu}
            </h1>

            {/* Tên Thương hiệu nhỏ hơn ở dưới */}
            <p
              style={{
                fontSize: "1.1rem",
                color: "#4b5563",
                fontWeight: "600",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              🏨 {service.ten_thuong_hieu}
            </p>

            {/* Service Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {/* Hiển thị Loại dịch vụ (Lưu trú/Ẩm thực...) */}
              <span
                style={{
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                {service.loai_dich_vu}
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "#ffc107", fontSize: "1.1rem" }}>⭐</span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    fontWeight: "500",
                  }}
                >
                  {service.danh_gia} ({service.luot_danh_gia} đánh giá)
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "0.9rem", color: "#666" }}>⏱️</span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#666",
                    fontWeight: "500",
                  }}
                >
                  {service.thoi_gian}
                </span>
              </div>
            </div>

            {/* Provider Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1rem", color: "#666" }}>📍</span>
                <span style={{ fontSize: "0.95rem", color: "#666" }}>
                  <strong>Địa chỉ:</strong> {service.dia_chi_cu_the},{" "}
                  {service.tinh_thanh}
                </span>
              </div>
            </div>

            {/* Action Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              {/* Book Button */}
              <button
                onClick={handleBookAppointment}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "0.875rem 2rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#1d4ed8";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(37, 99, 235, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#2563eb";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 4px rgba(37, 99, 235, 0.2)";
                }}
              >
                Đặt ngay
              </button>

              {/* Price Info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#dc2626",
                  }}
                >
                  {service.gia}
                </span>
                {service.gia_goc && service.gia_goc !== "0 VND" && (
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "#9ca3af",
                      textDecoration: "line-through",
                    }}
                  >
                    {service.gia_goc}
                  </span>
                )}
              </div>
            </div>

            {/* Availability */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "6px",
                fontSize: "0.875rem",
                color: "#166534",
                fontWeight: "500",
              }}
            >
              <span>✅</span>
              {service.trang_thai}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1.5rem",
              paddingBottom: "0.5rem",
              borderBottom: "2px solid #f3f4f6",
            }}
          >
            Mô tả chi tiết
          </h2>
          <div
            style={{
              color: "#4b5563",
              lineHeight: "1.7",
              fontSize: "1rem",
            }}
          >
            {service.mo_ta_chi_tiet.split("\n").map((paragraph, index) => (
              <p
                key={index}
                style={{
                  marginBottom:
                    paragraph.trim().startsWith("•") ||
                    paragraph.trim().endsWith(":")
                      ? "0.5rem"
                      : "1rem",
                  paddingLeft: paragraph.trim().startsWith("•") ? "1rem" : "0",
                  fontWeight: paragraph.trim().endsWith(":")
                    ? "bold"
                    : "normal", // In đậm các tiêu đề con
                  color: paragraph.trim().endsWith(":") ? "#374151" : "#4b5563",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
