// src/app/provider/services/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function ProviderServices() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("all"); // all, active, inactive

  useEffect(() => {
    // Mock data - replace with API call
    setServices([
      {
        id: 1,
        name: "Cắt tóc nam cao cấp",
        price: 150000,
        duration: 45,
        category: "Làm đẹp",
        status: "active",
        description:
          "Cắt tóc theo phong cách Hàn Quốc, bao gồm gội đầu và tạo kiểu",
        image: "/images/haircut.jpg",
        bookings: 125,
      },
      {
        id: 2,
        name: "Massage thư giãn",
        price: 300000,
        duration: 60,
        category: "Spa & Massage",
        status: "active",
        description: "Massage toàn thân giúp thư giãn, giảm stress",
        image: "/images/massage.jpg",
        bookings: 89,
      },
      {
        id: 3,
        name: "Spa mặt chuyên sâu",
        price: 500000,
        duration: 90,
        category: "Chăm sóc da",
        status: "active",
        description: "Quy trình chăm sóc da 7 bước cho làn da sáng khỏe",
        image: "/images/facial.jpg",
        bookings: 67,
      },
      {
        id: 4,
        name: "Nail art cao cấp",
        price: 250000,
        duration: 75,
        category: "Làm nail",
        status: "inactive",
        description: "Vẽ nail nghệ thuật theo yêu cầu",
        image: "/images/nail.jpg",
        bookings: 42,
      },
      {
        id: 5,
        name: "Cạo mặt & Đắp mặt nạ",
        price: 180000,
        duration: 50,
        category: "Chăm sóc da",
        status: "active",
        description: "Dịch vụ cạo mặt truyền thống kết hợp đắp mặt nạ",
        image: "/images/shave.jpg",
        bookings: 34,
      },
    ]);
  }, []);

  const filteredServices = services.filter((service) =>
    filter === "all" ? true : service.status === filter
  );

  const addService = () => {
    router.push("/provider/services/create");
  };

  const editService = (serviceId) => {
    router.push(`/provider/services/edit/${serviceId}`);
  };

  const toggleServiceStatus = (serviceId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, status: newStatus } : service
      )
    );
    // TODO: Call API to update status
  };

  const getStatusInfo = (status) => {
    return status === "active"
      ? { label: "Đang hoạt động", color: "#16a34a", bg: "#d1fae5" }
      : { label: "Ngừng hoạt động", color: "#dc2626", bg: "#fee2e2" };
  };

  return (
    <MainContent>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
                color: "#1f2937",
              }}
            >
              Dịch vụ của tôi 💼
            </h1>
            <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
              Quản lý danh sách dịch vụ bạn cung cấp
            </p>
          </div>

          <button
            onClick={addService}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "0.875rem",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2563eb";
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>+</span>
            Thêm dịch vụ mới
          </button>
        </div>

        {/* Stats Overview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "Tổng dịch vụ", value: services.length, color: "#2563eb" },
            {
              label: "Đang hoạt động",
              value: services.filter((s) => s.status === "active").length,
              color: "#16a34a",
            },
            {
              label: "Ngừng hoạt động",
              value: services.filter((s) => s.status === "inactive").length,
              color: "#dc2626",
            },
            {
              label: "Tổng lượt đặt",
              value: services.reduce(
                (sum, service) => sum + service.bookings,
                0
              ),
              color: "#eab308",
            },
          ].map((stat, index) => (
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
            { key: "all", label: "Tất cả dịch vụ" },
            { key: "active", label: "Đang hoạt động" },
            { key: "inactive", label: "Ngừng hoạt động" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
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
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredServices.map((service) => {
            const statusInfo = getStatusInfo(service.status);

            return (
              <div
                key={service.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
                }}
              >
                {/* Service Image */}
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#f3f4f6",
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: statusInfo.bg,
                      color: statusInfo.color,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                    }}
                  >
                    {statusInfo.label}
                  </div>
                </div>

                {/* Service Info */}
                <div style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        flex: 1,
                      }}
                    >
                      {service.name}
                    </h3>
                    <span
                      style={{
                        backgroundColor: "#f0f9ff",
                        color: "#0369a1",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        marginLeft: "0.5rem",
                      }}
                    >
                      {service.bookings} lượt đặt
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      marginBottom: "1rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Giá
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          fontSize: "1rem",
                        }}
                      >
                        {service.price.toLocaleString()} VND
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Thời gian
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          fontSize: "0.875rem",
                        }}
                      >
                        {service.duration} phút
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#6b7280",
                          fontSize: "0.75rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Danh mục
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#1f2937",
                          fontSize: "0.875rem",
                        }}
                      >
                        {service.category}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => editService(service.id)}
                      style={{
                        flex: 1,
                        backgroundColor: "#f8fafc",
                        color: "#374151",
                        border: "1px solid #d1d5db",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        transition: "all 0.2s",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#f1f5f9";
                        e.target.style.borderColor = "#9ca3af";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#f8fafc";
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() =>
                        toggleServiceStatus(service.id, service.status)
                      }
                      style={{
                        backgroundColor:
                          service.status === "active" ? "#fef3c7" : "#d1fae5",
                        color:
                          service.status === "active" ? "#92400e" : "#065f46",
                        border: "none",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "0.875rem",
                        transition: "background-color 0.2s",
                        minWidth: "120px",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor =
                          service.status === "active" ? "#fef3c7" : "#d1fae5";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor =
                          service.status === "active" ? "#fef3c7" : "#d1fae5";
                      }}
                    >
                      {service.status === "active" ? "Tạm dừng" : "Kích hoạt"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              marginTop: "2rem",
            }}
          >
            <p
              style={{
                color: "#6b7280",
                fontSize: "1rem",
                marginBottom: "1rem",
              }}
            >
              {filter === "all"
                ? "Bạn chưa có dịch vụ nào"
                : `Không có dịch vụ ${
                    filter === "active" ? "đang hoạt động" : "ngừng hoạt động"
                  }`}
            </p>
            <button
              onClick={addService}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "0.875rem",
              }}
            >
              Thêm dịch vụ đầu tiên
            </button>
          </div>
        )}
      </div>
    </MainContent>
  );
}
