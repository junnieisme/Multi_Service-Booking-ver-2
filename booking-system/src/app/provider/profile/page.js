"use client";
import { useRouter } from "next/navigation";
import MainContent from "@/components/Layout/MainContent";
import { useState, useEffect } from "react";

export default function BusinessProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [originalData, setOriginalData] = useState({});
  // businessName: "Salon Beauty Pro",
  // description:
  //   "Chuyên cung cấp các dịch vụ làm đẹp cao cấp với đội ngũ chuyên nghiệp",
  // address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  // phone: "0912345678",
  // email: "contact@beautypro.com",
  // website: "www.beautypro.com",
  // businessHours: "08:00 - 20:00",
  // categories: ["Làm đẹp", "Spa", "Massage"],
  // establishedYear: "2020",

  const [socialMedia, setSocialMedia] = useState({
    facebook: "example.facebook",
    instagram: "example.instagram",
    zalo: "example.zalo",
  });
  useEffect(() => {
    const fectData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/profile",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setFormData(data.data[0]);
          setOriginalData(data.data[0]);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    };
    fectData();
  }, []);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/change-profile",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("authToken"),
            },
              body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (data.status) {
          alert(data.message)
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu đặt lịch:", error);
      } finally {
        setLoading(false);
      }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(originalData); 
    setIsEditing(false);
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
            Hồ sơ thương hiệu {formData.ho_ten} 🏢
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1.125rem" }}>
            Quản lý thông tin và hình ảnh thương hiệu của bạn
          </p>
        </div>

        {/* Business Information Card */}
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
              Thông tin doanh nghiệp
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
            {/* Business Name */}
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
                Tên thương hiệu *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.ten_thuong_hieu}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ten_thuong_hieu: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                  }}
                  placeholder="Nhập tên thương hiệu"
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
                  {formData.ten_thuong_hieu}
                </div>
              )}
            </div>

            {/* Description */}
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
                Mô tả thương hiệu
              </label>
              {isEditing ? (
                <textarea
                  value={formData.mo_ta_ngan}
                  onChange={(e) =>
                    setFormData({ ...formData, mo_ta_ngan: e.target.value })
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "0.875rem",
                    resize: "vertical",
                  }}
                  placeholder="Mô tả về thương hiệu của bạn"
                />
              ) : (
                <div
                  style={{
                    padding: "0.75rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "6px",
                    color: "#1f2937",
                    fontSize: "0.875rem",
                    lineHeight: "1.5",
                  }}
                >
                  {formData.mo_ta_ngan}
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
                      setFormData({
                        ...formData,
                        so_dien_thoai: e.target.value,
                      })
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

            {/* Address */}
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
                  Địa chỉ cụ thể *
                </label>
                {isEditing ? (
                  <input
                    value={formData.dia_chi_cu_the}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dia_chi_cu_the: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="Nhập địa chỉ cụ thể"
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
                    {formData.dia_chi_cu_the}
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
                  Tỉnh thành *
                </label>
                {isEditing ? (
                  <input
                    value={formData.tinh_thanh}
                    onChange={(e) =>
                      setFormData({ ...formData, tinh_thanh: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="Nhập tỉnh thành"
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
                    {formData.tinh_thanh}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information Grid */}
            {/* <div
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
                  Giờ làm việc
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.businessHours}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessHours: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="VD: 08:00 - 20:00"
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
                    {formData.businessHours}
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
                  Năm thành lập
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.establishedYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        establishedYear: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder="VD: 2020"
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
                    {formData.establishedYear}
                  </div>
                )}
              </div>
            </div> */}
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

        {/* Social Media Card */}
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
            Mạng xã hội
          </h2>

          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              {
                key: "facebook",
                label: "Facebook",
                icon: "📘",
                placeholder: "username",
              },
              {
                key: "instagram",
                label: "Instagram",
                icon: "📷",
                placeholder: "username",
              },
              {
                key: "zalo",
                label: "Zalo",
                icon: "💬",
                placeholder: "Số điện thoại",
              },
            ].map((social) => (
              <div key={social.key}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  {social.icon} {social.label}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={socialMedia[social.key]}
                    onChange={(e) =>
                      setSocialMedia({
                        ...socialMedia,
                        [social.key]: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "0.875rem",
                    }}
                    placeholder={social.placeholder}
                  />
                ) : (
                  <div
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#f9fafb",
                      borderRadius: "6px",
                      color: socialMedia[social.key] ? "#1f2937" : "#9ca3af",
                      fontSize: "0.875rem",
                    }}
                  >
                    {socialMedia[social.key] || `Chưa cập nhật ${social.label}`}
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
