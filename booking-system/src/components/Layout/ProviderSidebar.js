// src/components/Layout/ProviderSidebar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const providerMenuItems = [
  { name: "Tổng quan", href: "/provider", icon: "📊" },
  { name: "Dịch vụ của tôi", href: "/provider/services", icon: "🔧" },
  { name: "Lịch đặt", href: "/provider/appointments", icon: "📅" },
  { name: "Doanh thu", href: "/provider/revenue", icon: "💰" },
  { name: "Hồ sơ", href: "/provider/profile", icon: "👤" },
];

export default function ProviderSidebar() {
  const pathname = usePathname();

  return (
    <div
      style={{
        width: "256px",
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        borderRight: "1px solid #e5e7eb",
        minHeight: "calc(100vh - 80px)", 
        position: "fixed",
        left: 0,
        top: "80px", 
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "0.5rem",
          }}
        >
          Dashboard Nhà cung cấp
        </h2>
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            lineHeight: "1.25",
          }}
        ></p>
      </div>

      <nav style={{ marginTop: "1.5rem" }}>
        <div style={{ padding: "0 1rem" }}>
          {providerMenuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.75rem 1rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  borderRadius: "0.5rem",
                  transition: "all 0.2s",
                  marginBottom: "0.25rem",
                  textDecoration: "none",
                  backgroundColor: isActive ? "#f0fdf4" : "transparent",
                  color: isActive ? "#166534" : "#4b5563",
                  borderRight: isActive ? "2px solid #166534" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                    e.currentTarget.style.color = "#1f2937";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#4b5563";
                  }
                }}
              >
                <span style={{ marginRight: "0.75rem", fontSize: "1.125rem" }}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
