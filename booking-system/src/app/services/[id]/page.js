// src/app/services/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ServiceDetail() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - giống với data trong homepage
  const servicesData = {
    1: {
      id: 1,
      name: "Cắt tóc nam",
      category: "Làm đẹp",
      price: "80,000 VND",
      originalPrice: "100,000 VND",
      rating: 4.8,
      reviews: 124,
      duration: "30 phút",
      image: "✂️",
      provider: "Barber Pro",
      location: "Quận 1, TP.HCM",
      address: "123 Nguyễn Huệ, P. Bến Nghé, Quận 1",
      availability: "Còn 3 slot hôm nay",
      features: ["Tư vấn kiểu tóc", "Gội đầu massage", "Cạo mặt"],
      description:
        "Dịch vụ cắt tóc nam chuyên nghiệp với đội ngũ barber giàu kinh nghiệm. Chúng tôi cam kết mang đến cho bạn kiểu tóc phù hợp nhất với khuôn mặt và phong cách cá nhân.",
      workingHours: [
        "09:00",
        "10:00",
        "11:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
      discount: "20%",
      isPopular: true,
    },
    2: {
      id: 2,
      name: "Massage thư giãn",
      category: "Sức khỏe",
      price: "200,000 VND",
      originalPrice: "250,000 VND",
      rating: 4.9,
      reviews: 89,
      duration: "60 phút",
      image: "💆",
      provider: "Spa Relax",
      location: "Quận 3, TP.HCM",
      address: "456 Lê Văn Sỹ, P. 12, Quận 3",
      availability: "Còn 5 slot hôm nay",
      features: [
        "Massage toàn thân",
        "Tinh dầu thảo dược",
        "Không gian yên tĩnh",
      ],
      description:
        "Trải nghiệm massage thư giãn tuyệt vời giúp giảm căng thẳng, mệt mỏi. Kỹ thuật massage chuyên nghiệp kết hợp tinh dầu thiên nhiên.",
      workingHours: [
        "08:00",
        "09:00",
        "10:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
      ],
      discount: "20%",
      isPopular: true,
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
        // Nếu không tìm thấy dịch vụ, redirect về homepage
        router.push("/");
      }
      setIsLoading(false);
    }, 500);
  }, [params.id, router]);

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Vui lòng chọn ngày và giờ hẹn!");
      return;
    }

    // Chuyển đến trang xác nhận đặt lịch
    alert(
      `Đã đặt lịch ${service.name} vào ${selectedDate} lúc ${selectedTime}`
    );
    // router.push(`/booking/confirm?service=${service.id}&date=${selectedDate}&time=${selectedTime}`);
  };

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
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
            backgroundColor: "#667eea",
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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            color: "#667eea",
            cursor: "pointer",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ← Quay lại
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Left Column - Service Info */}
        <div>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              marginBottom: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  fontSize: "4rem",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "12px",
                  padding: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {service.image}
              </div>

              <div style={{ flex: 1 }}>
                <h1
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {service.name}
                </h1>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                    }}
                  >
                    {service.category}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ color: "#ffc107" }}>⭐</span>
                    <span style={{ fontSize: "0.9rem", color: "#666" }}>
                      {service.rating} ({service.reviews} đánh giá)
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", color: "#666" }}>
                      ⏱️
                    </span>
                    <span style={{ fontSize: "0.9rem", color: "#666" }}>
                      {service.duration}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>👤</span>
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>
                    Nhà cung cấp: {service.provider}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>📍</span>
                  <span style={{ fontSize: "0.9rem", color: "#666" }}>
                    {service.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "2rem" }}>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                }}
              >
                Mô tả dịch vụ
              </h3>
              <p style={{ color: "#6b7280", lineHeight: "1.6" }}>
                {service.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                  color: "#1f2937",
                }}
              >
                Điểm nổi bật
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "8px",
                    }}
                  >
                    <span style={{ color: "#10b981" }}>✓</span>
                    <span style={{ fontSize: "0.9rem", color: "#374151" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: "sticky",
            top: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              color: "#1f2937",
              textAlign: "center",
            }}
          >
            Đặt lịch hẹn
          </h3>

          {/* Price */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#ff6b6b",
                }}
              >
                {service.price}
              </span>
              <span
                style={{
                  fontSize: "1rem",
                  color: "#999",
                  textDecoration: "line-through",
                }}
              >
                {service.originalPrice}
              </span>
            </div>
            <span
              style={{
                backgroundColor: "#ffd700",
                color: "#333",
                padding: "0.25rem 0.75rem",
                borderRadius: "12px",
                fontSize: "0.8rem",
                fontWeight: "bold",
              }}
            >
              Tiết kiệm {service.discount}
            </span>
          </div>

          {/* Booking Form */}
          <div style={{ marginBottom: "2rem" }}>
            {/* Date Selection */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                📅 Chọn ngày
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}
              >
                <option value="">Chọn ngày hẹn</option>
                {getNext7Days().map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selection */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                ⏰ Chọn giờ
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                }}
              >
                <option value="">Chọn giờ hẹn</option>
                {service.workingHours.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Details */}
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#6b7280" }}>Thời lượng:</span>
                <span style={{ fontWeight: "500" }}>{service.duration}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span style={{ color: "#6b7280" }}>Địa điểm:</span>
                <span style={{ fontWeight: "500" }}>{service.location}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6b7280" }}>Tình trạng:</span>
                <span style={{ color: "#22c55e", fontWeight: "500" }}>
                  {service.availability}
                </span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime}
            style={{
              width: "100%",
              backgroundColor:
                !selectedDate || !selectedTime ? "#9ca3af" : "#667eea",
              color: "white",
              border: "none",
              padding: "1rem",
              borderRadius: "8px",
              fontWeight: "600",
              cursor:
                !selectedDate || !selectedTime ? "not-allowed" : "pointer",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => {
              if (selectedDate && selectedTime) {
                e.target.style.backgroundColor = "#5a6fd8";
              }
            }}
            onMouseOut={(e) => {
              if (selectedDate && selectedTime) {
                e.target.style.backgroundColor = "#667eea";
              }
            }}
          >
            📅 Xác nhận đặt lịch
          </button>

          {/* Additional Info */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.8rem", color: "#6b7280" }}>
              🔒 Thanh toán an toàn • 🎯 Đúng chuyên gia • ⭐ Đánh giá thực
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
