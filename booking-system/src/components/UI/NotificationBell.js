"use client";
import { useState } from "react";

export default function NotificationBell({
  notifications,
  onNotificationClick,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const notificationCount = notifications.length;

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "0.5rem",
          color: "#374151",
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <span style={{ fontSize: "1.125rem" }}>🔔</span>
        {notificationCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-0.25rem",
              right: "-0.25rem",
              backgroundColor: "#ef4444",
              color: "white",
              fontSize: "0.75rem",
              borderRadius: "50%",
              height: "1.25rem",
              width: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {notificationCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            marginTop: "0.5rem",
            width: "20rem",
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            zIndex: 50,
          }}
        >
          <div style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
              Thông báo
            </h3>
          </div>
          <div style={{ maxHeight: "24rem", overflowY: "auto" }}>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem",
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onNotificationClick?.(notification);
                    setIsOpen(false);
                  }}
                >
                  <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                    {notification.message}
                  </p>
                  <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    {notification.time}
                  </span>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                Không có thông báo
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
