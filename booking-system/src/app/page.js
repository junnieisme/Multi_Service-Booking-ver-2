"use client";
import Header from "@/components/Layout/Header";
import MainContent from "@/components/Layout/MainContent";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // 1. State quản lý bộ lọc
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  // Danh sách các danh mục
  // const categories = [
  //   "Tất cả",
  //   "Lưu trú",
  //   "Ẩm thực",
  //   "Làm đẹp",
  //   "Thể dục",
  //   "Thư giãn",
  //   "Sức khỏe",
  // ];

  // 2. Mock data - Đã cập nhật theo cấu trúc mới bạn yêu cầu
  // const defaultServices = [
  //   {
  //     id: 1,
  //     loai_dich_vu: "Lưu trú", // Dùng để lọc và hiện badge
  //     id_nha_cung_cap: 1,
  //     ten_thuong_hieu: "InterContinental Danang", // Tên nhà cung cấp
  //     ten_dich_vu: "Combo resort cho 3 ngày 2 đêm và nhiều tiện ích khác", // Tên gói dịch vụ
  //     hinh_anh:
  //       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/43859674.jpg?k=04578449670209583432815834e3761046669662656640161662653705512240&o=&hp=1",
  //     tinh_thanh: "Đà Nẵng",
  //     dia_chi_cu_the: "Bãi Bắc bán đảo Sơn Trà",
  //     mo_ta_ngan: "Trải nghiệm nghỉ dưỡng đẳng cấp 5 sao ven biển",
  //     gia: "5,000,000 VND",
  //     gia_goc: "6,500,000 VND",
  //     danh_gia: 4.9,
  //     luot_danh_gia: 320,
  //     thoi_gian: "Check-in 14:00",
  //     trang_thai: "Còn phòng",
  //     isPopular: true,
  //     giam_gia: "23%",
  //   },

  // ];

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      //Lấy cái button ở phía trên
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/dich-vu/get-data"
        );
        if (!response.ok) {
          console.warn("API chưa sẵn sàng, dùng dữ liệu mẫu.");
          setIsLoading(false);
          return;
        }
        const result = await response.json();
        if (result.status === true) {
          console.log("Dữ liệu dịch vụ đã được tải từ API ", result.data);
          setCategories(result.data);
        }
      } catch (err) {
        console.error("Lỗi API:", err);
      } finally {
        setIsLoading(false);
      }
      //Lấy cái card ở phía dưới
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/chi-tiet-thuong-hieu/get-all-data"
        );
        if (!response.ok) {
          console.warn("API chưa sẵn sàng, dùng dữ liệu mẫu.");
          setIsLoading(false);
          return;
        }
        const result = await response.json();
        if (result.status === true) {
          console.log("Dữ liệu dịch vụ đã được tải từ API ", result.data);
          setServices(result.data);
        }
      } catch (err) {
        console.error("Lỗi API:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // LOGIC LỌC: Sử dụng 'loai_dich_vu' để lọc
  const filteredServices = services.filter((service) => {
    if (selectedCategory === "Tất cả") return true;
    return service.id_dich_vu === selectedCategory;
  });
  //format vnđ
  const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  
  return (
    console.log("Rendered with services:", services) || (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Header />

        {/* Hero Section */}
        <section
          style={{ padding: "4rem 1rem", color: "white", textAlign: "center" }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
              dịch vụ
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
                onClick={() => router.push("/register")}
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
              >
                🚀 Bắt đầu ngay
              </button>
              <button
                onClick={() => router.push("/login")}
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
              >
                🔑 Đăng nhập
              </button>
            </div>
          </div>
        </section>
        {/* --- PARTNERS / SPONSORS SECTION (MỚI THÊM) --- */}
        <section
          style={{
            paddingTop: "3rem",
            paddingBottom: "1rem",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p
              style={{
                textAlign: "center",
                color: "#9ca3af",
                fontSize: "0.9rem",
                fontWeight: "600",
                letterSpacing: "1px",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
              }}
            >
              Đối tác & Nhà tài trợ uy tín
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "3rem",
                opacity: 0.7,
              }}
            >
              {/* Logo 1 - Ví dụ Traveloka */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png"
                alt="Partner 1"
                style={{
                  height: "30px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.filter = "grayscale(0%)")}
                onMouseOut={(e) => (e.target.style.filter = "grayscale(100%)")}
              />

              {/* Logo 2 - Ví dụ Airbnb */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                alt="Partner 2"
                style={{
                  height: "35px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.filter = "grayscale(0%)")}
                onMouseOut={(e) => (e.target.style.filter = "grayscale(100%)")}
              />

              {/* Logo 3 - Ví dụ Momo */}
               <img
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                alt="Partner 3"
                style={{
                  height: "35px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.filter = "grayscale(0%)")}
                onMouseOut={(e) => (e.target.style.filter = "grayscale(100%)")}
              />

              {/* Logo 4 - Ví dụ Visa */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Partner 4"
                style={{
                  height: "25px",
                  objectFit: "contain",
                  filter: "grayscale(100%)",
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.filter = "grayscale(0%)")}
                onMouseOut={(e) => (e.target.style.filter = "grayscale(100%)")}
              />
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section
          style={{ padding: "1rem 1rem 4rem 1rem", backgroundColor: "#f8f9fa" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                textAlign: "center",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#333",
                marginBottom: "1.5rem",
              }}
            >
              Danh Sách Dịch Vụ
            </h2>

            {/* --- THANH LỌC DỊCH VỤ --- */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "0.8rem",
                marginBottom: "3rem",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "600",
                  color: "#555",
                  marginRight: "0.5rem",
                }}
              >
                🔍 Lọc theo:
              </span>
              {/* tất cả */}
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "30px",
                    border: "1px solid",
                    borderColor:
                      selectedCategory === category.id ? "#667eea" : "#e5e7eb",
                    backgroundColor:
                      selectedCategory === category.id ? "#667eea" : "white",
                    color:
                      selectedCategory === category.id ? "white" : "#4b5563",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.2s ease",
                    boxShadow:
                      selectedCategory === category
                        ? "0 4px 12px rgba(102, 126, 234, 0.3)"
                        : "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  {category.ten_dich_vu}
                </button>
              ))}
            </div>

            {/* --- GRID DỊCH VỤ --- */}
            {filteredServices.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  // Dùng auto-fill để giữ form thẻ không bị kéo dãn
                  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                  gap: "2rem",
                }}
              >
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => router.push(`/services/${service.id}`)}
                    style={{
                      backgroundColor: "white",
                      borderRadius: "16px",
                      padding: "1.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      border: "1px solid #e9ecef",
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
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
                        zIndex: 10,
                      }}
                    >
                      {/* {service.isPopular && (
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
                    )} */}
                    </div>

                    {/* Discount */}
                    {/* {service.giam_gia && (
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        zIndex: 10,
                      }}
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
                        -{service.giam_gia}
                      </span>
                    </div>
                  )} */}

                    {/* Hình ảnh */}
                    <div
                      style={{
                        height: "200px",
                        width: "100%",
                        marginBottom: "1rem",
                        borderRadius: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={service.hinh_anh}
                        alt={service.ten_thuong_hieu}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Tên Dịch Vụ/Combo (Tiêu đề chính) */}
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        marginBottom: "0.5rem",
                        lineHeight: "1.4",
                        // minHeight để các thẻ bằng nhau nếu tiêu đề dài ngắn khác nhau
                        minHeight: "3.5rem",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.ten_san_pham}
                    </h3>
                    {/* Tên Thương Hiệu (Chữ nhỏ bên duoi) */}
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#6b7280",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        marginBottom: "0.25rem",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {service.ten_thuong_hieu}
                    </div>
                    {/* Mô tả ngắn */}
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "1rem",
                        fontStyle: "italic",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.mo_ta_ngan}
                    </p>

                    {/* Loại hình (Badge) */}
                    <div style={{ marginBottom: "1rem" }}>
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
                        {service.ten_dich_vu}
                      </span>
                    </div>

                    {/* Địa chỉ */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <span style={{ fontSize: "0.8rem", color: "#666" }}>
                        📍
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "#666" }}>
                        {service.dia_chi_cu_the+", " + service.tinh_thanh}
                      </span>
                    </div>

                    {/* Trạng thái */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      // trạng thái thiếu nhé!
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
                        {service.trang_thai || "Sẵn sàng phục vụ"}
                      </span>
                    </div>

                    {/* Giá */}
                    <div style={{ marginBottom: "1rem", marginTop: "auto" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.25rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                            color: "#ff6b6b",
                          }}
                        >
                          
                          { formatVND(service.don_gia)}
                        </span>
                        {/* {service.gia_goc && service.gia_goc !== "0 VND" && (
                          <span
                            style={{
                              fontSize: "0.85rem",
                              color: "#999",
                              textDecoration: "line-through",
                            }}
                          >
                            {service.gia_goc}
                          </span>
                        )} */}
                      </div>
                    </div>

                    {/* Footer Card */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "1rem",
                        borderTop: "1px solid #eee",
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
                        <span style={{ color: "#ffc107" }}>⭐</span>
                        <span style={{ color: "#ffc107" }}>⭐</span>
                        <span style={{ color: "#ffc107" }}>⭐</span>
                        <span style={{ color: "#ffc107" }}>⭐</span>
                        <span style={{ color: "#ffc107" }}>⭐</span>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            fontWeight: "500",
                          }}
                        >
                          {100} (100)
                        </span>
                      </div>
                      {/* <div
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
                          {service.thoi_gian}
                        </span>
                      </div> */}
                    </div>

                    <button
                      style={{
                        width: "100%",
                        backgroundColor: "#667eea",
                        color: "white",
                        border: "none",
                        padding: "0.75rem",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "1rem",
                        transition: "background-color 0.3s ease",
                        fontSize: "0.9rem",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#5a6fd8")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#667eea")
                      }
                    >
                      📅 Đặt lịch ngay
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{ textAlign: "center", padding: "4rem", color: "#666" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <p style={{ fontSize: "1.2rem" }}>
                  Không tìm thấy dịch vụ nào thuộc mục "
                  <strong>{selectedCategory}</strong>"
                </p>
                <button
                  onClick={() => setSelectedCategory("Tất cả")}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Xem tất cả dịch vụ
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: "4rem 1rem", backgroundColor: "white" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
              }}
            >
              {[
                {
                  icon: "⚡",
                  title: "Đặt lịch siêu tốc",
                  description: "Chỉ 30 giây để hoàn tất đặt lịch",
                },
                {
                  icon: "🛡️",
                  title: "Bảo mật tuyệt đối",
                  description: "Thông tin được mã hóa an toàn",
                },
                {
                  icon: "💰",
                  title: "Giá tốt nhất",
                  description: "Cam kết giá cạnh tranh với nhiều ưu đãi",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "2.5rem 2rem",
                    borderRadius: "20px",
                    textAlign: "center",
                    border: "1px solid #e9ecef",
                  }}
                >
                  <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      marginBottom: "1rem",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p style={{ color: "#718096" }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  );
}
