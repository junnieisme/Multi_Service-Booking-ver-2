"use client";
import Header from "@/components/Layout/Header";
import MainContent from "@/components/Layout/MainContent";
import React, { useState, useEffect } from "react";

export default function HomePage() {
  //dữ liệu từ api trả về nó sẽ như này
  // {
  //           "ten_dich_vu": "Lưu trú",
  //           "id_nha_cung_cap": 1,
  //           "ten_thuong_hieu": "InterContinental Danang Sun Peninsula Resort",
  //           "hinh_anh": "https://th.bing.com/th/id/R.ec9929b9c3c3dd8198ca20d246d22bcf?rik=RWQv1vt62sUsrA&pid=ImgRaw&r=0",
  //           "tinh_thanh": "Đà Nẵng",
  //           "dia_chi_cu_the": "Bãi Bắc bán đảo Sơn Trà",
  //           "mo_ta_ngan": "Resort 5-sao ven biển",
  //           "mo_ta_chi_tiet": "Nằm trên bán đảo Sơn Trà, phòng nghỉ sang trọng, view biển, sân golf riêng."
  //       },
  const services = [
    {
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
      availability: "Còn 3 slot hôm nay",
      features: ["Tư vấn kiểu tóc", "Gội đầu massage", "Cạo mặt"],
      discount: "20%",
      isPopular: true,
      isTrending: false,
    },
    {
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
      availability: "Còn 5 slot hôm nay",
      features: [
        "Massage toàn thân",
        "Tinh dầu thảo dược",
        "Không gian yên tĩnh",
      ],
      discount: "20%",
      isPopular: true,
      isTrending: true,
    },
    {
      id: 3,
      name: "Chăm sóc da mặt",
      category: "Làm đẹp",
      price: "150,000 VND",
      originalPrice: "180,000 VND",
      rating: 4.7,
      reviews: 67,
      duration: "45 phút",
      image: "✨",
      provider: "Beauty Center",
      location: "Quận 2, TP.HCM",
      availability: "Còn 2 slot hôm nay",
      features: ["Tẩy tế bào chết", "Mặt nạ dưỡng ẩm", "Massage mặt"],
      discount: "17%",
      isPopular: false,
      isTrending: true,
    },
    {
      id: 4,
      name: "Yoga cá nhân",
      category: "Thể dục",
      price: "120,000 VND",
      originalPrice: "150,000 VND",
      rating: 4.9,
      reviews: 156,
      duration: "60 phút",
      image: "🧘",
      provider: "Yoga Master",
      location: "Quận 7, TP.HCM",
      availability: "Còn 4 slot hôm nay",
      features: ["Hướng dẫn 1-1", "Điều chỉnh tư thế", "Thiền định"],
      discount: "20%",
      isPopular: true,
      isTrending: false,
    },
    {
      id: 5,
      name: "Spa toàn thân",
      category: "Thư giãn",
      price: "300,000 VND",
      originalPrice: "350,000 VND",
      rating: 4.8,
      reviews: 203,
      duration: "90 phút",
      image: "🛁",
      provider: "Luxury Spa",
      location: "Quận 1, TP.HCM",
      availability: "Còn 1 slot hôm nay",
      features: ["Tắm hơi", "Tẩy da chết", "Massage đá nóng"],
      discount: "14%",
      isPopular: false,
      isTrending: true,
    },
    {
      id: 6,
      name: "Tư vấn dinh dưỡng",
      category: "Sức khỏe",
      price: "180,000 VND",
      originalPrice: "200,000 VND",
      rating: 4.6,
      reviews: 45,
      duration: "45 phút",
      image: "🥗",
      provider: "Nutrition Expert",
      location: "Online",
      availability: "Còn 6 slot hôm nay",
      features: ["Phân tích BMI", "Thực đơn cá nhân hóa", "Theo dõi tiến độ"],
      discount: "10%",
      isPopular: false,
      isTrending: false,
    },
  ];
  const [data, setData] = useState(null); // Để lưu dữ liệu nhận được
  const [isLoading, setIsLoading] = useState(true); // Để quản lý trạng thái tải
  const [error, setError] = useState(null); // Để lưu lỗi
  useEffect(() => {
    const fetchData = async () => {
      const API_URL = "http://127.0.0.1:8000/api/thuong-hieu/get-data";

      try {
        // 1. Reset trạng thái lỗi và bắt đầu tải
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Lưu ý: Có thể bỏ header "Content-Type" cho GET nếu không cần
          },
        });

        // 2. PHẢI ĐỌC DỮ LIỆU JSON
        const result = await response.json();

        // 3. Kiểm tra HTTP status code
        if (!response.ok) {
          // Xử lý lỗi HTTP (4xx, 5xx)
          throw new Error(
            result.message || `Lỗi khi tải dữ liệu: ${response.status}`
          );
        }

        // 4. Lưu dữ liệu đã nhận được
        setData(result);
        console.log("Kết quả từ API:", result);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError(err.message || "Không thể kết nối đến server API.");
      } finally {
        // 5. Kết thúc tải
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Chạy một lần khi component mount
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Header />

      {/* Hero Section */}
      <section
        style={{
          padding: "4rem 1rem",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              background: "linear-gradient(45deg, #fff, #f0f8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Đặt Lịch Dịch Vụ Dễ Dàng
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2.5rem",
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Khám phá và đặt lịch các dịch vụ tốt nhất với hệ thống đặt lịch đa
            dịch vụ của chúng tôi
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => (window.location.href = "/register")}
              style={{
                backgroundColor: "#ff6b6b",
                color: "white",
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "1.1rem",
                boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow =
                  "0 6px 20px rgba(255, 107, 107, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(255, 107, 107, 0.3)";
              }}
            >
              🚀 Bắt đầu ngay
            </button>
            <button
              onClick={() => (window.location.href = "/login")}
              style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "1rem 2.5rem",
                borderRadius: "50px",
                fontWeight: "600",
                border: "2px solid white",
                cursor: "pointer",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#667eea";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              🔑 Đăng nhập
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        style={{
          padding: "4rem 1rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "3rem",
            }}
          >
            Dịch Vụ Nổi Bật
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
            }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "1px solid #e9ecef",
                  position: "relative",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0, 0, 0, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Badges */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  {service.isPopular && (
                    <span
                      style={{
                        backgroundColor: "#ff6b6b",
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                      }}
                    >
                      🔥 Phổ biến
                    </span>
                  )}
                  {service.isTrending && (
                    <span
                      style={{
                        backgroundColor: "#4ecdc4",
                        color: "white",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                      }}
                    >
                      📈 Xu hướng
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                <div
                  style={{ position: "absolute", top: "1rem", left: "1rem" }}
                >
                  <span
                    style={{
                      backgroundColor: "#ffd700",
                      color: "#333",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "12px",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                    }}
                  >
                    -{service.discount}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "3rem",
                    textAlign: "center",
                    marginBottom: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  {service.image}
                </div>

                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  {service.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {service.category}
                  </span>
                </div>

                {/* Provider Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>👤</span>
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>
                    {service.provider}
                  </span>
                </div>

                {/* Location Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>📍</span>
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>
                    {service.location}
                  </span>
                </div>

                {/* Availability */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "0.8rem", color: "#22c55e" }}>
                    ✅
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "#22c55e",
                      fontWeight: "500",
                    }}
                  >
                    {service.availability}
                  </span>
                </div>

                {/* Price Section */}
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#ff6b6b",
                      }}
                    >
                      {service.price}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "#999",
                        textDecoration: "line-through",
                      }}
                    >
                      {service.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Rating and Duration */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ color: "#ffc107" }}>⭐</span>
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
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", color: "#666" }}>
                      ⏱️
                    </span>
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

                {/* Features */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                    }}
                  >
                    Điểm nổi bật:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.25rem",
                    }}
                  >
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "#f1f5f9",
                          color: "#475569",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "8px",
                          fontSize: "0.7rem",
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    (window.location.href = `/services/${service.id}`)
                  }
                  style={{
                    width: "100%",
                    backgroundColor: "#667eea",
                    color: "white",
                    border: "none",
                    padding: "0.75rem",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                    fontSize: "0.9rem",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#5a6fd8";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#667eea";
                  }}
                >
                  📅 Đặt lịch ngay
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "4rem 1rem",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "3rem",
            }}
          >
            Tại sao chọn chúng tôi?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "2rem",
              alignItems: "stretch",
            }}
          >
            {[
              {
                icon: "⚡",
                title: "Đặt lịch siêu tốc",
                description:
                  "Chỉ 30 giây để hoàn tất đặt lịch với công nghệ tiên tiến nhất",
              },
              {
                icon: "🛡️",
                title: "Bảo mật tuyệt đối",
                description:
                  "Thông tin được mã hóa an toàn, thanh toán bảo mật đa lớp",
              },
              {
                icon: "🎯",
                title: "Đúng chuyên gia",
                description:
                  "Kết nối với các chuyên gia được xác minh và đánh giá cao",
              },
              {
                icon: "💰",
                title: "Giá tốt nhất",
                description:
                  "Cam kết giá cạnh tranh với nhiều ưu đãi độc quyền",
              },
              {
                icon: "📱",
                title: "Tiện lợi mọi lúc",
                description: "Đặt lịch 24/7 trên mọi thiết bị, mọi nơi",
              },
              {
                icon: "⭐",
                title: "Đánh giá thực",
                description:
                  "Hàng ngàn đánh giá xác thực từ khách hàng thực tế",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "2.5rem 2rem",
                  borderRadius: "20px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  border: "1px solid #e9ecef",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "280px",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0, 0, 0, 0.15)";
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "3.5rem",
                      marginBottom: "1.5rem",
                      display: "block",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "#2d3748",
                      marginBottom: "1rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "#718096",
                      lineHeight: 1.6,
                      fontSize: "1rem",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(102, 126, 234, 0.1)",
                    color: "#667eea",
                    borderRadius: "25px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    display: "inline-block",
                    margin: "1.5rem auto 0",
                  }}
                >
                  Tìm hiểu thêm →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
