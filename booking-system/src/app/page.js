"use client";
import Header from "@/components/Layout/Header";
import MainContent from "@/components/Layout/MainContent";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // 1. State quản lý bộ lọc
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Lấy danh sách danh mục
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/dich-vu/get-data"
        );
        if (!response.ok) {
          console.warn("API chưa sẵn sàng.");
          setIsLoading(false);
          return;
        }
        const result = await response.json();
        if (result.status === true) {
          setCategories(result.data);
        }
      } catch (err) {
        console.error("Lỗi API:", err);
      } finally {
        setIsLoading(false);
      }

      // Lấy danh sách dịch vụ
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/chi-tiet-thuong-hieu/get-all-data"
        );
        if (!response.ok) {
          console.warn("API chưa sẵn sàng.");
          setIsLoading(false);
          return;
        }
        const result = await response.json();
        if (result.status === true) {
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

  // LOGIC LỌC:
  const filteredServices = services.filter((service) => {
    if (selectedCategory === "Tất cả") return true;
    return service.id_dich_vu === selectedCategory;
  });

  // Format tiền tệ
  const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

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

          {/* CÁC NÚT Ở HERO SECTION ĐƯỢC CHỈNH SỬA UI */}
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
                borderRadius: "99px", // Bo tròn pill shape
                fontWeight: "700",
                border: "none",
                cursor: "pointer",
                fontSize: "1.1rem",
                boxShadow: "0 8px 15px rgba(255, 107, 107, 0.4)", // Shadow đẹp hơn
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-3px)"; // Nổi lên khi hover
                e.target.style.boxShadow =
                  "0 12px 20px rgba(255, 107, 107, 0.6)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 8px 15px rgba(255, 107, 107, 0.4)";
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
                borderRadius: "99px", // Bo tròn pill shape
                fontWeight: "600",
                border: "2px solid rgba(255,255,255,0.8)",
                cursor: "pointer",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                backdropFilter: "blur(4px)", // Hiệu ứng kính mờ
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
                e.target.style.borderColor = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.borderColor = "rgba(255,255,255,0.8)";
              }}
            >
              🔑 Đăng nhập
            </button>
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

          {/* --- THANH LỌC DỊCH VỤ VỚI UI MỚI --- */}
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

            {/* 1. NÚT "TẤT CẢ" */}
            <button
              onClick={() => setSelectedCategory("Tất cả")}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "99px", // Pill shape
                border: "none",
                // Style động
                backgroundColor:
                  selectedCategory === "Tất cả" ? "#667eea" : "white",
                color: selectedCategory === "Tất cả" ? "white" : "#4b5563",
                boxShadow:
                  selectedCategory === "Tất cả"
                    ? "0 4px 12px rgba(102, 126, 234, 0.4)"
                    : "0 2px 5px rgba(0,0,0,0.05)",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== "Tất cả") {
                  e.target.style.backgroundColor = "#f1f5f9";
                  e.target.style.transform = "translateY(-2px)";
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== "Tất cả") {
                  e.target.style.backgroundColor = "white";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              Tất cả
            </button>

            {/* 2. CÁC NÚT TỪ API */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: "0.6rem 1.5rem",
                  borderRadius: "99px", // Pill shape
                  border: "none",
                  backgroundColor:
                    selectedCategory === category.id ? "#667eea" : "white",
                  color: selectedCategory === category.id ? "white" : "#4b5563",
                  boxShadow:
                    selectedCategory === category.id
                      ? "0 4px 12px rgba(102, 126, 234, 0.4)"
                      : "0 2px 5px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.95rem",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = "#f1f5f9";
                    e.target.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.backgroundColor = "white";
                    e.target.style.transform = "translateY(0)";
                  }
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
                  {/* ... (Phần nội dung card giữ nguyên) ... */}
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

                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      color: "#1f2937",
                      marginBottom: "0.5rem",
                      lineHeight: "1.4",
                      minHeight: "3.5rem",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.ten_san_pham}
                  </h3>

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
                      {service.dia_chi_cu_the + ", " + service.tinh_thanh}
                    </span>
                  </div>

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
                      {service.trang_thai || "Sẵn sàng phục vụ"}
                    </span>
                  </div>

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
                        {formatVND(service.don_gia)}
                      </span>
                    </div>
                  </div>

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
                  </div>

                  {/* NÚT ĐẶT LỊCH (STYLE MỚI) */}
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#667eea",
                      color: "white",
                      border: "none",
                      padding: "0.85rem",
                      borderRadius: "12px", // Bo tròn nhẹ cho nút trong card
                      fontWeight: "600",
                      cursor: "pointer",
                      marginTop: "1rem",
                      transition: "all 0.3s ease",
                      fontSize: "0.95rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
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
                <strong>
                  {categories.find((c) => c.id === selectedCategory)
                    ?.ten_dich_vu || selectedCategory}
                </strong>
                "
              </p>
              <button
                onClick={() => setSelectedCategory("Tất cả")}
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 2rem",
                  border: "1px solid #ccc",
                  borderRadius: "99px",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#4b5563",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.color = "#667eea";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = "#ccc";
                  e.target.style.color = "#4b5563";
                }}
              >
                Xem tất cả dịch vụ
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
