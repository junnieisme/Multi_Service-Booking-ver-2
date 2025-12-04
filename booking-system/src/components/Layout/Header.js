"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../UI/SearchBar";
import NotificationBell from "../UI/NotificationBell";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  // --- PHẦN ĐÃ SỬA CHỮA ---
  useEffect(() => {
    // 1. Lấy token
    const token = localStorage.getItem("authToken");

    // 2. Lấy chuỗi JSON user từ LocalStorage (Key là "user" theo ảnh bạn gửi)
    const userStr = localStorage.getItem("user");

    let currentRole = "user"; // Mặc định

    // 3. Parse JSON an toàn để lấy role thực tế
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        // Kiểm tra xem userObj có tồn tại và có thuộc tính role không
        if (userObj && userObj.role) {
          currentRole = userObj.role;
        }
      } catch (error) {
        console.error("Lỗi khi đọc dữ liệu user từ LocalStorage:", error);
      }
    }

    // 4. Cập nhật state
    if (token) {
      setIsLoggedIn(true);
      setUserRole(currentRole);
    } else {
      setIsLoggedIn(false);
      setUserRole("user");
    }
  }, [pathname]);

  // Logic xác định có phải Provider không:
  // Ưu tiên 1: Đang đứng ở trang /provider
  // Ưu tiên 2: Role trong tài khoản là "provider"
  const isProviderRoute = pathname.startsWith("/provider");
  const isProvider = isProviderRoute || (isLoggedIn && userRole === "provider");

  const providerMenu = [
    { name: "Dashboard", path: "/provider" },
    { name: "Lịch đặt", path: "/provider/appointments" },
    { name: "Dịch vụ của tôi", path: "/provider/services" },
    { name: "Hồ sơ thương hiệu", path: "/provider/profile" },
  ];

  const userMenu = [
    { name: "Homepage", path: "/" },
    { name: "Dịch vụ", path: "/user" },
    { name: "Lịch hẹn của tôi", path: "/user/my-appointments" },
    { name: "Hồ sơ", path: "/user/profile" },
  ];

  // Nếu đang ở route provider thì hiện menu provider, ngược lại hiện menu user
  const currentMenu = isProviderRoute ? providerMenu : userMenu;

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    // Xóa thông tin đăng nhập
    localStorage.removeItem("authToken");
    localStorage.removeItem("user"); // Sửa: Xóa key "user" thay vì "userRole"

    // Reset state
    setIsLoggedIn(false);
    setUserRole("user");

    // Chuyển hướng về trang chủ
    router.push("/");
  };
  // --- KẾT THÚC PHẦN SỬA ---

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        zIndex: 50,
        backgroundColor: "white",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "4rem",
          }}
        >
          {/* Logo + Navigation */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#2563eb",
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            >
              ServiceHub
            </h1>

            {/* Navigation Menu - ẩn khi ở homepage */}
            {isLoggedIn && (
              <nav style={{ display: "flex", gap: "1.5rem" }}>
                {currentMenu.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.path)}
                    style={{
                      background: "none",
                      border: "none",
                      color: pathname === item.path ? "#2563eb" : "#6b7280",
                      cursor: "pointer",
                      fontWeight: pathname === item.path ? "600" : "400",
                      fontSize: "0.875rem",
                      padding: "0.5rem 0",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.path)
                        e.target.style.color = "#374151";
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.path)
                        e.target.style.color = "#6b7280";
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Search Bar - HIỆN VỚI MỌI ROLE VÀ Ở HOMEPAGE */}
          <div style={{ flex: "1", maxWidth: "500px", margin: "0 2rem" }}>
            {/* Chỉ ẩn SearchBar ở các trang provider dashboard nếu cần */}
            {!pathname.startsWith("/provider/dashboard") && <SearchBar />}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Chuông thông báo - ẩn ở homepage, chỉ hiện khi đã đăng nhập */}
            {pathname !== "/" && isLoggedIn && (
              <NotificationBell notifications={[]} />
            )}

            {/* Ở HOMEPAGE: HIỂN THỊ ĐĂNG NHẬP / ĐĂNG KÝ HOẶC ĐĂNG XUẤT */}
            {pathname === "/" && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "center",
                }}
              >
                {!isLoggedIn ? (
                  <>
                    {/* Nút Đăng nhập - Khi chưa đăng nhập */}
                    <button
                      onClick={() => router.push("/login")}
                      style={{
                        color: "#374151",
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        cursor: "pointer",
                        padding: "0.6rem 1.5rem",
                        borderRadius: "99px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.borderColor = "#2563eb";
                        e.target.style.color = "#2563eb";
                        e.target.style.backgroundColor = "#eff6ff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.borderColor = "#e5e7eb";
                        e.target.style.color = "#374151";
                      }}
                    >
                      Đăng nhập
                    </button>

                    {/* Nút Đăng ký - Khi chưa đăng nhập */}
                    <button
                      onClick={() => router.push("/register")}
                      style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "0.6rem 1.5rem",
                        borderRadius: "99px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        transition: "all 0.2s ease",
                        boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#1d4ed8";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 6px 10px -1px rgba(37, 99, 235, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 4px 6px -1px rgba(37, 99, 235, 0.2)";
                      }}
                    >
                      Đăng ký
                    </button>
                  </>
                ) : (
                  /* Nút Đăng xuất - Khi đã đăng nhập */
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "0.6rem 1.5rem",
                      borderRadius: "99px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#dc2626";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 10px -1px rgba(239, 68, 68, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ef4444";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 6px -1px rgba(239, 68, 68, 0.2)";
                    }}
                  >
                    Đăng xuất
                  </button>
                )}
              </div>
            )}

            {/* Nút Đăng xuất - Khi KHÔNG ở homepage và đã đăng nhập */}
            {pathname !== "/" && isLoggedIn && (
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  padding: "0.6rem 1.5rem",
                  borderRadius: "99px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#dc2626";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 10px -1px rgba(239, 68, 68, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#ef4444";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 6px -1px rgba(239, 68, 68, 0.2)";
                }}
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
