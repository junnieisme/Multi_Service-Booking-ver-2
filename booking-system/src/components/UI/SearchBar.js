"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Chuyển hướng đến trang search với query
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ position: "relative", width: "100%" }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ, nhà cung cấp..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            paddingRight: "3rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.75rem",
            fontSize: "0.875rem",
            backgroundColor: "#f9fafb",
            transition: "all 0.2s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.borderColor = "#2563eb";
            e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = "#f9fafb";
            e.target.style.borderColor = "#d1d5db";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            borderRadius: "0.375rem",
            transition: "background-color 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
    </form>
  );
}
