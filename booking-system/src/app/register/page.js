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

    // --- BẮT ĐẦU VALIDATION ---
    if (!formData.ho_ten.trim()) {
      setError("Vui lòng nhập họ và tên.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Địa chỉ Email không hợp lệ.");
      return;
    }
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.so_dien_thoai)) {
      setError("Số điện thoại không hợp lệ (VD: 09... hoặc 03...).");
      return;
    }
    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    // --- KẾT THÚC VALIDATION ---

    setIsLoading(true);
    setError("");

    try {
      const submitData = {
        ho_ten: formData.ho_ten,
        email: formData.email,
        so_dien_thoai: formData.so_dien_thoai,
        password: formData.password,
      };

      console.log("Register data:", submitData);

      if (formData.role === "provider") {
        const response = await fetch(
          "http://127.0.0.1:8000/api/nha-cung-cap/dang-ky",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          }
        );
        const result = await response.json();
        if (response.ok) {
          alert(
            "Đăng ký tài khoản nhà cung cấp thành công! Vui lòng đăng nhập."
          );
          window.location.href = "/login";
        } else {
          setError(result.message || "Đăng ký thất bại. Vui lòng thử lại.");
        }
      } else if (formData.role === "user") {
        const response = await fetch(
          "http://127.0.0.1:8000/api/khach-hang/dang-ky",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submitData),
          }
        );
        const result = await response.json();
        if (response.ok) {
          alert("Đăng ký tài khoản khách hàng thành công! Vui lòng đăng nhập.");
          window.location.href = "/login";
        } else {
          setError(result.message || "Đăng ký thất bại. Vui lòng thử lại.");
        }
      }
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- STYLES (Đã chỉnh nhỏ lại) ---
  const labelStyle = {
    display: "block",
    fontSize: "0.85rem", // Giảm font size label
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.4rem", // Giảm margin dưới label
  };

  const inputWrapperStyle = {
    border: "1px solid #e5e7eb", // Đổi border mỏng hơn chút
    borderRadius: "6px",
    backgroundColor: "#fafafa",
    transition: "all 0.2s ease",
    overflow: "hidden",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 1rem", // Giảm padding input
    border: "none",
    fontSize: "0.9rem", // Giảm font chữ input
    backgroundColor: "transparent",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem", // Giảm padding bao quanh
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "400px", // Giảm chiều rộng tối đa (450 -> 400)
          width: "100%",
          flexDirection: "column",
          gap: "1.5rem", // Giảm khoảng cách giữa header, form, footer
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", color: "white" }}>
          <h1
            style={{
              fontSize: "2rem", // Giảm kích thước chữ tiêu đề (2.5 -> 2)
              fontWeight: "bold",
              marginBottom: "0.25rem",
              background: "linear-gradient(45deg, #fff, #f0f8ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ServiceHub
          </h1>
          <p style={{ fontSize: "1rem", opacity: 0.9, fontWeight: "500" }}>
            Tạo tài khoản mới để bắt đầu
          </p>
        </div>

        {/* Register Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "2rem", // Giảm padding trong card (2.5 -> 2)
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e1e5e9",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }} // Giảm gap giữa các input (1.5 -> 1)
            onSubmit={handleSubmit}
          >
            {error && (
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  textAlign: "center",
                  borderLeft: "3px solid #dc2626",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Họ và tên Field */}
            <div>
              <label htmlFor="ho_ten" style={labelStyle}>
                Họ và tên
              </label>
              <div style={inputWrapperStyle}>
                <input
                  id="ho_ten"
                  name="ho_ten"
                  type="text"
                  required
                  value={formData.ho_ten}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <div style={inputWrapperStyle}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                  }}
                />
              </div>
            </div>

            {/* Số điện thoại Field */}
            <div>
              <label htmlFor="so_dien_thoai" style={labelStyle}>
                Số điện thoại
              </label>
              <div style={inputWrapperStyle}>
                <input
                  id="so_dien_thoai"
                  name="so_dien_thoai"
                  type="tel"
                  required
                  value={formData.so_dien_thoai}
                  onChange={handleChange}
                  placeholder="0912345678"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                  }}
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" style={labelStyle}>
                Bạn là
              </label>
              <div style={inputWrapperStyle}>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                  }}
                >
                  <option value="user">Người dùng</option>
                  <option value="provider">Nhà cung cấp dịch vụ</option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" style={labelStyle}>
                Mật khẩu
              </label>
              <div style={inputWrapperStyle}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                  }}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" style={labelStyle}>
                Xác nhận mật khẩu
              </label>
              <div style={inputWrapperStyle}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.parentElement.style.borderColor = "#ff6b6b";
                    e.target.parentElement.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.parentElement.style.borderColor = "#e5e7eb";
                    e.target.parentElement.style.backgroundColor = "#fafafa";
                  }}
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                fontSize: "0.8rem",
                color: "#4b5563",
                lineHeight: "1.3",
              }}
            >
              <input
                type="checkbox"
                id="terms"
                required
                style={{
                  cursor: "pointer",
                  width: "14px",
                  height: "14px",
                  marginTop: "2px",
                  accentColor: "#ff6b6b",
                }}
              />
              <label
                htmlFor="terms"
                style={{ cursor: "pointer", fontWeight: "500" }}
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
                  Điều khoản
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
                  Chính sách
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
                padding: "0.8rem", // Giảm padding nút
                borderRadius: "6px",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                opacity: isLoading ? 0.7 : 1,
                marginTop: "0.25rem",
              }}
              onMouseOver={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = "#ff5252";
                  e.target.style.transform = "translateY(-1px)";
                }
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#ff6b6b";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {isLoading ? "⏳ Đang xử lý..." : "Tạo tài khoản"}
            </button>
          </form>

          {/* Sign In Link */}
          <div
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
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
                }}
                onMouseOver={(e) => (e.target.style.color = "#ff5252")}
                onMouseOut={(e) => (e.target.style.color = "#ff6b6b")}
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
            fontSize: "0.85rem",
            fontWeight: "500",
          }}
        >
          <p>© 2025 BookingSystem. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </div>
  );
}
