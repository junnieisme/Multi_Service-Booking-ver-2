"use client";
import { useState } from "react";

export default function RoleSelector() {
  const [currentRole, setCurrentRole] = useState("user");
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { id: "user", name: "Người dùng", icon: "👤" },
    { id: "provider", name: "Nhà cung cấp", icon: "🏢" },
  ];

  const handleRoleChange = (role) => {
    setCurrentRole(role.id);
    setIsOpen(false);
    console.log("Role changed to:", role.name);
  };

  const currentRoleData = roles.find((role) => role.id === currentRole);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.75rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.5rem",
          background: "white",
          cursor: "pointer",
        }}
      >
        <span>{currentRoleData?.icon}</span>
        <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
          {currentRoleData?.name}
        </span>
        <span style={{ fontSize: "0.75rem" }}>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            marginTop: "0.5rem",
            width: "12rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            zIndex: 50,
          }}
        >
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleChange(role)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                width: "100%",
                padding: "0.75rem 1rem",
                textAlign: "left",
                background: role.id === currentRole ? "#dbeafe" : "white",
                color: role.id === currentRole ? "#1e40af" : "#374151",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "1.125rem" }}>{role.icon}</span>
              <span style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                {role.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
