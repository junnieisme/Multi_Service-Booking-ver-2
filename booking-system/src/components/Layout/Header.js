"use client";
import { useState } from "react";
import SearchBar from "../UI/SearchBar";
import NotificationBell from "../UI/NotificationBell";
import RoleSelector from "../UI/RoleSelector";

export default function Header() {
  const [user, setUser] = useState(null);

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
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#2563eb",
              }}
            >
              ServiceHub
            </h1>
          </div>

          {/* Search Bar */}
          <div style={{ flex: "1", maxWidth: "500px", margin: "0 2rem" }}>
            <SearchBar />
          </div>

          {/* Right side */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <RoleSelector />
            <NotificationBell notifications={[]} />

            {!user && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => (window.location.href = "/login")}
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
                  Đăng nhập
                </button>
                <button
                  onClick={() => (window.location.href = "/register")}
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
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
