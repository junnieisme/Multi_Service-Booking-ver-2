// src/app/services/layout.js
import Header from "@/components/Layout/Header";
import MainContent from "@/components/Layout/MainContent";

export default function ServicesLayout({ children }) {
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
      <div style={{ display: "flex", flex: 1, marginTop: "80px" }}>
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
