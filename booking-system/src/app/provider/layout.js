// src/app/provider/layout.js
import Header from "@/components/Layout/Header";

export default function ProviderLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      {children}
    </div>
  );
}
