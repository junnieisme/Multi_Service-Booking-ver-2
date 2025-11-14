"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    ho_ten: "",
    email: "",
    so_dien_thoai: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Chuẩn bị dữ liệu để gửi lên server
      const submitData = {
        ho_ten: formData.ho_ten,
        email: formData.email,
        so_dien_thoai: formData.so_dien_thoai,
        password: formData.password,
        role: formData.role,
        da_ghi: false, 
        hint_arth: "", 
        is_satwe: false, 
        is_block: false, 
      };

      console.log("Register data:", submitData);

      // Gọi API đăng ký
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "/login";
      } else {
        setError(result.message || "Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "450px",
          width: "100%",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              background: "linear-gradient(45deg, #fff, #f0f8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BookingSystem
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              opacity: 0.9,
              fontWeight: "500",
            }}
          >
            Tạo tài khoản mới để bắt đầu
          </p>
        </div>

        {/* Register Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2.5rem",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e1e5e9",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
            onSubmit={handleSubmit}
          >
            {error && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  padding: "1rem",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  borderLeft: "4px solid #dc2626",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Họ và tên Field */}
            <div>
              <label
                htmlFor="ho_ten"
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Họ và tên
              </label>
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                <input
                  id="ho_ten"
                  name="ho_ten"
                  type="text"
                  required
                  value={formData.ho_ten}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên của bạn"
                  style={{
                    width: "100%",
                    padding: "1rem 1.2rem",
                    border: "none",
                    fontSize: "1rem",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.style.boxShadow =
                      "0 0 0 3px rgba(255, 107, 107, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                    e.target.parentElement.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Email
              </label>
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="homersimpson@gmail.com"
                  style={{
                    width: "100%",
                    padding: "1rem 1.2rem",
                    border: "none",
                    fontSize: "1rem",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.style.boxShadow =
                      "0 0 0 3px rgba(255, 107, 107, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                    e.target.parentElement.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Số điện thoại Field */}
            <div>
              <label
                htmlFor="so_dien_thoai"
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Số điện thoại
              </label>
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                <input
                  id="so_dien_thoai"
                  name="so_dien_thoai"
                  type="tel"
                  required
                  value={formData.so_dien_thoai}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại của bạn"
                  style={{
                    width: "100%",
                    padding: "1rem 1.2rem",
                    border: "none",
                    fontSize: "1rem",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.style.boxShadow =
                      "0 0 0 3px rgba(255, 107, 107, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                    e.target.parentElement.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label
                htmlFor="role"
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Bạn là
              </label>
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "1rem 1.2rem",
                    border: "none",
                    fontSize: "1rem",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.style.boxShadow =
                      "0 0 0 3px rgba(255, 107, 107, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                    e.target.parentElement.style.boxShadow = "none";
                  }}
                >
                  <option value="user">Người dùng</option>
                  <option value="provider">Nhà cung cấp dịch vụ</option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Mật khẩu
              </label>
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "1rem 1.2rem",
                    border: "none",
                    fontSize: "1rem",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.style.boxShadow =
                      "0 0 0 3px rgba(255, 107, 107, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                    e.target.parentElement.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                style={{
                  display: "block",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.75rem",
                }}
              >
                Xác nhận mật khẩu
              </label>
              <div
                style={{
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "#fafafa",
                  transition: "all 0.2s ease",
                  overflow: "hidden",
                }}
              >
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "1rem 1.2rem",
                    border: "none",
                    fontSize: "1rem",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                    e.target.parentElement.style.boxShadow =
                      "0 0 0 3px rgba(255, 107, 107, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                    e.target.parentElement.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "0.85rem",
                color: "#4b5563",
                padding: "0.5rem 0",
                lineHeight: "1.4",
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "0.2rem",
                }}
              >
                <input
                  type="checkbox"
                  id="terms"
                  required
                  style={{
                    cursor: "pointer",
                    width: "16px",
                    height: "16px",
                    margin: 0,
                    accentColor: "#ff6b6b",
                  }}
                />
              </div>
              <label
                htmlFor="terms"
                style={{
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Tôi đồng ý với{" "}
                <a
                  href="#"
                  style={{
                    color: "#ff6b6b",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a
                  href="#"
                  style={{
                    color: "#ff6b6b",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Chính sách bảo mật
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: "#ff6b6b",
                color: "white",
                padding: "1rem",
                borderRadius: "8px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.2s ease",
                opacity: isLoading ? 0.7 : 1,
                marginTop: "0.5rem",
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#ff5252";
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 4px 12px rgba(255, 107, 107, 0.4)";
                }
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#ff6b6b";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {isLoading ? "⏳ Đang tạo tài khoản..." : "Tạo tài khoản"}
            </button>
          </form>

          {/* Sign In Link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <span
              style={{
                fontSize: "0.95rem",
                color: "#6b7280",
                fontWeight: "500",
              }}
            >
              Đã có tài khoản?{" "}
              <a
                href="/login"
                style={{
                  fontWeight: "600",
                  color: "#ff6b6b",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#ff5252";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#ff6b6b";
                }}
              >
                Đăng nhập
              </a>
            </span>
          </div>
        </div>

        {/* Footer Text */}
        <div
          style={{
            textAlign: "center",
            color: "white",
            opacity: 0.8,
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        >
          <p>© 2024 BookingSystem. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
