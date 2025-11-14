"use client";
import { useState } from "react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("user"); // 'user' hoặc 'provider'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Login data:", { ...formData, role: activeTab });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      localStorage.setItem("authToken", "mock-token");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: activeTab === "user" ? "Người dùng" : "Nhà cung cấp",
          email: formData.email,
          role: activeTab,
        })
      );

      alert("Đăng nhập thành công!");
      // Điều hướng dựa trên loại tài khoản
      const redirectPath = activeTab === "user" ? "/user" : "/provider";
      window.location.href = redirectPath;
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            Đăng nhập nếu bạn đã có tài khoản
          </p>
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2.5rem",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e1e5e9",
          }}
        >
          {/* Tab Navigation */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              padding: "4px",
              marginBottom: "2rem",
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab("user")}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor:
                  activeTab === "user" ? "#667eea" : "transparent",
                color: activeTab === "user" ? "white" : "#6b7280",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (activeTab !== "user") {
                  e.target.style.backgroundColor = "#e5e7eb";
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== "user") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              👤 Người dùng
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("provider")}
              style={{
                flex: 1,
                padding: "0.75rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor:
                  activeTab === "provider" ? "#667eea" : "transparent",
                color: activeTab === "provider" ? "white" : "#6b7280",
                fontWeight: "600",
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                if (activeTab !== "provider") {
                  e.target.style.backgroundColor = "#e5e7eb";
                }
              }}
              onMouseOut={(e) => {
                if (activeTab !== "provider") {
                  e.target.style.backgroundColor = "transparent";
                }
              }}
            >
              🏢 Nhà cung cấp
            </button>
          </div>

          {/* Tab Content */}
          <div>
            <div
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                {activeTab === "user"
                  ? "Đăng nhập người dùng"
                  : "Đăng nhập nhà cung cấp"}
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#6b7280",
                }}
              >
                {activeTab === "user"
                  ? "Đăng nhập để đặt lịch và sử dụng dịch vụ"
                  : "Đăng nhập để quản lý dịch vụ và đơn đặt"}
              </p>
            </div>

            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
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
                  Email {activeTab === "user" ? "của bạn" : "doanh nghiệp"}
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
                    placeholder={
                      activeTab === "user"
                        ? "homersimpson@gmail.com"
                        : "company@business.com"
                    }
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
                      e.target.parentElement.style.borderColor = "#667eea";
                      e.target.parentElement.style.backgroundColor = "white";
                      e.target.parentElement.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.parentElement.style.borderColor = "#e5e7eb";
                      e.target.parentElement.style.backgroundColor = "#fafafa";
                      e.target.parentElement.style.boxShadow = "none";
                    }}
                  />
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
                      e.target.parentElement.style.borderColor = "#667eea";
                      e.target.parentElement.style.backgroundColor = "white";
                      e.target.parentElement.style.boxShadow =
                        "0 0 0 3px rgba(102, 126, 234, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.parentElement.style.borderColor = "#e5e7eb";
                      e.target.parentElement.style.backgroundColor = "#fafafa";
                      e.target.parentElement.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  color: "#4b5563",
                  padding: "0.5rem 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="remember"
                      style={{
                        cursor: "pointer",
                        width: "18px",
                        height: "18px",
                        margin: 0,
                        accentColor: "#667eea",
                      }}
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    style={{
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <a
                  href="#"
                  style={{
                    color: "#667eea",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "0.85rem",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#5a67d8";
                    e.target.style.textDecoration = "underline";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#667eea";
                    e.target.style.textDecoration = "none";
                  }}
                >
                  Quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  backgroundColor: "#667eea",
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
                    e.target.style.backgroundColor = "#5a67d8";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(102, 126, 234, 0.4)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#667eea";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                {isLoading
                  ? `⏳ Đang đăng nhập...`
                  : `Đăng nhập ${
                      activeTab === "user" ? "người dùng" : "nhà cung cấp"
                    }`}
              </button>

              {/* Divider */}
              <div
                style={{
                  textAlign: "center",
                  position: "relative",
                  margin: "1.5rem 0",
                }}
              >
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "#e5e7eb",
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                  }}
                ></div>
                <span
                  style={{
                    backgroundColor: "white",
                    padding: "0 1rem",
                    color: "#6b7280",
                    fontSize: "0.9rem",
                    position: "relative",
                    fontWeight: "500",
                  }}
                >
                  hoặc đăng nhập với
                </span>
              </div>

              {/* Social Login */}
              <button
                type="button"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "0.9rem 1.5rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                  color: "#374151",
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.backgroundColor = "#f8f9ff";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.backgroundColor = "white";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    fontSize: "1.2rem",
                    width: "20px",
                    textAlign: "center",
                  }}
                >
                  🔵
                </span>
                Đăng nhập với Google
              </button>
            </form>
          </div>

          {/* Sign Up Link */}
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
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                style={{
                  fontWeight: "600",
                  color: "#667eea",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#5a67d8";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#667eea";
                }}
              >
                Đăng ký
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
