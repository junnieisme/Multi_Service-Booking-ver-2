"use client";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";
import React, { useState, useEffect } from "react";

export default function UserProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/khach-hang/profile",
           {
            method: "GET",
            headers: {
               Authorization: 'Bearer '+ localStorage.getItem("authToken"),
            },
          }
        );
        if (!response.ok) {
          console.warn("API chưa sẵn sàng, dùng dữ liệu mẫu.");
          setIsLoading(false);
          return;
        }
        const result = await response.json();
        if (result.status === true) {
          console.log("Dữ liệu dịch vụ đã được tải từ API ", result.data);
          setFormData(result.data);
        }
      } catch (err) {
        console.error("Lỗi API:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  },[]) ;

  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: false,
    smsMarketing: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    // API Call: PUT /api/user/profile
    console.log("Saving profile:", { formData, socialMedia, preferences });
    setIsEditing(false);
    // TODO: Add API call and error handling
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form data
  };

  return (
    <MainContent>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
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
            Hồ sơ cá nhân của {formData.ho_ten}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Quản lý thông tin và tài khoản cá nhân của bạn
          </p>
        </div>

        {/* Personal Information Card */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#1f2937",
              }}
            >
              Thông tin cá nhân
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
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
                Chỉnh sửa
              </button>
            )}
          </div>

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {/* Full Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Họ và tên *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.ho_ten}
                  onChange={(e) =>
                    setFormData({ ...formData, ho_ten: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                  }}
                  placeholder="Nhập họ và tên"
                />
              ) : (
                <div
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    color: "#1f2937",
                    fontSize: "0.875rem",
                  }}
                >
                  {formData.ho_ten}
                </div>
              )}
            </div>

            {/* Contact Information Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Số điện thoại *
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.so_dien_thoai}
                    onChange={(e) =>
                      setFormData({ ...formData, so_dien_thoai: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="Nhập số điện thoại"
                  />
                ) : (
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "6px",
                      color: "#1f2937",
                      fontSize: "0.875rem",
                    }}
                  >
                    {formData.so_dien_thoai}
                  </div>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email *
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="Nhập email"
                  />
                ) : (
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "6px",
                      color: "#1f2937",
                      fontSize: "0.875rem",
                    }}
                  >
                    {formData.email}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Information Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Ngày sinh
                </label>
                {isEditing ? (
                  <input
                    type="date" 
                    value={formData.ngay_sinh}
                    onChange={(e) =>
                      setFormData({ ...formData, ngay_sinh: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                      fontFamily: "inherit", 
                    }}

                  />
                ) : (
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "6px",
                      color: "#1f2937",
                      fontSize: "0.875rem",
                    }}
                  >
                    {/* 3. Khi hiển thị text thì format(VD: DD/MM/YYYY) */}
                    {formData.ngay_sinh
                      ? new Date(formData.ngay_sinh).toLocaleDateString(
                          "vi-VN"
                        )
                      : "Chưa cập nhật"}
                  </div>
                )}
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  Giới tính
                </label>
                {isEditing ? (
                  <select
                    value={formData.gioi_tinh}
                    onChange={(e) =>
                      setFormData({ ...formData, gioi_tinh: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="0">Nam</option>
                    <option value="1">Nữ</option>
                    <option value="2">Khác</option>
                  </select>
                ) : (
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "6px",
                      color: "#1f2937",
                      fontSize: "0.875rem",
                    }}
                  >
                    {formData.gioi_tinh === "0"? "Nam": formData.gioi_tinh === "1"? "Nữ":formData.gioi_tinh === 2 ? "Khác":"Chưa cập nhật"}
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                Địa chỉ
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.dia_chi}
                  onChange={(e) =>
                    setFormData({ ...formData, dia_chi: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                  }}
                  placeholder="Nhập địa chỉ"
                />
              ) : (
                <div
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    color: "#1f2937",
                    fontSize: "0.875rem",
                  }}
                >
                  {formData.dia_chi || "chưa cập nhật"}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
                marginTop: "2rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  backgroundColor: "white",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#f9fafb";
                  e.target.style.borderColor = "#9ca3af";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.borderColor = "#d1d5db";
                }}
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#15803d";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#16a34a";
                }}
              >
                Lưu thay đổi
              </button>
            </div>
          )}
        </div>

        {/* Preferences Card */}
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1.5rem",
            }}
          >
            Cài đặt tùy chọn
          </h2>

          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              {
                key: "notifications",
                label: "Thông báo qua email",
                description: "Nhận thông báo về các cập nhật và tin tức mới",
              },
              {
                key: "newsletter",
                label: "Bản tin khuyến mãi",
                description:
                  "Nhận thông tin về các chương trình khuyến mãi đặc biệt",
              },
              {
                key: "smsMarketing",
                label: "Tin nhắn SMS",
                description: "Nhận thông báo qua tin nhắn SMS",
              },
            ].map((pref) => (
              <div
                key={pref.key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {pref.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                    }}
                  >
                    {pref.description}
                  </div>
                </div>
                {isEditing ? (
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={preferences[pref.key]}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          [pref.key]: e.target.checked,
                        })
                      }
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                        marginRight: "0.5rem",
                      }}
                    />
                  </label>
                ) : (
                  <div
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: preferences[pref.key]
                        ? "#dcfce7"
                        : "#f3f4f6",
                      color: preferences[pref.key] ? "#166534" : "#6b7280",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {preferences[pref.key] ? "Bật" : "Tắt"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainContent>
  );
}
