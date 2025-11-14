// src/app/services/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ServiceDetail() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - giống với data trong homepage
  const servicesData = {
    1: {
      id: 1,
      name: "Cắt tóc nam",
      category: "Làm đ�ẹp",
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
      description:
        "Dịch vụ cắt tóc nam chuyên nghiệp với đội ngũ barber giàu kinh nghiệm. Chúng tôi cam kết mang đến cho bạn kiểu tóc phù hợp nhất với khuôn mặt và phong cách cá nhân.\n\n• Tư vấn kiểu tóc phù hợp\n• Gội đầu massage thư giãn\n• Cạo mặt chuyên nghiệp\n• Sử dụng sản phẩm cao cấp",
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
      description:
        "Trải nghiệm massage thư giãn tuyệt vời giúp giảm căng thẳng, mệt mỏi. Kỹ thuật massage chuyên nghiệp kết hợp tinh dầu thiên nhiên.\n\n• Massage toàn thân\n• Tinh dầu thảo dược\n• Không gian yên tĩnh\n• Kỹ thuật viên chuyên nghiệp",
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
    // Chuyển đến trang đặt lịch với serviceId
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
          onClick={() => router.back()}
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
          }}
        >
          {/* Service Icon */}
          <div
            style={{
              fontSize: "3.5rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              padding: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "120px",
              height: "120px",
            }}
          >
            {service.image}
          </div>

          {/* Service Info */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "1rem",
                lineHeight: "1.2",
              }}
            >
              {service.name}
            </h1>

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
                {service.category}
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
                  {service.rating} ({service.reviews} đánh giá)
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
                  {service.duration}
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
                <span style={{ fontSize: "1rem", color: "#666" }}>👤</span>
                <span style={{ fontSize: "0.95rem", color: "#666" }}>
                  <strong>Nhà cung cấp:</strong> {service.provider}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1rem", color: "#666" }}>📍</span>
                <span style={{ fontSize: "0.95rem", color: "#666" }}>
                  <strong>Địa chỉ:</strong> {service.address}
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
                Đặt lịch ngay
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
                  {service.price}
                </span>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "#9ca3af",
                    textDecoration: "line-through",
                  }}
                >
                  {service.originalPrice}
                </span>
                <span
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  -20%
                </span>
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
              {service.availability}
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
            Mô tả dịch vụ
          </h2>
          <div
            style={{
              color: "#4b5563",
              lineHeight: "1.7",
              fontSize: "1rem",
            }}
          >
            {service.description.split("\n").map((paragraph, index) => (
              <p
                key={index}
                style={{
                  marginBottom: paragraph.startsWith("•") ? "0.5rem" : "1rem",
                  paddingLeft: paragraph.startsWith("•") ? "1rem" : "0",
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
