"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";

export default function UserProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    address: "456 Lê Lợi, Quận 1, TP.HCM",
    dateOfBirth: "15/03/1990",
    gender: "male",
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: "nguyenvana.profile",
    instagram: "nguyen_van_a",
    zalo: "0912345678",
  });

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
            Hồ sơ cá nhân 👤
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
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
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
                  {formData.fullName}
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
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
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
                    {formData.phone}
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
                    type="text"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="DD/MM/YYYY"
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
                    {formData.dateOfBirth}
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
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
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
                    {formData.gender === "male"
                      ? "Nam"
                      : formData.gender === "female"
                      ? "Nữ"
                      : "Khác"}
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
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
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
                  {formData.address}
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
