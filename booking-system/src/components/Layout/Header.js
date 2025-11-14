"use client";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../UI/SearchBar";
import NotificationBell from "../UI/NotificationBell";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // Xác định role dựa trên current path
  const isProvider = pathname.startsWith("/provider");
  const isUser =
    pathname.startsWith("/user") || (!isProvider && pathname !== "/");

  const providerMenu = [
    { name: "Homepage", path: "/" },
    { name: "Dashboard", path: "/provider" },
    { name: "Lịch đặt", path: "/provider/appointments" },
    { name: "Dịch vụ của tôi", path: "/provider/services" },
    { name: "Hồ sơ thương hiệu", path: "/provider/profile" },
  ];

  const userMenu = [
    { name: "Homepage", path: "/" },
    { name: "Dịch vụ", path: "/user" },
    { name: "Lịch hẹn của tôi", path: "/user/my-appointments" },
    { name: "Tìm kiếm", path: "/user/search" },
    { name: "Hồ sơ", path: "/user/profile" },
  ];

  const currentMenu = isProvider ? providerMenu : userMenu;

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
            {pathname !== "/" && (
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

          {/* Search Bar - chỉ hiển thị cho user và không ở homepage */}
          <div style={{ flex: "1", maxWidth: "500px", margin: "0 2rem" }}>
            {isUser && pathname !== "/" && <SearchBar />}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Chuông thông báo - ẩn ở homepage */}
            {pathname !== "/" && <NotificationBell notifications={[]} />}

            {/* Role Indicator + Switch - ẩn ở homepage */}
            {pathname !== "/" && (
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    padding: "0.25rem 0.75rem",
                    backgroundColor: isProvider ? "#fef3c7" : "#dbeafe",
                    borderRadius: "0.375rem",
                    fontWeight: "500",
                  }}
                >
                  {isProvider ? "Nhà cung cấp" : "Khách hàng"}
                </span>

                <button
                  onClick={() => {
                    if (isProvider) {
                      router.push("/user/dashboard");
                    } else {
                      router.push("/provider/dashboard");
                    }
                  }}
                  style={{
                    color: "#374151",
                    background: "none",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f9fafb";
                    e.target.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "#d1d5db";
                  }}
                >
                  {isProvider ? "Chế độ Khách hàng" : "Chế độ Nhà cung cấp"}
                </button>
              </div>
            )}

            {/* Ở homepage thì hiển thị nút chọn role */}
            {pathname === "/" && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => router.push("/user/dashboard")}
                  style={{
                    color: "#374151",
                    background: "none",
                    border: "1px solid #d1d5db",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#f9fafb";
                    e.target.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.borderColor = "#d1d5db";
                  }}
                >
                  Khách hàng
                </button>
                <button
                  onClick={() => router.push("/provider/dashboard")}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "500",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#2563eb";
                  }}
                >
                  Nhà cung cấp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
